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

const cadastrarReceita = document.getElementById('cadastrarReceita')
const nomeInput = document.getElementById('nome');
const ingredientesInput = document.getElementById('ingredientes')
const preparoInput = document.getElementById('preparo')
const mensagemDiv = document.getElementById('mensagem');
const id_usuario = localStorage.getItem('id')
const urlParams = new URLSearchParams(window.location.search);
const id_planta = urlParams.get('id');


cadastrarReceita.addEventListener('click', async (event) => {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const ingredientes = ingredientesInput.value.trim();
    const imagemArquivo = inputImagem.files[0];
    const preparo = preparoInput.value.trim();



    if (!nome || !ingredientes || !preparo || !imagemArquivo) {
        mensagemDiv.textContent = 'Preencha todos os campos!';
        mensagemDiv.style.display = 'block';
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('ingredientes', ingredientes);
    formData.append('preparo', preparo);
    formData.append('imagemReceita', imagemArquivo);
    formData.append('id_usuario', id_usuario);

    try {
        const response = await fetch(`http://localhost:3002/cadastrar/receita/${id_planta}`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            mensagemDiv.style.display = 'none';

            sessionStorage.setItem('shouldReload', 'true');

            // Volta para a página anterior
            history.back();

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

    if (voltar2) {
        voltar2.addEventListener('click', () => {
            history.back();
            return false;
        });
    }

    if (voltar) {
        voltar.addEventListener('click', () => {
            window.location.href = './Pagina.html';
        });
    }
});