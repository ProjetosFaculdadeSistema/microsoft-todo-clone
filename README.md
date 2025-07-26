Microsoft To Do Clone
Projeto de clone do Microsoft To Do com frontend em React + TypeScript + Tailwind e backend em Node.js + Express + MongoDB.

Estrutura do projeto
frontend/ - Aplicação React com interface de usuário.

backend/ - API RESTful em Node.js com conexão MongoDB.

Requisitos
Node.js (v16+)

npm ou yarn

MongoDB (local ou Atlas)

Git

Instalação
Backend
Navegue até a pasta backend: cd backend

Instale dependências: npm install

Configure variáveis de ambiente (.env):

MONGO_URI=<sua-string-de-conexao-mongodb>  
JWT_SECRET=<seu-segredo-jwt>  
PORT=5000

Inicie o backend: npm run dev

Frontend
Navegue até a pasta frontend: cd frontend

Instale dependências: npm install

Configure o arquivo de ambiente se necessário (exemplo: .env):

VITE_API_URL=http://localhost:5000  
Inicie o frontend: npm run dev

Uso
Acesse a aplicação no navegador no endereço http://localhost:5173 (ou porta exibida pelo Vite).

Faça cadastro, login e gerencie suas tarefas com backend integrado.

Git
Para subir alterações:
git add .
git commit -m "Sua mensagem"
git push origin main

Observações
Certifique que backend está rodando antes do frontend para que as chamadas API funcionem.

Ajuste variáveis de ambiente conforme seu ambiente local.
