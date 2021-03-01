const fs = require("fs");
const axios = require("axios");
let pictures = require("./../data/pictures.json");
const filename = "./data/pictures.json";

function getDateFormatted(date) {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + "-" + month + "-" + day;
}

const getDaysPictures = async (date, rover, camera, numOfPictures) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&page=1&api_key=DEMO_KEY`;
  try {
    const resp = await axios.get(url);
    pictures[date] = resp["data"]["photos"]
      .slice(0, numOfPictures)
      .map((photo) => photo["img_src"]);

    writeJSONFile(filename, pictures);
    return pictures[date];
  } catch (err) {
    console.log(console.log(err));
  }
};

function getDaysBefore(date, daysBefore) {
  let previousDay = new Date(date);
  previousDay.setDate(date.getDate() - daysBefore);
  date = getDateFormatted(previousDay);
  return date;
}

function getPreviousTenDays() {
  let today = new Date();
  let previousTenDays = [];
  for (let i = 9; i >= 0; i--) {
    previousTenDays.push(getDaysBefore(today, i));
  }
  return previousTenDays;
}

function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  getPreviousTenDays,
  getDaysPictures,
  getDateFormatted,
  getDaysBefore,
};
