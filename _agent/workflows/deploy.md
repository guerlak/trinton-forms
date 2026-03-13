---
description: Como fazer o deploy da aplicação na Vercel
---

Para deixar seu formulário online e acessível para todos, siga estes passos:

1. **Suba para o GitHub**:
   - Crie um repositório no GitHub.
   - Envie seu código atual:
     ```bash
     git add .
     git commit -m "feat: setup lead capture with supabase"
     git branch -M main
     git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
     git push -u origin main
     ```

2. **Conecte à Vercel**:
   - Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub.
   - Clique em **"Add New"** > **"Project"**.
   - Importe o repositório que você acabou de criar.

3. **Configure as Variáveis de Ambiente (CRÍTICO)**:
   - Durante a configuração na Vercel, abra a aba **"Environment Variables"**.
   - Adicione as mesmas chaves que estão no seu `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
   - Clique em **"Deploy"**.

4. **Domínio**:
   - A Vercel vai te dar um link gratuito (ex: `triton-form.vercel.app`).
   - Se você tiver um domínio próprio (.com.br, .com), pode configurar na aba **"Settings" > "Domains"** dentro da Vercel.
