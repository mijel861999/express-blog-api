import Category from '../models/Category.js'

class CategoryController {
	async getCategories(req, res) {
		try {
			const newCategory = new Category()

			const categories = await newCategory.getCategories()

			return res.json({
				data: categories,
				error: false,
				success: true,
				message: "Categorías obtenidas con éxito",
			})
		} catch(e) {
			console.log(e)
			return res.json({
				error: true,
				success: false,
				message: "Error al traer las categorías",
			})
		}
	}

	async getCategoryById(req, res) {
		const { id } = req.params

		try {
			const newCategory = new Category()
			const category = await newCategory.getCategory(id)

			if (!category) {
				return res.status(404).json({
					error: false,
					success: false,
					message: "No se encontró la categoría",
				})
			}

			return res.json({
				data: category,
				error: false,
				success: true,
				message: "Categoría obtenida con éxito",
			})

		} catch(e) {
			console.log(e)
			return res.json({
				error: true,
				success: false,
				message: "Error al obtener la categoría",
			})
		}
	}

	async createCategory(req, res) {
		const { category } = req.body

		try {
			const newCategory = new Category(category)

			const rows = newCategory.create()

			return res.json({
				id: rows.insertId,
				category,
				error: false,
				success: true,
				message: "Categoría creada con éxito",
			})
		} catch(e) {
			console.log(e)
			return res.json({
				error: true,
				success: false,
				message: "Error al crear la categoría",
			})
		}	
	}
}

/*
export const getCategories = async (_, res) => {
	try {
		// const [categories] = await pool.query('SELECT * FROM category')
		const categories = await mysqlConnection.executeQuery('SELECT * FROM category')

		res.json({
			data: categories,
			error: false,
			success: true,
			message: "Categorías obtenidas con éxito",
		})
	} catch(e) {
		console.log(e)
		res.json({
			error: true,
			success: false,
			message: "Error al traer las categorías",
		})
	}
}

export const getCategoryById = async (req, res) => {
	const { id } = req.params

	try {
		const [category] = await pool.query('SELECT * FROM category WHERE id = ?', [id])

		if (category.length <= 0) {
			return res.status(404).json({
				error: false,
				success: false,
				message: "No se encontró la categoría",
			})
		}

		return res.json({
			data: category,
			error: false,
			success: true,
			message: "Categoría obtenida con éxito",
		})

	} catch(e) {
		console.log(e)
		return res.json({
			error: true,
			success: false,
			message: "Error al obtener la categoría",
		})
	}	
}

export const createCategory = async (req, res) => {
	const { category } = req.body

	try {
		const [rows] = await pool.query('INSERT INTO category (category) VALUES (?)', [category])
		res.json({
			id: rows.insertId,
			category,
			error: false,
			success: true,
			message: "Categoría creada con éxito",
		})
	} catch(e) {
		console.log(e)
		res.json({
			error: true,
			success: false,
			message: "Error al crear la categoría",
		})
	}	
}

*/

export default CategoryController
