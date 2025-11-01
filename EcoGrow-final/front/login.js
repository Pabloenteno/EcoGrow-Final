
logar.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const mensagem = document.getElementById('mensagem');
  const mensagem2 = document.getElementById('mensagem2');

  mensagem.style.display = 'none';
  mensagem2.style.display = 'none';

  
  if (!email || !senha) {
    mensagem.style.display = ''; 
    return; 
  }

  try {
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem("tipo", result.tipo);
      localStorage.setItem("id", result.id);
      localStorage.setItem("nome", result.nome);
      localStorage.setItem("email", result.email);

      alert("Login bem-sucedido!");
      window.location.href = "Pagina.html";
    } else {
      mensagem.style.display = 'none'; 
      mensagem2.style.display = '';     
    }

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    mensagem2.style.display = '';
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


