import { createPool } from 'mysql2/promise'

export const pool = createPool({
	host: 'localhost',
	user: 'root',
	password: 'toor',
	port: 3306,
	database: 'api_blog'
})

