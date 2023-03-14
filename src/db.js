import MySQLDatabase from './helpers/MySQLDatabase.js'

/*
export const pool = createPool({
	host: 'localhost',
	user: 'root',
	password: 'toor',
	port: 3306,
	database: 'api_blog'
})
*/

export const config = {
	host: 'localhost',
	user: 'root',
	password: 'toor',
	port: 3306,
	database: 'api_blog'
}

const mysqlConnection = new MySQLDatabase(config)

export default mysqlConnection
