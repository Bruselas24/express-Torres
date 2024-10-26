const express = require('express');
const router = express.Router();
//Traemos nuestro manager de Productos
const ProductManager = require('../Class/productManager');

//Creamos una instancia de nuestro manager
const productManager = new ProductManager();

// Obtener todos los productos
router.get('/', (req, res) => {
    //obtenemos todos los productos mediante el metodo "getAllProducts"
    //y lo enviamos al cliente
    const products = productManager.getAllProducts();
    res.json(products);
});

// Obtener un producto por ID
router.get('/:pid', (req, res) => {
    //obtenemos el producto mediante el metodo "getProductByid"
    const product = productManager.getProductById(Number(req.params.pid));
    if (product) {
        //Si el producto existe lo enviaremos
        res.json(product);
    } else {
        //Caso contrario enviaremos un 404 de que no se encontro
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
    //Para agregar un nuevo producto asignaremos lo enviado por el body
    //a una variable para luego añadir el producto mediante el metodo
    //"addProduct" y enviaremos un 201 con el producto añadido
    const newProduct = req.body;
    const addedProduct = productManager.addProduct(newProduct);
    res.status(201).json(addedProduct);
});

// Actualizar un producto
router.put('/:pid', (req, res) => {
    //para actualizar un producto usaremos el metodo "updateProduct"
    const updatedProduct = productManager.updateProduct(Number(req.params.pid), req.body);
    if (updatedProduct) {
        //Si encontro el producto a actualizar enviaremos el actualizado
        res.json(updatedProduct);
    } else {
        //Caso contrario un 404 de que no se encontro
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Eliminar un producto
router.delete('/:pid', (req, res) => {
    //Para eliminar un producto usaremos el metodo "deleteProduct"
    const deleted = productManager.deleteProduct(Number(req.params.pid));
    if (deleted) {
        //Si el producto existia devolveremos un 204 indicando que se elimino exitosamente
        res.status(204).send();
    } else {
        //Caso contrario enviaremos un 404 de que no se encontro
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

//Exportamos el router
module.exports = router;