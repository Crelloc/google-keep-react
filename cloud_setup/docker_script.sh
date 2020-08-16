#!/bin/bash

#better docker processing formatting
echo 'export FORMAT="ID\t{{.ID}}\nNAME\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"' >> /home/$USER/.bashrc
echo 'alias dps="docker ps -a --format=$FORMAT"' >> /home/$USER/.bashrc
source .bashrc

## Build docker image from Dockerfile located in current directory
#docker build -t keeper:node-latest .

## Docker command to run container image
#docker run -p 80:5000 -p 27017:27017 -d --name keeper --restart unless-stopped keeper:node-latest

## Add user to docker group
#usermod -aG docker $USER
