# Cuarahy.NET · Sitio web

Sitio de **Cuarahy.NET**, empresa de software de Uruguay. Muestra los sistemas en uso (Alma-Zen y Rentify), los servicios (páginas web, landing pages, tiendas online y aplicaciones a medida) y el contacto por WhatsApp y redes.

- **Tecnología:** HTML, CSS y JavaScript, sin librerías y sin paso de compilación.
- **Fuentes:** propias, en `fonts/` (Bitter, Caveat y Public Sans). No se pide nada a Google.
- **Publicación:** DreamHost, en el dominio cuarahy.net, con `git pull` en el servidor.
- **Prueba local:** XAMPP, en `http://localhost/cuarahy-web` (hace falta servidor; no abrir con doble clic).

## Estructura

| Archivo          | Qué hace                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `index.html`     | Inicio: portada con el amanecer, "Del cuaderno al celular", resumen de productos y servicios |
| `productos.html` | Alma-Zen (con buscador de ejemplo) y Rentify                                                 |
| `servicios.html` | Páginas web, landing pages, tiendas online y aplicaciones a medida                           |
| `sobre.html`     | Quién está detrás y cómo se trabaja                                                          |
| `contacto.html`  | Botones de WhatsApp con el mensaje armado, y redes                                           |
| `css/style.css`  | Estilos de todo el sitio                                                                     |
| `js/main.js`     | Cabecera, menú del celular, luz de amanecer, animación del cuaderno y buscador de ejemplo    |
| `img/`           | Logo, favicon y logos de Alma-Zen y Rentify                                                  |
| `fonts/`         | Tipografías (woff2)                                                                          |

## Pendiente

- SEO técnico: `robots.txt`, `sitemap.xml`, datos estructurados y URL canónica.
- Comprar el dominio cuarahy.net y publicar.
- Agregar el correo de contacto cuando el dominio esté activo.
- Agregar la imagen para compartir en redes (`og:image`) con la URL definitiva.
- Actualizar los enlaces de redes cuando existan los perfiles de Cuarahy.NET.

## Flujo de trabajo

1. Cambios en local y prueba con XAMPP.
2. `git add`, `git commit` y `git push` a GitHub.
3. `git pull` en DreamHost.
