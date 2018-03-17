const protocol = 'mongodb:/';
const server = 'localhost';
const port = '3003';
const databaseName = 'Books';

const connectionString = `${protocol}/${server}/${databaseName}`;

module.exports = { port, connectionString };