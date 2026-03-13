# 🎯 Triton Form - Captura de Leads Premium

<div align="center">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NextJS-Dark.svg" height="50" alt="nextjs logo"  />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Supabase-Dark.svg" height="50" alt="supabase logo"  />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TypeScript.svg" height="50" alt="typescript logo"  />
</div>

---

## ✨ Visão Geral

O **Triton Form** é uma aplicação de alta conversão projetada para capturar leads de forma elegante e eficiente. Utilizando uma interface **Multi-Step** com estética **Glassmorphism**, o app guia o usuário através de uma jornada fluida até a seleção de bônus exclusivos.

## 🚀 Tecnologias

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** TypeScript
- **Banco de Dados:** [Supabase](https://supabase.com/)
- **Estilização:** Vanilla CSS (Modern CSS Variables)
- **Segurança:** Row Level Security (RLS)

## 🛠️ Funcionalidades

- [x] **Interface Multi-etapa:** Reduz a carga cognitiva e aumenta a conversão.
- [x] **Design Premium:** Tema dark com gradientes vibrantes em `#df2026`.
- [x] **Máscara de Telefone:** Formatação automática em tempo real `(00) 00000-0000`.
- [x] **Validação de E-mail:** Garante a integridade dos leads capturados.
- [x] **Seleção de Bônus:** Interface visual para escolha de recompensas.
- [x] **Persistência Segura:** Envio direto para o Supabase com proteção RLS.

## ⚙️ Configuração

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/triton-form.git
cd triton-form
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Variáveis de Ambientes
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=seu_url_do_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sua_chave_anon_publica
```

### 4. Setup do Banco de Dados (Supabase)
Execute o SQL abaixo no seu painel do Supabase para criar a tabela e as políticas de segurança:

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  email text,
  phone text,
  bonus_selected text
);

-- Habilitar Segurança
alter table leads enable row level security;

-- Política de Inserção Pública
create policy "Permitir inserção pública" 
on leads for insert to anon with check (true);
```

### 5. Executar localmente
```bash
npm run dev
```

## 🎨 Design System

| Elemento | Valor |
| :--- | :--- |
| **Cor Primária** | `#df2026` (Vermelho Triton) |
| **Fundo** | `#050505` |
| **Tipografia** | Inter (Google Fonts) |
| **Efeito** | Glassmorphism (Backdrop Blur 12px) |

---

<div align="center">
  <p>Desenvolvido com ❤️ para Triton Lead Systems</p>
</div>
