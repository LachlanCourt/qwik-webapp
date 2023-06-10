FROM node:18-alpine3.17

COPY . ./code
WORKDIR /code

# RUN apk add --no-cache jq
# RUN jq 'del(.devDependencies)' package.json > package.json.temp && mv package.json.temp package.json

RUN yarn install 
#--production --no-optional
RUN yarn build

FROM node:19-alpine3.16 as final

WORKDIR /code
# COPY --from=base ./code/public ./public
# COPY --from=base ./code/package.json ./package.json
# COPY --from=base ./code/node_modules ./node_modules
# COPY --from=base ./code/.cache ./.cache