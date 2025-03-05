import db from './config';
import { hash, compare } from 'bcrypt';
import Database from 'better-sqlite3';

interface UserRecord {
  id: number;
  email: string;
  password: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateUserData {
  email: string;
  password: string;
  name?: string;
}

// SQL statements
const SQL = {
  insertUser: `
    INSERT INTO users (email, password, name)
    VALUES (@email, @password, @name)
    RETURNING id, email, name, created_at, updated_at
  `,
  findUserByEmail: `
    SELECT id, email, password, name, created_at, updated_at
    FROM users
    WHERE email = ?
  `,
  findUserById: `
    SELECT id, email, name, created_at, updated_at
    FROM users
    WHERE id = ?
  `
};

// Prepared statements are created when first used
let statements: {
  insertUser?: ReturnType<typeof db.prepare>;
  findUserByEmail?: ReturnType<typeof db.prepare>;
  findUserById?: ReturnType<typeof db.prepare>;
} = {};

function prepareStatements() {
  if (!statements.insertUser) {
    statements.insertUser = db.prepare(SQL.insertUser);
    statements.findUserByEmail = db.prepare(SQL.findUserByEmail);
    statements.findUserById = db.prepare(SQL.findUserById);
  }
}

export async function createUser(data: CreateUserData): Promise<User> {
  prepareStatements();
  const hashedPassword = await hash(data.password, 10);
  
  try {
    return statements.insertUser!.get({
      email: data.email,
      password: hashedPassword,
      name: data.name || null,
    }) as User;
  } catch (error) {
    if ((error as any).code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw new Error('Email already exists');
    }
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function authenticateUser(email: string, password: string): Promise<User> {
  prepareStatements();
  const user = statements.findUserByEmail!.get(email) as UserRecord | undefined;
  
  if (!user) {
    throw new Error('Email not found');
  }

  const isValid = await compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Incorrect password');
  }

  // Don't return the password hash
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}

export function getUserById(id: number): User | null {
  prepareStatements();
  return statements.findUserById!.get(id) as User | null;
}

export function getUserByEmail(email: string): User | null {
  prepareStatements();
  const user = statements.findUserByEmail!.get(email) as UserRecord | undefined;
  if (!user) return null;
  
  // Don't return the password hash
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}
