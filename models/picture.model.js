let pictures = require("../data/pictures.json");
const filename = "./data/pictures.json";
const helper = require("../helpers/newHelper");
// const axios = require("axios");

function getPictures(
  rover = "curiosity",
  camera = "NAVCAM",
  numOfPictures = 3
) {
  return new Promise(async (resolve, reject) => {
    let lastTenDays = helper.getPreviousTenDays();
    let date;
    let picturesFromTenDays = {};

    for (let i = 0; i < 10; i++) {
      date = lastTenDays[i];
      if (date in pictures) {
        picturesFromTenDays[date] = pictures[date];
      } else {
        picturesFromTenDays[date] = await helper.getDaysPictures(
          date,
          rover,
          camera,
          numOfPictures
        );
      }
    }

    resolve(picturesFromTenDays);
  });
}

module.exports = {
  getPictures,
};
