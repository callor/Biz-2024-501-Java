#!/bin/bash

WORKSPACE=/home/emp/.jenkins/workspace/KMEMO-PRODUCTION/
DOCKER_DIR=/home/emp/front/docker/
DOCKER_COMPOSE_DIR=/home/emp/server/docker/
APP_DIR=/home/emp/front/next/

cd ${WORKSPACE}

cp -rf docker/* ${DOCKER_DIR}

rm -rf ${APP_DIR}/*

cp -rf {public,src,.babelrc,.env*,next-env.d.ts,package.json,tsconfig.json,yarn.lock} ${APP_DIR}

cd ${DOCKER_COMPOSE_DIR}

echo -e "\n\nFront SUB Server Build....\n\n"

docker-compose stop front_sub

sleep 3

docker-compose up -d --build front_sub

echo -e "\n\nFront SUB Server Build!\n\n"

sleep 10

echo -e "\n\nFront MAIN Server Build....\n\n"

docker-compose stop front_main

sleep 3

docker-compose up -d --build front_main

echo -e "\n\nFront MAIN Server Build!\n\n"

docker system prune -af
