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
  stopAutoPlay();
});

function redirecionarGreenpeace() {
  window.open("https://doe.greenpeace.org.br/institucional-google-paid?cc=701Pm00000DislBIAR&utm_source=google&utm_medium=paid&utm_campaign=institucional&utm_content=aq_search&gad_source=1&gclid=Cj0KCQiAvbm7BhC5ARIsAFjwNHuzREayYy-YK-aXFHlCZOylKRwfGOfvRFwmp_8RHOA1sBAc4NZeiNUaAqGyEALw_wcB", "_blank");
}

function redirecionarWWF() {
  window.open("https://doe.wwf.org.br/ficha/manifesto-3?utm_source=google-ads&utm_medium=doacao&utm_campaign=manifesto3_doacao_keywords_search_google-ads&gad_source=1&gclid=Cj0KCQiAvbm7BhC5ARIsAFjwNHuYi7pz6_ToafpUQnmNaGqHuyP8ZBGLYADdsj-KCXTJz6CB3O1XOxkaAlqPEALw_wcB", "_blank");
}

function redirecionarPANTANAL() {
  window.open("https://sospantanal.org.br/apoie/", "_blank");
}

const menuButton = document.querySelector('.menu-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

menuButton.addEventListener('click', () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Fecha o menu se clicar fora dele
document.addEventListener('click', (event) => {
  if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
});

document.getElementById('categoria').addEventListener('change', function() {
  var categoria = this.value;
  var subcategoriaSelect = document.getElementById('subcategoria');
  
  // Limpa as opções anteriores
  subcategoriaSelect.innerHTML = '<option value="">Selecione uma Subcategoria</option>';

  // Adiciona as novas opções conforme a categoria selecionada
  if (categoria === 'Jogadas Populares') {
      var options = [
          'Estratégias para vitória no Guardião',
          'Dicas para iniciantes no Guardião',
          'Como derrotar o chefe final'
      ];
  } else if (categoria === 'Estratégias Avançadas') {
      var options = [
          'Melhorar habilidades de combate',
          'Equipamentos e estratégias para batalhas',
          'Táticas para jogo cooperativo'
      ];
  } else if (categoria === 'Ideias para o Jogo') {
      var options = [
          'Sugestões para novos mapas',
          'Novos personagens e habilidades'
      ];
  } else if (categoria === 'Sugestões para Ajudar o Meio Ambiente') {
      var options = [
          'Problemas ambientais',
          'Iniciativas de reciclagem',
          'Outras organizações para doar'
      ];
  }

  // Adiciona as opções no select de subcategorias
  options.forEach(function(optionText) {
      var option = document.createElement('option');
      option.value = optionText;
      option.textContent = optionText;
      subcategoriaSelect.appendChild(option);
  });
});
