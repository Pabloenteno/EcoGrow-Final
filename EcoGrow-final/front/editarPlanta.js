window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');



    try {

        const response = await fetch(`http://localhost:3002/info/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();
        const planta = result.planta;

        const tempo = document.getElementById('tempo')
        tempo.textContent = `${planta.tempo}`

        const nome = document.getElementById('nome')
        nome.textContent = `${planta.nome}`




        const g2 = document.getElementById('Gg2')
        const g3 = document.getElementById('Gg3')
        const g4 = document.getElementById('Gg4')
        const g5 = document.getElementById('Gg5')


        const agua = planta.agua
        if (agua === '1') {
            g2.style.opacity = '0.3'
            g3.style.opacity = '0.3'
            g4.style.opacity = '0.3'
            g5.style.opacity = '0.3'

        } else if (agua === '2') {
            g3.style.opacity = '0.3'
            g4.style.opacity = '0.3'
            g5.style.opacity = '0.3'

        } else if (agua === '3') {
            g4.style.opacity = '0.3'
            g5.style.opacity = '0.3'

        } else if (agua === '4') {
            g5.style.opacity = '0.3'

        }

        // Lógica de Espaço/Tamanho
        const v1 = document.getElementById('Vv1')
        const v2 = document.getElementById('Vv2')
        const v3 = document.getElementById('Vv3')

        const espaco = planta.espaco

        if (espaco === 'pequeno') {
            v1.style.opacity = '1'
            v2.style.opacity = '0.5'
            v3.style.opacity = '0.5'

        } else if (espaco === 'médio') {
            v1.style.opacity = '0.5'
            v2.style.opacity = '1'
            v3.style.opacity = '0.5'

        } else if (espaco === 'grande') {
            v1.style.opacity = '0.5'
            v2.style.opacity = '0.5'
            v3.style.opacity = '1'

        }

        // Lógica de Estação
        const estacao = planta.estacao
        const imgEstacao = document.getElementById('imgEstacao')


        if (estacao === 'verão') {
            imgEstacao.src = './imagens/verão.png'

        } else if (estacao === 'outono') {
            imgEstacao.src = './imagens/outono.png'

        } else if (estacao === 'inverno') {
            imgEstacao.src = './imagens/inverno.png'

        } else if (estacao === 'Primavera') {
            imgEstacao.src = './imagens/primavera.png'

        }


    } catch (error) {
        console.error('Erro na requisição principal:', error);
        alert('Ocorreu um erro ao carregar os dados da planta. Verifique o servidor (localhost:3002).');
    }

});




const excluir = document.getElementById('excluir')

excluir.addEventListener('click', async () => {
    if (confirm("Deseja mesmo Excluir essa planta?")) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.log("ID recebido para exclusão:", id);
        try {

            const deleteResponse = await fetch('http://localhost:3002/excluirPlanta', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (deleteResponse.ok) {
                alert("Planta excluida com sucesso!");
                window.location.href = './Pagina.html'


            } else {
                alert("Erro ao excluir planta.");
            }
        } catch (error) {
            console.error('Erro na requisição DELETE:', error);
        }

    }
})






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




const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const enviar = document.getElementById('enviar');

enviar.addEventListener('click', async () => {


    const nome = document.getElementById('nomeNovo').value;
    const estacao = document.getElementById('estacaoInput').value;
    const agua = document.getElementById('gotasInput').value;
    const espaco = document.getElementById('valorSelecionadoInput').value;
    const tempo = document.getElementById('inputTempo').value;
    const mensagem = document.getElementById('mensagem')

    if (!id) {
        alert('Erro: ID da planta não encontrado na URL.');
        return;
    }


    if (nome === '' || estacao === '' || agua === '' || espaco === '' || tempo === '') {
        mensagem.style.display = 'block'
    } else {
        mensagem.style.display = 'none'
    }


    try {
        const response = await fetch(`http://localhost:3002/editar/planta/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, estacao, agua, espaco, tempo })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            alert('Planta editada com sucesso!');
            // sessionStorage.setItem('reload', 'true');
            // history.go(-1)

            setTimeout(() => {
                sessionStorage.setItem('reload', 'true');
                history.back();
            }, 300);



        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao se conectar com o servidor.');
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