# Seja bem vindo ao projeto API de Blogs!


## Stack utilizada

**Back-end:** NodeJs, Express, Sequelize


<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary>

  Neste projeto eu pude desenvolver uma API e um banco de dados para a produção de conteúdo para um blog! 

  Foi feita uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. Desenvolvimento de endpoints que são conectados ao banco de dados seguindo os princípios do REST;

  2. Para fazer um post é necessário usuário e login, então foi realizar a **relação entre** `user` e `post`; 

  3. Tendo também a necessidade de utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

<br />
</details>

# Orientações

<details>
  <summary><strong>🐋 Rodando no Docker</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

  ![sequelize test](./public/remote-container.png)

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

  <br/>
</details>

<details>
  <summary><strong>🎛 Linter</strong></summary>

  Para garantir a qualidade do código, usaremos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

  Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

  - `/package.json`

  Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

  Você também pode instalar o plugin do `ESLint` no `VSCode`, bastar baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) e instalá-lo.

<br />
</details>

<details>
  <summary><strong>⚠️ Informações importantes sobre o projeto</strong></summary>

  ## ⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️

  ### 👀 Observações importantes:

  > 👉 `.sequelizerc`
  ```javascript
  const path = require('path');

  module.exports = {
    'config': path.resolve('src', 'database', 'config', 'config.js'),
    'models-path': path.resolve('src', 'database', 'models'),
    'seeders-path': path.resolve('src', 'database', 'seeders'),
    'migrations-path': path.resolve('src', 'database', 'migrations'),
  };
  ```
  Responsável por identificar os caminhos dos recursos do Sequelize

  <br />

  ---

  **Você irá precisar configurar as variáveis de ambiente para uso do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

  O arquivo a seguir, contém um modelo das variáveis de ambiente utilizadas no projeto. Para o contexto de teste local, é importante configurar as variáveis: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`:

  > 👉 `.env.example`
  ```env
  #### SERVER VARS
  NODE_ENV=development
  API_PORT=3000

  #### DATABASE VARS
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_DB_NAME=blogs-api
  MYSQL_USER=root
  MYSQL_PASSWORD=password

  #### SECRECT VARS
  JWT_SECRET=suaSenhaSecreta
  ```

  #### Variável `JWT_SECRET`:
  
  Esta variável de ambiente deverá ser utilizada tanto para criar o token quanto para verificá-lo.

<br />
</details>

<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Construção das tabelas através do ORM:

  ![DER](./public/der.png)

  ---

  #### Formato das entidades

  Utilizei `ORM Sequelize` para criar e atualizar o seu banco de dados. 

    #### Scripts prontos

    - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```

    **:eyes: OBS**: Scripts acima, estão listados no `package.json`.

<br />
</details>

<h1 style="center">Obrigado pela visita ao meu repositório</h1>

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://vinidipaula.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vinicius-depaula/)



