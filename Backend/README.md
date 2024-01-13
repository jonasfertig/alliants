# Backend Services

    Here you can find all our Backend functionality, dockerized into little containers.
    Run through the following commands to build our app:

## Flask-API

    docker build -t flask-app .
    docker run -p 5000:50505 flask-app -n flask-app

## PostgreSQL

    docker build -t post-db ./db
    docker run -p 5432:5423 post-db -n post-db

## Adminer

    docker pull adminer
    docker run -p 8080:8080 adminer
