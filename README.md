# Unnoficial GOG Product Wrapper
### An wrapper for GOG API for retrieving and managing products data

[![Build Status](https://travis-ci.com/HDK101/unnoficial-gog-product-wrapper.svg?branch=master)](https://travis-ci.com/HDK101/unnoficial-gog-product-wrapper)![NPM](https://img.shields.io/npm/l/ugog-product)



## Warning!
1. Changes to the official GOG API could make this library unusable!
2. Requests to the API are generally slow(run a test with Mocha and see it yourself)

## Content
1. How to install
2. How to use
3. Other GOGProduct class methods

## 1. How to install
```
npm install gog-product-wrapper
```

## 2. How to use
### Example 1
```javascript
const { getProductById } = require("ugog-product")

    //Note that getProductById returns a promise
getProductById(/*ID String here*/).then(function (product) {
    //product is GOGProduct class
    //GOGProduct respective methods here...
});

```

### Example 2
```javascript
const { getProductById } = require("ugog-product")

//Id for X3: Terran War Pack
getProductById("1441039322").then(function (product) {
    console.log(product.getTitle());
});

```

## 3. Other methods
### Example 1

```javascript
//Returns strings
.getTitle()
.getProductCard()
.getPurchaseLink()

.getImagesAPILink()
//API Link for acessing the images

//Returns Date object
.getReleaseDate()

//Returns dictionaries
.getAvailableLanguages()
.getAvailableSystems()
.getImages(advanced = false /*by default*/ )
/*
if advanced = false, it returns a dictionary with the following links:
    background, logo and icon
if advanced = true, it returns:
    background, logo, logo2x, sideBarIcon, sideBarIcon2x, menuNotificationAv, menuNotificationAv2
*/

//Returns a promise with a dictionary about prices 
.getPrices(countryCode = "US" /*by default*/ )

//Return a promise with a dictionary about ratings
.getRatings()

```

## Some steps to run the source code

1. Install required dependencies

```
npm install
```

2. Run test(it will use MochaJS)

```
npm run test
```
