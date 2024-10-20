const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

const initDb = async () => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT,
            date TEXT,
            role INTEGER
        )`);
    await db.exec(`
                CREATE TABLE IF NOT EXISTS user_roles (
                    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    role_name TEXT
                )`);

    await db.exec(`
                    INSERT INTO user_roles (role_name)
                    values ("Пользователь"),
                           ("Админ")
                           ON CONFLICT(instrumentName) DO NOTHING;
                           )`);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS authors (
            author_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            biography TEXT
        )`);

    await db.exec(`
            CREATE TABLE IF NOT EXISTS genres (
                genres_id INTEGER PRIMARY KEY AUTOINCREMENT,
                genre_name TEXT NOT NULL
            )`);

    await db.exec(`
            CREATE TABLE IF NOT EXISTS books (
                book_id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                published_year INTEGER,
                author_id INTEGER NOT NULL,
                genre_id INTEGER NOT NULL
            )`);
    await db.exec(`
            CREATE TABLE IF NOT EXISTS reviews (
                review_id INTEGER PRIMARY KEY AUTOINCREMENT,
                rating INTEGER NOT NULL,
                review_text TEXT,
                user_id INTEGER,
                book_id INTEGER,
                date TEXT
            )`);
    await db.exec(`
                CREATE TABLE IF NOT EXISTS book_lists (
                    book_lists_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    book_id INTEGER,
                    list_name TEXT
                )`);
    await db.exec(`
                    CREATE TABLE IF NOT EXISTS discussions (
                        discussions_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER,
                        book_id INTEGER,
                        topic TEXT,
                        date TEXT
                    )`);
    await db.exec(`
                    CREATE TABLE IF NOT EXISTS comments (
                         comments_id INTEGER PRIMARY KEY AUTOINCREMENT,
                         user_id INTEGER,
                         discussion_id INTEGER,
                         comment_text TEXT NOT NULL,
                         date TEXT
                    )`);
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
}