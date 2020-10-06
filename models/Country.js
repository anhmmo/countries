const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: String,
  topLevelDomain: { type: [String] },
  alpha2Code: String,
  alpha3Code: String,
  callingCodes: { type: [String] },
  capital: String,
  altSpellings: { type: [String] },
  region: String,
  subregion: String,
  population: Number,
  latlng: { type: [Number] },
  demonym: String,
  area: Number,
  gini: Number,
  timezones: { type: [String] },
  borders: { type: [String] },
  nativeName: String,
  numericCode: String,
  currencies: [
    {
      code: String,
      name: String,
      symbol: String,
    },
  ],
  languages: [
    {
      iso639_1: String,
      iso639_2: String,
      name: String,
      nativeName: String,
    },
    {
      iso639_1: String,
      iso639_2: String,
      name: String,
      nativeName: String,
    },
    {
      iso639_1: String,
      iso639_2: String,
      name: String,
      nativeName: String,
    },
  ],
  translations: {
    de: String,
    es: String,
    fr: String,
    ja: String,
    it: String,
    br: String,
    pt: String,
    nl: String,
    hr: String,
    fa: String,
  },
  flag: String,
  regionalBlocs: [
    {
      acronym: String,
      name: String,
      otherAcronyms: [],
      otherNames: [],
    },
  ],
  cioc: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //required: true,
  },
});

module.exports = mongoose.model("Country", CountrySchema);
