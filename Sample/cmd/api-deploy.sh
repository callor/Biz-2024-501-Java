#!/bin/bash

WORKSPACE=/home/emp/.jenkins/workspace/API-TOTAL/
DOCKER_DIR=/home/emp/server/docker/
API_DIR=/home/emp/server/api/

cd ${WORKSPACE}

cp -rf docker/* ${DOCKER_DIR}

rm -rf ${API_DIR}/*

cp -rf {src,nest-cli.json,tsconfig*.json,yarn.lock,package.json} ${API_DIR}

cd ${DOCKER_DIR}

echo -e "\n\n\nSub Build.....\n\n\n"

docker-compose stop sub_server    

sleep 3

docker-compose up -d --build sub_server

echo -e "\n\n\nSub Build Complete\n\n\n"

sleep 10

echo -e "\n\n\nMain Build....\n\n\n"

docker-compose stop main_server

sleep 3

docker-compose up -d --build main_server

echo -e "\n\n\nMain Build Complete\n\n\n"

docker system prune -af
    

