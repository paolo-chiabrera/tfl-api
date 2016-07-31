# tfl-api

[![Dependency Status](https://david-dm.org/paolo-chiabrera/tfl-api.svg)](https://david-dm.org/paolo-chiabrera/tfl-api)
[![devDependency Status](https://david-dm.org/paolo-chiabrera/tfl-api/dev-status.svg?theme=shields.io)](https://david-dm.org/paolo-chiabrera/tfl-api#info=devDependencies)
[![Build Status](https://travis-ci.org/paolo-chiabrera/tfl-api.svg?branch=master)](https://travis-ci.org/paolo-chiabrera/tfl-api)
[![Coverage Status](https://coveralls.io/repos/github/paolo-chiabrera/tfl-api/badge.svg?branch=integrate_coveralls)](https://coveralls.io/github/paolo-chiabrera/tfl-api?branch=integrate_coveralls)
[![Docker Repository on Quay](https://quay.io/repository/d3lirium/tfl-api/status "Docker Repository on Quay")](https://quay.io/repository/d3lirium/tfl-api)

`tfl-api` is a Node.js based API wiring, in a lean and neat JSON format, the TFL (Transport for London) XML API

Maintained by [Paolo Chiabrera](https://github.com/paolo-chiabrera).

## Usage

```
npm start
```

## Endpoints

### /documentation
Swagger 2.0 documentation

### /line-status/lines
Returns an array with all line statuses available
```
[{
  "id": "1",
  "code": "B",
  "name": "bakerloo",
  "status": "GS",
  "desc": "Good Service",
  "details": "",
  "active": true
}, {
    "id": "2",
    "code": "C",
    "name": "central",
    "status": "GS",
    "desc": "Good Service",
    "details": "",
    "active": true
  }]
```

### /line-status/lines
Returns an array of valid line codes
```
["B","C","V","J","N","P","CI","H","D","M","W","DLR","OVG","RAIL","TRAMS"]
```

### /line-status/lines/{lineCode}
`lineCode` is required
Returns the line status object of the requested lineCode
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

### /prediction-summary
Returns an array with all the prediction summaries available
```
[{
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
}]
```

### /prediction-summary/lines
Returns an array of valid line codes
```
["B","C","V","J","N","P","CI","H","D","M","W"]
```

### /prediction-summary/lines/{lineCode}
`lineCode` is required
Returns the prediction summary object of the requested lineCode
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

## Testing

```
npm test
```

## License

MIT
