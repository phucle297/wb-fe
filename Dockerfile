# Stage 1: Build the application
FROM node:20-slim AS build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps --ignore-scripts
COPY . /app
RUN npm run build

# Stage 2: Set up Nginx with SSL
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy built files
COPY --from=build /app/dist .

# Update Nginx configuration
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates
COPY --from=build /path/to/your/certs/fullchain.pem /etc/ssl/certs/
COPY --from=build /path/to/your/certs/privkey.pem /etc/ssl/private/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
