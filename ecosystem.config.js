/**
 * AchouPro — Configuração do PM2 (gerenciador de processos)
 *
 * Como usar no VPS Hostinger:
 *   pm2 start ecosystem.config.js --env production
 *   pm2 save
 *   pm2 startup       # cria serviço de boot
 *
 * Outros comandos úteis:
 *   pm2 status        # ver estado do app
 *   pm2 logs achoupro # acompanhar logs
 *   pm2 restart achoupro
 *   pm2 stop achoupro
 *   pm2 reload achoupro  # zero-downtime
 *   pm2 monit         # dashboard em tempo real
 */

module.exports = {
  apps: [
    {
      name: "achoupro",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: __dirname,

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",

      max_memory_restart: "500M",

      watch: false,

      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,

      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
