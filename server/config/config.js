const protocol = 'mongodb:/';
const server = 'ds261540.mlab.com:61540';
const port = process.env.PORT;
const databaseName = 'bookshub';
const dbuser = 'root';
const dbpassword = 'bookshub123456';
const secret = 'purple-unicorn';

const connectionString = `${protocol}/${dbuser}:${dbpassword}@${server}/${databaseName}`;

module.exports = { port, connectionString, secret };