
function redirecionarGreenpeace() {
  window.open("https://doe.greenpeace.org.br/?utm_source=google&utm_medium=paid&utm_campaign=institucional&utm_content=fichaA&utm_term=doar&cc=701Pm00000U3xDeIAJ&gad_source=1&gbraid=0AAAAAD4RlhZAzRkfOR-naOYh-8knsQDGv&gclid=Cj0KCQjw5azABhD1ARIsAA0WFUGELVRECtkmp7gR-2zEVI4FnG6u3HViEUrp52NbOLq3VFY4A1YLP0gaAhkUEALw_wcB", "_blank");
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
          'Desafios de engajamento ambiental',
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

const tipoAnexo = document.getElementById('tipoAnexo');
  const campoImagem = document.getElementById('campo-imagem');
  const campoVideo = document.getElementById('campo-video');
  const anexoVideo = document.getElementById('anexoVideo');
  const playerVideo = document.getElementById('playerVideo');
  
  tipoAnexo.addEventListener('change', () => {
  const valor = tipoAnexo.value;
  if (valor === 'imagem') {
    campoImagem.style.display = 'block';
    campoVideo.style.display = 'none';
    playerVideo.style.display = 'none';
    playerVideo.src = '';
  } else if (valor === 'video') {
    campoImagem.style.display = 'none';
    campoVideo.style.display = 'block';
    playerVideo.style.display = 'none';
    playerVideo.src = '';
  } else {
    campoImagem.style.display = 'none';
    campoVideo.style.display = 'none';
    playerVideo.style.display = 'none';
    playerVideo.src = '';
  }
  });

  anexoVideo.addEventListener('change', () => {
    const file = anexoVideo.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      playerVideo.src = url;
      playerVideo.style.display = 'block';
      playerVideo.load();
      // Não chama play(), para só iniciar com clique do usuário
    } else {
      playerVideo.style.display = 'none';
      playerVideo.src = '';
    }
  });
  const mensagem = document.querySelector('.mensagem-sucesso');
  console.log('Mensagem:', mensagem);
  if (mensagem) {
    setTimeout(() => {
      mensagem.style.transition = "opacity 0.5s ease";
      mensagem.style.opacity = "0";
      setTimeout(() => mensagem.remove(), 500);
    }, 4000);
}