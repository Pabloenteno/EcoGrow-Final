
let listaCompletaPlantas = [];
const listaContainer = document.querySelector('main');



function exibirPlantas(plantas) {

  listaContainer.innerHTML = '';

  if (!plantas || plantas.length === 0) {
    listaContainer.innerHTML = '<h1 style="color:red;">Nenhuma planta encontrada.</h1>';
    listaContainer.style.display = 'flex'
    listaContainer.style.paddingLeft= '5vh'
  

    

    return;
  }else{
    listaContainer.style.display = 'grid'
  }


  plantas.forEach(planta => {

    const texto = planta.nome;
    const limite = 11;

    function cortarTexto(texto, limite) {
      if (texto.length <= limite) {
        return texto;
      } else {
        return texto.slice(0, limite) + '...';
      }
    }
    const nomeCortado = cortarTexto(texto, limite);

    let v1, v2, v3;
    if (planta.espaco === "pequeno") {
      v1 = 'opacity: 1'; v2 = 'opacity: 0.5'; v3 = 'opacity: 0.5';
    } else if (planta.espaco === "médio") {
      v1 = 'opacity: 0.5'; v2 = 'opacity: 1'; v3 = 'opacity: 0.5';
    } else if (planta.espaco === "grande") {
      v1 = 'opacity: 0.5'; v2 = 'opacity: 0.5'; v3 = 'opacity: 1';
    }

    const div = document.createElement('div');
    div.classList.add('planta');
    div.setAttribute('data-id', planta.id);

    div.innerHTML = `
            <div class="areaImg">
              <img draggable="false" class="imgPlanta" src="http://localhost:3002/uploads/${planta.imagem}" alt="">
            </div>
            <div class="area">
              <div class="esquerda">
                <h2 class="nome">${nomeCortado}</h2>
                <div class="gotas">
                  ${[...Array(5)].map((_, i) => `
                    <img draggable="false" class="gota" src="./icons/Group 23.svg" alt="" data-value="${i + 1}" style="${i < planta.agua ? '' : 'opacity: 0.2'}">
                  `).join('')}
                </div>
                <img class="estacao" draggable="false" src="./imagens/${planta.estacao}.png" alt="">
              </div>
              <div class="direita">
                <h4 class="tempo">${planta.tempo}</h4>
                <div id="vasos">
                    <img data-value="pequeno" style='${v1}' draggable="false" class="vaso" id="v1" src="./icons/11065007-vaso-de-flores-vazio-com-desenho-em-aquarela-de-solo-isolado-no-fundo-branco-clipart-de-vaso-de-flores-em-branco-estilo-de-desenho-animado-de-vaso-de-flores-de-plastico-marrom-vaso-de-flores- 2 (1).svg" alt="">
                    <img data-value="médio" style='${v2}' draggable="false" class="vaso" id="v2" src="./icons/11065007-vaso-de-flores-vazio-com-desenho-em-aquarela-de-solo-isolado-no-fundo-branco-clipart-de-vaso-de-flores-em-branco-estilo-de-desenho-animado-de-vaso-de-flores-de-plastico-marrom-vaso-de-flores- 2 (1).svg" alt="">
                    <img data-value="grande" style='${v3}' draggable="false" class="vaso" id="v3" src="./icons/11065007-vaso-de-flores-vazio-com-desenho-em-aquarela-de-solo-isolado-no-fundo-branco-clipart-de-vaso-de-flores-em-branco-estilo-de-desenho-animado-de-vaso-de-flores-de-plastico-marrom-vaso-de-flores- 2 (1).svg" alt="">
                </div>
              </div>
            </div>
        `;

    div.addEventListener('click', () => {
      const id = div.getAttribute('data-id');
      window.location.href = `./infoPlanta.html?id=${id}`;
    });

    listaContainer.appendChild(div);
  });
};

function filtrarPlantas() {

  const campoPesquisa = document.getElementById('pesquisa');
  const termoPesquisa = campoPesquisa ? campoPesquisa.value.toLowerCase() : '';


  if (!termoPesquisa.trim()) {
    exibirPlantas(listaCompletaPlantas);
    return;
  }


  const resultadosFiltrados = listaCompletaPlantas.filter(planta => {
    const nome = planta.nome ? planta.nome.toLowerCase() : '';

    return nome.includes(termoPesquisa)
  });


  exibirPlantas(resultadosFiltrados);
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3002/listar', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();

    if (result.success) {

      listaCompletaPlantas = result.plantas;


      exibirPlantas(listaCompletaPlantas);
    }

  } catch (error) {
    console.log('Erro ao buscar plantas:', error);
  }


  filtrarPlantas();
});


document.addEventListener('DOMContentLoaded', function () {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login');

  if (localStorage.getItem('id')) {

    loginButton.addEventListener('click', () => {
      window.location.href = './Usuario.html';
    });
  } else {

    loginButton.addEventListener('click', () => {
      window.location.href = './login.html';
    });
  }

});
document.addEventListener('DOMContentLoaded', () => {
  const favoritos = document.getElementById('favoritos');

  if (localStorage.getItem('id')) {
    favoritos.style.display = 'block'
    favoritos.addEventListener('click', () => {
      window.location.href = './favoritos.html';
    });
  } else {
    favoritos.style.display = 'none'
  }


});

document.addEventListener('DOMContentLoaded', () => {
  const progresso = document.getElementById('progresso');

  if (localStorage.getItem('id')) {
    progresso.style.display = 'block'
    progresso.addEventListener('click', () => {
      window.location.href = './Progresso.html';
    });
  } else {
    progresso.style.display = 'none'
  }

});

window.addEventListener('DOMContentLoaded', () => {
  const tipo = localStorage.getItem("tipo");
  const ButtonAdm = document.getElementById("adm");

  if (tipo === "adm") {
    ButtonAdm.style.display = 'block';
  } else {
    ButtonAdm.style.display = 'none';
  }
  ButtonAdm.addEventListener('click', () => {
    window.location.href = './addPlanta.html'

  })
});












