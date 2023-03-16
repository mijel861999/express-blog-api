import PasswordEncryptor from '../controllers/passwordEncryptor.controller.js'
import mysqlConnection from '../db.js'

class User {
	constructor({
			username,
			password,
			access_level_id,
			full_name,
			phone_number,
			email 
	}) {
		this.username = username
		this.password = password
		this.access_level_id = access_level_id
		this.full_name = full_name
		this.phone_number = phone_number
		this.email = email
		this.passwordEncryptor = new PasswordEncryptor()
	}	

	async create() {
			const password_hash	 = await this.passwordEncryptor.hashPassword(this.password)

			const rows = await mysqlConnection.executeQuery('INSERT INTO user (username, password, access_level_id, full_name, phone_number, email, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)', [this.username, this.password, this.access_level_id, this.full_name, this.phone_number, this.email, password_hash])
	
			return rows
	}

	async authenticate() {
		const [user, _] = await mysqlConnection.executeQuery('SELECT * FROM user WHERE username = ?', [this.username])

		return user
	}
	
	async isGoodPassword(passwordHash) {
		const passwordMatch = await this.passwordEncryptor.comparePassword(this.password, passwordHash)

		return passwordMatch
	}
}

export default User
