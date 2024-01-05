# google-keep-react
Mock design of google keep: https://keep.google.com

Features: add notes, delete notes, update notes

Developed with Docker, NGINX, React, Nodejs (express), Mongo

NGINX is used as a reverse proxy to the nodejs server, where nodejs serves a reactjs app.

To just view react app demo go here:
[Demo](#react-app-demo)

# Getting started

```bash
git clone https://github.com/Crelloc/google-keep-react.git && cd google-keep-react
```

# To run locally using docker-compose
Prerequisites:
- Docker server: https://docs.docker.com/engine/install/#server
- Docker Compose: https://docs.docker.com/compose/install/linux/#install-the-plugin-manually

To build and run:

```bash
docker-compose up -d
```

If using an external mongo database like mongo atlas or have mongo installed elsewhere then
set the environment variable 'MONGODB_ATLAS_URI' in ./backend/.env to the mongodb url.

You will need to create the .env file in ./backend directory.

```bash
touch ./backend/.env
```

and edit the file:

```.env
MONGODB_ATLAS_URI="mongodb_url"
```

By default the mongodb url is: mongodb://mongodb:27017/notesDB

Then run:

```bash
docker-compose -f external-db.yml up -d
```

## To interact with the app
Access the app through your browser at http://localhost or http://localhost:8080 if port 80 is not enabled on your router.


# React App Demo:
https://8o3yh.csb.app/

# CodeSandbox Link:
https://codesandbox.io/s/using-pre-built-react-components-8o3yh
