#!/bin/bash

#better docker processing formatting
alias dps="docker ps -a --format 'table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Command}}\t{{.CreatedAt}}\t{{.Status}}'"
source ~/.bashrc

## Build docker image from Dockerfile located in current directory
#docker build -t keeper:node-latest .

## Docker command to run container image
#docker run -p 80:5000 -p 27017:27017 -d --name keeper --restart unless-stopped keeper:node-latest

## Add user to docker group
#usermod -aG docker $USER
