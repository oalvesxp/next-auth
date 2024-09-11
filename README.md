# NextJS - Auth

Autenticação com tokens no NextJS

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Backend API

**base_url:** http://localhost:9080 ou http://127.0.0.1:9080

**{base_url}/api/login**

- POST: Retorna o access_token e o refresh_token.

**{base_url}/api/refresh**

- POST: Retorna um token atualizado.

**{base_url}/api/session**

- GET: Retorna o 'session' de um usuário específico.

**{base_url}/api/users**

- POST: Cadastra um usuário na base de dados.
- GET: Retorna a lista de usuários cadastrados na base.
