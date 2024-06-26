ARG NODE_IMAGE_NAME=20-alpine3.18

FROM node:${NODE_IMAGE_NAME} as base

COPY . ./code
WORKDIR /code

# Build application
RUN yarn install
RUN yarn build

# Set up database
RUN yarn prisma generate

FROM node:${NODE_IMAGE_NAME} as module-installation

COPY package.json ./code/package.json
COPY yarn.lock ./code/yarn.lock
COPY .yarnrc.yml ./code/.yarnrc.yml
COPY .yarn ./code/.yarn
WORKDIR /code

# Install production dependencies
RUN apk add --no-cache jq 
RUN jq 'del(.devDependencies)' package.json > package.json.temp && mv package.json.temp package.json
RUN yarn install

# Copy database client data
COPY --from=base ./code/node_modules/@prisma ./node_modules/@prisma
COPY --from=base ./code/node_modules/.prisma ./node_modules/.prisma
COPY --from=base ./code/node_modules/prisma ./node_modules/prisma

FROM node:${NODE_IMAGE_NAME} as final 

RUN apk add curl

COPY --from=base ./code/dist ./dist
COPY --from=base ./code/server ./server
COPY --from=base ./code/prisma ./prisma

COPY --from=base ./code/deployment-artifacts ./
RUN chmod +x start.sh

COPY --from=module-installation ./code/node_modules ./node_modules

