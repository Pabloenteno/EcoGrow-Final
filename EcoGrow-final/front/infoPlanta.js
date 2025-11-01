
window.addEventListener('pageshow', () => {
    if (sessionStorage.getItem('reload') === 'true') {
        sessionStorage.removeItem('reload');
        setTimeout(() => {
            location.reload();
        }, 200);
    }
});


document.addEventListener('DOMContentLoaded', function () {


    if (sessionStorage.getItem('shouldReload') === 'true') {
        sessionStorage.removeItem('shouldReload');

        sessionStorage.setItem('shouldScroll', 'true');


        setTimeout(() => {
            location.reload(true);
        }, 90);
    }
});




window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const id_usuario = localStorage.getItem('id');
    const id_planta = id;


    const favoritarElement = document.getElementById('favoritos');
    const plantarElement = document.getElementById('progresso');

    if (!id) {
        alert('ID da planta não encontrado na URL.');
        return;
    }

    try {


        const response = await fetch(`http://localhost:3002/info/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();
        const planta = result.planta;


        if (id_usuario !== null) {

            favoritarElement.style.display = 'block'
            plantarElement.style.display = 'block'


            const responseFav = await fetch(`http://localhost:3002/info/favorito`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario })
            });


            const responsePlant = await fetch(`http://localhost:3002/info/plantar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario })
            });


            const resultFav = await responseFav.json();
            const resultPlant = await responsePlant.json();


            const favoritos = resultFav.favoritos;
            const plantando = resultPlant.plantando;
            const favorito = favoritos.find(fav => fav.id === planta.id);
            const plantado = plantando.find(plant => plant.id === planta.id);

            // --- Handlers de Favoritar ---

            async function handleDesfavoritar() {
                try {
                    const deleteResponse = await fetch('http://localhost:3002/desfavoritar', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_usuario, id_planta })
                    });

                    if (deleteResponse.ok) {
                        console.log('Desfavoritado com sucesso! Trocando para Favoritar.');

                        favoritarElement.setAttribute('src', './icons/favorito.svg');

                        // Troca de listener
                        favoritarElement.removeEventListener('click', handleDesfavoritar);
                        favoritarElement.addEventListener('click', handleFavoritar);
                    } else {
                        alert("Erro ao desfavoritar. Tente novamente.");
                    }
                } catch (error) {
                    console.error('Erro na requisição DELETE (Desfavoritar):', error);
                }
            }

            async function handleFavoritar() {
                try {
                    const postResponse = await fetch('http://localhost:3002/favoritar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_planta, id_usuario })
                    });

                    const postResult = await postResponse.json();

                    if (postResult.success) {
                        console.log('Favoritado com sucesso! Trocando para Desfavoritar.');

                        favoritarElement.setAttribute('src', './icons/favoritarAtivo.svg'); // Ícone favorito ativo

                        // Troca de listener
                        favoritarElement.removeEventListener('click', handleFavoritar);
                        favoritarElement.addEventListener('click', handleDesfavoritar);
                    } else {
                        alert("Erro ao favoritar.");
                    }
                } catch (error) {
                    console.error('Erro na requisição POST (Favoritar):', error);
                }
            }
            // --- Handlers de Plantar (Progresso) ---

            async function handleDesplantar() {
                try {
                    // A URL deve ser ajustada para a rota de remoção de progresso
                    const deleteResponse = await fetch('http://localhost:3002/cancelarPlantio', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_usuario, id_planta })
                    });

                    if (deleteResponse.ok) { // Verifica se a resposta foi HTTP 200-299
                        console.log('Cancelado o plantio com sucesso! Trocando para Plantar.');

                        plantarElement.setAttribute('src', './icons/tempo.svg'); // Ícone não plantado/tempo

                        // Troca de listener
                        plantarElement.removeEventListener('click', handleDesplantar);
                        plantarElement.addEventListener('click', handlePlantar);
                    } else {
                        alert("Erro ao deixar de plantar.");
                    }
                } catch (error) {
                    console.error('Erro na requisição DELETE (Desplantar):', error);
                }
            }

            async function handlePlantar() {
                try {
                    // A URL deve ser ajustada para a rota de adição de progresso
                    const postResponse = await fetch('http://localhost:3002/plantar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_planta, id_usuario })
                    });

                    const postResult = await postResponse.json();

                    if (postResult.success) { // Verifica se a API retornou sucesso: true
                        console.log('Você esta plantando com sucesso! Trocando para Desplantar.');

                        plantarElement.setAttribute('src', './icons/plantando.svg'); // Ícone plantando/ativo

                        // Troca de listener
                        plantarElement.removeEventListener('click', handlePlantar);
                        plantarElement.addEventListener('click', handleDesplantar);
                    } else {
                        alert("Erro ao plantar.");
                    }
                } catch (error) {
                    console.error('Erro na requisição POST (Plantar):', error);
                }
            }


            // --- Inicialização dos Event Listeners ---

            // Favoritos
            if (favorito) {
                console.log('Essa planta está nos favoritos! Inicializando Desfavoritar.');
                favoritarElement.setAttribute('src', './icons/favoritarAtivo.svg');
                favoritarElement.addEventListener('click', handleDesfavoritar);
            } else {
                console.log('Não está nos favoritos! Inicializando Favoritar.');
                favoritarElement.setAttribute('src', './icons/favorito.svg');
                favoritarElement.addEventListener('click', handleFavoritar);
            }

            // Plantio (Progresso)
            if (plantado) {
                console.log('Essa planta está em plantio/progresso! Inicializando Desplantar.');
                plantarElement.setAttribute('src', './icons/plantando.svg');
                plantarElement.addEventListener('click', handleDesplantar);
            } else {
                console.log('Não está em plantio/progresso! Inicializando Plantar.');
                plantarElement.setAttribute('src', './icons/tempo.svg');
                plantarElement.addEventListener('click', handlePlantar);
            }

        } else {
            favoritarElement.style.display = 'none'
            plantarElement.style.display = 'none'


        }



        // --- Exibição de Dados da Planta ---

        const tempo = document.getElementById('tempo')
        tempo.textContent = `${planta.tempo}`

        const nome = document.getElementById('nome')
        nome.textContent = `${planta.nome}`

        const imagem = document.getElementById('imagem')
        imagem.src = `http://localhost:3002/uploads/${planta.imagem}`

        // Lógica de Água
        const g2 = document.getElementById('g2')
        const g3 = document.getElementById('g3')
        const g4 = document.getElementById('g4')
        const g5 = document.getElementById('g5')
        const qntAgua = document.getElementById('qntAgua')

        const agua = planta.agua
        if (agua === '1') {
            g2.style.opacity = '0.3'
            g3.style.opacity = '0.3'
            g4.style.opacity = '0.3'
            g5.style.opacity = '0.3'
            qntAgua.textContent = '0-50 ml'
        } else if (agua === '2') {
            g3.style.opacity = '0.3'
            g4.style.opacity = '0.3'
            g5.style.opacity = '0.3'
            qntAgua.textContent = '50-100 ml'
        } else if (agua === '3') {
            g4.style.opacity = '0.3'
            g5.style.opacity = '0.3'
            qntAgua.textContent = '100-300 ml'
        } else if (agua === '4') {
            g5.style.opacity = '0.3'
            qntAgua.textContent = '300-700 ml'
        }

        // Lógica de Espaço/Tamanho
        const v1 = document.getElementById('v1')
        const v2 = document.getElementById('v2')
        const v3 = document.getElementById('v3')
        const tamanho = document.getElementById('tamanho')

        const espaco = planta.espaco

        if (espaco === 'pequeno') {
            v1.style.opacity = '1'
            v2.style.opacity = '0.5'
            v3.style.opacity = '0.5'
            tamanho.textContent = 'Planta de pequeno porte'
        } else if (espaco === 'médio') {
            v1.style.opacity = '0.5'
            v2.style.opacity = '1'
            v3.style.opacity = '0.5'
            tamanho.textContent = 'Planta de porte médio'
        } else if (espaco === 'grande') {
            v1.style.opacity = '0.5'
            v2.style.opacity = '0.5'
            v3.style.opacity = '1'
            tamanho.textContent = 'Planta de grande porte'
        }

        // Lógica de Estação
        const escritaEstacao = document.getElementById('escritaEstacao')
        const estacao = planta.estacao
        const imgEstacao = document.getElementById('imgEstacao')


        if (estacao === 'verão') {
            imgEstacao.src = './imagens/verão.png'
            escritaEstacao.textContent = 'Verão'
        } else if (estacao === 'outono') {
            imgEstacao.src = './imagens/outono.png'
            escritaEstacao.textContent = 'Outono'
        } else if (estacao === 'inverno') {
            imgEstacao.src = './imagens/inverno.png'
            escritaEstacao.textContent = 'Inverno'
        } else if (estacao === 'Primavera') {
            imgEstacao.src = './imagens/primavera.png'
            escritaEstacao.textContent = 'Primavera'
        }


    } catch (error) {
        console.error('Erro na requisição principal:', error);
        alert('Ocorreu um erro ao carregar os dados da planta. Verifique o servidor (localhost:3002).');
    }


});

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id_planta = urlParams.get('id');
    const elementoConteudo = document.getElementById('informacoes');

    if (!id_planta) {
        elementoConteudo.textContent = "Erro: ID da planta não fornecido na URL.";
        return;
    }

    const apiUrl = `http://localhost:3002/getConteudo/${id_planta}`;

    try {
        const response = await fetch(apiUrl);
        const tipo = localStorage.getItem("tipo");
        const adicionarAdm = document.getElementById("adm");
        const textoAdm = document.getElementById("textoAdm");
        const editInfo = document.getElementById('editButton');
        const conteudoEditado = document.getElementById('conteudoEditado');
        const informacoes = document.getElementById('informacoes');

        console.log('Tipo do usuário:', tipo);

        // Primeiro: esconder tudo por padrão
        adicionarAdm.style.display = 'none';
        textoAdm.style.display = 'none';
        editInfo.style.display = 'none';
        informacoes.style.display = 'none';
        conteudoEditado.style.display = 'none';

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success && result.conteudo) {
            // CASO 1: Existe conteúdo na planta
            elementoConteudo.textContent = result.conteudo;
            conteudoEditado.value = result.conteudo;
            informacoes.style.display = 'block'; // Mostra as informações

            if (tipo === 'adm') {
                // Usuário ADM com conteúdo: mostra apenas botão editar
                editInfo.style.display = 'block';
                conteudoEditado.style.display = 'block'; // ou o display que você usa
            }
            // Usuário não-ADM: só mostra as informações (já está display block)

        } else {
            // CASO 2: Não existe conteúdo na planta
            if (tipo === 'adm') {
                // Usuário ADM sem conteúdo: mostra botão adicionar e texto
                adicionarAdm.style.display = 'flex';
                textoAdm.style.display = 'flex';
            }
            // Usuário não-ADM sem conteúdo: não mostra nada
        }

    } catch (error) {
        console.error('Erro ao carregar informações:', error);
        elementoConteudo.textContent = "Erro ao carregar informações da planta.";
        
        // Em caso de erro, verifica se é ADM para mostrar opção de adicionar
        const tipo = localStorage.getItem("tipo");
         const adicionarAdm = document.getElementById("adm");
        const textoAdm = document.getElementById("textoAdm");
        if (tipo === 'adm') {
            adicionarAdm.style.display = 'flex';
            textoAdm.style.display = 'flex';
        }
    }
});


const toggleModal = () => {
  document.body.classList.toggle("openAdd");
};

const toggleModalEdit = () => {
  document.body.classList.toggle("openEdit");
};

const adicionar = document.getElementById('adicionar')

adicionar.addEventListener('click', async () => {
    const conteudo = document.getElementById('conteudo').value
    const urlParams = new URLSearchParams(window.location.search);
    const id_planta = urlParams.get('id');

    const response = await fetch('http://localhost:3002/addInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_planta, conteudo })
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
        alert("informações salvas!");
        location.reload();


    } else {
        alert("Erro ao adicionar informações.");
    }
})

const EditarConteudo = document.getElementById('EditarConteudo')

EditarConteudo.addEventListener('click', async () => {

    const conteudoEditado = document.getElementById('conteudoEditado').value


    const urlParams = new URLSearchParams(window.location.search);
    const id_planta = urlParams.get('id');

    const response = await fetch(`http://localhost:3002/updateConteudo/${id_planta}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            conteudoEditado: conteudoEditado
        })
    });

    const result = await response.json();
    console.log(result);


    if (response.ok && result.success) {
        alert("Informações editadas com sucesso!");
        location.reload();
    } else {
        alert(`Erro ao editar informações: ${result.message || response.statusText}`);
    }
});



const editar = document.getElementById('editar')

editar.addEventListener('click', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const plantaId = urlParams.get('id');


    window.location.href = `./editarPlanta.html?id=${plantaId}`;


});

const addReceita = document.getElementById('addReceita')

addReceita.addEventListener('click', () => {
    sessionStorage.setItem('previousPage', window.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    window.location.href = `./addReceita.html?id=${id}`;
});

// receitas
window.addEventListener('DOMContentLoaded', async () => {



    function cortarTexto(texto, limite = 25) {
        if (texto && texto.length > limite) {
            return texto.slice(0, limite) + '...';
        }
        return texto;
    }


    function exibirReceitas(receitas) {

        const listaContainer = document.getElementById('lista-receitas-container');

        // CORREÇÃO: Não limpar tudo! Remover apenas os itens de receita
        const itensReceitas = listaContainer.querySelectorAll('.item-receita');
        itensReceitas.forEach(item => item.remove());

        if (!receitas || receitas.length === 0) {
            // CORREÇÃO: Adicionar mensagem sem remover o addReceita
            const mensagemDiv = document.createElement('h2');
            mensagemDiv.textContent = ' Nenhuma Receita encontrada'
            mensagemDiv.style.color = 'red'
            mensagemDiv.style.height = '30vh'
            mensagemDiv.style.paddingTop = '2vh'
            mensagemDiv.style.width = '20vw'
            mensagemDiv.style.fontWeight = '600'
            mensagemDiv.style.gridColumn = '0';
            mensagemDiv.style.textAlign = 'center';
            listaContainer.appendChild(mensagemDiv);
            return;
        } else {
            // Configura o display para a lista
            listaContainer.style.display = 'grid';
            listaContainer.style.paddingLeft = '0';
        }

        // Itera sobre as receitas e cria as divs
        receitas.forEach(receita => {
            const nomeCortado = cortarTexto(receita.nome, 25);

            const div = document.createElement('div');
            div.classList.add('item-receita');
            div.setAttribute('data-id', receita.id);

            // Constrói o HTML usando o template
            div.innerHTML = `
                <div class="areaReceita">
                    <img id="imgReceita" draggable="false"  src="http://localhost:3002/uploads/${receita.imagem}" alt="${receita.nome}">
                    <h3 id="nomeReceita">${nomeCortado}</h3>
                </div>
            `;

            // Adiciona evento de click para navegação
            div.addEventListener('click', () => {

                window.location.href = `./infoReceita.html?id=${receita.id_receita}`;

            });

            listaContainer.appendChild(div);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idPlanta = urlParams.get('id');

    if (!idPlanta) {
        console.error('ID da planta não encontrado na URL.');
        const listaContainer = document.getElementById('lista-receitas-container');
        if (listaContainer) {
            // CORREÇÃO: Não limpar tudo, apenas adicionar mensagem
            const mensagemDiv = document.createElement('div');
            mensagemDiv.innerHTML = '<h1 style="color:red; grid-column: 1 / -1; text-align: center;">Parâmetro de ID da planta ausente.</h1>';
            mensagemDiv.style.gridColumn = '1 / -1';
            mensagemDiv.style.textAlign = 'center';
            listaContainer.appendChild(mensagemDiv);
        }
        return;
    }

    try {

        const urlApi = `http://localhost:3002/listar/receitas/${idPlanta}`;

        const response = await fetch(urlApi, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} ao buscar receitas.`);
        }

        const result = await response.json();

        if (result.success) {

            const addReceita = document.getElementById('addReceita')
            const usuario = localStorage.getItem('id')

            if (!usuario) {
                addReceita.style.display = 'none'
            } else {
                addReceita.style.display = 'flex'
            }


            const listaReceitas = result.receitas;
            exibirReceitas(listaReceitas);
        } else {
            console.error('Falha na API:', result.message);
            const listaContainer = document.getElementById('lista-receitas-container');
            if (listaContainer) {
                const mensagemDiv = document.createElement('div');
                mensagemDiv.innerHTML = `<h1 style="color:red; grid-column: 1 / -1; text-align: center;">Erro da API: ${result.message}</h1>`;
                mensagemDiv.style.gridColumn = '1 / -1';
                mensagemDiv.style.textAlign = 'center';
                listaContainer.appendChild(mensagemDiv);
            }
        }

    } catch (error) {
        console.error('Erro fatal ao buscar receitas:', error);
        const listaContainer = document.getElementById('lista-receitas-container');
        if (listaContainer) {
            const mensagemDiv = document.createElement('div');
            mensagemDiv.innerHTML = '<h1 style="color:red; grid-column: 1 / -1; text-align: center;">Erro de conexão com o servidor.</h1>';
            mensagemDiv.style.gridColumn = '1 / -1';
            mensagemDiv.style.textAlign = 'center';
            listaContainer.appendChild(mensagemDiv);
        }
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

    const tipo = localStorage.getItem("tipo");
    const adicionarAdm = document.getElementById("adm");
    const textoAdm = document.getElementById("textoAdm")


    if (tipo === "adm") {
        adicionarAdm.style.display = 'block';
        textoAdm.style.display = 'block'
        editar.style.display = 'block'

    } else {
        adicionarAdm.style.display = 'none';
        textoAdm.style.display = 'none'
        editar.style.display = 'none'
    }

});