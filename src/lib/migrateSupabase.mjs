import { exec } from 'child_process';
import * as dotenv from 'dotenv';

// Load .env file (adjust path if needed)
dotenv.config({ path: '.env.local' });

// Get the Supabase DB URL from environment variables
const supabaseDbUrl = process.env.SUPABASE_DB_URL;

if (!supabaseDbUrl) {
  console.error('Error: SUPABASE_DB_URL is not defined in your .env file.');
  process.exit(1);
}

// Run dbmate migrations on Supabase with the --url flag
exec(`dbmate --url ${supabaseDbUrl} up`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing migration: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

