window.addEventListener('DOMContentLoaded', async () => {
  const id_usuario = localStorage.getItem('id')
  
  try {
    const response = await fetch(`http://localhost:3002/info/favorito`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_usuario })
        });

    const result = await response.json();

    if (result.success) {
      const favoritos = result.favoritos;
      const container = document.querySelector('main'); 

      favoritos.forEach(favoritos => {
        console.log("Id:", favoritos.id);
        console.log("Nome:", favoritos.nome);
        console.log("Estação:", favoritos.estacao);
        console.log("Água:", favoritos.agua);
        console.log("Espaço:", favoritos.espaco);
        console.log("Tempo:", favoritos.tempo);
        console.log("Imagem:", favoritos.imagem);
        console.log('-------------------------');

        const texto = favoritos.nome
        const limite = 11

        function cortarTexto(texto, limite) {
        if (texto.length <= limite) {
         return texto;
        } else {
        return texto.slice(0, limite) + '...';
        }
        }

        const nomeCortado = cortarTexto(texto, limite);

        let v1,v2,v3

        if(favoritos.espaco === "pequeno"){
          v1 = 'opacity: 1'
          v2 = 'opacity: 0.5'
          v3 = 'opacity: 0.5'
        }else if (favoritos.espaco === "médio") {
           v1 = 'opacity: 0.5';
           v2 = 'opacity: 1';
           v3 = 'opacity: 0.5';
        } else if (favoritos.espaco === "grande") {
           v1 = 'opacity: 0.5';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
           v2 = 'opacity: 0.5';
           v3 = 'opacity: 1';
        }

        const div = document.createElement('div');
        div.classList.add('planta');
        div.setAttribute('data-id', favoritos.id);

        div.innerHTML = `
          <div class="areaImg">
            <img draggable="false" class="imgPlanta" src="http://localhost:3002/uploads/${favoritos.imagem}" alt="">
          </div>
          <div class="area">
            <div class="esquerda">
              <h2 class="nome">${nomeCortado}</h2>
              <div class="gotas">
                ${[...Array(5)].map((_, i) => `
                  <img draggable="false" class="gota" src="./icons/Group 23.svg" alt="" data-value="${i + 1}" style="${i < favoritos.agua ? '' : 'opacity: 0.2'}">
                `).join('')}
              </div>
              <img class="estacao" draggable="false" src="./imagens/${favoritos.estacao}.png" alt="">
            </div>
            <div class="direita">
              <h4 class="tempo">${favoritos.tempo}</h4>
              <div id="vasos">
                  <img data-value="pequeno" style='${v1}' draggable="false" class="vaso" id="v1" src="./icons/11065007-vaso-de-flores-vazio-com-desenho-em-aquarela-de-solo-isolado-no-fundo-branco-clipart-de-vaso-de-flores-em-branco-estilo-de-desenho-animado-de-vaso-de-flores-de-plastico-marrom-vaso-de-flores- 2 (1).svg" alt="">
                  <img data-value="médio" style='${v2}' draggable="false" class="vaso" id="v2" src="./icons/11065007-vaso-de-flores-vazio-com-desenho-em-aquarela-de-solo-isolado-no-fundo-branco-clipart-de-vaso-de-flores-em-branco-estilo-de-desenho-animado-de-vaso-de-flores-de-plastico-marrom-vaso-de-flores- 2 (1).svg" alt="">
                  <img data-value="grande" style='${v3}'  draggable="false" class="vaso" id="v3" src="./icons/11065007-vaso-de-flores-vazio-com-desenho-em-aquarela-de-solo-isolado-no-fundo-branco-clipart-de-vaso-de-flores-em-branco-estilo-de-desenho-animado-de-vaso-de-flores-de-plastico-marrom-vaso-de-flores- 2 (1).svg" alt="">
              </div>
            </div>
          </div>
        `;

        div.addEventListener('click', () =>{
         const id = div.getAttribute('data-id');
        window.location.href = `./infoPlanta.html?id=${id}`;
        })

        container.appendChild(div);
      });
    }

  } catch (error) {
    console.log('Erro ao buscar plantas:', error);
  }
});





document.addEventListener('DOMContentLoaded', () => {
  const voltar2 = document.getElementById('voltar2');
  const voltar = document.getElementById('voltar');

  if(voltar2) {
    voltar2.addEventListener('click', () => {
      history.back();
      return false;
    });
  }

  if(voltar) {
    voltar.addEventListener('click', () => {
      window.location.href = './Pagina.html';
    });
  }
});