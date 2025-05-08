FROM node:14

ARG ENV_FILE_NAME
ARG PROJECT_PATH

WORKDIR /usr/src/app

COPY ${PROJECT_PATH} .

RUN cp ${ENV_FILE_NAME} ./.env.local

ENV TZ Asia/Seoul

RUN yarn install --frozen-lockfile && yarn build

EXPOSE 3000

CMD ["yarn", "start"]