# Vue3, Parcel, Vite, Nginx-server
## SSL-сертификат Let's Encrypt и автоматическое обновление

Проект использует Certbot для управления SSL-сертификатом от Let's Encrypt.

### Конфигурация Certbot

- Сертификаты хранятся в:  
  `/etc/letsencrypt/live/nataavodes.ru/`

- Certbot настроен на автоматическое продление через `cron` или `systemd`:

```bash
0 */12 * * * root test -x /usr/bin/certbot -a \! -d /run/systemd/system && perl -e 'sleep int(rand(43200))' && certbot -q renew

на проекте tarn