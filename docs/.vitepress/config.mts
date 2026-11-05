import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/art-discovery/',
  title: "Art Discovery",
  description: "Documentación y Requisitos del Proyecto",
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Requisitos', link: '/requisitos/01-introduccion' }
    ],

    sidebar: [
      {
        text: 'Ingeniería de Requisitos',
        items: [
          { text: '1. Introducción y Alcance', link: '/requisitos/01-introduccion' },
          { text: '2. Stakeholders y Usuarios', link: '/requisitos/02-stakeholders' },
          { text: '3. Requisitos Funcionales', link: '/requisitos/03-funcionales' },
          { text: '4. Requisitos No Funcionales', link: '/requisitos/04-no-funcionales' },
          { text: '5. Historias de Usuario', link: '/requisitos/05-historias-usuario' }
        ]
      },
      {
        text: 'Diseño e Imagen',
        items: [
          { text: 'Colorimetría y Paletas', link: '/diseno/colorimetria' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/naniaraSnchz/art-discovery' }
    ],

    search: {
      provider: 'local'
    }
  }
})