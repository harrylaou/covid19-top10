import * as R from "ramda";
import { isoCountries } from "../constants/countries";

const countriesIso = R.invertObj(isoCountries);


export const getCountryName = (countryCode) =>
  R.prop(countryCode, isoCountries);

export const getCountryCode = (countryName) =>
    R.toLower(R.propOr('UN', countryName, countriesIso));
