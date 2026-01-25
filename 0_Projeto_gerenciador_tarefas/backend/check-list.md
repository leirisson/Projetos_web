# ✅ Checklist de Implementação — Gerenciador de Tarefas
## 🧠 1. Planejamento (ANTES DE CODAR)

[x] Definir o problema que o sistema resolve
[x] Listar entidades (User, Task)
[x] Definir regras de negócio
[x] Definir RF e RNF
[x] Definir fluxo de autenticação
[x] Escolher stack (Backend, Frontend, DB)
[x] Criar README inicial (mesmo simples)

## 🏗️ 2. Setup do Projeto (Backend)

[x] Inicializar projeto Node + TypeScript
[x] Configurar ESLint / Prettier
[x] Configurar Fastify
[x] Configurar variáveis de ambiente
[x] Configurar Prisma
[] Criar conexão com banco de dados
[x] Criar script de start/dev

## 🧩 3. Modelagem do Domínio

[] Criar entidade User
[] Criar entidade Task
[] Criar enums (Status, Priority)
[] Definir invariantes do domínio
[] Criar interfaces de repositório
[] Separar domínio de infraestrutura

## 🔐 4. Autenticação e Segurança

[] Hash de senha no cadastro
[] Login com validação de credenciais
[] Geração de JWT
[] Middleware de autenticação
[] Proteger rotas privadas
[] Garantir acesso apenas a recursos do usuário

## 🧠 5. Casos de Uso (Use Cases)
```Usuário

[] CreateUserUseCase
[] AuthenticateUserUseCase

Tarefas

[] CreateTaskUseCase
[] ListTasksUseCase
[] GetTaskByIdUseCase
[] UpdateTaskUseCase
[] CompleteTaskUseCase
[] DeleteTaskUseCase

🧪 6. Validações e Regras de Negócio

[] Validação de dados com Zod
[] Impedir datas passadas
[] Definir status inicial automaticamente
[] Impedir edição de tarefa concluída
[] Validar ownership (userId)
[] Retornar erros claros

🌐 7. Camada HTTP

[] Criar controllers
[] Criar rotas
[] Padronizar respostas HTTP
[] Tratar erros globais
[] Criar middlewares necessários

📡 8. Integração com Banco de Dados

[] Implementar UserRepository (Prisma)
[] Implementar TaskRepository (Prisma)
[] Criar migrations
[] Testar queries principais
[] Garantir integridade dos dados

🧪 9. Testes (Opcional mas Recomendado)

[] Testes unitários de use cases
[] Testes de regras de negócio
[] Testes de autenticação
[] Testes de integração das rotas
[] Testar cenários de erro

🖥️ 10. Setup do Projeto (Frontend)

[] Criar projeto React + TypeScript
[] Configurar rotas (React Router)
[] Criar estrutura de pastas
[] Criar serviço de API (Axios)
[] Gerenciar autenticação (token)
[] Proteger rotas privadas

🎨 11. Implementação do Frontend

[] Tela de Login
[] Tela de Cadastro
[] Dashboard de tarefas
[] Formulário de criação
[] Edição de tarefa
[] Concluir tarefa
[] Excluir tarefa
[] Filtro por status
[] Feedback de loading/erro

🔄 12. Integração Frontend ↔ Backend

 Consumir API de login

 Armazenar token com segurança

 Enviar token nos headers

 Tratar erros da API

 Sincronizar estado da UI

📄 13. Documentação

 README completo

 Documentar regras de negócio

 Documentar rotas da API

 Exemplos de requests

 Instruções claras de execução

🚀 14. Finalização (Portfólio Ready)

 Revisar organização do código

 Refatorar nomes e responsabilidades

 Remover código morto

 Padronizar commits

 Subir no GitHub

 Adicionar prints ou GIF no README

 Escrever descrição clara do projeto