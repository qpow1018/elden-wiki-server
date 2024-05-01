# run with db admin
PGPASSWORD="postgres_password" psql -U postgres -h localhost -f _setup/init_role.sql
# run with project db admin
PGPASSWORD=1234 psql -U bg -h localhost --dbname=bg_programming_skeleton  -f _setup/init_tables.sql
