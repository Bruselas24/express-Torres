const fs = require('fs')
const path = require('path')

class ProductManager{

    constructor(){
        //asignamos la ruta del JSON y cargamos los datos existentes
        this.filePath = path.join(__dirname, '../Json/products.json')
        this.products = this.loadProducts();
    }

    loadProducts(){
        //recuperamos los productos existentes
        //caso contrario retornamos un array vacio
        if(fs.existsSync(this.filePath)){
            const data = fs.readFileSync(this.filePath, 'utf-8')
            return JSON.parse(data)
        }

        return []
    }

    saveProducts() {
        //guardamos los archivos en el JSON
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
    }

    getAllProducts(){
        //retornamos todos los productos
        return this.products
    }

    getProductById(id){
        //recuperamos un producto por su id
        return this.products.find(product => product.id == id)
    }

    addProduct(product){
        //usando la misma logica de los carritos para la generacion de ID
        //creamos nuevos productos y los guardamos en el JSON
        //devolvemos el producto nuevo
        const newId = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, updatedProduct) {
        //para actualizar un producto primero recuperamos el indice
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            //si existe el producto recuperaremos todos los campos del mismo
            //y luego le implantamos la informacion actualizada del producto
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this.saveProducts();
            return this.products[index];
        }
        //caso contrario retornamos null
        return null;
    }

    deleteProduct(id) {
        //para borrar un producto buscamos su indice
        //y mediante el metodo splice lo eliminamos y guardamos los cambios
        //retornamos true si la operacion es correcta
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        //si el producto no existe retornamos false
        return false;
    }
}

//exportaos la clase
module.exports = ProductManager