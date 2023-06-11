#! /bin/sh
# Run pending migrations
node add-seed-migration.js
node node_modules/prisma/build migrate deploy

# Start application
node server/entry.express


