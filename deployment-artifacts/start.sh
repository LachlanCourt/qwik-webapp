#! /bin/sh

# Run pending migrations
node node_modules/prisma/build migrate deploy
node add-global-admin.js

# Start application
node server/entry.express


