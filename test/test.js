var assert = require("assert");
const helpers = require("./../helpers/newHelper");
//basic test for helper methods.
describe("getDateFomatted", function () {
  it("should receive a string in the form YYYY-M-D or Date and return a string in the form YYYY-M-D", function () {
    assert.equal(helpers.getDateFormatted("2018-2-1"), "2018-2-1");
  });
});

describe("getDaysBefore", () => {
  it("should take a Date and an integer and return a date with the integer days substracted", () => {
    let date = new Date("2020-2-1");
    assert.equal(helpers.getDaysBefore(date, 1), "2020-1-31");

    date = new Date("2020-1-1");
    assert.equal(helpers.getDaysBefore(date, 1), "2019-12-31");

    date = new Date("2020-1-11");
    assert.equal(helpers.getDaysBefore(date, 10), "2020-1-1");
  });
});

describe("getPreviousTenDays", () => {
  it("should get the last 10 previous days from today", () => {
    let today = new Date();
    let todayFormatted = helpers.getDateFormatted(new Date());
    assert.equal(helpers.getPreviousTenDays(todayFormatted)[9], todayFormatted);
    let firstElement = helpers.getDaysBefore(today, 9);
    assert.equal(helpers.getPreviousTenDays(todayFormatted)[0], firstElement);
  });
});
