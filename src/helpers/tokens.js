import jwt from 'jsonwebtoken'

export function generateToken(user) {

	const payload = {
		id: user.id,
		username: user.username,
		email: user.email
	}

	const token = jwt.sign(payload, 'miguel861999', { expiresIn: '1h' })
	
	return token
}
