# Cuarahy.NET · Sitio web

Sitio de **Cuarahy.NET**, empresa de software de Uruguay. Muestra los sistemas en uso (Alma-Zen y THBR) y Rentify, que está en preparación, los servicios (páginas web, landing pages, tiendas online y aplicaciones a medida) y el contacto por WhatsApp y redes.

- **Tecnología:** HTML, CSS y JavaScript, sin librerías y sin paso de compilación.
- **Fuentes:** propias, en `fonts/` (Bitter, Caveat y Public Sans). No se pide nada a Google.
- **Publicación:** DreamHost, en el dominio cuarahy.net, con `git pull` en el servidor.
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
| `img/`           | Logo, favicon, logos de Alma-Zen y TreeHouse, e imagen para compartir (`og.png`)             |
| `fonts/`         | Tipografías (woff2)                                                                          |

## SEO técnico (hecho el 04/11/2026)

- `robots.txt` (permite OAI-SearchBot, ChatGPT-User y PerplexityBot), `sitemap.xml`, URL canónica y etiquetas para compartir en cada página, datos estructurados (JSON-LD) en inicio y productos, `404.html` y `.htaccess` (oculta `.git`, README y `_landing-vieja`; cabeceras de seguridad y caché).
- **Dirección pendiente:** todas las URL usan el marcador `https://DOMINIO.PENDIENTE`. Cuando se compre el dominio hay que reemplazarlo en `*.html`, `robots.txt` y `sitemap.xml`. Para comprobar que no quedó ninguno: buscar `DOMINIO.PENDIENTE` en todo el proyecto (tiene que dar 0 resultados).

## Pendiente

- Comprar el dominio, reemplazar el marcador y publicar. Probar antes en el celular.
- Activar el certificado SSL en DreamHost y recién después la redirección a HTTPS.
- Correo de contacto, cuando el dominio esté activo.
- Actualizar los enlaces de redes cuando existan los perfiles de Cuarahy.NET (hoy son los personales).
- Decidir qué hacer con `_landing-vieja/` y con `img/rentify.webp`, que ya no se usa.

## Flujo de trabajo

1. Cambios en local y prueba con XAMPP.
2. `git add`, `git commit` y `git push` a GitHub.
3. `git pull` en DreamHost.
