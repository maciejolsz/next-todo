const { db } = require('@vercel/postgres');
const {
    todos,
    users,
} = require('../app/lib/db-dummy-data/data');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                    INSERT INTO users (id, name, email, password)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                    ON CONFLICT (id) DO NOTHING;
                  `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedTodos(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "todos" table if it doesn't exist
        console.log('Creating todos table...');

        await client.sql`
            CREATE TABLE IF NOT EXISTS todos (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            details VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
          );
        `;

        console.log(`Created "todos" table`);

        // Insert data into the "todos" table
        const insertedTodos = await Promise.all(
            todos.map(todo => client.sql`
                        INSERT INTO todos (name, details, status)
                        VALUES (${todo.name}, ${todo.details}, ${todo.status})
                        ON CONFLICT (id) DO NOTHING;
                    `,
                ),
        );

        console.log(`Seeded ${insertedTodos.length} todos`);
    } catch (error) {
        console.error('Error seeding todos:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedTodos(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
