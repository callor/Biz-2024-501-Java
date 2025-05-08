#!/bin/bash

WORKSPACE=/home/emp/.jenkins/workspace/TEST-API-TOTAL/
DOCKER_DIR=/home/emp/server/docker/
API_DIR=/home/emp/server/test/api/

cd ${WORKSPACE}

cp -rf docker/* ${DOCKER_DIR}

rm -rf ${API_DIR}/*

cp -rf {src,tsconfig*.json,yarn.lock,package.json} ${API_DIR}

cd ${DOCKER_DIR}

docker-compose stop test_server 

sleep 3

docker-compose up -d --build test_server   
    
docker system prune -fa
