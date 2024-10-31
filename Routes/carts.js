const express = require('express');
const router = express.Router();
//Traemos nuestro manager de carritos
const CartManager = require('../Class/cartManager');

//creamos una instancia del manager
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

// Obtener todos los carritos
router.get('/', (req,res) => {
    const carts = cartManager.getCarts()
    res.send(carts)
})

// Obtener productos de un carrito
router.get('/:cid', (req, res) => {
    //Utilizamos el metodo "getCartById" ´para obtener el carrito
    const cart = cartManager.getCartById(Number(req.params.cid));
    //si existe devolvemos los productos de dicho carrito
    if (cart) {
        res.json(cart.products);
    } else {
        //de no existir devolvemos un 404 de que no se encontro
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

// Agregar producto a un carrito
router.post('/:cid/product/', (req, res) => {
    //utilizamos el metodo "addProductToCart" 
    const updatedCart = cartManager.addProductToCart(Number(req.params.cid), Number(req.body.id), req.body.title);
    if (updatedCart) {
        //si pudo actualizar el producto devolveremos el actualizado
        res.json(updatedCart);
    } else {
        //caso contrario devolveremos un 404 de que no se encontro
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

//exportamos el router
module.exports = router;
