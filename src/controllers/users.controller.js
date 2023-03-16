import mysqlConnection from '../db.js'
import { sendSuccessResponse, sendErrorResponse, sendEmptyResponse } from '../responses/responses.js'
import { generateToken } from '../helpers/tokens.js'
import User from '../models/User.js'

class UserController {
	createUser = async (req, res) => {
		const { username, password, access_level_id, full_name, phone_number, email } = req.body

		try {
			const newUser = new User({ username, password, access_level_id, full_name, phone_number, email })
			const rows = newUser.create()

			return sendSuccessResponse(res, "Usuario creado con éxito", {
				id: rows.insertId,
				username
			})
		} catch(e) {
			console.log(e)
			return sendErrorResponse(res, 400, "Error al crear un usuario", e)
		}
	}

	async authenticateUser(req, res) {
		const { username, password } = req.body

		try {
			const newUser = new User({ username, password })
			const user = await newUser.authenticate()			

			// Verificar si el usuario existe
			if (!user) {
				return sendEmptyResponse(res, "Usuario no encontrado")	
			}
	
			const passwordMatch = newUser.isGoodPassword(user.password_hash)

			if (!passwordMatch) {
				return sendEmptyResponse(res, "Contraseña incorrecta")	
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

}

export default UserController
