document.addEventListener('DOMContentLoaded', function () {


    if (sessionStorage.getItem('shouldReload') === 'true') {
        sessionStorage.removeItem('shouldReload');

        sessionStorage.setItem('shouldScroll', 'true');


        setTimeout(() => {
            location.reload(true);
        }, 90);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id_receita = urlParams.get('id');
        const nome = document.getElementById('nome')
        const ingredientes = document.getElementById('ingredientes')
        const preparo = document.getElementById('preparo')
        const img = document.getElementById('img')
        const editReceita = document.getElementById('editReceita')
        const lixo = document.getElementById('lixo')

        const urlApi = `http://localhost:3002/listar/receita/${id_receita}`;

        const response = await fetch(urlApi, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (result.success) {
            console.log('Dados completos da receita:', result.receita);

          
            const ingredientesFormatados = result.receita.ingredientes.replace(/\n/g, '<br>');
            const preparoFormatado = result.receita.preparo.replace(/\n/g, '<br>');


            nome.textContent = `${result.receita.nome}`
            ingredientes.innerHTML = ingredientesFormatados;
            preparo.innerHTML = preparoFormatado; 
            
            img.src = `http://localhost:3002/uploads/${result.receita.imagem}`

            const usuario = localStorage.getItem('id')
            const tipo = localStorage.getItem('tipo')

            if(usuario == result.receita.id_usuario || tipo === 'adm'){
                editReceita.style.display = 'block'
                lixo.style.display = 'block'
            }else{
                editReceita.style.display = 'none'
                lixo.style.display = 'none'
            }
                
        } else {
            alert('Erro: ' + (result.message || 'Erro desconhecido'));
        }
            
        
    } catch (error) {
        console.error('Erro ao carregar receita:', error);
        alert('Erro de conexão com o servidor');
    }
});

const editReceita = document.getElementById('editReceita')
editReceita.addEventListener('click', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id_receita = urlParams.get('id');

    window.location.href = `./editarReceita.html?id=${id_receita}`;
})

const lixo = document.getElementById('lixo');
lixo.addEventListener('click', async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id_receita = urlParams.get('id');

    
    if (!id_receita) {
        alert('ID da receita não encontrado!');
        return;
    }

    
    const confirmacao = confirm('Tem certeza que deseja excluir esta receita?');
    if (!confirmacao) return;

    try {
        const deleteResponse = await fetch('http://localhost:3002/excluirReceita', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_receita })
        });

        if (deleteResponse.ok) {
         
            sessionStorage.setItem('shouldReload', 'true');
            history.back();
            
        } else {
            const errorData = await deleteResponse.json();
            alert(`Erro ao excluir: ${errorData.message || 'Tente novamente.'}`);
        }
    } catch (error) {
        console.error('Erro na requisição DELETE:', error);
        alert('Erro de conexão. Tente novamente.');
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