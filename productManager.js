const fs = require("fs");

class ProductManager {
    static idProduct = 0;
    constructor() {
        this.path = "./books.json"
        this.products = [];
    }

    addProduct = async (product) => {
        try{
            if (!product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                product.stock === undefined
            ) {
                console.error("Todos los campos del producto son obligatorios");
                return;
            }
    
            if (this.products.some(prod => prod.code === product.code)) {
                console.error(`El código (code) del producto ${product.title} ya está en uso`);
                return;
            }

            ProductManager.idProduct++
    
            this.products.push({ id: ProductManager.idProduct, ...product });
    
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        }catch (error) {
            console.log("Error al agregar el producto", error);
        }
    }

    getProducts = async () => {
        try {
            const allProducts = await fs.promises.readFile(this.path, "utf-8");
            const parsedProducts = JSON.parse(allProducts);

            if (parsedProducts.length === 0) {
                console.log("No hay productos disponibles.");
            } else {
                console.log(parsedProducts);
            }
        } catch {
            console.log(this.products);
        }
    }

    getProductById = async (id) => {
        try {
            const allProducts = await fs.promises.readFile(this.path, "utf-8");

            const book = (JSON.parse(allProducts)).find(product => product.id === id);

            if (!book) {
                console.error(`El producto de id "${id}" no existe`);
                return;
            }

            console.log(book);
        }catch (error){
            console.log("No se pudo enconrar el producto requerido", error);
        }
    }

    updateProduct = async (id, field, newValue) => {
        const allProducts = await fs.promises.readFile(this.path, "utf-8");

        const products = JSON.parse(allProducts);

        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            console.error(`El producto de id "${id}" no existe`);
            return;
        }

        products[productIndex][field] = newValue;

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        console.log(`Producto actualizado: ${field} = ${newValue}`);
    }

    deleteProduct = async (id) => {
        const allProducts = await fs.promises.readFile(this.path, "utf-8");

        const products = JSON.parse(allProducts);

        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            products.splice(productIndex, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log(`El producto de id "${id}" ha sido eliminado`);
        } else {
            console.log(`El producto de id "${id}" no existe`);
        }
    }
}

//TESTING MANEJO DE ARCHIVOS
//1
const book = new ProductManager();
//2
/* book.getProducts(); */
//3
/* book.addProduct({
    title: "Bajo la misma estrella",
    description: "Romance de tapa dura",
    price: 8999,
    thumbnail: "Sin imagen",
    code: "abc1",
    stock: 25
});

book.addProduct({
    title: "Harry Potter y la piedra filosofal",
    description: "Libro de fantasía escrito por la autora J.K.Rowling",
    price: 22000,
    thumbnail: "Sin imagen 2",
    code: "abc12",
    stock: 30
});

book.addProduct({
    title: "El hobbit",
    description: "De categoría fantasía escrito por J.R.R.Tolkien",
    price: 10500,
    thumbnail: "Sin imagen 3",
    code: "abc123",
    stock: 15
});

book.addProduct({
    title: "Cinder",
    description: "Historia de fantasía. Cuenta con 4 libros en saga",
    price: 18500,
    thumbnail: "Sin imagen 4",
    code: "abc1234",
    stock: 40
}); */
//4
/* book.getProducts(); */
//5
/* book.getProductById(2); */
/* book.getProductById(9); */
//6
/* book.updateProduct(1, "title", "María Sofía Caucota"); */
//7
/* book.deleteProduct(9); */
/* book.deleteProduct(3); */