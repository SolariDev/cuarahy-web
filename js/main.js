/* Cuarahy.NET · comportamiento de la página
   - Cabecera clara u oscura según esté sobre la noche o sobre el papel, y menú del celular
   - Botón de WhatsApp según el scroll
   - El amanecer: la luz del papel crece con el scroll (variable CSS --amanecer)
   - La escena cuaderno → celular se anima al entrar en pantalla
   - Buscador de ejemplo de Alma-Zen (datos ficticios)
   Sin librerías. */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var cab = document.getElementById('cab');
  var fab = document.querySelector('.fab');
  var hero = document.getElementById('inicio');
  var pendiente = false;
  var hayBotonWa = false; // true si ya se ve un botón grande de WhatsApp

  function pintar() {
    pendiente = false;
    var y = window.scrollY || 0;
    var alto = window.innerHeight || 1;
    var max = Math.max(1, raiz.scrollHeight - alto);
    raiz.style.setProperty('--amanecer', Math.min(1, y / max).toFixed(3));
    var finHero = hero ? hero.getBoundingClientRect().bottom : 0;
    var sobreNoche = finHero > 64;
    cab.classList.toggle('sobre-noche', sobreNoche);
    cab.classList.toggle('scrolled', !sobreNoche);
    cab.classList.toggle('bajo', y > 30);
    fab.classList.toggle('visible', y > alto * 0.6 && !hayBotonWa);
  }

  function pedir() {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(pintar);
    }
  }

  // Un solo WhatsApp a la vista: el flotante se esconde si ya se ve un botón grande
  var botonesWa = document.querySelectorAll('main a.sello[href^="https://wa.me"]');
  if (botonesWa.length && 'IntersectionObserver' in window) {
    var vistos = new Set();
    var obsWa = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { vistos.add(e.target); } else { vistos.delete(e.target); } });
      hayBotonWa = vistos.size > 0;
      pedir();
    });
    botonesWa.forEach(function (b) { obsWa.observe(b); });
  }

  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir);
  pintar();

  // Menú del celular
  var btn = document.querySelector('.menu-btn');
  function menu(abrir) {
    cab.classList.toggle('menu-abierto', abrir);
    btn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    btn.setAttribute('aria-label', abrir ? 'Cerrar el menú' : 'Abrir el menú');
  }
  if (btn) {
    btn.addEventListener('click', function () { menu(!cab.classList.contains('menu-abierto')); });
    document.querySelectorAll('#menu a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 720) menu(false); });
  }

  // La escena del cuaderno arranca cuando se ve
  var stage = document.querySelector('.stage');
  if (stage) {
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { stage.classList.add('vivo'); obs.disconnect(); }
      }, { threshold: 0.35 });
      obs.observe(stage);
    } else {
      stage.classList.add('vivo');
    }
  }

  /* ---------- Buscador de ejemplo (datos ficticios) ---------- */

  var datos = [
    ['Alfajor triple', '70 gr', 45],
    ['Alfajor de maicena', '6 unidades', 120],
    ['Arroz', '1 kg', 62],
    ['Azúcar', '1 kg', 54],
    ['Aceite de girasol', '900 ml', 128],
    ['Fideos tallarín', '500 gr', 48],
    ['Galletitas de agua', '140 gr', 39],
    ['Leche entera', '1 lt', 46],
    ['Yerba mate', '500 gr', 142],
    ['Yerba mate', '1 kg', 268]
  ];

  var campo = document.getElementById('demo-q');
  var lista = document.getElementById('demo-lista');
  var ventaEl = document.getElementById('demo-venta');
  var totalEl = document.getElementById('demo-total');
  var avisoEl = document.getElementById('demo-aviso');
  var cobrar = document.getElementById('demo-cobrar');
  var venta = []; // [{ i: índice en datos, cant: unidades }]
  var reloj = null;

  // Sin importar mayúsculas ni tildes, y con coincidencias parciales
  function limpiar(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }
  function pesos(n) { return '$ ' + n; }
  function nuevo(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) { e.className = clase; }
    if (texto != null) { e.textContent = texto; }
    return e;
  }

  // Resultados del buscador, como en la app: nombre · presentación, precio y "+ Agregar"
  function mostrar() {
    var q = limpiar(campo.value);
    var hallados = [];
    for (var k = 0; k < datos.length && hallados.length < 3; k++) {
      if (q === '' || limpiar(datos[k][0]).indexOf(q) !== -1) { hallados.push(k); }
    }
    lista.textContent = '';
    if (hallados.length === 0) {
      lista.appendChild(nuevo('li', 'vacio', 'No se encontró el producto.'));
      return;
    }
    hallados.forEach(function (k) {
      var li = nuevo('li');
      var txt = nuevo('div');
      txt.appendChild(nuevo('strong', null, datos[k][0] + ' · ' + datos[k][1]));
      txt.appendChild(nuevo('small', null, pesos(datos[k][2])));
      var btn = nuevo('button', 'demo-agregar', '+ Agregar');
      btn.type = 'button';
      btn.setAttribute('data-i', k);
      li.appendChild(txt);
      li.appendChild(btn);
      lista.appendChild(li);
    });
  }

  // Venta actual, total y botón "Cobrar"
  function pintarVenta() {
    ventaEl.textContent = '';
    var total = 0;
    if (venta.length === 0) {
      ventaEl.appendChild(nuevo('p', 'demo-msj', 'Todavía no agregaste productos.'));
    }
    venta.forEach(function (l) {
      var d = datos[l.i];
      var fila = nuevo('div', 'demo-linea');
      var txt = nuevo('span', null, d[0] + ' · ' + d[1]);
      txt.appendChild(nuevo('small', null, l.cant + ' × ' + pesos(d[2])));
      fila.appendChild(txt);
      fila.appendChild(nuevo('b', null, pesos(d[2] * l.cant)));
      ventaEl.appendChild(fila);
      total += d[2] * l.cant;
    });
    ventaEl.scrollTop = ventaEl.scrollHeight;
    totalEl.textContent = pesos(total);
    cobrar.disabled = venta.length === 0;
    return total;
  }

  function avisar(texto) {
    avisoEl.textContent = texto;
    clearTimeout(reloj);
    if (texto) { reloj = setTimeout(function () { avisoEl.textContent = ''; }, 5000); }
  }

  if (campo && lista && ventaEl && cobrar) {
    campo.addEventListener('input', mostrar);
    lista.addEventListener('click', function (e) {
      var btn = e.target.closest('.demo-agregar');
      if (!btn) { return; }
      var i = parseInt(btn.getAttribute('data-i'), 10);
      var linea = null;
      venta.forEach(function (l) { if (l.i === i) { linea = l; } });
      if (linea) { linea.cant += 1; } else { venta.push({ i: i, cant: 1 }); }
      avisar('');
      pintarVenta();
    });
    cobrar.addEventListener('click', function () {
      var total = pintarVenta();
      if (venta.length === 0) { return; }
      venta = [];
      pintarVenta();
      avisar('✅ Venta guardada: ' + pesos(total) + ' en caja.');
    });
    mostrar();
    pintarVenta();
  }
})();
