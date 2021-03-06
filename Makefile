.PHONY: all

build:
	docker-compose build

up:
	docker-compose up -d channel

dev:
	docker-compose run --rm --name kchat_web -p 8000:8000 web

dev_front:
	docker-compose run --rm --name kchat_frontend -p 8080:8080 frontend

down:
	docker-compose down

bash:
	docker exec -it kchat_web bash

migrate:
	docker exec -it kchat_web python3 manage.py makemigrations
	docker exec -it kchat_web python3 manage.py migrate

backup:
	docker-compose exec db /usr/bin/mysqldump kchat > db_data/dump.sql

test:
	docker exec -it kchat_web bash scripts/test.sh
