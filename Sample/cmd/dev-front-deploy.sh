#!/bin/bash

WORKSPACE=/home/emp/.jenkins/workspace/KMEMO-DEVELOP/
DOCKER_DIR=/home/emp/front/docker/
DOCKER_COMPOSE_DIR=/home/emp/server/docker/
APP_DIR=/home/emp/front/test/next/

cd ${WORKSPACE}

cp -rf docker/* ${DOCKER_DIR}

rm -rf ${APP_DIR}/*

cp -rf {public,src,.babelrc,.env*,next-env.d.ts,package.json,tsconfig.json,yarn.lock} ${APP_DIR}

cd ${DOCKER_COMPOSE_DIR}

echo -e "\n\nFront ####TEST#### Server Build....\n\n"

docker-compose stop front_test

sleep 3

docker-compose up -d --build front_test

echo -e "\n\nFront ####TEST#### Server Build!\n\n"
