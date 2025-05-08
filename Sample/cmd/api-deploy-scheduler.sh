#!/bin/bash

WORKSPACE=/home/emp/.jenkins/workspace/SCHEDULER/
DOCKER_DIR=/home/emp/server/docker/
API_DIR=/home/emp/server/api/

cd ${WORKSPACE}

cp -rf docker/* ${DOCKER_DIR}

rm -rf ${API_DIR}/*

cp -rf {src,nest-cli.json,tsconfig*.json,yarn.lock,package.json} ${API_DIR}

cd ${DOCKER_DIR}

echo -e "\n\n\nScheduler Build.....\n\n\n"

docker-compose stop scheduler    

sleep 3

docker-compose up -d --build scheduler

echo -e "\n\n\nScheduler Build Complete\n\n\n"

docker system prune -af
    

