FROM docker.io/node:lts-alpine as development
RUN apk add --no-cache python3 py3-pip make g++
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=4200

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:front

FROM docker.io/node:lts-alpine as production
ENV NODE_ENV=production

USER node
WORKDIR /app

COPY --from=development /app/dist/apps/front ./
RUN npm install --only=production

CMD ["node", "front"]