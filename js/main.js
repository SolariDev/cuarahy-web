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
    fab.classList.toggle('visible', y > alto * 0.6);
  }

  function pedir() {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(pintar);
    }
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

  // Sin importar mayúsculas ni tildes, y con coincidencias parciales
  function limpiar(texto) {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }

  function mostrar() {
    var q = limpiar(campo.value);
    var hallados = datos.filter(function (d) {
      return q === '' || limpiar(d[0]).indexOf(q) !== -1;
    }).slice(0, 5);

    lista.textContent = '';
    if (hallados.length === 0) {
      var vacio = document.createElement('li');
      vacio.className = 'vacio';
      vacio.textContent = 'Sin resultados en este ejemplo.';
      lista.appendChild(vacio);
      return;
    }
    hallados.forEach(function (d) {
      var li = document.createElement('li');
      var nombre = document.createElement('span');
      nombre.textContent = d[0] + ' ';
      var chico = document.createElement('small');
      chico.textContent = d[1];
      nombre.appendChild(chico);
      var precio = document.createElement('b');
      precio.textContent = '$ ' + d[2];
      li.appendChild(nombre);
      li.appendChild(precio);
      lista.appendChild(li);
    });
  }

  if (campo && lista) {
    campo.addEventListener('input', mostrar);
  }
})();
