/**
 * @file WorldMap.tsx
 * @description Componente que renderiza el mapa mundi base (retícula y continentes) usando p5.js.
 * @module components/WorldMap
 */

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { CONTINENTS } from '@/data/worldContinents';
import './WorldMap.css';

export function WorldMap() {
  // Referencia al elemento DOM donde p5.js inyectará la etiqueta <canvas>
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /**
     * Función constructora del sketch en modo instancia.
     * Todo el dibujo se ejecuta sobre el objeto 'p' para evitar conflictos con React.
     */
    const sketch = (p: p5) => {
      /**
       * Convierte coordenadas geográficas (latitud, longitud) a píxeles (x, y) del lienzo.
       */
      const project = (lat: number, lng: number) => {
        const margin = 45;
        const x = p.map(lng, -180, 180, margin, p.width - margin);
        // Invertimos el eje Y porque en pantalla 0 está arriba, mientras que +85° es el Norte
        const y = p.map(lat, 85, -65, margin, p.height - margin);
        return { x, y };
      };

      /**
       * Dibuja meridianos y paralelos cada 30 grados.
       */
      const drawGrid = () => {
        p.stroke(255, 255, 255, 14);
        p.strokeWeight(1);

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

      /**
       * Dibuja el contorno vectorial de cada continente.
       */
      const drawContinents = () => {
        p.fill(24, 28, 36);
        p.stroke(90, 110, 140, 100);
        p.strokeWeight(1.2);

        for (const continent of CONTINENTS) {
          p.beginShape();
          for (const [lng, lat] of continent) {
            const point = project(lat, lng);
            p.vertex(point.x, point.y);
          }
          p.endShape(p.CLOSE);
        }
      };

      p.setup = () => {
        // Calculamos el ancho real del contenedor y una altura proporcional (ratio ~2:1)
        const width = container.clientWidth;
        const height = Math.round(width * 0.48);
        p.createCanvas(width, height);
        // Como de momento el mapa es estático y no tiene animaciones, detenemos el bucle continuo
        p.noLoop();
      };

      p.draw = () => {
        p.background(13, 15, 18);
        drawGrid();
        drawContinents();
      };

      p.windowResized = () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = Math.round(width * 0.48);
        p.resizeCanvas(width, height);
        // Al tener noLoop() activo, pedimos explícitamente que repinte tras cambiar el tamaño
        p.redraw();
      };
    };

    // Creamos la instancia de p5 vinculada al div
    const p5Instance = new p5(sketch, container);

    // Función de limpieza: elimina el canvas cuando React desmonta el componente
    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <section className="world-map" aria-label="Mapa mundi interactivo">
      <div ref={containerRef} className="world-map__canvas" />
    </section>
  );
}
