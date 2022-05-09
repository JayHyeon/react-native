const PostMapper = {
    SearchWordsList : `SELECT * FROM search ORDER BY createAt DESC, count DESC;`,
    SearchWordExist : `SELECT count(*) count FROM search WHERE words = ?;`,
    SearchWordInsert : `INSERT INTO search (words) VALUES (?);`,
    SearchWordUpdate : `UPDATE search SET count = count + 1, createAt = CURRENT_TIMESTAMP WHERE words = (?);`
}

export {
    PostMapper
}