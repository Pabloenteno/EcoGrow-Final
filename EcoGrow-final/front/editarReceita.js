
const nome = document.getElementById('nome');
const ingredientes = document.getElementById('ingredientes');
const preparo = document.getElementById('preparo');



document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id_receita = urlParams.get('id');

        if (!id_receita) {
            alert('ID da receita não encontrado na URL.');
            return;
        }

        const urlApi = `http://localhost:3002/listar/receita/${id_receita}`;

        const response = await fetch(urlApi, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (result.success) {
            console.log('Dados completos da receita:', result.receita);

            nome.value = result.receita.nome;
            ingredientes.value = result.receita.ingredientes;
            preparo.value = result.receita.preparo;
        } else {
            alert('Erro: ' + (result.message || 'Erro desconhecido ao carregar receita.'));
        }

    } catch (error) {
        console.error('Erro ao carregar receita:', error);
        alert('Erro de conexão com o servidor');
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


const salvarEdit = document.getElementById('salvarEdit')
salvarEdit.addEventListener('click', async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id_receita = urlParams.get('id');

    if (!id_receita) {
        alert('ID da receita não encontrado.');
        return;
    }

    const urlEdit = `http://localhost:3002/editar/receita/${id_receita}`;

    const dados = {
        nome: nome.value.trim(),
        ingredientes: ingredientes.value.trim(),
        preparo: preparo.value.trim(),
    };

    // Validação simples antes do envio
    if (!dados.nome || !dados.ingredientes || !dados.preparo) {
        alert('Preencha todos os campos antes de salvar.');
        return;
    }

    try {
        const response = await fetch(urlEdit, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (result.success) {
            alert('Receita editada com sucesso!');

            sessionStorage.setItem('shouldReload', 'true');
            history.back();
        } else {
            alert('Erro: ' + (result.message || 'Erro desconhecido ao editar receita.'));
        }

    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro de conexão com o servidor.');
    }
});
