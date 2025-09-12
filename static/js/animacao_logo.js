// Configurações de tempo (em ms)
const circleDrawDuration = 2000;   // tempo do traçado do círculo
const lettersDrawDuration = 1800;  // tempo do traçado das letras RM
const textDrawDuration = 1500;     // tempo do traçado do texto
const gapBetweenSteps = 300;       // intervalo entre cada etapa
const revealDelay = 500;           // depois do draw completo, mostrar a imagem
const removeSplashAfter = 6500;    // quando remover o splash completamente

// Função para animar stroke de um elemento
function animateStroke(element, duration, delay = 0) {
  if (!element) return;
  
  setTimeout(() => {
    element.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.strokeDashoffset = '0';
  }, delay);
}

// Função para preparar elemento para animação
function prepareElement(element) {
  if (!element) return;
  
  const length = element.getTotalLength ? element.getTotalLength() : 1000;
  element.style.strokeDasharray = length;
  element.style.strokeDashoffset = length;
}

window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const circle = document.getElementById('logo-circle');
  const letterR = document.getElementById('logo-r');
  const letterM = document.getElementById('logo-m');
  const textRossi = document.getElementById('text-rossi');
  const textMartins = document.getElementById('text-martins');
  const textConstrutora = document.getElementById('text-construtora');
  const logoImage = document.getElementById('logoImage');

  // Preparar todos os elementos para animação
  [circle, letterR, letterM, textRossi, textMartins, textConstrutora].forEach(prepareElement);

  let currentDelay = 200;

  // 1. Desenhar o círculo primeiro
  animateStroke(circle, circleDrawDuration, currentDelay);
  currentDelay += circleDrawDuration + gapBetweenSteps;

  // 2. Desenhar as letras R e M simultaneamente
  animateStroke(letterR, lettersDrawDuration, currentDelay);
  animateStroke(letterM, lettersDrawDuration, currentDelay);
  currentDelay += lettersDrawDuration + gapBetweenSteps;

  // 3. Desenhar o texto ROSSI & MARTINS
  animateStroke(textRossi, textDrawDuration, currentDelay);
  animateStroke(textMartins, textDrawDuration, currentDelay + 200);
  currentDelay += textDrawDuration + gapBetweenSteps;

  // 4. Desenhar CONSTRUTORA
  animateStroke(textConstrutora, textDrawDuration * 0.8, currentDelay);
  currentDelay += textDrawDuration;

  // 5. Revelar a logo completa (SVG)
  setTimeout(() => {
    if (logoImage) {
      logoImage.classList.add('logo-visible', 'final-pop');
    }
    
    // Opcional: reduzir opacidade dos traços para destacar a logo final
    [circle, letterR, letterM, textRossi, textMartins, textConstrutora].forEach(element => {
      if (element) {
        element.style.opacity = '0.1';
      }
    });
  }, currentDelay + revealDelay);

  // 6. Remover o splash para mostrar o site
  setTimeout(() => {
    splash.style.opacity = '0';
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
      splash.style.display = 'none';
    }, 800);
  }, removeSplashAfter);

  // Prevenir scroll durante a animação
  document.body.style.overflow = 'hidden';
});