# #!/bin/sh

# docker exec mongoimport --host mongodb --db mono --collection artists --file=docker-entrypoint-initdb.d/artists.json --jsonArray --mode upsert