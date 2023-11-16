#!/bin/bash

#better docker processing formatting
echo 'export FORMAT="ID\t{{.ID}}\nNAME\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"' >> /home/$USER/.bashrc
echo 'alias dps="docker ps -a --format=$FORMAT"' >> /home/$USER/.bashrc
source ~/.bashrc

## Build docker image from Dockerfile located in current directory
#docker build -t keeper:node-latest .

## Example Docker command to run container image
#docker run -p 80:5000 -p 27017:27017 -d --name keeper --restart unless-stopped keeper:node-latest

## Add user to docker group
#usermod -aG docker $USER

#clean up all docker images and volumes
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

#create docker images and run them

docker compose -f docker-compose.yml up --build --force-recreate --remove-orphans backend mongodb nginx