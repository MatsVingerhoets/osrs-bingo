import { UserModel } from '@/models/User';
import { TeamModel } from '@/models/Team';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

interface Database {
  users: UserModel;
  teams: TeamModel
}

const isProd = process.env.NODE_ENV === 'production';

const pool = isProd
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for Supabase and some other providers
    },
  })
  : new Pool({
    database: 'osrs-bingo',
    host: 'postgres', // or 'postgres' if using Docker
    user: 'postgres',
    port: 5432,
    max: 10,
  });

const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});

export default db;
