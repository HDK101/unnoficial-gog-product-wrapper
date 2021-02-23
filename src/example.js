const { getProductById } = require("./gogwrapper")

/* getProductById("1207658787").then(function(product) { */
getProductById("1441039322").then(function (product) {
    console.log(product.getTitle())
    console.log(product.getReleaseDate())
    console.log(product.getAvailableLanguages())
    console.log(product.getAvailableSystems())
    console.log(product.getImages(true))
    product.getPrices("US").then(function (priceJson) {
        console.table(priceJson);
    });
    product.getTotalRatingsValue().then(function (ratingsValue) {
        console.log("Rating: ", ratingsValue);
    });
}).catch(function (err) {
    console.log(err);
})