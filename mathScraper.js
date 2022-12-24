const puppeteer = require('puppeteer');
const fs = require('fs');
const { DefaultDeserializer } = require('v8');

async function scrape() {
  // Start up a new browser
  const browser = await puppeteer.launch();
  // Get a blank page
  const page = await browser.newPage();

  // Go to the specified url
  await page.goto('https://www.unsw.edu.au/science/our-schools/maths/student-life-resources/undergraduate/undergraduate-courses');

  // Wait for all tables to be generated on the page
  await page.waitForSelector('table');

  // Extract the data from the tables
  const tableData = await page.evaluate(() => {

    // A helper function that uses regex to remove all non ascii characters and newlines
    // from the string passed into it
    function cleanText(string) {
      const noAscii = string.replace(/[^\x00-\x7F]/g, "");
      return noAscii.replace(/[\r\n]/gm, '');
    }

    // Get all of the tables on the page
    const allTables = Array.from(document.querySelectorAll('table'));
    const tables = allTables.slice(0, 3);

    // Extract the data from each table
    return tables.map(table => {
      // Get all of the rows in the table
      const rows = Array.from(table.querySelectorAll('tr'));

      // Extract the data from each row (skip the first row of each table as it does not
      // provide any course info)
      return rows.slice(1).map(row => {
        // Get all of the cells in the row
        const cells = Array.from(row.querySelectorAll('td'));

        // Extract the data from each cell and remove all non ascii and 
        // newline characters from the string
        const courseCodeRaw = cells[0] ? cells[0].textContent : '';
        const courseCode = cleanText(courseCodeRaw);

        const courseDescRaw = cells[1] ? cells[1].textContent : '';
        const courseDesc = cleanText(courseDescRaw);

        const term1Raw = cells[2] ? cells[2].textContent : '';
        const term1 = cleanText(term1Raw);
        const term1Txt = term1 ? 'Term 1' : '';

        const term2Raw = cells[3] ? cells[3].textContent : '';
        const term2 = cleanText(term2Raw);
        const term2Txt = term2 ? 'Term 2' : '';

        const term3Raw = cells[4] ? cells[4].textContent : '';
        const term3 = cleanText(term3Raw);
        const term3Txt = term3 ? 'Term 3' : '';
        return {
          code: courseCode,
          name: courseDesc,
          term1: term1Txt,
          term2: term2Txt,
          term3: term3Txt,
        }
      });
    });
  });

  // Flatten the array of table data into a single array
  const flatTableData = tableData.flat();

  // Write the extracted data to a file
  fs.writeFileSync('data/courses.json', JSON.stringify(flatTableData, null, 2));

  // Close the browser
  await browser.close();
}

// Scrape the required data
console.log("Starting!");
scrape();
console.log("Done!");
