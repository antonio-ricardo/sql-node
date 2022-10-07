# sql-node 🚀
Repositorio para o estudo basico de banco sql, prisma e mais umas coisinhas (Postgres rodando via docker com adminer)

# Variáveis de ambiente 🚀

- PORT (Porta onde vai rodar o projeto. padrão: 3000)

- POSTGRES_PASSWORD (Senha do postgres que vai rodar no docker)

- POSTGRES_USER (usuario do postgres que vai rodar no docker)

- POSTGRES_DB_NAME (nome do postgres que vai rodar no docker)

- DATABASE_URL (url de conexão do seu banco de dados)

- PRIVATE_KEY (chave privada que sera usada como segredo do jwt)

- REFRESH_PRIVATE_KEY (chave privada que sera usada como segredo do jwt de refresh)

- SECRET_EMAIL (email usado para ser o remetente de emails da aplicação)

- SECRET_PASSWORD (senha do email, obs: vá nas configurações de contas do google e lá tem a opção de criar senhas para outros apps, essa é a senha que deve ser posta aqui)

- REDIS_HOST (host do redis, obs: se for usar o do docker colocar 127.0.0.1)

- REDIS_PORT (porta do redis, obs: se for usar o do docker colocar 6379)

# Como rodar o projeto 🚀

- instale as dependências (yarn)

- inicie o container do docker (docker-compose up --build)

- rode as migrações do prisma (npx prisma migrate dev)

- rode o projeto (yarn dev)

# Principais tecnologias (libs, ferramentas e etc) 🚀

- Redis

- Postgres

- Prisma

- Docker

- Javascript e Typescript

- Autenticação JWT

- bcrypt

- nodemailer (envio de email)

- json2csv

- bull (implementar a fila)

- dotenv

- yup (validação de requisição)

- express e express-async-errors (para conseguir lidar com erros assíncronos)

- husky e lint-staged (hook de pre-commit)

- prettier e eslint (formatação e organização do codigo)
