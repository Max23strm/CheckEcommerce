/// =========================================================================== ///
/// ============================= HENRY-COMMERCE ============================== ///
/// =========================================================================== ///

"use strict";

const { match } = require("assert");

let products = [];
let categories = [];

module.exports = {
  reset: function () {
    // No es necesario modificar esta función.
    products = [];
    categories = [];
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====

  addCategory: function (category) {
    // Agrega el nombre de una nueva categoría verificando que no exista anteriormente.
    // Debe retornar el string 'Categoría creada correctamente'.
    // En caso de existir, no se agrega y debe arrojar el Error 'La categoría ya existe' (ver JS throw Error)
    if(categories.includes(category)){
      throw new Error("La categoría ya existe")
    } 
      categories.push(category)
      return 'Categoría creada correctamente'
    
  },

  listCategories: function () {
    // Devuelve un arreglo con todas las categorías
    return categories
  },

  addProduct: function (name, brand, category, stock) {
    // Agrega un nuevo producto.
    // Si la categoría no existe (según el arreglo de categorías), no agrega el producto y arroja un Error 'La categoría ingresada no existe'
    // Inicialmente su propiedad reviews (reseñas) debe ser un arreglo vacío.
    // Va a ser necesario guardar, en su propiedad categoryId, el número (id) de la categoría y NO su nombre (que es lo que recibimos por parámetros).
    // El ID de categoría debe empezar desde 1 y no desde 0.
    // Su propiedad 'available' (disponible) debe ser un booleano (true o false) de acuerdo al stock.
    // Su propiedad rating (puntaje) será inicialmente 0.
    // Si el producto es agregado con éxito debe retornar el producto creado.
    if(!categories.includes(category)){
      throw new Error ('La categoría ingresada no existe')
    }
    let dispo=stock>0?true:false

    let obj={
      name,
      brand,
      stock,
      reviews: [],
      categoryId: categories.indexOf(category)+1,
      available: dispo,
      rating:0
    }
    products.push(obj)
    return obj
  },

  listProducts: function (category, fullName) {
    // Devuelve un arreglo con todos los productos.
    // Si recibe un nombre de categoría (category) como parámetro, debe filtrar sólo los productos pertenecientes a la misma.
    // Si la categoría no existe, arroja un Error 'La categoría no existe'
    // Si ADEMÁS de la categoría, también recibe un segundo parámetro (fullName) en 'true', debe devolver únicamente la denominación completa (Marca + Nombre) de los productos.
    if(category && !categories.includes(category)){
      throw new Error("La categoría no existe")
    } 
    
    if(category && categories.includes(category) && fullName){
      var arr=[]
      products.filter(e=>{
        if(e.categoryId==(categories.indexOf(category)+1)){
          console.log(`${e.brand}  ${e.name}`)
          arr.push( `${e.brand} ${e.name}`)
        }
      })
      return arr
    } else if (category && categories.includes(category)){
      return products.filter(e=>e.categoryId==(categories.indexOf(category)+1))
    }

    return products
  },

  addReview: function (name, stars, text, user) {
    // Recibe: nombre de producto (name), cantidad estrellas dadas al producto (stars), comentario (text) y nombre del comprador (user).
    // Debe encontrar el producto que coincida con el nombre recibido (name).
    // Si no existe el producto, arroja un Error 'Producto no encontrado'
    // Si falta algún parámetro (stars, text o user) no agrega la reseña y arroja el Error 'Faltan parámetros'
    // El puntaje (stars) debe tener un rango válido entre 1 y 5 inclusive. En caso contrario no se guarda la reseña y arroja el Error 'Puntaje inválido'.
    // Debe agregar a la propiedad 'reviews' del producto (recordemos que es un arreglo), un objeto con la siguiente forma:
    // { stars: stars, text: text, user: user }
    // En caso de agregar correctamente, debe devolver el string "Reseña agregada correctamente".
    // Además debe actualizar el puntaje (rating) del producto, según el promedio de todas las reseñas obtenidas hasta el momento (stars).
    
    let coso=products.find(e=>e.name==name)

    if(!coso){
      throw new Error("Producto no encontrado")
    }
    if(stars && text && user){
      if(stars<6 && stars>0){
        coso.reviews.push({stars,text,user})
        coso.rating=0
        coso.reviews.forEach(e => {
          coso.rating+=e.stars
        });
        coso.rating=coso.rating/coso.reviews.length
        return "Reseña agregada correctamente"
      }
        throw new Error('Puntaje inválido')
    } else{
      throw new Error('Faltan parámetros')
    }
    
    
    
  },
  
  getReviews: function (name) {
    // Devuelve las reseñas (reviews) de un producto en particular.
    // Si no existe el producto, arroja un Error 'Producto no encontrado.'
    // Si el producto existe pero no tiene reseñas, devuelve un arrego vacío.'
    let coso=products.find(e=>e.name===name)
    if (!coso) throw new Error ('Producto no encontrado')

    return coso.reviews

  },

  getRating: function (name) {
    // Devuelve el puntaje (rating) de un producto en particular.
    // Si no existe el producto, arroja un Error 'Producto no encontrado'
    // Si no tiene reseñas, se espera que el rating sea 0.
    // Si no recibe parámetros (name) devuelve sólo el nombre de los 5 productos mejor puntuados, ordenados de mayor a menor puntaje
    
    if(name){
      let coso=products.find(e=>e.name===name)
      if(!coso){
        throw new Error("Producto no encontrado")
      }
      return coso.rating
    } 
    var miArr=products.sort((a, b) => {
      return a.rating - b.rating;
    })
    .reverse()
    .slice(0,5)
    .map(e=>{
      return e.name
    });

    return miArr
  },
};
