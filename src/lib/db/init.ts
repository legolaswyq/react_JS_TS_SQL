import { initializeSchema, createDatabaseIndexes } from './schema';

// Track initialization state
let isInitialized = false;
let initializationError: Error | null = null;

export async function initializeDatabase() {
  if (isInitialized) return;
  if (initializationError) throw initializationError;

  try {
    console.log('Initializing database...');
    initializeSchema();
    console.log('Schema initialized');
    
    createDatabaseIndexes();
    console.log('Database indexes created');
    
    isInitialized = true;
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Database initialization failed:', error);
    initializationError = error instanceof Error ? error : new Error('Unknown error during database initialization');
    throw initializationError;
  }
}
