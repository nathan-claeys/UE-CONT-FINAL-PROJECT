#!/bin/bash
set -e

# Wait for MySQL to be ready
while ! mysqladmin ping -h "localhost" --silent; do
    sleep 1
done

# Execute the SQL scripts
mysql -u root -p btata < /docker-entrypoint-initdb.d/01-schema.sql
mysql -u root -p btata < /docker-entrypoint-initdb.d/02-stored_procedures.sql