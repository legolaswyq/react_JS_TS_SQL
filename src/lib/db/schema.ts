import db from './config';

interface SchemaVersion {
  version: number;
  created_at: string;
}

const SCHEMA_VERSION = 1;

// SQL statements for creating tables
const CREATE_SCHEMA_VERSION_TABLE = `
  CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

const CREATE_INDEXES = [
  'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)'
];

// Initialize database schema
export function initializeSchema() {
  const transaction = db.transaction(() => {
    try {
      console.log('Creating schema version table...');
      db.exec(CREATE_SCHEMA_VERSION_TABLE);

      // Check current schema version
      const currentVersion = db.prepare('SELECT version FROM schema_version ORDER BY version DESC LIMIT 1').get() as SchemaVersion | undefined;
      
      if (!currentVersion) {
        console.log('No schema version found, initializing schema...');
        
        // Create users table
        console.log('Creating users table...');
        db.exec(CREATE_USERS_TABLE);

        // Insert schema version
        console.log('Recording schema version...');
        db.prepare('INSERT INTO schema_version (version) VALUES (?)').run(SCHEMA_VERSION);
        
        console.log('Schema initialization complete');
      } else {
        console.log('Current schema version:', currentVersion.version);
        // Add future schema migrations here if needed
      }
    } catch (error) {
      console.error('Failed to initialize schema:', error);
      throw error;
    }
  });

  try {
    transaction();
  } catch (error) {
    console.error('Schema transaction failed:', error);
    throw error;
  }
}

// Create indexes for better performance
export function createDatabaseIndexes() {
  try {
    console.log('Creating database indexes...');
    CREATE_INDEXES.forEach((sql, index) => {
      console.log(`Creating index ${index + 1}...`);
      db.exec(sql);
    });
    console.log('Index creation complete');
  } catch (error) {
    console.error('Failed to create indexes:', error);
    throw error;
  }
}
