FROM oraclelinux:7-slim

#################################################### START 
# Install Oracle Client
# Caching...
RUN yum update -y
RUN yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
  yum-config-manager --disable ol7_developer_EPEL && \
  yum -y install oracle-instantclient19.3-basiclite && \
  rm -rf /var/cache/yum     
#################################################### END

#################################################### Puppeteer Library Install
RUN yum -y install pango libXcomposite libXcursor libXdamage libXext libXi libXtst cups-libs libXScrnSaver libXrandr GConf2 alsa-lib atk gtk3
####################################################

#################################################### NODEJS 
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs
####################################################

ARG PORT
ARG PROJECT_PATH
ARG ENV_FILE_NAME
ARG MAX_MEMORY

RUN npm install -g pm2 yarn @nestjs/cli

WORKDIR /usr/src/app

COPY $PROJECT_PATH .

RUN cp src/config/env/$ENV_FILE_NAME src/config/env/.env

RUN yarn install --frozen-lockfile --production && yarn build

EXPOSE $PORT 

CMD ["yarn", "start:prod"]
