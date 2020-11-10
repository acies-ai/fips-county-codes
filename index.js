const data = require("./data/fips-counties").filter(
  row => row.classfp === "H1"
);

const getByFipsCode = fips => {
  if (!fips) throw new Error("You must provide a three digit fips code.");
  if (typeof fips !== "string") throw new Error("Fips code must be a string.");
  if (fips.length !== 3) throw new Error("Fips code must be three digits.");
  const row = data.find(county => county.countyfp === fips);

  return {
    state: row.state,
    county: row.county
  };
};

const getByCountyAndState = (state, county) => {
  if (!state || !county)
    throw new Error("You must provide a state abbreviation and county name.");
  if (state.length !== 2)
    throw new Error("State must be a two letter state abbreviation.");
  if (typeof state !== "string")
    throw new Error("State abbreviation must be a string.");
  if (typeof county !== "string")
    throw new Error("County name must be a string.");

  const abbreviation = state.toUpperCase();
  const match = data.find(
    row =>
      row.county === county ||
      (row.county === `${county} County` && row.state === abbreviation)
  );

  return match.countyfp;
};

const get = options => {
  if (options.fips) return getByFipsCode(options.fips);
  return getByCountyAndState(options.state, options.county);
};

const getCountiesByState = (state) => {
  if (!state)
    throw new Error("You must provide a state abbreviation.");
  if (state.length !== 2)
    throw new Error("State must be a two letter state abbreviation.");
  if (typeof state !== "string")
    throw new Error("State abbreviation must be a string.");

  const abbreviation = state.toUpperCase();
  const match = data.filter(row => row.state === abbreviation);
  return match;
};

module.exports = {
  getCountiesByState,
  get,
  getByCountyAndState,
  getByFipsCode
};
