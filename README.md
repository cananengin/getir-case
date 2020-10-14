# getir-case
## Request url
You can see the app with this url

https://getir-study-case.herokuapp.com

**Request url**

https://getir-study-case.herokuapp.com/records

**Request Method** - POST

**Request body** : 

{

"startDate":"2016-11-01",

"endDate": "2016-11-03",

"minCount": 40,

"maxCount": 60

}

**Headers**: Content-Type - application/json

**Response code explanation**  0: Success,
                               1: Success but no records ,
                              -1: request wrong 

## Install Dependencies

Install dependencies with this command.

```npm install```

## Run App

Run the app with this command.

``` node index.js```

**Test:** ```npm run test ```
