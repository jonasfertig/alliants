# PostgreSQL Database

Use the Dockerfile to create a PostgreSQL Docker container
and fill it with our structure and test-data from the db_init-file.

docker build -t post-db .
docker run -p 5432:5423 post-db -n post-db
