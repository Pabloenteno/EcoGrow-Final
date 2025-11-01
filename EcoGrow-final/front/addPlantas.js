// Seleção das estações
const verao = document.getElementById('verao');
const outono = document.getElementById('outono');
const inverno = document.getElementById('inverno');
const primavera = document.getElementById('primavera');
const estacaoInput = document.getElementById('estacaoInput');

const atualizarEstacao = (estacaoSelecionada) => {
    [verao, outono, inverno, primavera].forEach(el => {
        el.style.background = '';
        el.style.color = '';
        el.style.borderColor = '';
    });

    switch (estacaoSelecionada) {
        case "verão":
            verao.style.background = 'radial-gradient(circle, rgb(255, 174, 75) 5%, rgba(241, 202, 31, 1) 70%)';
            verao.style.color = '#ffffff';
            break;
        case "outono":
            outono.style.background = 'radial-gradient(circle, rgb(95, 52, 0) 5%, rgb(168, 110, 2) 70%)';
            outono.style.color = '#ffffff';
            break;
        case "inverno":
            inverno.style.background = 'radial-gradient(circle, rgba(7, 72, 176, 1) 5%, rgb(7, 152, 255) 70%)';
            inverno.style.color = '#ffffff';
            break;
        case "primavera":
            primavera.style.background = 'radial-gradient(circle, rgb(13, 55, 0) 5%, rgb(6, 107, 13) 70%)';
            primavera.style.color = '#ffffff';
            break;
    }

    estacaoInput.value = estacaoSelecionada;
};

verao.addEventListener('click', () => atualizarEstacao("verão"));
outono.addEventListener('click', () => atualizarEstacao("outono"));
inverno.addEventListener('click', () => atualizarEstacao("inverno"));
primavera.addEventListener('click', () => atualizarEstacao("primavera"));

// Seleção das gotas (quantidade de água)
const g1 = document.getElementById('g1');
const g2 = document.getElementById('g2');
const g3 = document.getElementById('g3');
const g4 = document.getElementById('g4');
const g5 = document.getElementById('g5');
const gotasInput = document.getElementById('gotasInput');

g1.addEventListener('click', () => {
    g1.style.opacity = '1';
    g2.style.opacity = '';
    g3.style.opacity = '';
    g4.style.opacity = '';
    g5.style.opacity = '';
    gotasInput.value = '1';
});
g2.addEventListener('click', () => {
    g1.style.opacity = '1';
    g2.style.opacity = '1';
    g3.style.opacity = '';
    g4.style.opacity = '';
    g5.style.opacity = '';
    gotasInput.value = '2';
});
g3.addEventListener('click', () => {
    g1.style.opacity = '1';
    g2.style.opacity = '1';
    g3.style.opacity = '1';
    g4.style.opacity = '';
    g5.style.opacity = '';
    gotasInput.value = '3';
});
g4.addEventListener('click', () => {
    g1.style.opacity = '1';
    g2.style.opacity = '1';
    g3.style.opacity = '1';
    g4.style.opacity = '1';
    g5.style.opacity = '';
    gotasInput.value = '4';
});
g5.addEventListener('click', () => {
    g1.style.opacity = '1';
    g2.style.opacity = '1';
    g3.style.opacity = '1';
    g4.style.opacity = '1';
    g5.style.opacity = '1';
    gotasInput.value = '5';
});

// Seleção dos vasos (espaço)
const v1 = document.getElementById('v1');
const v2 = document.getElementById('v2');
const v3 = document.getElementById('v3');
const valorInput = document.getElementById('valorSelecionadoInput');

v1.addEventListener('click', () => {
    v1.style.opacity = '1';
    v2.style.opacity = '';
    v3.style.opacity = '';
    valorInput.value = 'pequeno';
});
v2.addEventListener('click', () => {
    v1.style.opacity = '';
    v2.style.opacity = '1';
    v3.style.opacity = '';
    valorInput.value = 'médio';
});
v3.addEventListener('click', () => {
    v1.style.opacity = '';
    v2.style.opacity = '';
    v3.style.opacity = '1';
    valorInput.value = 'grande';
});

// Upload da imagem
const inputImagem = document.getElementById('inputImagem');
const imagemPreview = document.getElementById('imagemPreview');
const addImagem = document.getElementById('addImagem');
const removerImg = document.getElementById('removerImg');

addImagem.addEventListener('click', () => inputImagem.click());

inputImagem.addEventListener('change', (event) => {
    const arquivo = event.target.files[0];
    if (arquivo) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagemPreview.src = e.target.result;
            imagemPreview.style.display = 'block';
            addImagem.style.display = 'none';
            removerImg.style.display = 'block';
        };
        reader.readAsDataURL(arquivo);
    } else {
        imagemPreview.src = '#';
        imagemPreview.style.display = 'none';
        addImagem.style.display = '';
    }
});

removerImg.addEventListener('click', () => {
    imagemPreview.src = '#';
    imagemPreview.style.display = 'none';
    addImagem.style.display = '';
    removerImg.style.display = 'none';
    inputImagem.value = '';
});

// Envio do formulário
const nomeInput = document.getElementById('nome');
const tempoInput = document.getElementById('tempo');
const cadastrarButton = document.getElementById('cadastrar');
const mensagemDiv = document.getElementById('mensagem');

cadastrarButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const tempo = tempoInput.value.trim();
    const imagemArquivo = inputImagem.files[0];
    const agua = gotasInput.value;
    const espaco = valorInput.value;
    const estacao = estacaoInput.value;

    if (!nome || !tempo || !agua || !espaco || !estacao || !imagemArquivo) {
        mensagemDiv.textContent = 'Preencha todos os campos!';
        mensagemDiv.style.display = 'block';
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('estacao', estacao);
    formData.append('tempo', tempo);
    formData.append('agua', agua);
    formData.append('espaco', espaco);
    formData.append('imagemPlanta', imagemArquivo);

    try {
        const response = await fetch('http://localhost:3002/cadastrar/planta', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            mensagemDiv.style.display = 'none';
            alert('Planta cadastrada com sucesso!');
            window.location.href = './Pagina.html'
        } else {
            mensagemDiv.textContent = `Erro: ${result.message || response.statusText}`;
            mensagemDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro de rede ou JSON inválido:', error);
        mensagemDiv.textContent = 'Erro de conexão ou resposta inválida do servidor.';
        mensagemDiv.style.display = 'block';
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


