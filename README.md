# Qwik Webapp

This webapp is designed as a web interface for a separate bot that connects to the twitch API as a chatbot.

## Installation

1. Ensure postgres, node 20+, and yarn are installed
2. Create a `.env` file with the following data

```env
JWT_SECRET= <Random values for jwt encryption>

SENDGRID_API_KEY= <Sendgrid API Key (Only needed in production)>

SENDGRID_FROM_ADDRESS= <From email address>

DATABASE_URL= postgresql://<databasename>:password@0.0.0.0:PORT

ADMIN_EMAIL= <your-email>

ADMIN_PASSWORD= <your-password>

ADMIN_NAME= <your-name>
```

3. Run `yarn install`
4. Run `yarn prisma migrate dev` to populate your database with empty tables from the migration
5. Run `node add-global-admin.js` to seed the data provided as admin env vars as a global admin in the db
6. Run `yarn dev`

## Helpful commands

The makefile contains a number of helpful commands for running in docker. Builds to this repo build the docker image and run an audit on npm package security vulnerabilities before being able to merge. To test this will pass locally you can run `npm run build` to build the app baremetal, or `make build` to build the docker image locally. Once built locally you can run either `yarn serve` to run baremetal, or `make run` to run in docker.

To inspect the database locally you can run `yarn prisma studio` to open an in browser edit tool
