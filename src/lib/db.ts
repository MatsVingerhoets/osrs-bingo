
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

interface UserTable {
  id: number;
  username: string;
  password: string;
}

interface Database {
  users: UserTable;
}

// Use env vars to switch between local and prod
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL, // full URI from Supabase or local
      max: 10,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    }),
  }),
});

export default db;

