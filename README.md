# Cuarahy.NET · Sitio web

Sitio de **Cuarahy.NET**, empresa de software de Neptunia, Uruguay: [cuarahy.net](https://cuarahy.net).

Muestra los sistemas en uso (Alma-Zen y THBR) y Rentify, que está en preparación, los servicios (páginas web, landing pages, tiendas online y aplicaciones a medida) y el contacto por WhatsApp y redes.

- **Tecnología:** HTML, CSS y JavaScript, sin librerías y sin paso de compilación.
- **Fuentes:** propias, en `fonts/` (Bitter, Caveat y Public Sans). No se pide nada a Google.
- **Privacidad:** sin cookies, sin rastreadores y sin scripts de terceros.
- **Publicación:** DreamHost, con HTTPS (Let's Encrypt) y `git pull` en el servidor.
- **Prueba local:** XAMPP, en `http://localhost/cuarahy-web` (hace falta servidor; no abrir con doble clic).

## Estructura

| Archivo          | Qué hace                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `index.html`     | Inicio: portada con el amanecer, "Del cuaderno al celular", resumen de productos y servicios |
| `productos.html` | Alma-Zen (con buscador de ejemplo), THBR (TreeHouse) y Rentify en preparación                |
| `servicios.html` | Páginas web, landing pages, tiendas online y aplicaciones a medida                           |
| `sobre.html`     | Quién está detrás y cómo se trabaja                                                          |
| `contacto.html`  | Botones de WhatsApp con el mensaje armado, y redes                                           |
| `css/style.css`  | Estilos de todo el sitio                                                                     |
| `js/main.js`     | Cabecera, menú del celular, luz de amanecer, animación del cuaderno y buscador de ejemplo    |
| `img/`           | Logo, favicon, logos de Alma-Zen, TreeHouse y Rentify, e imagen para compartir (`og.png`)    |
| `fonts/`         | Tipografías (woff2)                                                                          |

## SEO técnico y seguridad

- `robots.txt` (permite OAI-SearchBot, ChatGPT-User y PerplexityBot), `sitemap.xml`, URL canónica y etiquetas para compartir en cada página, datos estructurados (JSON-LD) en inicio y productos y `404.html` propia.
- `.htaccess`: bloquea `/.git`, README y `.gitignore`; sin listado de carpetas; redirección de `www` al dominio sin `www`; cabeceras de seguridad y caché.

## Pendiente

- Cabeceras HSTS y Content-Security-Policy.
- Google Search Console y `lastmod` del `sitemap.xml` al día.
- Correo con el dominio.
- Enlaces a los perfiles propios de Cuarahy.NET cuando existan (hoy son los personales).

## Flujo de trabajo

1. Cambios en local y prueba con XAMPP.
2. `git add`, `git commit` y `git push` a GitHub.
3. `git pull` en DreamHost.

## Derechos

© 2026 Gabriel Solari · Cuarahy.NET. Todos los derechos reservados. El código está publicado para mostrar cómo trabajo; no se otorga licencia de uso, copia ni redistribución. Los logos de TreeHouse Bienes Raíces se usan con su autorización.
