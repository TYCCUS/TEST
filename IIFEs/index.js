// (function getThemeFromLocalStorage() {
//     const theme = localStorage.getItem('theme')
//     if (theme) {
//         console.log(theme)
//     } else {
//         console.log('light')
//     }
// })()

/* Challenge:
    1. Convert this function to an IIFE.
       You will need to figure out how to make 
       it async and how to pass in parameters.
*/
// async function displayWeather(country) {
//     const weather = await fetch('geo.json')
//     const weatherObj = await weather.json()
//     console.log(`The weather in the ${country} today is ${weatherObj[country]}`)
// }

// displayWeather('UK')

// since we are in local dev environment, we need to retrieve the file with the node.js filesystem module.
// also since we are in local dev, the file system points to the root directory. So we will give node.js the current file location as a base
// to use a relative URL path

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "geo.json"); // get json data

fs.readFile(filePath, "utf8", (err, weather) => {
  if (err) {
    console.error("Failed to read the file:", err);
    return;
  }

  try {
    ((country) => {
      const weatherObj = JSON.parse(weather);
      console.log(
        `The weather in the ${country} today is ${weatherObj[country]}`
      );
    })("UK");
  } catch (parseError) {
    console.error("Failed to parse JSON:", parseError);
  }
});
