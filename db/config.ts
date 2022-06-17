export = {
    development: {
        client: "postgresql",
        connection: {
            host: "localhost",
            port: 5432,
            user: "postgres",
            password: "password",
            database: "postgres"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + "/migrations",
            tableName: "knex_migrations",
            extension: "ts"
        },
    }
} as { [key: string]: object}