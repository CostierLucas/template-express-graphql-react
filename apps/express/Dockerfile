FROM docker.io/node:lts-alpine as development
RUN apk add --no-cache python3 py3-pip make g++
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:express

FROM docker.io/node:lts-alpine as production
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE ${PORT}

USER node
WORKDIR /app

COPY --from=development /app/dist/apps/express ./
RUN npm install --only=production

CMD ["node", "main"] 