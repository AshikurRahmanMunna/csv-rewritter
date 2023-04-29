const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const settings = {
  readerFile: path.join(__dirname, `airports.csv`),
  writerFile: path.join(__dirname, `airports.csv`),
};

const writeToFile = (data) => {
  fs.writeFile(settings.readerFile, data, (err) => {
    if (err) console.log(err);
    else {
      console.log("all done successfully");
    }
  });
};

function convertToCSV(objArray) {
  const header = Object.keys(objArray[0])
    .map((val) => `"${val}"`)
    .join(",");
  const rows = objArray.map((obj) =>
    Object.values(obj)
      .map((val) => `"${val}"`)
      .join(",")
  );
  const text = `${header}\n${rows.join("\n")}`;
  writeToFile(text);
}

const results = [];

fs.createReadStream(settings.readerFile)
  .pipe(csv())
  .on("data", (data) => {
    if (data.iata_code.length === 3)
      results.push({
        airport_name: data.airport_name,
        city: data.city,
        country: data.country,
        iata_code: data.iata_code,
        icao_code: data.icao_code,
        latitude: data.latitude,
        longitude: data.longitude,
        altitude: data.altitude,
        timezone: data.timezone,
      });
  })
  .on("end", () => {
    convertToCSV(results);
  });
