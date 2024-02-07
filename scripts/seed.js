const { db } = require('@vercel/postgres');
const {
    tasks,
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

async function seedTasks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "tasks" table if it doesn't exist
        console.log('Creating tasks table...');

        await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            details VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            priority VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `;

        console.log(`Created "tasks" table`);

        // Insert data into the "tasks" table
        const insertedTasks = await Promise.all(
            tasks.map(task => client.sql`
                    INSERT INTO tasks (name, details, status, priority)
                    VALUES (${task.name}, ${task.details}, ${task.status}, ${task.priority})
                    ON CONFLICT (id) DO NOTHING;
                `,
            ),
        );

        console.log(`Seeded ${insertedTasks.length} tasks`);
    } catch (error) {
        console.error('Error seeding tasks:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedTasks(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
