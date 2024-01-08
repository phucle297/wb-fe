# Use Node.js as the base image for the build stage
FROM node:20-slim AS build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps --ignore-scripts
COPY . /app
RUN npm run build

# Use NGINX as the base image for the runtime stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Install Certbot and create directory for SSL
RUN apk update && \
    apk add --no-cache certbot openssl cron


# Copy build output and NGINX configuration
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY init-nginx.sh /init-nginx.sh
RUN chmod +x /init-nginx.sh

# Setup auto-renewal for Certbot
RUN echo "0 12 * * * root /usr/bin/certbot renew --quiet --no-self-upgrade" >> /etc/crontabs/root

# Set the entrypoint script
ENTRYPOINT ["/init-nginx.sh"]
