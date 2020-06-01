const https = require("https");

let gogProduct = class GOGProduct {
  /**
   * @constructor
   */
  constructor(_productJson) {
    this.productJson = _productJson;
  }

  /**
   * @returns {String} product title
   */
  getTitle = () => this.productJson.title;

  /**
   * @returns {String} product card link
   */
  getProductCard = () => this.productJson.links.product_card;

  /**
   * @returns {String} direct purchase link
   */
  getPurchaseLink = () => this.productJson.links.purchase_link;

  /**
   * @returns {Date} release date
   */
  getReleaseDate = () => new Date(this.productJson.release_date);

  /**
   * @returns {Dictionary} dictionary with available languages
   */
  getAvailableLanguages = () => this.productJson.languages

  /**
   * @returns {Dictionary} dictionary with compatible systems
   */
  getAvailableSystems = () => this.productJson.content_system_compatibility

  /**
   * @param {Boolean} advanced false by default
   * @returns {Dictionary} a dictionary with links to images
   */
  getImages = (advanced = false) => {
      if (advanced) {
        return this.productJson.images;
      }
      else {
          let images = {}
          const { background, logo, icon } = this.productJson.images
          images = Object.assign({ background, logo, icon })
          return images
      }
  }

  /**
   * Returns a promise with a dictionary related to prices
   *
   * @param {String} countryCode "US" by default
   * @returns {Promise} A promise with a dictionary about pricing
   */
  getPrices = (countryCode = "US") => {
    const id = this.productJson.id;
    promise = new Promise(function (resolve, reject) {
      const urlPrice = `https://api.gog.com/products/prices?ids=${id}&countryCode=${countryCode}`;
      https
        .get(urlPrice, function (res) {
          res.on("data", function (chunk) {
            const priceJson = JSON.parse(chunk);
            const pricePath = priceJson._embedded.items[0]._embedded.prices[0];

            const { basePrice, finalPrice } = pricePath;

            const basePriceNumber = parseInt(basePrice) / 100;
            const finalPriceNumber = parseInt(finalPrice) / 100;
            const discount = finalPriceNumber / basePriceNumber;
            const currency = pricePath.currency.code;

            const priceDictionary = {
              basePrice: basePriceNumber,
              finalPrice: finalPriceNumber,
              discount: discount,
              currency: currency,
            };
            resolve(priceDictionary);
          });
        })
        .on("error", function (err) {
          reject(err);
        });
    });
    return promise;
  };
};

function getProductById(id) {
  const url = `https://www.gog.com/api/products/${id}`;
  promise = new Promise(function (resolve, reject) {
    https
      .get(url, function (res) {
        res.on("data", function (chunk) {
          const product = new gogProduct(JSON.parse(chunk));
          resolve(product);
        });
      })
      .on("error", function () {
        reject(err);
      });
  });
  return promise;
}

module.exports = { getProductById };
