---
title: Multiple Postgres databases in Docker container
date: "2019-10-09T23:42:32.169Z"
description: Create as many Postgres databases in a single Docker container as you want.
---

This will be a short one.

The official Postgres Docker [image](https://hub.docker.com/_/postgres) supports a few environment variables.
One of them, `POSTGRES_DB`, is responsible for holding a database name.
However, if you want your container to include more than one database (e.g **app** and **app_test**), you have to reach for different solutions.

One of them is to create a bash script that sets up multiple databases by `psql` command.
Postgres will execute it on database startup inside the container.
An example of such script, `create-multiple-postgresql-databases.sh`, can be found [here](https://github.com/mrts/docker-postgresql-multiple-databases/blob/master/create-multiple-postgresql-databases.sh). Credits to **mrts** at Github.

You can place it in whatever project directory you want, although `pg-init-scripts/` might be a good starting point.
Then, to make the script visible and executable by Postgres, it has to be mounted to the `/docker-entrypoint-initdb.d` container directory.

To mount a host directory to a container directory, we have to use [volumes](https://docs.docker.com/storage/volumes/).

Syntax: `<host directory>:<container directory>`.

WARNING: You cannot mount a single file to a directory, it works just for directories.

Final `docker-compose.yml`:

```yaml
version: "3.7"
services:
  db:
    container_name: "app_db"
    image: "postgres:11.5-alpine"
    volumes:
      - ./pg-init-scripts:/docker-entrypoint-initdb.d
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_MULTIPLE_DATABASES=app,app_test
```

The `${DB_USER}` syntax means that the `DB_USER` value is read from automatically loaded `.env` file placed inside the same directory as `docker-compose.yml`.

Corresponding `.env`:

```
DB_USER=someuser
DB_PASSWORD=somepassword
```

Remember, you shouldn't commit env files!
Create and commit `.env-example` file with empty secret values instead.

If you want to use a different path (e.g `.env-docker`), define `env_file` in `docker-compose.yml`:

```yaml
env_file:
  - ./.env-docker
```

Now, with every piece in place, run `docker-compose up` to start the service.

Happy coding!
