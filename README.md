# Unnoficial GOG Product Wrapper
### An wrapper for GOG API for retrieving and managing products data


### Warning! Changes to the official GOG API could make this library unusable!


1. How to install
2. How to use
3. Other methods

## 1. How to install
```
npm install gog-product-wrapper
```

## 2. How to use
```javascript
getProductById(/*ID String here*/).then(function (product) {
    //product respective methods here...
});

```

```javascript
//Note that getProductById returns a promise

//Id for X3: Terran War Pack
getProductById("1441039322").then(function (product) {
    console.log(product.getTitle());
});

```

## 3. Other methods

```javascript
//Returns strings
.getTitle()
.getProductCard()
.getPurchaseLink()

//Returns Date object
.getReleaseDate()

//Returns dictionaries
.getAvailableLanguages()
.getAvailableSystems()
.getImages(advanced = false //by default )

//Returns a promise with a dictionary about prices 
.getPrices(countryCode = "US" //by default)

//Return a promise with the ratings value
getTotalRatingsValue()

```

# For Devs

1. Install required dependencies

```
npm install
```

2. Run test

```
npm run test
```
