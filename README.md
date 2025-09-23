# 📦 API HTML → XLS API

A aplicação foi construída em **Node.js** e segue o padrão **REST**, com a documentação em formato **OpenAPI (Swagger)**.

---

## 🚀 Tecnologias utilizadas
- [Node.js](https://nodejs.org/) v20+
- [Express](https://expressjs.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/) (via `openapi.yaml`)

---
## Kubernets

Processo para manutenção/ atualização do backend
docker build -t eshows/html-to-image-api:latestv1 -f Dockerfile.prod . docker build -t eshows/html-to-image-api:latestv1 -f Dockerfile.prod . docker push eshows/html-to-image-api:latestv1

kubectl apply -f k8s/app.yaml

logs
kubectl logs

## 📂 Estrutura do projeto
├── server.js # Arquivo principal do servidor
├── package.json # Dependências e scripts do projeto
├── openapi.yaml # Especificação OpenAPI/Swagger
└── README.md # Documentação do projeto

---

## ⚙️ Instalação e execução

1. Clone este repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd [NOME_DA_PASTA]

2. Instale as dependências:
   ```
   npm install

3. Inicie o servidor:
   ```
   node server.js

4. O servidor estará disponível em:
   ```
   http://localhost:3000

## 📖 Documentação da API
A especificação da API está no arquivo openapi.yaml.
Para visualizar em uma interface interativa (Swagger UI):

Instale a extensão Swagger Viewer no VS Code ou

Use o Swagger Editor online e importe o arquivo openapi.yaml.

## 🛠 Manutenção

Testar endpoints antes de subir alterações.

Atualizar este README quando houver mudanças relevantes no fluxo de instalação ou uso.

## ✍️ Desenvolvido por Kauã Silva (DEV)