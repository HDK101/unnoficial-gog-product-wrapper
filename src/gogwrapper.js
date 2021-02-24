const https = require("https");
const { getRawJSON } = require("./getjsonurl");

let GOGProduct = class Product {
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
   * @returns {Dictionary} array with DLCs
   * in each object, it contains:
   *  id, link, expanded_link
   */
  getDLCs = () => { 
    if (Object.keys(this.productJson.dlcs).length === 0)
    {
      return {};
    }
    return this.productJson.dlcs.products
  }

  getImagesAPILink = () => {
    return "https://images.gog-statics.com/"
  }

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
  getPricesDictionary = (countryCode) => {
    const id = this.productJson.id;
    const urlPrice = `https://api.gog.com/products/prices?ids=${id}&countryCode=${countryCode}`;
    return new Promise(function (resolve, reject) {
      getRawJSON(urlPrice).then(function (priceJSON) {
        if (priceJSON._embedded.items.length > 0) {
          const pricePath = priceJSON._embedded.items[0]._embedded.prices[0];

          const { basePrice, finalPrice } = pricePath;

          const basePriceNumber = parseInt(basePrice) / 100;
          const finalPriceNumber = parseInt(finalPrice) / 100;
          const discount = 1 - Math.round(finalPriceNumber / basePriceNumber * 100) / 100;
          const currency = pricePath.currency.code;

          const priceDictionary = {
            basePrice: basePriceNumber,
            finalPrice: finalPriceNumber,
            discount: discount,
            currency: currency,
          };
          resolve(priceDictionary);
        }
        else {
          reject("Prices not found!");
        }
      }).catch(function (err) {
        reject(err);
      });
    });
  }

  /**
   * getPricesDictionary wrapped.
   * Returns a promise with a dictionary related to prices
   *
   * @param {String} countryCode "US" by default
   * @returns {Promise} A promise with a dictionary about pricing
   */
  getPrices = (countryCode = "US") => {
    return this.getPricesDictionary(countryCode).catch(function (err) {
      console.error(err);
    });
  };


  getVerifiedRatingsValue = () => {
    const id = this.productJson.id;
    const urlReviewsVerified = `https://reviews.gog.com/v1/products/${id}
        /averageRating?reviewer=verified_owner`
    return new Promise(function (resolve, reject) {
      getRawJSON(urlReviewsVerified).then(function (verifiedRatings) {
        resolve(verifiedRatings.value);
      });
    });
  }

  getUnverifiedRatingsValue = () => {
    const id = this.productJson.id;
    const urlReviews = `https://reviews.gog.com/v1/products/${id}/averageRating`
    return new Promise(function (resolve, reject) {
      getRawJSON(urlReviews).then(function (unverifiedRatings) {
        resolve(unverifiedRatings.value);
      });
    });
  }

  /**
   * Returns a promise with a dictionary containing game ratings(unverified and verified)
   *
   * @returns {Promise} A promise with game ratings dictionary
   */
  getRatings = () => {
    var unverifiedRatings = 0.0
    var verifiedRatings = 0.0

    const ratingsDictionaryReturn = () => {
      return new Promise(function (resolve, reject) {
        resolve({
          unverifiedRatings,
          verifiedRatings
        });
      });
    }

    return this.getUnverifiedRatingsValue().then(function (ratings) {
      unverifiedRatings = ratings
    }).then(this.getVerifiedRatingsValue).then(function (ratings) {
      verifiedRatings = ratings;
    }).then(ratingsDictionaryReturn);
  }
};

/**
 * Returns a promise with a instanced class 'GogProduct'
 *
 * @param {String} id GOG product ID
 * @returns {Promise} A promise with a instanced class 'GogProduct'
 */
function getProductById(id) {
  const url = `https://www.gog.com/api/products/${id}`;
  return new Promise(function (resolve, reject) {
    getRawJSON(url).then(function (json) {
      const product = new GOGProduct(json);
      resolve(product);
    }).catch(function (err) {
      reject(err);
    });
  });
}

module.exports = { getProductById, GOGProduct };
