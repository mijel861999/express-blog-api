import mysqlConnection from '../db.js'

export const getPong = async (req, res) => {
	const result = await mysqlConnection.executeQuery('SELECT 1 + 1 AS result')
	// const result = await pool.query('SELECT 1 + 1 AS result')
	res.json(result)
}
