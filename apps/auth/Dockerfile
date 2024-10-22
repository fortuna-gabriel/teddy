FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system auth && \
          adduser --system -G auth auth

COPY dist/apps/auth auth/
RUN chown -R auth:auth .

RUN npm --prefix auth --omit=dev -f install

CMD [ "node", "auth" ]
