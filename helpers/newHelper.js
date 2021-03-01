const fs = require("fs");
const axios = require("axios");
let pictures = require("./../data/pictures.json");
const filename = "./data/pictures.json";

function getDateFormatted(date) {
  date = new Date(date);
  //get a date and format it to the form YYYY-MM-DD
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + "-" + month + "-" + day;
}

const getDaysPictures = async (date, rover, camera, numOfPictures) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&page=1&api_key=DEMO_KEY`;
  try {
    //Make a get request to the url with the specified date, rover, camera and number of pictures
    const resp = await axios.get(url);

    // get three pictures from the response or less if there are not three and add them to the pictures Object
    pictures[date] = resp["data"]["photos"]
      .slice(0, numOfPictures)
      .map((photo) => photo["img_src"]);
    //Write the JSON file with the new pictures using the helper function
    writeJSONFile(filename, pictures);
    // return the current pictures to be added to the returned value in the picture model
    return pictures[date];
  } catch (err) {
    console.log(console.log(err));
  }
};

function getDaysBefore(date, daysBefore) {
  //create a previos date with the date passed
  let previousDay = new Date(date);
  // set the date to the dated passed minus the days before
  previousDay.setDate(date.getDate() - daysBefore);

  //format the date so it can be in the right format
  date = getDateFormatted(previousDay);
  //return the formatted string from the date minus the integer daysBefore
  return date;
}

function getPreviousTenDays() {
  //set the today variable as a new date starting the current moment of the fuction.
  let today = new Date();
  //start an array that will have 10 days from now.
  let previousTenDays = [];
  for (let i = 9; i >= 0; i--) {
    //invoque get days before to get the previous days and push them to the array.
    previousTenDays.push(getDaysBefore(today, i));
  }
  return previousTenDays;
}

function writeJSONFile(filename, content) {
  //dates are chached to a file in the data folder
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
