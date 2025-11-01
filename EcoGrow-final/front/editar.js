const nomeInput = document.getElementById('nome'); 
const senha = document.getElementById('senha');
const verificar = document.getElementById('verificar');
const mensagem = document.getElementById('mensagem');
const mensagem2 = document.getElementById('mensagem2');
const editar = document.getElementById('editar');
const id = localStorage.getItem('id');

editar.addEventListener('click', async () => {
  const nome = nomeInput.value
  const senhaVal = senha.value
  const verificarVal = verificar.value
  
  if (!nome || !senhaVal || !verificarVal) {
    mensagem2.style.display = 'block';
    mensagem.style.display = 'none';
    return;
  } else {
    mensagem2.style.display = 'none';
  }

  
  if (senhaVal !== verificarVal) {
    mensagem.style.display = 'block';
    return;
  } else {
    mensagem.style.display = 'none';
  }

  try {
    const response = await fetch(`http://localhost:3002/editar/${id}`, {
    method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ nome, senha: senhaVal })
    });


    const result = await response.json();
    console.log(result);

    if (result.success) {
      alert('Usuário editado com sucesso!');
      localStorage.setItem("nome", result.nome);
      localStorage.setItem("senha", result.senha);

      window.location.href = "./Usuario.html";
    } else {
      alert('Erro ao editar: ' + result.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao se conectar com o servidor.');
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
visualizar2.addEventListener('click', ()=>{
     if (input2.type === "password") {
        input2.type = "text";
        imgOlho2.src = "./icons/Invisible.svg"

   } else {
        input2.type = "password";
         imgOlho2.src = "./icons/Eye.svg"
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



