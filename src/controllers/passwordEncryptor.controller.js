import bcrypt from 'bcrypt'

class PasswordEncryptor {
	constructor() {
		this.saltRounds = 10;
	}

	async hashPassword(password) {
		const hashedPassword = await bcrypt.hash(password, this.saltRounds)

		return hashedPassword
	}

	async comparePassword(password, hashedPassword) {
		const match = await bcrypt.compare(password, hashedPassword)

		return match
	}
}

export default PasswordEncryptor
