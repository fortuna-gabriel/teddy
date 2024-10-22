# Para rodar o projeto:
npm install
nx build auth
nx build shortify
docker-compose up --build

# Swagger

http://localhost:3002/docs  API shortify
http://localhost:3001/docs  API auth

Na API auth, a rota /auth é a rota de efetuar o login, que retorna o token