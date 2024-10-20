const { getDb } = require("./db");

const TABLE_NAME = "books";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE book_id = ?`, id),

    add: async (title, description, published_year, author_id, genre_id) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (title, description, published_year, author_id, genre_id)
             VALUES (?, ?, ?, ?, ?)`,
            title, description, published_year, author_id, genre_id
        );
        return result.lastID;
    },

    edit: async (id, title, description, published_year, author_id, genre_id) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET title = ?, description = ?, published_year = ?, author_id = ?, genre_id = ?
             WHERE book_id = ?`,
            title, description, published_year, author_id, genre_id, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE book_id = ?`, id)
};
