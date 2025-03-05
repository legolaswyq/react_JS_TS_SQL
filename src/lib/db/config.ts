import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

function createDatabaseConnection() {
  try {
    // Ensure data directory exists
    const DATA_DIR = path.join(process.cwd(), 'data');
    if (!fs.existsSync(DATA_DIR)) {
      console.log('Creating data directory:', DATA_DIR);
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const dbPath = path.join(DATA_DIR, 'db.sqlite');
    console.log('Initializing database at:', dbPath);

    // Initialize database connection with verbose logging
    const db = new Database(dbPath, {
      verbose: (message) => console.log('SQLite:', message),
    });

    // Configure database settings
    console.log('Configuring database settings...');
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    console.log('Foreign keys enabled');
    
    // Use WAL mode for better concurrency
    db.pragma('journal_mode = WAL');
    console.log('WAL mode enabled');
    
    // Set busy timeout to handle concurrent access
    db.pragma('busy_timeout = 5000');
    console.log('Busy timeout set');

    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

const db = createDatabaseConnection();
export default db;
