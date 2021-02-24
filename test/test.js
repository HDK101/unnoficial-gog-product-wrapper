const assert = require("assert");
const { getProductById, gogProduct } = require("../src/gogwrapper");

/*
The test uses id for X3: Terran War Pack
*/

describe("Getting a JSON of a GOG product by it ID and getting a class", function () {
    this.timeout(10000);
    describe("#getProductById()", function () {
        it("should return a resolved promise", function () {
            return getProductById("1441039322");
        });
    });
});

describe("Functions of GOG Product", function () {
    var currentProduct = null
    before("Get GOG Product", function (done) {
        getProductById("1441039322").then(function (product) {
            currentProduct = product;
            done();
        });
    });

    it("#getTitle", function () {
        var title = currentProduct.getTitle();
        console.log("Title: ", title);
        assert(title);
    });
    it("#getProductCard", function () {
        var productCard = currentProduct.getProductCard();
        console.log("Product Card: ", productCard);
        assert(productCard);
    });
    it("#getPurchaseLink", function () {
        var purchaseLink = currentProduct.getPurchaseLink();
        console.log("Purchase link: ", purchaseLink);
        assert(purchaseLink);
    });
    it("#getReleaseDate", function () {
        var releaseDate = currentProduct.getReleaseDate();
        console.log("Release Date: ", releaseDate);
        assert(releaseDate);
    });
    it("#getAvailableLanguages", function () {
        var availableLanguages = currentProduct.getAvailableLanguages();
        console.log("Available Languages: ", availableLanguages);
        assert(availableLanguages);
    });
    it("#getDLCs", function () {
        console.log(currentProduct.getDLCs());
    });
    it("#getImages", function () {
        const { background, logo, icon } = currentProduct.getImages();
        console.log("Background: ", background, "\nLogo: ", logo, "\nIcon:, icon");
        assert(background);
        assert(logo);
        assert(icon);
    });
    it("#getPrices, with 'US as parameter'", function () {
        return currentProduct.getPrices("US").then(function (prices) {
            console.table(prices);
        });
    });
    it("#getRatings", function () {
        return currentProduct.getRatings().then(function (ratingsDictionary) {
            console.table(ratingsDictionary);
        });
    });
});