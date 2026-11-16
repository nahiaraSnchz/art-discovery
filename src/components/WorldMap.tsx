/**
 * @file WorldMap.tsx
 * @description Mapa mundi estático tipo constelación con colores por región, zoom y vista previa con imagen.
 * @module components/WorldMap
 */

import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { CONTINENTS } from '@/data/worldContinents';
import { STATIC_MAP_ARTWORKS, type MapArtwork } from '@/data/mapArtworks';
import './WorldMap.css';

interface RegionStyle {
  name: string;
  rgb: [number, number, number];
}

function getRegionStyle(lat: number, lng: number): RegionStyle {
  if (lng < -30) {
    return { name: 'América', rgb: [56, 189, 248] };
  }
  if (lat >= 35 && lng >= -30 && lng <= 45) {
    return { name: 'Europa', rgb: [229, 169, 98] };
  }
  if (lat < 35 && lng >= -25 && lng <= 55) {
    return { name: 'África', rgb: [52, 211, 153] };
  }
  if (lat < -10 && lng > 105) {
    return { name: 'Oceanía', rgb: [167, 139, 250] };
  }
  return { name: 'Asia', rgb: [251, 113, 133] };
}

const LEGEND_ITEMS: RegionStyle[] = [
  { name: 'Europa', rgb: [229, 169, 98] },
  { name: 'América', rgb: [56, 189, 248] },
  { name: 'Asia', rgb: [251, 113, 133] },
  { name: 'África', rgb: [52, 211, 153] },
  { name: 'Oceanía', rgb: [167, 139, 250] },
];

export function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [hoveredArtwork, setHoveredArtwork] = useState<MapArtwork | null>(null);
  const [failedImageId, setFailedImageId] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Limpia cualquier <canvas> residual antes de iniciar
    container.replaceChildren();

    let isDisposed = false;
    let currentHoveredId: string | null = null;

    const sketch = (p: p5) => {
      let zoom = 1;
      let offsetX = 0;
      let offsetY = 0;

      const clampOffsets = () => {
        const minX = p.width * (1 - zoom);
        const minY = p.height * (1 - zoom);
        offsetX = p.constrain(offsetX, minX, 0);
        offsetY = p.constrain(offsetY, minY, 0);
      };

      const isMouseInside = () =>
        p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height;

      const project = (lat: number, lng: number) => {
        const margin = 45;
        const x = p.map(lng, -180, 180, margin, p.width - margin);
        const y = p.map(lat, 85, -65, margin, p.height - margin);
        return { x, y };
      };

      const drawGrid = () => {
        p.stroke(255, 255, 255, 14);
        p.strokeWeight(1 / zoom);

        for (let lng = -180; lng <= 180; lng += 30) {
          const top = project(85, lng);
          const bottom = project(-65, lng);
          p.line(top.x, top.y, bottom.x, bottom.y);
        }

        for (let lat = -60; lat <= 60; lat += 30) {
          const left = project(lat, -180);
          const right = project(lat, 180);
          p.line(left.x, left.y, right.x, right.y);
        }
      };

      const drawContinents = () => {
        p.fill(24, 28, 36);
        p.stroke(90, 110, 140, 100);
        p.strokeWeight(1.2 / zoom);

        for (const continent of CONTINENTS) {
          p.beginShape();
          for (const [lng, lat] of continent) {
            const point = project(lat, lng);
            p.vertex(point.x, point.y);
          }
          p.endShape(p.CLOSE);
        }
      };

      const updateTooltipPosition = (
        screenX: number,
        screenY: number,
        rgb: [number, number, number]
      ) => {
        const tooltipEl = tooltipRef.current;
        if (!tooltipEl) return;

        const cardW = 245;
        const cardH = 235;
        const gap = 14;

        const posX =
          screenX + cardW + gap > p.width ? Math.max(10, screenX - cardW - gap) : screenX + gap;

        const posY = p.constrain(screenY - cardH / 2, 10, Math.max(10, p.height - cardH - 34));

        tooltipEl.style.transform = `translate(${Math.round(posX)}px, ${Math.round(posY)}px)`;
        tooltipEl.style.setProperty(
          '--tooltip-accent',
          `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`
        );
      };

      const drawHUD = () => {
        p.noStroke();
        p.textSize(11);
        p.textStyle(p.NORMAL);

        let cursorX = 20;
        const y = p.height - 18;

        for (const item of LEGEND_ITEMS) {
          p.fill(item.rgb[0], item.rgb[1], item.rgb[2]);
          p.circle(cursorX, y - 3, 7);

          p.fill(156, 163, 175);
          p.text(item.name, cursorX + 10, y);
          cursorX += p.textWidth(item.name) + 28;
        }

        const zoomHint =
          zoom > 1
            ? `Zoom ${zoom.toFixed(1)}x · Doble clic para centrar`
            : 'Rueda: zoom · Arrastrar: mover';
        p.fill(120, 128, 140);
        p.textAlign(p.RIGHT, p.BASELINE);
        p.text(zoomHint, p.width - 20, y);
        p.textAlign(p.LEFT, p.BASELINE);
      };

      p.setup = () => {
        // 2. Evita crear un segundo lienzo si React desmontó la instancia durante StrictMode
        if (isDisposed) {
          p.remove();
          return;
        }

        container.replaceChildren();
        const width = container.clientWidth;
        const height = Math.round(width * 0.48);
        p.createCanvas(width, height);
        p.textFont('sans-serif');
      };

      p.draw = () => {
        if (isDisposed) return;

        p.background(13, 15, 18);

        const worldMouseX = (p.mouseX - offsetX) / zoom;
        const worldMouseY = (p.mouseY - offsetY) / zoom;

        let hoveredArt: MapArtwork | null = null;
        let hoveredScreenPos: { x: number; y: number } | null = null;
        let hoveredRgb: [number, number, number] = [229, 169, 98];

        p.push();
        p.translate(offsetX, offsetY);
        p.scale(zoom);

        drawGrid();
        drawContinents();

        const projected = STATIC_MAP_ARTWORKS.map((art) => ({
          art,
          region: getRegionStyle(art.lat, art.lng),
          ...project(art.lat, art.lng),
        }));

        // 1. Líneas de constelación por región
        p.strokeWeight(0.9 / zoom);
        for (let i = 0; i < projected.length; i++) {
          const current = projected[i];
          const nearest = projected
            .filter((other, idx) => idx !== i && other.region.name === current.region.name)
            .map((other) => ({
              other,
              dist: p.dist(current.x, current.y, other.x, other.y),
            }))
            .filter((item) => item.dist < 135)
            .sort((a, b) => a.dist - b.dist)
            .slice(0, 2);

          p.stroke(current.region.rgb[0], current.region.rgb[1], current.region.rgb[2], 38);
          for (const { other } of nearest) {
            p.line(current.x, current.y, other.x, other.y);
          }
        }

        // 2. Nodos luminosos
        const sizeScale = Math.pow(zoom, 0.65);

        for (const { art, region, x, y } of projected) {
          const hitRadius = 9 / sizeScale;
          const isHovered = isMouseInside() && p.dist(worldMouseX, worldMouseY, x, y) < hitRadius;

          if (isHovered) {
            hoveredArt = art;
            hoveredScreenPos = {
              x: x * zoom + offsetX,
              y: y * zoom + offsetY,
            };
            hoveredRgb = region.rgb;
          }

          const [r, g, b] = region.rgb;
          p.noStroke();

          p.fill(r, g, b, isHovered ? 70 : 22);
          p.circle(x, y, (isHovered ? 18 : 10) / sizeScale);

          p.fill(r, g, b, isHovered ? 150 : 60);
          p.circle(x, y, (isHovered ? 10 : 6) / sizeScale);

          if (isHovered) {
            p.fill(255, 255, 255);
          } else {
            p.fill(r, g, b);
          }
          p.circle(x, y, (isHovered ? 5.5 : 3.4) / sizeScale);
        }

        p.pop();

        drawHUD();

        if (hoveredArt && hoveredScreenPos) {
          p.cursor('pointer');
          updateTooltipPosition(hoveredScreenPos.x, hoveredScreenPos.y, hoveredRgb);

          if (currentHoveredId !== hoveredArt.id) {
            currentHoveredId = hoveredArt.id;
            setHoveredArtwork(hoveredArt);
          }
        } else {
          p.cursor(zoom > 1 ? 'grab' : 'default');

          if (currentHoveredId !== null) {
            currentHoveredId = null;
            setHoveredArtwork(null);
          }
        }
      };

      p.mouseWheel = (event?: object) => {
        if (!isMouseInside()) return;

        const wheelEvent = event as WheelEvent | undefined;
        const delta = wheelEvent?.deltaY ?? 0;
        const factor = delta < 0 ? 1.18 : 0.85;
        const nextZoom = p.constrain(zoom * factor, 1, 8);

        if (nextZoom !== zoom) {
          const ratio = nextZoom / zoom;
          offsetX = p.mouseX - (p.mouseX - offsetX) * ratio;
          offsetY = p.mouseY - (p.mouseY - offsetY) * ratio;
          zoom = nextZoom;
          clampOffsets();
        }

        return false;
      };

      p.mouseDragged = () => {
        if (!isMouseInside() || zoom <= 1) return;
        offsetX += p.mouseX - p.pmouseX;
        offsetY += p.mouseY - p.pmouseY;
        clampOffsets();
      };

      p.doubleClicked = () => {
        if (!isMouseInside()) return;
        zoom = 1;
        offsetX = 0;
        offsetY = 0;
      };

      p.windowResized = () => {
        if (!container || isDisposed) return;
        const width = container.clientWidth;
        const height = Math.round(width * 0.48);
        p.resizeCanvas(width, height);
        clampOffsets();
      };
    };

    const p5Instance = new p5(sketch, container);

    return () => {
      // 3. Marca el efecto como desmontado y vacía el contenedor DOM por completo
      isDisposed = true;
      p5Instance.remove();
      container.replaceChildren();
    };
  }, []);

  const showImage = Boolean(hoveredArtwork?.image && failedImageId !== hoveredArtwork.id);

  return (
    <section className="world-map" aria-label="Mapa mundi de obras artísticas">
      <div ref={containerRef} className="world-map__canvas" />

      <aside
        ref={tooltipRef}
        className={`world-map__tooltip ${hoveredArtwork ? 'world-map__tooltip--visible' : ''}`}
        aria-live="polite"
      >
        {hoveredArtwork && (
          <>
            {showImage && (
              <div className="world-map__tooltip-media">
                <img
                  src={hoveredArtwork.image}
                  alt={hoveredArtwork.title}
                  className="world-map__tooltip-image"
                  onError={() => setFailedImageId(hoveredArtwork.id)}
                />
              </div>
            )}

            <div className="world-map__tooltip-body">
              <h3 className="world-map__tooltip-title">{hoveredArtwork.title}</h3>
              <p className="world-map__tooltip-artist">{hoveredArtwork.artist}</p>
              <p className="world-map__tooltip-meta">
                {hoveredArtwork.place} · {hoveredArtwork.year}
              </p>
            </div>
          </>
        )}
      </aside>
    </section>
  );
}
