/* Cafetería — interacciones básicas
   1) Menú de navegación móvil (abrir/cerrar)
   2) Cerrar el menú al pulsar un enlace
   3) Resaltar el enlace de la sección visible
*/
(function () {
  "use strict";

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var abierto = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!abierto));
      toggle.setAttribute(
        "aria-label",
        abierto ? "Abrir menú de navegación" : "Cerrar menú de navegación"
      );
      menu.classList.toggle("is-open", !abierto);
    });

    // Cierra el menú al elegir un enlace
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú de navegación");
      }
    });
  }

  // Resaltado de la sección activa
  var enlaces = Array.prototype.slice.call(
    document.querySelectorAll('.nav__list a[href^="#"]')
  );
  var secciones = enlaces
    .map(function (enlace) {
      return document.querySelector(enlace.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && secciones.length) {
    var observer = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          enlaces.forEach(function (enlace) {
            var activo = enlace.getAttribute("href") === "#" + entrada.target.id;
            enlace.classList.toggle("is-active", activo);
            if (activo) {
              enlace.setAttribute("aria-current", "true");
            } else {
              enlace.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    secciones.forEach(function (seccion) {
      observer.observe(seccion);
    });
  }
})();
