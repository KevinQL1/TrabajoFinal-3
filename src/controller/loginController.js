import { cartDAO } from '../DAO/cartDAO.js'
import { userDAO } from '../DAO/userDAO.js'

const loginController = async (req, res) => {
    if(req.isAuthenticated()){
        console.log("user ya logeado")
        res.redirect("/api/products/all")
    } else { 
        console.log("user no logeado, por favor ingrese credenciales")
        res.render("plantillaLogin.ejs")
    }
    
}

const loginPostController = async (req, res) => {
    req.session.user = req.body.username

    //obtenemos los datos del usuario que logro logearse y los guardamos en el req.session
    const loggedUser = await userDAO.findOne(req.session.user)
    req.session.email = loggedUser.email
    req.session.userId = loggedUser._id
    req.session.phoneNumber = loggedUser.phoneNumber
    req.session.avatar = loggedUser.avatar

    //obtenemos los datos del carrito del user que logro logearse y guardamos su id en el req.session
    const loggedUserCart = await cartDAO.getByUserId(req.session.userId)
    req.session.cartId = loggedUserCart._id

    res.redirect("/api/products/all")
}

const logOutController = async (req, res) => {
    req.session.destroy()

    res.render("plantillaDeslogeo.ejs")
}

const loginErrorController = async (req, res) => {
    res.render('plantillaLoginError')
}

export { loginController, loginPostController, logOutController, loginErrorController }