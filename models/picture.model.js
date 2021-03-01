let pictures = require("../data/pictures.json");
const filename = "./data/pictures.json";
const helper = require("../helpers/newHelper");

function getPictures(rover, camera, numOfPictures) {
  //using the passes values obtain the pictures
  return new Promise(async (resolve, reject) => {
    //get last ten days from the helper,
    let lastTenDays = helper.getPreviousTenDays();
    //initialize date
    let date;
    // create the resolved object to add the cached values, and the ones queried to NASA
    let picturesFromTenDays = {};

    for (let i = 0; i < 10; i++) {
      //iterate for the last ten days starting at today - 9 days
      date = lastTenDays[i];
      //if the date is already in the pictures object and the array to that object is not empty
      // note: pictures may be added later so if the array is empty, make a call again to see if picutures were uploded
      if (date in pictures && pictures[date].length !== 0) {
        //include that value to the returned values
        picturesFromTenDays[date] = pictures[date];
      } else {
        //if the date is not saved, get pictures from NASA
        picturesFromTenDays[date] = await helper.getDaysPictures(
          date,
          rover,
          camera,
          numOfPictures
        );
      }
    }
    //resolve the object form last ten days.
    resolve(picturesFromTenDays);
  });
}

module.exports = {
  getPictures,
};
