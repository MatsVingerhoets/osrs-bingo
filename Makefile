start:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose restart

logs:
	docker-compose logs -f $(service)

build:
	docker-compose build

shell:
	docker-compose run --rm --no-deps $(service) sh

psql:
	docker-compose exec postgres sh -c "su - postgres -c 'psql $(db)'"

dropdb:
	docker-compose exec postgres sh -c "su - postgres -c 'dropdb $(db)'"

createdb:
	docker-compose exec postgres sh -c "su - postgres -c 'createdb $(db)'"

db_sync:
	docker-compose exec app sh -c "npm  && exit"

db_migrate_dev:
	docker-compose exec app sh -c "npm run db:migrate:dev && exit"

db_migrate_test:
	docker-compose exec app sh -c "npm run db:migrate:test && exit"

install:
	docker-compose run --rm --no-deps app sh -ci 'npm install'

test:
	docker-compose exec $(service) sh -c "npm test"

fetch:
	make -i dropdb db=$(db)
	make createdb db=$(db)
	sh scripts/pgdump_remote.sh $(env) dump.psql
	docker cp dump.psql bouwdata_postgres:/var/lib/postgresql/dump.psql
	docker-compose exec postgres sh -c "su - postgres -c 'psql $(db) < dump.psql'"
	docker-compose exec postgres sh -c "rm /var/lib/postgresql/dump.psql"
	rm dump.psql

ssh:
	sh scripts/ssh_$(service).sh $(env)
