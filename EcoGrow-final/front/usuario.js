

const nome = localStorage.getItem("nome");
document.getElementById("nome").textContent = `Usuario: ${nome}`;

const email = localStorage.getItem("email");
document.getElementById("email").textContent = `Email: ${email}`;

const sair = document.getElementById('sair');
const editar = document.getElementById("editar")

editar.addEventListener('click', () => {
    window.location.href = './editar.html'
})

sair.addEventListener('click', async () =>{
    if(confirm("Deseja mesmo Sair?")){
    localStorage.removeItem('nome')
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    localStorage.removeItem('tipo')

    window.location = './Pagina.html'
    }
  
})


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



