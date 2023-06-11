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
	docker run --name dev-db -e POSTGRES_PASSWORD=password --hostname docker --network qwik-network -d dev-db
remove-dev-db:
	docker container stop dev-db && docker container rm dev-db
# disconnect-network:
# 	docker network disconnect qwik-network dev-db && docker network disconnect qwik-network qwik-app
create-network:
	docker network create qwik-network
# connect-db-to-network:
# 	docker network connect qwik-network dev-db
# connect-app-to-network:
# 	docker network connect qwik-network qwik-app
build-docker:
	docker build -t qwik:latest .
build:
	make build-docker
clean: 
	docker container prune -f
start-app:
	docker run -p 3000:3000 --name qwik-app -e DATABASE_URL=postgresql://postgres:password@172.19.0.2:5432 -it --entrypoint sh --network qwik-network qwik:latest ./start.sh
run:#make start-dev-db && 
	make clean && make start-app
