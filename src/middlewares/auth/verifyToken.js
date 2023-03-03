import jwt from 'jsonwebtoken'
import { sendErrorResponse } from '../../responses/responses.js'

function verifyToken(req, res, next) {
	const token = req.headers.authorization?.split(' ')[1];

	if(!token) {
		return sendErrorResponse(res, 400, "Debe enviar un token")
	}
	
	try {
		const payload  = jwt.verify(token, "miguel861999")
		req.user = payload
		next()
	} catch(e) {
		return sendErrorResponse(res, 400, "Error al verificar el token", e)
	}
}

export default verifyToken
