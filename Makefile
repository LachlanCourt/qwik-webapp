fetch-dev-db:
	docker pull postgres && docker tag postgres dev-db:latest
start-dev-db:
	docker run --name dev-db -e POSTGRES_PASSWORD=password --hostname docker --network qwik-network -d dev-db
remove-dev-db:
	docker container stop dev-db && docker container rm dev-db
create-network:
	docker network create qwik-network
build-docker:
	docker build -t qwik:latest .
build:
	make build-docker
prune: 
	docker container prune -f
start-app:
	docker run -p 3000:3000 --name qwik-app -e DATABASE_URL=postgresql://postgres:password@172.19.0.2:5432 -it --entrypoint sh --network qwik-network qwik:latest ./start.sh
run:
	make prune && make start-app
