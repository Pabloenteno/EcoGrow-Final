const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Configuração de Armazenamento: Onde e como os arquivos serão salvos.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório onde os arquivos serão armazenados.
    // É importante que essa pasta já exista!
    // Crie-a na raiz do seu projeto: `mkdir uploads`
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo no servidor.
    // Aqui, estamos usando o nome original do arquivo + um timestamp único + a extensão original.
    // Isso ajuda a evitar conflitos de nomes se vários usuários fizerem upload de arquivos com o mesmo nome.
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Inicialize o Multer com a configuração de armazenamento.
// 'upload' agora é um middleware que você usará nas suas rotas.
const upload = multer({ storage: storage });

const port = 3002;

app.post('/cadastrar', (req, res) => {
  const { nome, senha, email } = req.body;

  const query = 'INSERT INTO usuario (nome, senha, email, tipo) VALUES (?, ?, ?, ?)';
  const values = [nome, senha, email.trim().toLowerCase(), 'usuario'];

  connection.query(query, values, (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ success: false, message: 'E-mail já cadastrado.' });
      }

      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }

    res.json({ success: true, message: 'Usuário cadastrado com sucesso!' });
  });
});




app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';

  connection.query(query, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }

    if (results.length > 0) {
      const usuario = results[0];
      res.json({
        success: true,
        message: 'Login bem-sucedido!',
        tipo: usuario.tipo,
        nome: usuario.nome,
        email: usuario.email,
        id: usuario.id
      });
    } else {
      res.json({ success: false, message: 'Usuário ou senha incorretos!' });
    }
  });
});

app.get('/usuario', (req, res) => {
  const id = localStorage.getItem("id");

  const query = 'SELECT * FROM usuario WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }

    if (results.length > 0) {
      const usuario = results[0];
      res.json({
        success: true,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo,

        }
      });
    }
  });
});

app.post('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nome, senha } = req.body;

  if (!id || !nome || !senha) {
    return res.status(400).json({ success: false, message: 'Dados incompletos.' });
  }

  const query = 'UPDATE usuario SET nome = ?, senha = ? WHERE id = ?';

  connection.query(query, [nome, senha, id], (err, results) => {
    if (err) {
      console.error('Erro ao editar usuário:', err);
      return res.status(500).json({ success: false, message: 'Erro ao editar usuário.' });
    }

    res.json({
      success: true,
      message: 'Usuário editado com sucesso!',
      nome,
      senha
    });
  });
});


const fs = require('fs');

app.post('/cadastrar/planta', upload.single('imagemPlanta'), (req, res) => {
  const { nome, estacao, agua, espaco, tempo } = req.body;

  if (!req.file) {
    console.log('Nenhum arquivo enviado.');
    return res.status(400).json({ success: false, message: 'Imagem da planta é obrigatória.' });
  }

  const imagem = req.file.filename;

  const query = 'INSERT INTO plantas (imagem, nome, estacao, agua, espaco, tempo) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [imagem, nome, estacao, agua, espaco, tempo];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar planta no banco:', err);

      const filePath = path.join(__dirname, 'uploads', imagem);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Erro ao remover imagem após falha:', unlinkErr);
      });

      return res.status(500).json({ success: false, message: 'Erro ao cadastrar planta no banco de dados.' });
    }

    return res.json({
      success: true,
      message: 'Planta cadastrada com sucesso!',
      dadosPlanta: {
        nome,
        estacao,
        agua,
        espaco,
        tempo,
        nomeImagem: imagem
      }
    });
  });
});

app.get('/listar', (req, res) => {
  const query = 'SELECT * FROM plantas';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar plantas:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar plantas.' });
    }

    res.json({ success: true, plantas: results });
  });
});

app.get('/info/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM plantas WHERE id = ?'

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }

    if (results.length > 0) {
      const info = results[0];
      res.json({
        success: true,
        planta: {
          id: info.id,
          imagem: info.imagem,
          nome: info.nome,
          estacao: info.estacao,
          tempo: info.tempo,
          espaco: info.espaco,
          agua: info.agua

        }
      });
    } else {
      res.status(404).json({ success: false, message: 'Planta não encontrada.' });
    }
  });
})

app.post('/favoritar', (req, res) => {
  const { id_usuario, id_planta } = req.body;

  const query = 'INSERT INTO favoritos (id_usuario, id_planta) VALUES (?, ?);';
  const values = [id_usuario, id_planta];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao favoritar:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }

    res.json({ success: true, message: 'planta favoritada com sucesso!' });
  });
});

app.post('/info/favorito', (req, res) => {
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ success: false, message: 'ID do usuário é obrigatório.' });
  }

  const query = `
    SELECT p.* 
    FROM plantas p 
    JOIN favoritos f ON f.id_planta = p.id 
    WHERE f.id_usuario = ?;
  `;

  connection.query(query, [id_usuario], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }

    res.json({
      success: true,
      favoritos: results
    });
  });
});

app.delete('/desfavoritar', (req, res) => {
  const { id_usuario, id_planta } = req.body;

  if (!id_usuario || !id_planta) {
    return res.status(400).json({ success: false, message: 'id_usuario e id_planta são obrigatórios.' });
  }

  const query = 'DELETE FROM favoritos WHERE id_usuario = ? AND id_planta = ?;';
  const values = [id_usuario, id_planta];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao desfavoritar:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }

    if (results.affectedRows > 0) {
      res.json({ success: true, message: 'Planta removida dos favoritos com sucesso!' });
    } else {
      res.status(404).json({ success: false, message: 'Favorito não encontrado.' });
    }
  });
});

//rotas em plantio

app.post('/plantar', (req, res) => {
  const { id_usuario, id_planta } = req.body;

  const query = 'INSERT INTO plantando (id_usuario, id_planta) VALUES (?, ?);';
  const values = [id_usuario, id_planta];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao plantar:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }

    res.json({ success: true, message: 'adicionado a plantando com sucesso!' });
  });
});

app.post('/info/plantar', (req, res) => {
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ success: false, message: 'ID do usuário é obrigatório.' });
  }

 
  const query = `
        SELECT 
            pl.*, 
            p.data AS data_plantio  -- Renomeando a coluna 'data' da tabela 'plantando' para 'data_plantio'
        FROM 
            plantando p 
        JOIN 
            plantas pl ON pl.id = p.id_planta 
        WHERE 
            p.id_usuario = ?;
    
    `;

  connection.query(query, [id_usuario], (err, results) => {
    if (err) {
      console.error('Erro ao buscar plantas em progresso:', err);
      return res.status(500).json({ success: false, message: 'Erro no servidor ao buscar plantas em progresso.' });
    }

    res.json({
      success: true,
      plantando: results
    });
  });
});

app.delete('/cancelarPlantio', (req, res) => {
  const { id_usuario, id_planta } = req.body;

  if (!id_usuario || !id_planta) {
    return res.status(400).json({ success: false, message: 'id_usuario e id_planta são obrigatórios.' });
  }

  const query = 'DELETE FROM plantando WHERE id_usuario = ? AND id_planta = ?;';
  const values = [id_usuario, id_planta];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao desfavoritar:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }

    if (results.affectedRows > 0) {
      res.json({ success: true, message: 'Planta removida do plantio com sucesso!' });
    } else {
      res.status(404).json({ success: false, message: 'planta não esta sendo plantada .' });
    }
  });
});

const util = require('util');
const query = util.promisify(connection.query).bind(connection);

app.delete('/excluirPlanta', async (req, res) => {
  const { id } = req.body;

  try {
    await query('DELETE FROM receita WHERE id_planta = ?', [id]);
    await query('DELETE FROM favoritos WHERE id_planta = ?', [id]);
    await query('DELETE FROM plantando WHERE id_planta = ?', [id]);
    await query('DELETE FROM informacao WHERE id_planta = ?', [id]);
    await query('DELETE FROM plantas WHERE id = ?', [id]);

    res.json({ success: true, message: 'Planta e dados relacionados removidos com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir:', err);
    res.status(500).json({ success: false, message: 'Erro ao excluir planta.' });
  }
});


app.put('/editar/planta/:id', (req, res) => {
  const  id  = req.params.id;
  const { nome, estacao, agua, espaco, tempo } = req.body;


  const query = 'UPDATE plantas SET nome = ?, estacao = ?, tempo = ?, espaco = ? , agua = ?  WHERE id = ?';

  connection.query(query, [nome, estacao, tempo, espaco, agua, id], (err, results) => {
    if (err) {
      console.error('Erro ao editar planta:', err);
      return res.status(500).json({ success: false, message: 'Erro ao editar Planta.' });
    }

    res.json({
      success: true,
      message: 'Planta editada com sucesso!',
    });
  });
});

app.post('/addInfo', (req, res) => {
  
  
  const { id_planta, conteudo } = req.body;

  const query = 'INSERT INTO informacao (id_planta, conteudo) VALUES (?, ?);';
  const values = [id_planta,conteudo];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao adicionar informações:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }

    res.json({ success: true, message: 'Informações adicionadas!' });
  });
});

app.get('/getConteudo/:id_planta', (req, res) => {
    
    const id_planta = req.params.id_planta;

    
    if (!id_planta) {
        return res.status(400).json({ success: false, message: 'ID da planta é obrigatório.' });
    }

   
    const query = 'SELECT conteudo FROM informacao WHERE id_planta = ?';
    
    
    connection.query(query, [id_planta], (err, results) => {
        if (err) {
            console.error('Erro ao buscar informações:', err);r
            return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
        }

        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: `Nenhuma informação encontrada para o ID ${id_planta}.` });
        }

        const informacao = results[0]; 
        
        res.json({
            success: true,
            conteudo: informacao.conteudo 
        });
    });
});

app.get('/getConteudo/:id_planta', (req, res) => {
    
    const id_planta = req.params.id_planta;

    
    if (!id_planta) {
        return res.status(400).json({ success: false, message: 'ID da planta é obrigatório.' });
    }

   
    const query = 'SELECT conteudo FROM informacao WHERE id_planta = ?';
    
    
    connection.query(query, [id_planta], (err, results) => {
        if (err) {
            console.error('Erro ao buscar informações:', err);r
            return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
        }

        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: `Nenhuma informação encontrada para o ID ${id_planta}.` });
        }

        const informacao = results[0]; 
        
        res.json({
            success: true,
            conteudo: informacao.conteudo 
        });
    });
});

app.put('/updateConteudo/:id_planta', (req, res) => {
    
    const id_planta = req.params.id_planta;
    const { conteudoEditado } = req.body; 

  

    const query = 'UPDATE informacao SET conteudo = ? WHERE id_planta = ?';
   
    connection.query(query, [conteudoEditado, id_planta], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar informações:', err);
            return res.status(500).json({ success: false, message: 'Erro interno no servidor ao tentar atualizar.' });
        }

        if (result.affectedRows === 0) {
            
            return res.status(404).json({ 
                success: false, 
                message: `Nenhuma informação encontrada para o ID ${id_planta}. Verifique se o ID existe.` 
            });
        }

        res.json({
            success: true,
            message: `Conteúdo da planta ID ${id_planta} atualizado com sucesso.`,
        });
    });
});


app.post('/cadastrar/receita/:idPlanta', upload.single('imagemReceita'), (req, res) => {
    
    
    const id_planta = req.params.idPlanta; 
    
   
    const { nome, ingredientes, preparo , id_usuario } = req.body;
    
    
    if (!req.file) {
        console.log('Nenhum arquivo enviado.');
        return res.status(400).json({ success: false, message: 'Imagem da receita é obrigatória.' });
    }

    const imagem = req.file.filename;

    
    const query = 'INSERT INTO receita ( id_usuario, id_planta, nome, imagem, ingredientes, preparo) VALUES( ?, ?, ?, ?, ?, ?);';
    
    
    const values = [id_usuario, id_planta, nome, imagem, ingredientes, preparo];
    
    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar receita no banco:', err);
          
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar receita no banco de dados.' });
        }

        return res.json({
            success: true,
            message: 'Receita cadastrada com sucesso!',
            dadosReceita: { nome, ingredientes, preparo, nomeImagem: imagem }
        });
    });
});

app.get('/listar/receitas/:id', (req, res) => {
  const id_planta = req.params.id; 

  const query = 'SELECT * FROM receita WHERE id_planta = ?';

  connection.query(query, id_planta, (err, results) => {
    if (err) {
      console.error('Erro ao buscar Receitas:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar Receitas.' });
    }

    res.json({ success: true, receitas: results });
  });
});

app.get('/listar/receita/:id', (req, res) => {
  const id_receita = req.params.id; 

  const query = 'SELECT * FROM receita WHERE id_receita = ?';

  connection.query(query, id_receita, (err, results) => {
    if (err) {
      console.error('Erro ao buscar Receitas:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar Receitas.' });
    }

   
    if (results.length > 0) {
        res.json({ success: true, receita: results[0] }); 
    } else {
        res.status(404).json({ success: false, message: 'Receita não encontrada.' });
    }
  });
});

app.delete('/excluirReceita', (req, res) => {
  
  const { id_receita } = req.body; 

  const query = 'DELETE FROM receita WHERE id_receita = ?;';

  connection.query(query, id_receita, (err, results) => {
    if (err) {
      console.error('Erro ao excluir:', err);
     
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }

    if (results.affectedRows > 0) {
      
      res.json({ success: true, message: 'Receita removida com sucesso!' });
    } 
  });
});

app.put('/editar/receita/:id', (req, res) => {
  const  id_receita  = req.params.id;
  const { nome, ingredientes, preparo } = req.body;


  const query = 'UPDATE receita SET nome = ?, ingredientes = ? , preparo = ?  WHERE id_receita = ?';

  connection.query(query, [nome, ingredientes, preparo, id_receita], (err, results) => {
    if (err) {
      console.error('Erro ao editar planta:', err);
      return res.status(500).json({ success: false, message: 'Erro ao editar Planta.' });
    }

    res.json({
      success: true,
      message: 'Planta editada com sucesso!',
    });
  });
});


app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));




