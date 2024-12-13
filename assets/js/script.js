document.addEventListener("DOMContentLoaded", function () {
  
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menu = document.getElementById("menu");

  // Abre o menu
  openMenu.addEventListener("click", function () {
    menu.style.transform = "translateX(0)";
    openMenu.style.display = "none"; 
  });

  // Fecha o menu
  closeMenu.addEventListener("click", function () {
    menu.style.transform = "translateX(-100%)";
    openMenu.style.display = "block"; 
  });

  // Controle do carrossel
  const carouselSlide = document.querySelector('.carousel-slide');
  const slides = document.querySelectorAll('.carousel-slide img');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  let autoPlayInterval;

  // Função para atualizar o carrossel
  function updateCarousel(index) {
    currentIndex = index;
    carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
    updateIndicators();
  }

  // Função para atualizar os indicadores
  function updateIndicators() {
    indicators.forEach((indicator, idx) => {
      if (idx === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // Inicia o autoplay (troca de slide automaticamente)
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length; // Próximo slide
      updateCarousel(currentIndex);
    }, 3000); 
  }

  // Para o autoplay
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }


  carouselSlide.addEventListener('mouseenter', stopAutoPlay); 
  carouselSlide.addEventListener('mouseleave', startAutoPlay); 

  // Inicia o carrossel e o autoplay automaticamente
  updateCarousel(0);
  startAutoPlay();
});
