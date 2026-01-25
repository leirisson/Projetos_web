# 📝 Gerenciador de Tarefas

Aplicação Fullstack para gerenciamento de tarefas, desenvolvida com o objetivo de praticar conceitos de arquitetura, regras de negócio, autenticação e integração entre frontend e backend.

O sistema permite que usuários criem, organizem e acompanhem suas tarefas de forma simples e segura.

---

## 🚀 Funcionalidades

- Cadastro e autenticação de usuários
- Criação, edição e exclusão de tarefas
- Controle de status das tarefas
- Definição de prioridade
- Filtro e ordenação de tarefas
- Cada usuário visualiza apenas suas próprias tarefas

---

## 🧩 Regras de Negócio

- Um usuário só pode acessar suas próprias tarefas
- Toda tarefa começa com status **PENDING**
- A prioridade padrão é **MEDIUM**
- Não é permitido criar tarefas com data limite no passado
- Tarefas concluídas não podem ser editadas
- Emails de usuários devem ser únicos

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Fastify
- Prisma
- JWT (JSON Web Token)
- Zod (validação)

### Frontend
- React
- TypeScript
- Vite
- Axios
- CSS / Tailwind (opcional)

### Banco de Dados
- PostgreSQL (ou SQLite para desenvolvimento)

---

## 📂 Estrutura do Projeto (Backend)

```txt
src/
├── domain/
│   ├── entities/
│   ├── enums/
│   └── repositories/
├── usecases/
├── http/
│   ├── controllers/
│   ├── routes/
│   └── middlewares/
├── app.ts
└── server.ts

#🔑 Autenticação

A aplicação utiliza autenticação baseada em JWT.

Após o login, o token deve ser enviado no header:

```Authorization: Bearer <token>

Rotas protegidas exigem autenticação válida.

## 🌐 Rotas da API (Resumo)


```Usuário
POST /users → Cadastro
POST /sessions → Login

```Tarefas

POST /tasks → Criar tarefa
GET /tasks → Listar tarefas do usuário
PUT /tasks/:id → Atualizar tarefa
PATCH /tasks/:id/complete → Concluir tarefa
DELETE /tasks/:id → Excluir tarefa

## ⚙️ Como Rodar o Projeto

# instalar dependências
npm install

# rodar as migrations
npx prisma migrate dev

# iniciar servidor
npm run dev

Frontend

# instalar dependências
npm install

# iniciar aplicação
npm run dev
