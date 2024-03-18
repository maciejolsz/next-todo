const { db } = require('@vercel/postgres');

async function seedMusicThemes(client) {
  try {

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    await client.sql`
        CREATE TABLE IF NOT EXISTS music_themes (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            url VARCHAR(255)
        );
    `;

    console.log(`Created "music_themes" table`);
    // add "url" property to each theme
    const music_themes = [
      {
        id: '410544b2-4001-4271-9855-fec4b6a6442c',
        name: 'None',
      },
      {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Hip-Hop',
      },
      {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Jazz',
      },
    ];

    // Insert data into the "music_themes" table
    music_themes.map((theme) => {
      return client.sql`
                  INSERT INTO music_themes (id, name, url)
                  VALUES (${theme.id}, ${theme.name}, ${theme.url})
                  ON CONFLICT (id) DO NOTHING;
                `;
    });

    console.log(`Seeded ${music_themes.length} music themes`);
  } catch (error) {
    console.error('Error seeding music themes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedMusicThemes(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

