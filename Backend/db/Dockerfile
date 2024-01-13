# Use the official PostgreSQL 16 image
FROM postgres:16

# Set environment variables
ENV POSTGRES_USER=jonas
ENV POSTGRES_PASSWORD=winistdrin
ENV POSTGRES_DB=hackathon

# Copy SQL scripts to initialize the database
COPY db_init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432