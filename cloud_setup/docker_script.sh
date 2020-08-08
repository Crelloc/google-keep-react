#!/bin/bash

#better docker processing formatting
echo 'export FORMAT="ID\t{{.ID}}\nNAME\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"' >> ./test
echo 'alias dps="docker ps -a --format=$FORMAT"' >> ./test

#add user to docker group
usermod -aG docker $USER
