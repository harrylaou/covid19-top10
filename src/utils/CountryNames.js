import * as R from "ramda";
import { isoCountries } from "../constants/countries";

const countriesIso = R.invertObj(isoCountries);

// export function getCountryName (countryCode) {
//     if (isoCountries.hasOwnProperty(countryCode)) {
//         return isoCountries[countryCode];
//     } else {
//         return countryCode;
//     }
// }

export const getCountryName = (countryCode) =>
  R.prop(countryCode, isoCountries);

export const getCountryCode = (countryName) =>
  R.prop(countryName, countriesIso);
