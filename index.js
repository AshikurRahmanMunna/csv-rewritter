const csv = require("csv-parser");
const fs = require("fs");

const writeToFile = (data) => {
  fs.writeFile(__dirname + "/airlines.csv", data, (err) => {
    if (err) console.log(err);
    else {
      console.log("all done successfully");
    }
  });
};

function convertToCSV(objArray) {
  const header = Object.keys(objArray[0]).join(",");
  const rows = objArray.map((obj) => Object.values(obj).join(","));
  const text = `${header}\n${rows.join("\n")}`;
  writeToFile(text);
}

const results = [];

fs.createReadStream(__dirname + "/airlines.csv")
  .pipe(csv())
  .on("data", (data) => {
    if (data.iata_code.length === 2)
      results.push({
        airline_name: data.airline_name,
        iata_code: data.iata_code,
        icao_code: data.icao_code,
        callsign: data.callsign,
        country: data.country,
      });
  })
  .on("end", () => {
    convertToCSV(results);
  });
