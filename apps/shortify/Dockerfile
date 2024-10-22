FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system shortify && \
          adduser --system -G shortify shortify

COPY dist/apps/shortify shortify/
RUN chown -R shortify:shortify .

RUN npm --prefix shortify --omit=dev -f install

CMD [ "node", "shortify" ]
