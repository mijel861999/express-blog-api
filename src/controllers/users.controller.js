import { pool } from '../db.js'
import { sendSuccessResponse, sendErrorResponse } from '../responses/responses.js'
import { generateToken } from '../helpers/tokens.js'
import bcrypt from 'bcrypt'


export const getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const [user] = await pool.query('SELECT * FROM user WHERE id = ?', [id])

		const [currentUser] = user

		if (user.length <= 0) {
			return sendErrorResponse(res, 400, "No se encontró el usuario")
		}

		return sendSuccessResponse(res, "Usuario obtenido con éxito", currentUser)
	} catch(e) {
		console.log(e)

		return sendErrorResponse(res, 400, "Error al obtener al usuario", e)
	}
}

export const createUser = async (req, res) => {
	const { username, password, access_level_id, full_name, phone_number, email } = req.body

	try {
		const saltRounds = 10
		const password_hash = await bcrypt.hash(password, saltRounds)
		
		const [rows] = await pool.query('INSERT INTO user (username, password, access_level_id, full_name, phone_number, email, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, password, access_level_id, full_name, phone_number, email, password_hash])

		return sendSuccessResponse(res, "Usuario creado con éxito", {
			id: rows.insertId,
			username
		})
	} catch(e) {
		console.log(e)
		return sendErrorResponse(res, 400, "Error al crear un usuario", e)
	}
}

export const authenticateUser = async (req, res) => {
	const { username, password } = req.body

	try {
		const [rows, _] = await pool.query('SELECT * FROM user WHERE username = ?', [username])

		// Verificar si el usuario existe
		if (rows.length  === 0) {
			return sendErrorResponse(res, 400, "Usuario no encontrado")	
		}

		const user = rows[0]

		// Verificar si la contraseña coincide
		const passwordHash = user.password_hash
		const passwordMatch = await bcrypt.compare(password, passwordHash)
	
		if (!passwordMatch) {
			return sendErrorResponse(res, 400, "Contraseña incorrecta")	
		}

		// TODO: enviar token de autenticación
		const token = generateToken(user)
		return sendSuccessResponse(res, "Usuario logeado con éxito", {
			id: user.id,
			username: user.username,
			token
		})
	}catch(e) {
		console.log(e)
		return sendErrorResponse(res, 400, "Usuario no encontrado", e)	
	}
}
