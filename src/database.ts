import * as sqlite3 from 'sqlite3';

export class Database {
    private db: sqlite3.Database;
    database!: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });

        this.createTable();
    }

    connect() {
        this.database = new sqlite3.Database(':memory:');
    }

    close() {
        this.database.close();
    }

    clearUsers() {
        return new Promise((resolve, reject) => {
            this.database.run('DELETE FROM users', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }


    private createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        dob TEXT NOT NULL
      );
    `;

        this.db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Users table created successfully.');
        });
    }

    public addUser(user: { name: string, email: string, dob: string }, callback: (err: any) => void) {
        const sql = `
      INSERT INTO users (name, email, dob)
      VALUES (?, ?, ?)
    `;
        this.db.run(sql, [user.name, user.email, user.dob], (err) => {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log('User added successfully.');
            callback(null);
        });
    }

    public getUser(id: number, callback: (err: any, row: any) => void) {
        const sql = `
      SELECT * FROM users
      WHERE id = ?
    `;
        this.db.get(sql, [id], (err, row) => {
            if (err) {
                console.error(err.message);
                return callback(err, null);
            }
            console.log('User fetched successfully.');
            callback(null, row);
        });
    }

    public deleteUser(id: number, callback: (err: any) => void) {
        const sql = `
      DELETE FROM users
      WHERE id = ?
    `;
        this.db.run(sql, [id], (err) => {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log('User deleted successfully.');
            callback(null);
        });
    }
}