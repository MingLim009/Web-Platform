# AchouPro — Plataforma de Profissionais

> Plataforma fullstack para conectar clientes a profissionais qualificados em Aracaju e região.
> **Cliente:** Magno Carvalho · **Domínio:** [AchouPro.com](https://achoupro.com)

---

## Stack

| Camada | Tecnologia |
|---|---|
| **Frontend** | Next.js 14 (App Router) + React 18 + TypeScript |
| **Estilo** | CSS custom (identidade AchouPro) + Google Fonts (Poppins) |
| **Backend** | Next.js API Routes (mesmo projeto) |
| **Banco de dados** | Prisma ORM — SQLite (dev) → PostgreSQL/MySQL (produção) |
| **Autenticação** | NextAuth.js (Credentials + JWT) |
| **Validação** | Zod |
| **Hash de senha** | bcryptjs |
| **SEO** | Sitemap.xml dinâmico, robots.txt, OpenGraph, schema friendly URLs |

---

## Como rodar localmente (desenvolvimento)

### 1. Pré-requisitos
- **Node.js 18+** (recomendado 20 LTS) — https://nodejs.org
- Editor (VS Code recomendado)

### 2. Instalar dependências

```bash
cd project
npm install
```

### 3. Configurar variáveis de ambiente

```bash
# Windows PowerShell
Copy-Item .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

Edite o arquivo `.env.local` se quiser mudar a senha admin (padrão funciona para dev).

### 4. Criar banco de dados + migrar + popular

```bash
# Cria o arquivo SQLite (prisma/dev.db) e aplica o schema
npx prisma migrate dev --name init

# Popula com admin Magno + 14 categorias + 4 cidades + 10 profissionais + reviews
npm run prisma:seed
```

### 5. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Abra: **http://localhost:3000**

---

## Credenciais Admin

| Campo | Valor padrão (dev) |
|---|---|
| URL | http://localhost:3000/admin/login |
| E-mail | `contato@magnocorretor.com` |
| Senha | `MagnoAdmin@2026` |

> 🔒 **Em produção:** troque a senha imediatamente. Veja seção "Deploy".

---

## Estrutura do projeto

```
project/
├── prisma/
│   ├── schema.prisma           # Modelo do banco
│   └── seed.ts                 # 10 profissionais + admin
├── public/
│   └── logo.svg                # Logo AchouPro
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz (Poppins, metadata SEO)
│   │   ├── page.tsx            # Home
│   │   ├── globals.css         # Identidade visual AchouPro
│   │   ├── sitemap.ts          # SEO automático
│   │   ├── robots.ts           # SEO
│   │   ├── not-found.tsx       # Página 404
│   │   ├── buscar/             # /buscar (com filtros)
│   │   ├── profissional/[slug] # /profissional/carlos-silva-eletricista
│   │   ├── sobre/              # /sobre
│   │   ├── termos/             # /termos (LGPD)
│   │   ├── privacidade/        # /privacidade (LGPD)
│   │   ├── styles/v2.css       # Redesign UI v2
│   │   ├── admin/
│   │   │   ├── login/          # /admin/login (público)
│   │   │   └── (panel)/        # rotas protegidas (route group)
│   │   │       ├── layout.tsx  # Sessão obrigatória
│   │   │       ├── page.tsx    # Dashboard
│   │   │       ├── profissionais/  # CRUD profissionais
│   │   │       ├── avaliacoes/     # Moderação
│   │   │       ├── categorias/
│   │   │       └── cidades/
│   │   └── api/
│   │       ├── auth/[...nextauth]/   # NextAuth handler
│   │       ├── profissionais/        # CRUD API
│   │       └── avaliacoes/           # Avaliações API
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProCard.tsx
│   │   ├── AuthProvider.tsx
│   │   ├── CookieBanner.tsx
│   │   └── CategoryIcon.tsx
│   ├── lib/
│   │   ├── prisma.ts           # Prisma singleton
│   │   ├── auth.ts             # NextAuth config
│   │   ├── queries.ts          # Queries reutilizáveis
│   │   └── utils.ts            # Helpers + SITE config
│   ├── types/
│   │   └── next-auth.d.ts      # Tipos custom
│   └── middleware.ts           # Proteção de rotas admin
├── .env.example
├── .env.production.example
├── ecosystem.config.js
├── nginx.conf.example
├── MANUAL_ADMIN.md
├── scripts/use-production-schema.js
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## Comandos úteis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (hot reload) |
| `npm run build` | Build de produção (gera Prisma client + Next bundle) |
| `npm start` | Roda o build de produção |
| `npm run lint` | Verifica padrões de código |
| `npm run prisma:studio` | Abre Prisma Studio (UI do banco) em :5555 |
| `npm run prisma:migrate` | Cria/aplica migration |
| `npm run prisma:reset` | ⚠️ Reseta o banco (apaga tudo) |
| `npm run prisma:seed` | Re-popula com dados iniciais |
| `npm run db:use-prod` | Troca schema para PostgreSQL (producao) |
| `npm run db:use-dev` | Volta schema para SQLite (desenvolvimento) |
| `npm run db:migrate-deploy` | Aplica migrations em producao |

---

## Funcionalidades implementadas (Fase 1)

### Público
- [x] Home com hero, busca, categorias, profissionais em destaque, depoimentos
- [x] Página de busca com filtros (categoria, cidade, bairro, avaliação, selos)
- [x] Filtros server-side via URL (compartilháveis e indexáveis no Google)
- [x] Perfil completo do profissional: galeria, bio, especialidades, avaliações
- [x] Submissão pública de avaliações (1 nota geral 1-5, requer aprovação)
- [x] Página Sobre com missão, valores e diferenciais
- [x] Páginas /termos e /privacidade (LGPD)
- [x] Banner de cookies com consentimento
- [x] Programa Fundador: 6 meses gratuitos (200 vagas)
- [x] WhatsApp clicável em todos os pontos (link real `+5579999515563`)
- [x] Layout 100% responsivo (mobile-first, drawer, bottom sheet, sticky CTA)
- [x] SEO: meta tags, OpenGraph, sitemap.xml, robots.txt, URLs amigáveis

### Admin (`/admin`)
- [x] Login seguro com NextAuth (JWT + bcrypt)
- [x] Dashboard com estatísticas (profissionais, vagas Fundador, avaliações)
- [x] Listagem completa de profissionais
- [x] Criar / editar / remover profissionais
- [x] Moderar avaliações (aprovar, despublicar, remover)
- [x] Recálculo automático da média de avaliação ao moderar
- [x] Visualizar categorias e cidades
- [x] Logout
- [x] Layout responsivo do painel (sidebar drawer no mobile)

### Arquitetura preparada para Fase 2+
- Modelo de dados multi-cidade / multi-estado já estruturado
- Schema de avaliações com resposta do profissional
- Sistema de selos extensível (Fundador, Verificado, 24h, Domiciliar)
- ContactRequest model pronto para receber leads
- API REST completa pronta para alimentar app mobile futuro

---

## Deploy em produção — Hostinger VPS (recomendado para o cliente)

> **IMPORTANTE:** Os planos "Hospedagem WordPress" e "Hospedagem de Sites" da Hostinger **NAO servem** para este projeto. Eles so rodam PHP/WordPress. O AchouPro precisa de **VPS KVM** (Node.js + PostgreSQL).

**Plano recomendado:** VPS KVM 2 (~R$ 55/mes) — https://www.hostinger.com.br/vps

### Arquivos de deploy ja prontos no projeto

| Arquivo | Funcao |
|---------|--------|
| `.env.production.example` | Variaveis de ambiente de producao (com NEXTAUTH_SECRET gerado) |
| `ecosystem.config.js` | Configuracao PM2 (auto-restart) |
| `nginx.conf.example` | Proxy reverso + SSL + cache |
| `prisma/schema.production.prisma` | Schema PostgreSQL para producao |
| `scripts/use-production-schema.js` | Troca schema SQLite -> PostgreSQL |
| `MANUAL_ADMIN.md` | Manual do painel admin para o cliente |

---

### Passo 1 — Preparar o VPS (Ubuntu 22.04)

Conecte via SSH e instale as dependencias:

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Nginx + Certbot (SSL gratuito)
sudo apt install -y nginx certbot python3-certbot-nginx

# PM2 (gerenciador de processos)
sudo npm install -g pm2
```

---

### Passo 2 — Configurar PostgreSQL

```bash
sudo -u postgres psql

CREATE USER achoupro_app WITH PASSWORD 'SUA_SENHA_FORTE_AQUI';
CREATE DATABASE achoupro OWNER achoupro_app;
GRANT ALL PRIVILEGES ON DATABASE achoupro TO achoupro_app;
\q
```

---

### Passo 3 — Enviar o codigo para o servidor

```bash
# No seu computador (ou via Git no VPS):
git clone https://github.com/SEU_USUARIO/achoupro.git /var/www/achoupro
cd /var/www/achoupro

# Instalar dependencias
npm install --production=false

# Configurar variaveis de ambiente
cp .env.production.example .env
nano .env   # edite DATABASE_URL, senhas, dominio

# Trocar schema para PostgreSQL
npm run db:use-prod

# Gerar Prisma client + aplicar migrations + popular dados
npx prisma generate
npx prisma migrate deploy
npm run db:seed

# Build de producao
npm run build
```

---

### Passo 4 — Iniciar com PM2

```bash
mkdir -p logs
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup   # siga as instrucoes para boot automatico
```

---

### Passo 5 — Configurar Nginx + SSL

```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/achoupro
sudo ln -s /etc/nginx/sites-available/achoupro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL gratuito (Let's Encrypt)
sudo certbot --nginx -d achoupro.com.br -d www.achoupro.com.br
```

---

### Passo 6 — Apontar o dominio (DNS)

No painel do registrador do dominio (Hostinger ou Registro.br):

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | IP_DO_VPS |
| A | www | IP_DO_VPS |

Aguarde propagacao (ate 24h, geralmente 1-2h).

---

### Passo 7 — Verificar e entregar ao cliente

1. Acesse `https://achoupro.com.br` — home deve carregar
2. Acesse `https://achoupro.com.br/admin/login` — login deve funcionar
3. Entregue credenciais do admin (ver `.env.production.example`)
4. Entregue `MANUAL_ADMIN.md` ao cliente
5. Configure backup diario:

```bash
# Cron de backup do PostgreSQL (todo dia as 3h)
echo "0 3 * * * pg_dump -U achoupro_app achoupro | gzip > /var/backups/achoupro_\$(date +\%Y\%m\%d).sql.gz" | sudo crontab -
```

---

### Credenciais de producao (geradas em 03/06/2026)

| Campo | Valor |
|-------|-------|
| URL admin | `https://achoupro.com.br/admin/login` |
| Email | `contato@magnocorretor.com` |
| Senha | Ver `.env.production.example` (campo `ADMIN_PASSWORD`) |
| NEXTAUTH_SECRET | Ver `.env.production.example` |

> Troque a senha do admin apos o primeiro acesso e entregue ao cliente com seguranca (WhatsApp privado, nao em grupo).

---

### Opcao alternativa — Vercel (preview rapido, gratis)

Para mostrar ao cliente antes do VPS:

1. Crie conta em https://vercel.com
2. Importe o repositorio
3. Use banco Postgres gratuito (Neon.tech ou Supabase)
4. Configure as variaveis de `.env.production.example`
5. Deploy automatico — URL tipo `achoupro.vercel.app`

> Vercel e ideal para **preview/demo**. Para producao definitiva com email @achoupro.com.br, use o VPS Hostinger.

---

## Migração da identidade visual

Tudo já está alinhado ao Kit de Marca AchouPro enviado pelo cliente:

| Token | Hex |
|---|---|
| `--c-blue` | `#0077FF` |
| `--c-orange` | `#FF6A00` |
| `--c-green` | `#28C76F` (verde verificado / WhatsApp) |
| `--c-navy` | `#0D1B2A` (fundo escuro) |
| `--c-gold` | `#F59E0B` (selo Fundador) |
| Fonte | Poppins (400-800) |
| Logo | SVG escalável em `/public/logo.svg` |

---

## Próximos passos (Fase 2)

- [ ] Upload de imagens (galeria) — Cloudinary ou UploadThing
- [ ] Sistema de assinaturas (Mercado Pago / Asaas)
- [ ] Chat interno entre cliente e profissional
- [ ] Notificações por e-mail (Resend ou SendGrid)
- [ ] Verificação de documento do profissional
- [ ] Página de cadastro público de novo profissional
- [ ] Importador de CSV em massa
- [ ] Multi-idioma
- [ ] PWA (instalável no celular)
- [ ] App Android/iOS via React Native (reaproveita 80% da API)

---

## Suporte

- 🌐 Site oficial: https://achoupro.com (em breve)
- 📧 Contato: contato@magnocorretor.com
- 💬 WhatsApp: (79) 99951-5563
- 🐙 GitHub: @Magno1979

**Feito com cuidado para o lançamento do AchouPro em Aracaju, SE.**
