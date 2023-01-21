import puppeteer from "puppeteer";
import data from './data/courseInfo.json' assert { type: "json" };
import fs from 'fs';

async function majorScraper(website) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(website);

    let courses = await page.evaluate(() => {
        let courseElems = document.querySelectorAll(".css-1r4uxab-StyledAILinkBodySection");
        let coursesArr = Array.from(courseElems);
        let additionalCourses = document.querySelectorAll(".css-rnd275-StyledAILinkHeaderSection");
        let additionalArr = Array.from(additionalCourses);
        coursesArr = coursesArr.concat(additionalArr);
        return coursesArr.map(course => course.textContent);
    });
    await browser.close();
    return courses;
};


for (const course of data) {
    course["major"] = [];
}
let pureArr = await majorScraper('https://www.handbook.unsw.edu.au/undergraduate/specialisations/2023/MATHP1?year=2023');
for (const course of pureArr) {
    for (const courseObj of data) {
        if (course === courseObj.name) {
            courseObj["major"].push("pure");
        }
    }
}
let statsArr = await majorScraper('https://www.handbook.unsw.edu.au/undergraduate/specialisations/2023/MATHU1?year=2023');
for (const course of statsArr) {
    for (const courseObj of data) {
        if (course === courseObj.name) {
            courseObj["major"].push("stats");
        }
    }
}

let appliedArr = await majorScraper('https://www.handbook.unsw.edu.au/undergraduate/specialisations/2023/MATHA1?year=2023');
for (const course of appliedArr) {
    for (const courseObj of data) {
        if (course === courseObj.name) {
            courseObj["major"].push("applied");
        }
    }
}

fs.writeFileSync('data/courseInfo.json', JSON.stringify(data, null, 2));


