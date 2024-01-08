FROM node:20-slim AS build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --legacy--peer-deps --ignore-scripts
COPY . /app
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]