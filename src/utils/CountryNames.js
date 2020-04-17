import { invertObj, prop, toLower, propOr } from "ramda";
import { isoCountries } from "../constants/";

const countriesIso = invertObj(isoCountries);

export const getCountryName = (countryCode) =>
  prop(countryCode, isoCountries);

export const getCountryCode = (countryName) =>
    toLower(propOr('UN', countryName, countriesIso));
