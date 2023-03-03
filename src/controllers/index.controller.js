import { pool } from '../db.js'

export const getPong = async (req, res) => {
	const result = await pool.query('SELECT 1 + 1 AS result')
	res.json(result)
}
