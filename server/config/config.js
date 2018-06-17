const protocol = 'mongodb:/';
const server = 'localhost:27017';
const port = '3003';
const databaseName = 'BooksHub';
const secret = 'purple-unicorn';

const connectionString = `${protocol}/${server}/${databaseName}`;

module.exports = { port, connectionString, secret };