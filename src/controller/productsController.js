import { productDAO } from "../DAO/productDAO.js"
import logger from "../utils/logger.js"

const getAllProductsController = async (req, res) => {
    try {
        const { email } = req.session
        const { cartId } = req.session
        const { avatar } = req.session
        //en este controller debo capturar el id de carrito del user para usarlo en el llamado a los metodos de cart.
        // console.log(req.user.username)
        // console.log(req.user._id)
        console.log("**********session.userId************",req.session.userId)
        console.log("----------session.cartId------------",req.session.cartId)
        
        const products = await productDAO.getAll()
    
        res.render("plantillaProducts.ejs", { email, products, cartId, avatar })
    } catch (error) {
        logger.error(error)
    }
}

const getOneProductController = async (req, res) => {
    try {
        const { id } = req.params
        const { email } = req.user
    
        const products = await productDAO.getById(id)
    
        res.render("plantillaProducts.ejs", { email, products })
    } catch (error) {
        logger.error(error)
        res.redirect('/api/products/all')
    }
}

const postNewProduct = async (req, res) => {
    try {
        const newProduct = req.body
        const { email } = req.user
    
        await productDAO.createDocument(newProduct)
        const products = await productDAO.getAll()
        
        res.render("plantillaProducts.ejs", { email, products })
    } catch (error) {
        logger.error(error)
        res.redirect('/api/products/all')
    }
}

export { getAllProductsController, getOneProductController, postNewProduct }