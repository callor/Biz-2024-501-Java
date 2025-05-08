#!/bin/bash

DOCKER_APP_NAME=mail_front
BASE_PATH="/home/emp/email/mail-front/mail_front"

EXIST_BLUE=$(docker ps | grep -i ${DOCKER_APP_NAME}_blue)

#  project up
echo "<<< tsFront application is about to run... >>>"

if [ -z "$EXIST_BLUE" ]; then
	echo "<<< blue up >>>"
	docker volume create --name=mail_blue_front_package
    docker volume create --name=mail_blue_front_build

	echo "<<< blue volume data initial start >>>"
    rm -rf /home/emp/docker/volumes/mail_blue_front_package/_data/
    mkdir /home/emp/docker/volumes/mail_blue_front_package/_data
    rm -rf /home/emp/docker/volumes/mail_blue_front_build/_data/
    mkdir /home/emp/docker/volumes/mail_blue_front_build/_data
    echo "<<< blue volume data initial end >>>"

	docker-compose -f ${BASE_PATH}/docker-compose-blue.yml up -d --build
	if [ $? -eq 0 ]; then
		sleep 10s
		docker-compose -f ${BASE_PATH}/docker-compose-green.yml down
	else
		echo "<<< docker-compose blue build error!!! >>>"
		docker container prune -f
		exit 9
	fi
else
	echo "<<< green up >>>"
	docker volume create --name=mail_green_front_package
    docker volume create --name=mail_green_front_build
	
    echo "<<< green volume data initial start >>>"
    rm -rf /home/emp/docker/volumes/mail_green_front_package/_data/
    mkdir /home/emp/docker/volumes/mail_green_front_package/_data
    rm -rf /home/emp/docker/volumes/mail_green_front_build/_data/
    mkdir /home/emp/docker/volumes/mail_green_front_build/_data
    echo "<<< green volume data initial end >>>"

	docker-compose -f ${BASE_PATH}/docker-compose-green.yml up -d --build
	if [ $? -eq 0 ]; then
		sleep 10s
		docker-compose -f ${BASE_PATH}/docker-compose-blue.yml down
	else
		echo "<<< docker-compose green build error!!! >>>"
		docker container prune -f
		exit 9
	fi
fi
