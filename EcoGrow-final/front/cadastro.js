const cadastro = document.getElementById('cadastrar');

cadastro.addEventListener('click', async () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;



  const response = await fetch('http://localhost:3002/cadastrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  });

  const result = await response.json();
  console.log(result);

  if (result.success) {
    alert("Cadastro bem-sucedido!");
    window.location.href = "Login.html";
  } else if (!nome || !email || !senha) {
     if (!nome || !email || !senha) {
    const mensagem = document.getElementById('mensagem')
    mensagem.style.display = ''
  }else{
     mensagem.style.display = 'none'
  }
  } else if (result.success == false){
    alert("Erro, email já cadastrado!" )
  }
  
});

const visualizar = document.getElementById('visualizar')
const visualizar2 = document.getElementById('visualizar2')

const input = document.getElementById("senha");
const input2 = document.getElementById('verificar')
const imgOlho = document.getElementById('imgOlho')
const imgOlho2 = document.getElementById('imgOlho2')





visualizar.addEventListener('click', ()=>{
     if (input.type === "password") {
        input.type = "text";
        imgOlho.src = "./icons/Invisible.svg"

   } else {
        input.type = "password";
         imgOlho.src = "./icons/Eye.svg"
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


