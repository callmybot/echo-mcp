FROM node:24-slim AS base
ENV NODE_NO_WARNINGS=1
RUN mkdir /app && \
  chown node:node /app
WORKDIR /app

FROM base AS dev
RUN apt-get update && \
  apt-get upgrade -y && \
  npm install -g pm2 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*
USER node
VOLUME [ "/app" ]
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["pm2-runtime", "ecosystem.dev.config.cjs"]

FROM base
COPY ecosystem.prod.config.cjs package.json ./
RUN npm install --omit=dev
COPY src src
USER node
CMD ["node", "./src/main.mjs"]
