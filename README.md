# tfl-api

[![Dependency Status](https://david-dm.org/paolo-chiabrera/tfl-api.svg)](https://david-dm.org/paolo-chiabrera/tfl-api)
[![devDependency Status](https://david-dm.org/paolo-chiabrera/tfl-api/dev-status.svg?theme=shields.io)](https://david-dm.org/paolo-chiabrera/tfl-api#info=devDependencies)
[![Build Status](https://travis-ci.org/paolo-chiabrera/tfl-api.svg?branch=master)](https://travis-ci.org/paolo-chiabrera/tfl-api)

`tfl-api` is a Node.js based API wiring, in a lean and neat JSON format, the TFL (Transport for London) XML API

Maintained by [Paolo Chiabrera](https://github.com/paolo-chiabrera).

## Install

```
$ npm i tfl-api
```

## Usage

```
npm start
```

## Endpoints

### /line-status/lines
Returns an array of valid line codes
```
["B","C","V","J","N","P","CI","H","D","M","W","DLR","OVG","RAIL","TRAMS"]
```

### /line-status/status/{lineCode}
`lineCode` is optional
Returns an array of lines status or an object of the specific line requested
```
{
  "id": "1",
  "code": "B",
  "name": "bakerloo",
  "status": "GS",
  "desc": "Good Service",
  "details": "",
  "active": true
}
```

### /prediction-summary/lines
Returns an array of valid line codes
```
["B","C","V","J","N","P","CI","H","D","M","W"]
```

### /prediction-summary/summary/{lineCode}
`lineCode` is optional
Returns an array of prediction summaries or an object of the specific line requested
```
{
  "lineCode": "B",
  "datetime": "2016-07-30T00:00:00.000Z",
  "stations": [
    {
      "name": "Baker Street",
      "stationCode": "BST",
      "platforms": [
        {
          "name": "Southbound - Platform 8",
          "platformCode": "1",
          "trains": [
            {
              "setNumber": "247",
              "tripNumber": "22",
              "timeTo": "1:30",
              "location": "At Marylebone Platform 2",
              "dest": "Elephant and Castle",
              "destCode": "154",
              "trainCode": "247"
            },
            {
              "setNumber": "227",
              "tripNumber": "18",
              "timeTo": "3:00",
              "location": "Approaching Edgware Road",
              "dest": "Elephant and Castle",
              "destCode": "154",
              "trainCode": "227"
            }
          ]
        }
      ]
    }
  ]
}
```

## Documentation

http://tfl.d3lirium.eu/documentation (Swagger)

## Testing

```
npm test
```

## License

MIT
