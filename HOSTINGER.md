# Deploy no Hostinger VPS KVM 2 (caminho alternativo)

> **Recomendação:** O caminho padrão é **Vercel + Cloudflare** (ver `VERCEL.md`). Este guia é o plano B se o cliente decidir usar a VPS Hostinger.

## Requisitos do servidor

- **VPS KVM 2** (2 vCPU, 8 GB RAM, 100 GB SSD) — ~R$ 35–55/mês
- Ubuntu 22.04 LTS
- Acesso root (SSH)
- Domínio apontando para o IP do servidor (registros A do `@` e `www`)

## 1. Preparar o servidor

```bash
# como root
apt update && apt upgrade -y
apt install -y curl git build-essential nginx certbot python3-certbot-nginx ufw fail2ban

# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm i -g pm2

# PostgreSQL 16
apt install -y postgresql postgresql-contrib
systemctl enable --now postgresql

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

## 2. Criar usuário e banco PostgreSQL

```bash
sudo -u postgres psql <<'SQL'
CREATE USER achoupro_app WITH PASSWORD 'TROQUE_SENHA_FORTE';
CREATE DATABASE achoupro OWNER achoupro_app;
GRANT ALL PRIVILEGES ON DATABASE achoupro TO achoupro_app;
SQL
```

## 3. Clonar o projeto e configurar `.env`

```bash
adduser --disabled-password --gecos "" achoupro
su - achoupro
git clone https://github.com/MingLim009/Web-Platform.git app
cd app

cp .env.production.example .env
# edite .env e troque DATABASE_URL e NEXTAUTH_URL
nano .env
```

Conteúdo mínimo do `.env`:
```env
DATABASE_URL="postgresql://achoupro_app:TROQUE_SENHA_FORTE@localhost:5432/achoupro?schema=public"
NEXTAUTH_SECRET="KvGEc2yMAZXrcW5Thg0WbRXfwv6Uk//ulZSGObuVfLk="
NEXTAUTH_URL="https://achoupro.com.br"
NEXT_PUBLIC_SITE_URL="https://achoupro.com.br"
NEXT_PUBLIC_SITE_NAME="AchouPro"
NEXT_PUBLIC_WHATSAPP="5579999515563"
NEXT_PUBLIC_INSTAGRAM="https://www.instagram.com/achouprofissional"
NEXT_PUBLIC_FACEBOOK="https://www.facebook.com/share/1EMqc22Nzk/"
NEXT_PUBLIC_CONTACT_EMAIL="contato@achoupro.com.br"
ADMIN_EMAIL="contato@magnocorretor.com"
ADMIN_PASSWORD="96F09fC@ciwTzI!CF1HSLm"
ADMIN_NAME="Magno Carvalho"
NODE_ENV="production"
```

## 4. Trocar para schema PostgreSQL e migrar

```bash
node scripts/use-production-schema.js
npm ci
npx prisma generate
npx prisma migrate deploy
npx prisma db seed   # popula categorias, cidades, admin, demo data
npm run build
```

## 5. Subir com PM2

```bash
pm2 start npm --name achoupro -- start
pm2 save
pm2 startup systemd -u achoupro --hp /home/achoupro
# Copie o comando que o PM2 imprimir e execute como root
```

## 6. Nginx reverse proxy + SSL

`/etc/nginx/sites-available/achoupro.com.br`:

```nginx
server {
  listen 80;
  server_name achoupro.com.br www.achoupro.com.br;

  client_max_body_size 16M;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

```bash
ln -s /etc/nginx/sites-available/achoupro.com.br /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# SSL gratuito Let's Encrypt
certbot --nginx -d achoupro.com.br -d www.achoupro.com.br --redirect --agree-tos -m contato@achoupro.com.br -n
```

## 7. Backups diários do banco

`/etc/cron.daily/achoupro-backup`:

```bash
#!/bin/bash
DEST=/var/backups/achoupro
mkdir -p $DEST
sudo -u postgres pg_dump achoupro | gzip > $DEST/achoupro-$(date +%F).sql.gz
find $DEST -name "achoupro-*.sql.gz" -mtime +14 -delete
```

```bash
chmod +x /etc/cron.daily/achoupro-backup
```

## 8. Email profissional `@achoupro.com.br`

**Recomendado (grátis): Cloudflare Email Routing** — não precisa de servidor SMTP no VPS.
1. Adicione o domínio no Cloudflare (DNS).
2. Email → Email Routing → Get started.
3. Crie alias `contato@achoupro.com.br` → encaminha para o Gmail do Magno.
4. Cloudflare adiciona os registros MX/TXT automaticamente.

Para enviar emails saindo do site (formulário de contato), use **Resend** ou **Brevo** grátis e configure SMTP via env.

## 9. Atualizações futuras (deploy)

```bash
su - achoupro
cd app
git pull
npm ci
npx prisma migrate deploy
npm run build
pm2 restart achoupro
```

## 10. Monitoramento básico

```bash
pm2 logs achoupro --lines 100
pm2 monit
journalctl -u nginx -f
```

---

## Comparativo Vercel × Hostinger VPS

| Aspecto | Vercel (recomendado) | Hostinger VPS KVM 2 |
|---|---|---|
| **Custo/ano** | R$ 0 + R$ 40 (domínio) | R$ 660 + R$ 40 |
| **HTTPS** | Automático | Configurar Certbot |
| **CDN global** | Sim, embutido | Não (só servidor SE/BR) |
| **Backups** | Builds versionados | Cron manual |
| **Manutenção** | Zero | Updates, security patches, monitoring |
| **Escalabilidade** | Automática | Manual (resize VPS) |
| **Banco** | Postgres hospedado | PostgreSQL local no VPS |
| **Tempo deploy** | Push → 2 min | Git pull + build + restart |
| **Quando faz sentido VPS** | >50k visitas/dia, necessidade de jobs, cron pesado, integrações específicas | Hoje (MVP) | — |
