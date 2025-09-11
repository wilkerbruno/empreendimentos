
    // Configurações de tempo (em ms)
    const iconDrawDuration = 2600;   // tempo do traçado do ícone
    const textDrawDuration = 2000;   // tempo do traçado do texto
    const gapBetween = 350;          // intervalo entre ícone e texto
    const revealDelay = 400;         // depois do draw completo, mostrar a imagem
    const removeSplashAfter = 3200 + textDrawDuration + 600; // quando remover o splash completamente

    // Atualize o src para o caminho real da sua imagem se preferir set via JS:
    // document.getElementById('logoImage').src = '/static/img/logo.png';

    // Função auxiliar para animar um elemento (adiciona animação via style)
    function animateStroke(el, duration, delay) {
      el.style.transition = 'none';
      // força recálculo para garantir que as mudanças sejam aplicadas
      void el.getBoundingClientRect();
      el.style.strokeDasharray = el.style.strokeDasharray || el.getTotalLength?.() || 1200;
      el.style.strokeDashoffset = el.style.strokeDashoffset || el.getTotalLength?.() || 1200;
      // aplica a animação via setTimeout (timings)
      setTimeout(() => {
        el.style.transition = `stroke-dashoffset ${duration}ms ease`;
        el.style.strokeDashoffset = '0';
      }, delay);
    }

    window.addEventListener('load', () => {
      const iconCircle = document.getElementById('icon-circle');
      const iconRM = document.getElementById('icon-rm');
      const textLine = document.getElementById('text-line');
      const textDecor = document.getElementById('text-decor');
      const image = document.getElementById('logoImage');

      // preparar dash lengths (se disponível)
      [iconCircle, iconRM, textLine, textDecor].forEach(p => {
        try {
          const L = p.getTotalLength();
          p.style.strokeDasharray = L;
          p.style.strokeDashoffset = L;
        } catch(e){}
      });

      // animação: desenha círculo + RM juntos (sincronizados)
      animateStroke(iconCircle, iconDrawDuration, 80);
      animateStroke(iconRM, iconDrawDuration, 80);

      // depois do ícone desenhar, começa o texto
      setTimeout(() => {
        animateStroke(textLine, textDrawDuration, 0);
        animateStroke(textDecor, textDrawDuration, 120);
      }, iconDrawDuration + gapBetween);

      // depois que tudo desenhar, revelar a imagem completa
      const totalDrawTime = iconDrawDuration + gapBetween + textDrawDuration;
      setTimeout(() => {
        image.classList.add('logo-visible','final-pop');
        // opcional: reduzir ou ocultar os traces
        [iconCircle, iconRM, textLine, textDecor].forEach(p=>{
          p.style.opacity = '0.06';
        });
      }, totalDrawTime + revealDelay);

      // Remover o splash para mostrar o site (ajuste o tempo conforme necessário)
      setTimeout(()=>{
        const splash = document.getElementById('splash');
        splash.style.transition = 'opacity 420ms ease';
        splash.style.opacity = '0';
        setTimeout(()=>{ splash.style.display = 'none'; }, 420);
      }, totalDrawTime + revealDelay + 900); // espera a imagem aparecer e mantém alguns ms
    });
 