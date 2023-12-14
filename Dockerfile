FROM node:20-slim AS build
WORKDIR /app
COPY package.json /app/package.json
RUN pnpm install
COPY . /app
RUN pnpm run build
EXPOSE 3000

CMD [ "pnpm", "run", "start" ]