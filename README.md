# 🌿 EcoGrow

Bem-vindo ao repositório do projeto **EcoGrow**. Este projeto é uma aplicação web completa, desenvolvida como projeto de conclusão de curso do ensino médio Senac integrado com técnico em desenvolvimento web.

## 🚀 Visão Geral do Projeto

O EcoGrow é uma solução desenvolvida para **auxiliar o usuário no plantio de frutas, legumes, saladas e temperos de forma orgânica em casa, levando em consideração o espaço disponível e focando na saúde e bem-estar. A plataforma fornece técnicas para automatizar a rega, tempo de desenvolvimento da planta, espaço necessário, quantidade diária do consumo de água e melhor estação para o plantio.**.

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

1.  **Navegue até o diretório do *backend***:

    ```bash
    cd EcoGrow-final/EcoGrow-final/back
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
    Importe o esquema e os dados iniciais executando o script `ecogrow.sql` no banco de dados recém-criado. O arquivo está localizado em `EcoGrow-final/EcoGrow-final/back/ecogrow.sql`.

    ```bash
    # Exemplo usando a linha de comando MySQL (ajuste o nome de usuário e senha)
    mysql -u seu_usuario -p ecogrow < EcoGrow-final/EcoGrow-final/back/ecogrow.sql
    ```

3.  **Configure as Variáveis de Ambiente**:
    O *backend* precisa das credenciais do banco de dados. Crie um arquivo `.env` na pasta `EcoGrow-final/EcoGrow-final/back` e adicione as seguintes variáveis (ajuste os valores conforme sua configuração):

    ```
    # Exemplo de arquivo .env
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=ecogrow
    DB_PORT=3306
    ```

## ▶️ Como Iniciar o Projeto

Com as dependências instaladas e o banco de dados configurado, você pode iniciar as duas partes do projeto.

### 1. Iniciar o Backend (Servidor API)

1.  Certifique-se de estar no diretório `EcoGrow-final/EcoGrow-final/back`.
2.  Execute o script de inicialização:

    ```bash
    npm start
    ```

    O servidor será iniciado e estará acessível em `http://localhost:3000` (ou a porta configurada no `server.js`). O script `start` utiliza `nodemon` para reiniciar automaticamente o servidor a cada alteração de código.

### 2. Iniciar o Frontend (Interface do Usuário)

O *frontend* é composto por arquivos estáticos (HTML, CSS, JS) e não requer um servidor Node.js para ser executado.

1.  Navegue até o diretório `EcoGrow-final/EcoGrow-final/front`.
2.  Abra o arquivo principal da aplicação (provavelmente `login.html` ou `Pagina.html`) diretamente no seu navegador.

    > **Dica:** Para um ambiente de desenvolvimento mais robusto e evitar problemas de CORS, é recomendado usar uma extensão de servidor local simples para VS Code (como o *Live Server*) ou um servidor HTTP estático (ex: `http-server` via npm) para servir os arquivos do *frontend*.

    ```bash
    # Se usar http-server (instale globalmente: npm install -g http-server)
    cd EcoGrow-final/EcoGrow-final/front
    http-server
    ```

## 🤝 Contribuição

[**IEste projeto foi desenvolvido como um trabalho de conclusão de curso. Contribuições externas não são esperadas neste momento, mas sinta-se à vontade para fazer um *fork* e adaptar o código para seus próprios projetos.

## 📄 Licença

Este projeto está licenciado sob a Licença [Proprietária (Desenvolvimento Acadêmico)**].

---

*Desenvolvido com 💚 por Pablo Centeno Schmidt*
