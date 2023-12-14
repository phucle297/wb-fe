FROM node:20-slim AS build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --legacy--peer-deps --ignore-scripts
COPY . /app
RUN npm run build
EXPOSE 3000

CMD [ "npm", "run", "start" ]