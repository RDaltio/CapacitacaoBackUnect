# API Pokémon

Bem-vindo à API Pokémon, uma plataforma que oferece funcionalidades para registro e autenticação de usuários, manipulação de dados de Pokémon e muito mais. Esta API foi desenvolvida utilizando Node.js, Express, MongoDB e JWT para autenticação, com o intuito de servir como capacitação para novos membros da Unect Jr. Explore os recursos disponíveis e aproveite a experiência!

## Documentação

  A documentação completa da API Pokémon está disponível no Postman. Acesse [Documentação da API Pokémon](https://documenter.getpostman.com/view/27838821/2s9YypFPKj) para obter detalhes sobre os endpoints, métodos de autenticação, exemplos de solicitações e respostas, e guias de uso.

## Recursos Principais

- **Registro de Usuários:** Cadastre-se para obter uma conta de Treinador Pokémon.
- **Login:** Faça login para acessar recursos protegidos.
- **Manipulação de Pokémon:** Obtenha informações sobre Pokémon, registre novos Pokémon e atualize dados existentes.
- **Segurança:** Autenticação baseada em JWT para proteger rotas sensíveis.

## Como Utilizar

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/api-pokemon.git
   cd api-pokemon

2. **Instale as Dependências:**
   ```bash
   npm install

3. **Configure as Variáveis de Ambiente:**


   Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
    ```bash
   DB_USER=USER_DO_SEU_BANCO_DE_DADOS
   DB_PASS=PASSWORD_DO_SEU_BANCO_DE_DADOS
   SECRET=SUA_CHAVE_SECRETA_JWT

Dentro do arquivo dbConnect.js na pasta config, altere o link para o seu banco na linha "mongoose.connect(`mongodb+srv://${dbUsuario}:${dbSenha}@cluster0.mvetumo.mongodb.net/?retryWrites=true&w=majority`);"

4. **Execute o Servidor:**
   ```bash
   npm start
