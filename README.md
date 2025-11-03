#  EcoGrow 
<img src="https://raw.githubusercontent.com/Pabloenteno/EcoGrow-final/EcoGrow-final/front/imagens/ChatGPT_Image_12_de_mai._de_2025__18_20_22-removebg-preview.png" width="180" alt="Logo">

Bem-vindo ao repositório do projeto **EcoGrow**. Este projeto é uma aplicação web completa, desenvolvida como projeto de conclusão de curso do ensino médio Senac integrado com técnico em desenvolvimento web.

##  Visão Geral do Projeto

O EcoGrow é uma solução desenvolvida para **auxiliar o usuário no plantio de frutas, legumes, saladas e temperos de forma orgânica em casa, levando em consideração o espaço disponível e focando na saúde e bem-estar. A plataforma fornece um ambiente onde os usuários podem acessar informações sobre o tempo de desenvolvimento da planta, espaço necessário, quantidade diária do consumo de água e melhor estação para o plantio e também podem adicionar receitas, já o administrador pode adicionar todas essas informações, editá-las e exclui-las.**.

O projeto está estruturado em duas partes principais:

| Diretório | Descrição | Tecnologia Principal |
| :--- | :--- | :--- |
| `EcoGrow-final/back` | Contém o código do servidor (API) responsável pela lógica de negócios, comunicação com o banco de dados e autenticação. | Node.js (Express) |
| `EcoGrow-final/front` | Contém os arquivos da interface do usuário (HTML, CSS, JavaScript) que interagem com o *backend*. | HTML, CSS, JavaScript Puro |

## 📁 Estrutura de Pastas

A estrutura do projeto é organizada da seguinte forma:

```
EcoGrow-Final/
├── EcoGrow-final/
│   ├── back/
│   │   ├── src/          # Arquivos fonte do servidor (onde está o server.js)
│   │   ├── ecogrow.sql   # Script SQL para criação e inicialização do banco de dados
│   │   ├── package.json  # Dependências e scripts do backend
│   │   └── ...
│   └── front/
│       ├── imagens/      # Ativos de imagem
│       ├── icons/        # Ícones
│       ├── *.html        # Páginas da interface
│       ├── *.css         # Arquivos de estilo
│       ├── *.js          # Lógica do frontend
│       └── ...
└── README.md
```

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

*   **Node.js** (versão 18 ou superior recomendada)
*   **MySQL** ou **MariaDB** (para o banco de dados)
*   Um cliente de banco de dados (ex: DBeaver, MySQL Workbench) ou linha de comando para executar o script SQL.

## 📦 Instalação de Dependências

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1.  **Abra o terminal no projeto e depois navegue até o diretório do *backend***:

    ```bash
    cd EcoGrow-final/back
    ```

2.  **Instale as dependências do Node.js**:

    O arquivo `package.json` lista todas as bibliotecas necessárias. Execute o comando:

    ```bash
    npm install
    # Isso criará a pasta node_modules com todas as dependências.
    ```

## 💾 Configuração do Banco de Dados

O projeto utiliza o MySQL para persistência de dados.

1.  **Crie um Banco de Dados Vazio**:
    Usando seu cliente MySQL, crie um novo banco de dados. O nome padrão esperado pelo *backend* é `ecogrow`, mas você pode configurá-lo no arquivo de conexão.

    ```sql
    CREATE DATABASE ecogrow;
    ```

2.  **Execute o Script SQL**:
    Importe o banco de dados abaixo.

    ```sql
    use ecogrow;

    create table usuario(
    	id int primary key auto_increment unique,
        nome varchar(255),
    	senha varchar(255),
        email varchar(255) unique,
        tipo enum("adm","usuario")
    );


    create table plantas(
    	id int primary key auto_increment unique,
    	imagem text,
        nome varchar(255),
    	estacao enum("verão","outono","Primavera","inverno"),
        tempo varchar(255),
        espaco enum("pequeno","médio","grande"),
        agua enum("1","2","3","4","5")
        /*
    	Nível	Quantidade Aproximada
    	1	5 – 20 mL/dia	
    	2	20 – 100 mL/dia	
    	3	100 – 300 mL/dia
    	4	300 – 700 mL/dia	
    	5	700 – 2000+ mL/dia	
    	*/
    );

    create table favoritos(
    	id_usuario int,
        id_planta int,
    	PRIMARY KEY (id_usuario, id_planta),
    	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    	FOREIGN KEY (id_planta) REFERENCES plantas(id)
    );
    
    create table plantando(
    	id_usuario int,
        id_planta int,
        data timestamp DEFAULT CURRENT_TIMESTAMP,
    	PRIMARY KEY (id_usuario, id_planta),
    	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    	FOREIGN KEY (id_planta) REFERENCES plantas(id)
    );

    CREATE TABLE receita (
        id_receita INT PRIMARY KEY AUTO_INCREMENT,
        id_planta INT NOT NULL, 
        id_usuario INT NOT NULL, 
        nome VARCHAR(255) NOT NULL,
        imagem VARCHAR(255), 
        ingredientes TEXT NOT NULL, 
        preparo TEXT NOT NULL,
        
        FOREIGN KEY (id_usuario) REFERENCES usuario(id),
        FOREIGN KEY (id_planta) REFERENCES plantas(id)
    );

    CREATE TABLE informacao (
        id_informacao INT PRIMARY KEY AUTO_INCREMENT,
        id_planta INT NOT NULL,
        conteudo TEXT NOT NULL,
        FOREIGN KEY (id_planta) REFERENCES plantas(id)
    );

    ```
    
    ```sql
    # Para ter acesso a informações e funcionalidades de ADM crie um usuario diretamente com o tipo "adm" diretamente no banco de dados
    insert into usuario (nome, senha,email,tipo) values("SEU_NOME","SUA_SENHA","SEU_EMAIL","adm");
    ```
    

3.  **Configure as Variáveis de Ambiente**:
    O *backend* precisa das credenciais do banco de dados. encontre o arquivo `db_config.js` na pasta `EcoGrow-final/EcoGrow-final/back` e adicione as seguintes variáveis (ajuste os valores do query conforme sua configuração):

    ```js
    const connection = mysql.createConnection({
    host: 'SEU_HOST',
    user: 'SEU_USER',
    password:'SUA_SENHA',
    database: 'ecogrow'
    })
    ```

## ▶️ Como Iniciar o Projeto

Com as dependências instaladas e o banco de dados configurado, você pode iniciar as duas partes do projeto.

### 1. Iniciar o Backend (Servidor API)

1.  Certifique-se de estar no diretório `EcoGrow-final/EcoGrow-final/back`.
2.  Execute o script de inicialização:

    ```bash
    npm start
    ```

    O servidor será iniciado e estará acessível em `http://localhost:3002` (ou a porta configurada no `server.js`). O script `start` utiliza `nodemon` para reiniciar automaticamente o servidor a cada alteração de código.

### 2. Iniciar o Frontend (Interface do Usuário)

O *frontend* é composto por arquivos estáticos (HTML, CSS, JS) e não requer um servidor Node.js para ser executado.

1.  Navegue até o diretório `EcoGrow-final/EcoGrow-final/front`.
2.  Abra o arquivo principal da aplicação  `Pagina.html` diretamente no seu navegador.

    > **Dica:** Para um ambiente de desenvolvimento mais robusto e evitar problemas de CORS, é recomendado usar uma extensão de servidor local simples para VS Code (como o *Live Server*) ou um servidor HTTP estático (ex: `http-server` via npm) para servir os arquivos do *frontend*.

    ```bash
    # Se usar http-server (instale globalmente: npm install -g http-server)
    cd EcoGrow-final/EcoGrow-final/front
    http-server
    ```

*Desenvolvido por Pablo Centeno Schmidt*
