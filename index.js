const { getProductById } = require("./src/gogwrapper.test")

getProductById("1207658787").then(function(product) {
    console.log(product.getTitle())
    console.log(product.getReleaseDate())
    console.log(product.getAvailableLanguages())
    console.log(product.getAvailableSystems())
    console.log(product.getImages(true))
    product.getPrices("BR").then(function(basePrice) {
        console.log(basePrice)
    })
}).catch(function(err) {
    console.log(err)
})