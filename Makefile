# build:
# 	docker build -t plants:generic .
# run:
# 	docker run -p 8080:8080 plants:generic yarn gatsby serve -p 8080 -H 0.0.0.0
# clean:
# 	docker container rm -f $(shell docker container ls -aq)
# push:
# 	docker tag ghcr.io/lachlancourt/plants:latest plants:generic && docker push ghcr.io/lachlancourt/plants:latest
# pull:
# 	docker pull ghcr.io/lachlancourt/plants:latest && docker tag ghcr.io/lachlancourt/plants:latest plants:generic
fetch-dev-db:
	docker pull postgres && docker tag postgres dev-db:latest
start-dev-db:
	docker run --name dev-db -e POSTGRES_PASSWORD=password -d dev-db
remove-dev-db:
	docker container stop dev-db && docker container rm dev-db
build:
	docker build -t qwik:build .