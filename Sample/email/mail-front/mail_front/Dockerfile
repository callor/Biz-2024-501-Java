FROM node:20-alpine3.19

RUN apk add bash

ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

RUN apk --no-cache add tzdata && \
      cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
      echo "Asia/Seoul" > /etc/timezone

RUN mkdir -p /app
WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]