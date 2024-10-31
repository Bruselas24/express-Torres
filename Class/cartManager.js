const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        //asignamos la ruta del JSON y cargamos los datos existentes
        this.filePath = path.join(__dirname, '../Json/carts.json');
        this.carts = this.loadCarts();
    }

    loadCarts() {

        //comprobamos que exista el archivo y lo recuperamos
        //caso contrario se devuelve un array vacio
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    createCart() {

        //para crear un carrito recuperaremos el ultimo id y lo aumentaremos en 1
        //caso contrario (no existe ningun carrito) lo inicialzamos en 1
        const newId = this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1;
        const newCart = { id: newId, products: [] };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCarts(){
        return this.carts
    }

    getCartById(id) {
        //buscamos el carrito por su id y lo retornamos
        return this.carts.find(cart => cart.id === id);
    }

    addProductToCart(cid, pid, ptitle) {
        //para añadir un producto primero recuperamos el carrito por su id
        const cart = this.getCartById(cid);

        //de existir el carrito buscaremos el indice del producto 
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product === pid);
            //si el producto ya se encuentra en el carrito aumentamos su cantidad en 1
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                //caso contrario lo inicializamos en 1
                cart.products.push({ product: pid, tittle: ptitle, quantity: 1 });
            }
            //guadramos en el JSON y retornamos el carrito actualizado
            this.saveCarts();
            return cart;
        }
        return null;
    }

    saveCarts() {
        //guardamos en el JSON el array carts de la clase 
        fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2));
    }
}

//exportamos la clase
module.exports = CartManager;
