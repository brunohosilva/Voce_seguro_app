XLSX = require('xlsx');

const inputFile = XLSX.readFile("../data/datatesteconverter.xls");
XLSX.writeFile(inputFile, "../data/resulttesteconverter.csv", { bookType: "csv" });
