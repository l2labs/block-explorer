docker run --name block-explorer-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=block-explorer -p 5432:5432 -v /data/db/block-explorer-db:/var/lib/postgresql/data -d postgres

docker run --name block-explorer-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=block-explorer -p 5432:5432 -v /mnt/md0/data/db/block-explorer-db:/var/lib/postgresql/data -d postgres
