# Cloning PlanetScale's remnant2toolkit database for local use...

## Dump the database from PlanetScale

```bash
pscale database dump remnant2toolkit main
```

## Rename the dump folder

The folder will have a long name that is not very useful. Rename it to `pscale` for clarity.

## Run the schema sorter script

Because of how imports work, the schemas must be imported before the data themselves. However, the tables are not named in this way by default. Running the below script will append the number 1 to the file name for any file that contains the word `schema`, ensuring it gets imported first.

```bash
sh rename-sql-schema.sh
```

## Import the database

The below example assumes your local database is named `remnant2toolkit`.

```bash
cat pscale/*.sql | mysql remnant2toolkit -u root -p
```

## Other useful commands

### Creating a new MYSQL database

```bash
# Connect to the MySQL server
mysql -u root -p

CREATE DATABASE remnant2toolkit;
CREATE USER 'r2tk'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON remnant2toolkit.* TO 'r2tk'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

### Dropping all tables in the database

Right-click all tables in MySQL Workbench and select DROP TABLES. This will provide the SQL statement to do so.
