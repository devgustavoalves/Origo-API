# 🏦 Origo - Gestão Financeira para Locação de Curta Temporada

O **Origo** é um ecossistema SaaS (Software as a Service) projetado para automatizar e profissionalizar a gestão de propriedades de aluguel por temporada. O sistema resolve a complexidade de gerenciar múltiplos proprietários, taxas de administração e repasses financeiros.

---

## 🚀 Status do Projeto: Em Desenvolvimento Ativo

Atualmente, o projeto já conta com o core de infraestrutura e gestão de identidades concluído, utilizando práticas de mercado para garantir integridade e segurança dos dados.

---

## 🛠️ Tecnologias e Ferramentas

- **Linguagem:** TypeScript
- **Runtime:** Node.js (com `tsx` para desenvolvimento)
- **Framework Web:** Express
- **Banco de Dados:** PostgreSQL rodando via **Docker**
- **ORM:** Prisma 6 (Object-Relational Mapping)
- **Segurança:** Bcrypt (Salting & Hashing de senhas)
- **API Testing:** Postman (Collection organizada para testes de integração)

---

## 🏗️ Arquitetura e Engenharia de Dados

O diferencial técnico deste projeto reside na robustez da sua estrutura de dados:

1. **Transações Atômicas ($transaction):** Implementação de lógica de negócio onde o registro de um usuário gestor cria automaticamente um perfil de proprietário. Isso evita dados órfãos e garante que o sistema suporte tanto o "Gestor Profissional" quanto o "Proprietário Autônomo".
2. **Relacionamentos Complexos:** Modelagem de banco de dados que suporta relações 1:1 (Usuário/Proprietário) e 1:N (Propriedades/Lançamentos), mapeadas via Prisma.
3. **Escalabilidade com Docker:** Ambiente de desenvolvimento totalmente containerizado, garantindo que a aplicação rode de forma idêntica em qualquer máquina.

---

## 📋 Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.
- Node.js v18 ou superior.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/origo-api.git](https://github.com/SEU_USUARIO/origo-api.git)
   cd origo
   ```

2. **Configure o ambiente:**
   Crie um arquivo `.env` na raiz seguindo o modelo:
   ```env
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/origo_db?schema=public"
   ```

3. **Suba os containers:**
   ```bash
   docker-compose up -d
   ```

4. **Instale as dependências e rode as migrations:**
   ```bash
   npm install
   npx prisma migrate dev
   ```

5. **Inicie o servidor:**
   ```bash
   npx tsx watch src/server.ts
   ```

---

## 📖 Endpoints da API

### Usuários e Autenticação
- `POST /register`: Realiza o onboarding completo (User + Proprietário).
- `GET /users`: Lista todos os usuários (para fins de administração).

### Propriedades
- `POST /propriedades`: Registra um imóvel vinculando um `gestorId` e um `proprietarioId`.
- `GET /propriedades`: Lista imóveis com carregamento aninhado (*eager loading*) dos dados do proprietário.

---

## 👨‍💻 Autor

**Gustavo Alves**
- Software Engineering Student | Petrolina, PE
- Certified Postman API Fundamentals Student Expert