# #!/bin/sh

# sleep 2000

# # Check if the database has been seeded
# if [ ! -f /usr/src/app/.seeded ]; then
#   # Run your database seeding script (replace this with your actual seeding command)
# #   docker cp ../seed/artists.json mongodb:/artists.json

# #   sleep 2000
  
#   docker exec mongodb mongoimport --db mono --collection artists --file ../seed/artists.json --jsonArray --mode upsert
#   # Create a marker file to indicate that the database has been seeded
#   touch /usr/src/app/.seeded
# fi

# # Keep the container running
# # tail -f /dev/null

# npm start