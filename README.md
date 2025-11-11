# 📘 Frontend – Networking Manager

Interface web desenvolvida em **React + TypeScript** com **TailwindCSS**, **Context API** e **React Router**, responsável pelos fluxos de:
- Intenção de ingresso (público)
- Aprovação e convite (admin)
- Finalização de cadastro (convidado)
- Login e painel de membros
- Painel administrativo de intenções e membros

---

## 🚀 Como rodar o projeto

### 1. Instalar dependências
```bash
npm install
# ou
yarn
```

### 2. Criar o arquivo `.env`
```env
VITE_API_URL=http://localhost:4000
VITE_FRONT_URL=http://localhost:5173
VITE_ADMIN_KEY=sua_chave_admin_aqui
```

### 3. Executar em modo desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

### 4. Build de produção
```bash
npm run build
npm run preview
```

---

## 🧭 Estrutura de Pastas

```
src/
  api/
    api.ts
  components/
    Admin/
      IntentionCard.tsx
      IntentionList.tsx
      MemberCard.tsx
      LogoutButton.tsx
    Invite/
      InviteForm.tsx
    Form/
      Input.tsx
      SubmitButton.tsx
    Sidebar.tsx
  contexts/
    AdminContext.tsx
    IntentionContext.tsx
    InviteContext.tsx
    MembersContext.tsx
    MemberAuthContext.tsx
  pages/
    IntentionPage.tsx
    AdminLogin.tsx
    AdminDashboard.tsx
    MembersPage.tsx
    InvitePage.tsx
    MemberLoginPage.tsx
    MemberTokenLoginPage.tsx
  routes/
    ProtectedRoute.tsx
  styles/
    globals.css
  App.tsx
  main.tsx
```

---

## 🌐 Rotas do Frontend

| Caminho | Componente | Descrição |
|----------|-------------|-----------|
| `/` | `IntentionPage` | Página pública de envio de intenção |
| `/admin/login` | `AdminLogin` | Login administrativo |
| `/admin/dashboard` | `AdminDashboard` | Lista e aprova intenções |
| `/admin/members` | `MembersPage` | Lista membros ativos |
| `/invite?token=...` | `InvitePage` | Finalização de cadastro via convite |
| `/member-login` | `MemberLoginPage` | Login de membros |
| `/member-login/token` | `MemberTokenLoginPage` | Login via token |

---

## 🧠 Contexts

### `IntentionContext`
Gerencia formulário público de intenção.
- `handleChange`, `handleSubmit`, `resetForm`
- `loading`, `success`, `error`

### `AdminContext`
Gerencia intenções e ações administrativas.
- `fetchIntentions()`, `approveIntention(id)`, `rejectIntention(id)`
- Deve **retornar `response.data`** para que o componente possa exibir o link de convite.

### `InviteContext`
Fluxo de convite e finalização.
- `verifyToken(token)`
- `completeRegistration(token, form)`

### `MembersContext`
Gerencia lista de membros.
- `fetchMembers()`
- `members`, `loading`

### `MemberAuthContext`
Autenticação simples para membros (via email/token).

---

## 🧩 Componentes Principais

| Componente | Descrição |
|-------------|-----------|
| **`IntentionForm`** | Formulário público de intenção |
| **`IntentionCard`** | Card individual de intenção, com botão de Aprovar/Rejeitar |
| **`MemberCard`** | Exibe informações do membro (nome, email, telefone, data) |
| **`Sidebar`** | Navegação lateral (Dashboard / Membros) |
| **`InviteForm`** | Finalização de cadastro via token |
| **`ProtectedRoute`** | Protege rotas administrativas |

> 💡 A `Sidebar` deve usar `flex-1` e `h-full` para ocupar o máximo do container pai, evitando largura fixa (`w-56`).

---

## 🔗 API Endpoints

> Base URL definida em `VITE_API_URL`

### Intenções
| Método | Rota | Descrição |
|---------|------|------------|
| `POST` | `/admissions/intentions` | Cria nova intenção |
| `GET` | `/admissions/intentions` | Lista intenções (admin) |
| `POST` | `/admin/intentions/:id/approve` | Aprova intenção e gera convite |
| `POST` | `/admin/intentions/:id/reject` | Rejeita intenção |

### Convites
| Método | Rota | Descrição |
|---------|------|------------|
| `GET` | `/admissions/invitations/:token` | Verifica validade do convite |
| `POST` | `/admissions/invitations/:token/complete` | Finaliza cadastro do membro |

### Admin
| Método | Rota | Descrição |
|---------|------|------------|
| `POST` | `/admin/login` | Login do admin |
| Headers | `x-admin-key` | Autorização nas rotas protegidas |

### Membros
| Método | Rota | Descrição |
|---------|------|------------|
| `GET` | `/members` | Lista todos os membros |
| `GET` | `/members/:id` | Detalhe de membro |
| `POST/PUT/DELETE` | `/members` | CRUD de membros |

---

## ⚙️ Exemplo de configuração Axios

```ts
// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export default api;
```

> Headers administrativos podem ser adicionados por interceptor:
```ts
api.interceptors.request.use((config) => {
  const key = localStorage.getItem("admin_accessKey");
  if (key) config.headers["x-admin-key"] = key;
  return config;
});
```

---




Feito com ❤️ usando React, TypeScript e Context API.
