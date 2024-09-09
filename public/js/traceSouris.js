let mouseX = 0, mouseY = 0;

// Met à jour la position de la souris
document.addEventListener('mousemove', function(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

// Crée une trace à intervalle régulier, même si la souris est immobile
setInterval(function() {
  const trace = document.createElement('div');
  trace.classList.add('trace');

  // Positionne la trace à la position actuelle de la souris
  trace.style.left = `${mouseX - 10}px`;  // -10 pour centrer le cercle (la moitié de 20px)
  trace.style.top = `${mouseY - 10}px`;

  document.body.appendChild(trace);

  // Disparition automatique après un certain temps
  setTimeout(() => {
    trace.style.opacity = 0; // Transition douce via le CSS
    setTimeout(() => {
      trace.remove(); // Supprimer la trace après disparition
    }, 300); // Attendre la fin de la transition CSS (0.3s)
  }, 10); // La trace reste visible 100ms avant de commencer à disparaître

}, 0.001); // Crée une trace tous les 50ms pour un effet plus fluide