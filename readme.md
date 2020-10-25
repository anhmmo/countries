# COUNTRY API https://anhmmo.me
(NODEJS, EXPRESSJS, MONGODB, MONGOOSE)

> REST Countries - RESTful API https://restcountries.eu CLONE with advanced custom results
> . Get information about countries via a RESTful API. API End points include name, full name, code, list of codes, currency, language, capital city, calling code, region, bloc and more.

## Usage

Rename "config/config.txt" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start

# Run in test mode
npm run test
```

## Database Seeder

To seed the database with users, countries with data from the "\_data" folder, run

```
# Destroy all data
node handleData -d

# Import all data
node handleData -i
```

## Demo

The API is live at [anhmmo.me](https://anhmmo.me/api/v1/countries)

Extensive documentation with examples [here](https://anhmmo.me)

- Version: 1.0.0
- License: MIT
- Author: Aun
