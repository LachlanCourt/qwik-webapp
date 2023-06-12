#! /bin/sh

# Run pending migrations
node add-seed-migration.js
node node_modules/prisma/build migrate deploy
rm -rf $(find . -type d -name "*seed_user*")

# Start application
node server/entry.express


