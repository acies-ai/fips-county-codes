const fips = require("./index");

describe("The get function", () => {
  it("should return a FIPS code when provided an object with a state and county property", () => {
    expect(fips.get({ state: "AL", county: "Calhoun" })).toEqual("015");
  });

  it("should return an object with a county and state property when provided a FIPS code", () => {
    expect(fips.get({ fips: "015" })).toEqual({
      state: "AL",
      county: "Calhoun County"
    });
  });

  it("should throw when it only receives a state name", () => {
    expect(() => fips.get({ state: "AL" })).toThrow();
  });

  it("should throw when it only receives a county name", () => {
    expect(() => fips.get({ county: "Calhoun" })).toThrow();
  });

  it("should throw when the state is longer than two characters", () => {
    expect(() => fips.get({ state: "Alabama", county: "Calhoun" })).toThrow();
  });

  it("should throw when it receives a FIPS code as a number", () => {
    expect(() => fips.get({ fips: 139 })).toThrow();
  });
});

describe("The getByCountyAndState function", () => {
  it("should return a FIPS code when provided a state abbreviation and county name", () => {
    expect(fips.getByCountyAndState("AL", "Calhoun")).toEqual("015");
  });

  it("should return a FIPS code when provided a state abbreviation and county name without the word 'County'", () => {
    expect(fips.getByCountyAndState("AL", "Calhoun County")).toEqual("015");
  });

  it("should throw when provided a state name instead of an abbreviation", () => {
    expect(() => fips.getByCountyAndState("Alabama", "Calhoun")).toThrow();
  });
});

describe("The getByFipsCode function", () => {
  it("should return an object with a state and county property when provided a FIPS code string", () => {
    expect(fips.getByFipsCode("015")).toEqual({
      state: "AL",
      county: "Calhoun County"
    });
  });

  it("should throw when provided a FIPS code number", () => {
    expect(() => fips.getByFipsCode({ fips: 215 })).toThrow();
  });
});
