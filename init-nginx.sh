#!/bin/sh

# Start NGINX
nginx -g "daemon off;" &

# Generate a dummy certificate to start NGINX
openssl req -x509 -nodes -newkey rsa:4096 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -days 365 -subj "/CN=localhost"

# Request a Let's Encrypt certificate using Certbot
certbot certonly --nginx --non-interactive --agree-tos -m phucle.2971.dd@gmai.com -d weeb.wiki

# Configure NGINX to use the certificate
sed -i "s/#listen 443 ssl;/listen 443 ssl;/g" /etc/nginx/conf.d/nginx.conf
sed -i "s/#ssl_certificate \/etc\/nginx\/certs\/fullchain.pem;/ssl_certificate \/etc\/letsencrypt\/live\/weeb.wiki\/fullchain.pem;/g" /etc/nginx/conf.d/nginx.conf
sed -i "s/#ssl_certificate_key \/etc\/nginx\/certs\/privkey.pem;/ssl_certificate_key \/etc\/letsencrypt\/live\/weeb.wiki\/privkey.pem;/g" /etc/nginx/conf.d/nginx.conf

# Reload NGINX to apply changes
nginx -s reload

# Keep the container running
tail -f /dev/null
