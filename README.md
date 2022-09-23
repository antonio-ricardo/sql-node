# sql-node
Repositorio para o estudo basico de banco sql, prisma e mais umas coisinhas (Postgres rodando via docker com adminer)

# Variáveis de ambiente

- PORT (Porta onde vai rodar o projeto. padrão: 3000)

- POSTGRES_PASSWORD (Senha do postgres que vai rodar no docker)

- POSTGRES_USER (usuario do postgres que vai rodar no docker)

- POSTGRES_DB_NAME (nome do postgres que vai rodar no docker)

- DATABASE_URL (url de conexão do seu banco de dados)

- PRIVATE_KEY (chave privada que sera usada como segredo do jwt)

# Como rodar o projeto

- instale as dependencias (yarn)

- inicie o container do docker (docker-compose up --build)

- rode as migrações do prisma (npx prisma migrate dev)

- rode o projeto (yarn dev)
