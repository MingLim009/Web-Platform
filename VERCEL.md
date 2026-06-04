# Deploy no Vercel (AchouPro)

## Variáveis de ambiente obrigatórias

No painel do projeto Vercel → **Settings → Environment Variables**, adicione:

| Variável | Exemplo | Observação |
|----------|---------|------------|
| `DATABASE_URL` | `postgresql://user:pass@host/db?sslmode=require` | **PostgreSQL** (Neon, Supabase, Vercel Postgres). Não use SQLite em produção. |
| `NEXTAUTH_SECRET` | gere com `openssl rand -base64 32` | Obrigatório para login admin |
| `NEXTAUTH_URL` | `https://seu-dominio.vercel.app` | URL pública do site (sem barra final) |
| `NEXT_PUBLIC_SITE_URL` | mesma URL de `NEXTAUTH_URL` | Usado em links e SEO |

Opcionais: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED`, `ADMIN_*` (apenas para seed).

## Banco de dados

1. Crie um Postgres (ex.: [Neon](https://neon.tech) gratuito).
2. Cole a connection string em `DATABASE_URL` no Vercel (Production + Preview).
3. Após o primeiro deploy com variáveis configuradas, rode migrações contra esse banco (local ou CI):

```bash
# Com DATABASE_URL apontando para o Postgres de produção:
node scripts/use-production-schema.js
npx prisma migrate deploy
npm run db:seed
```

O build no Vercel já troca automaticamente para o schema PostgreSQL (`scripts/vercel-prebuild.js`).

## Build sem `DATABASE_URL`

O site **compila** mesmo sem banco no momento do build (páginas dinâmicas + fallbacks). Em **runtime**, sem `DATABASE_URL` a home e o sitemap ficam vazios até você configurar o Postgres e rodar migrate/seed.
