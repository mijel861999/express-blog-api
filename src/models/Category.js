import mysqlConnection from '../db.js'

class Category {
	constructor(category) {
		this.category = category
	}

	async create() {
		const rows = await mysqlConnection.executeQuery('INSERT INTO category (category) VALUES (?)', [this.category])

		return rows
	}

	async getCategories() {
		const categories = await mysqlConnection.executeQuery('SELECT * FROM category')

		return categories
	}

	async getCategory(id) {
		const [category] = await mysqlConnection.executeQuery('SELECT * FROM category WHERE id = ?', [id])

		return category
	}
}

export default Category
