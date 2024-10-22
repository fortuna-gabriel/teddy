FROM docker.io/node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY dist ./dist/

RUN npm install --omit=dev

CMD ["tail", "-f", "/dev/null"]
