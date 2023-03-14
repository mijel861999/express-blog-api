import { createPool } from 'mysql2/promise'


class MySQLDatabase {
	constructor(config) {
		this.pool = createPool(config)
	}

	async executeQuery(query, params) {
		const [rows] = await this.pool.query(query, params)
		
		return rows
	}

	async close() {
		await this.pool.end()
	}
}

export default MySQLDatabase
