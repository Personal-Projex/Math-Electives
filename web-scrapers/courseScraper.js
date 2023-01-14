import puppeteer from 'puppeteer';
import data from './data/courses.json' assert { type: "json" };
import courseData from './data/courseInfo.json' assert {type: "json"};
import fs from 'fs';
import { isGeneratorFunction } from 'util/types';

const courseInfo = courseData;

async function scrapeCourse(course) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.handbook.unsw.edu.au/undergraduate/courses/2023/${course.code}?year=2023`);

    let [el] = await page.$x('//*[@id="academic-item-banner"]/div/div/h2');
    if (el === undefined) {
        let courseObj = {
            code: course.code,
            name: course.name,
            overview: null,
            conditions: null,
            term1: course.term1,
            term2: course.term2,
            term3: course.term3,
        }
        courseInfo.push(courseObj);
        console.log(courseObj);
        fs.writeFileSync('data/courseInfo.json', JSON.stringify(courseInfo, null, 2));
        await browser.close();
    }

    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    let [el2] = await page.$x('//*[@id="Overview"]/div[2]/div[1]/div[2]/p');
    if (el2 === undefined) {
        [el2] = await page.$x('//*[@id="Overview"]/div[2]/div[1]/div[2]');
    }
    if (el2 === undefined) {
        [el2] = await page.$x('//*[@id="Overview"]/div[2]/div/div/p');
    }

    if (el2 == undefined) {
        [el2] = await page.$x('//*[@id="Overview"]/div[2]/div/div');
    }

    if (el2 == undefined) {
        [el2] = await page.$x('//*[@id="Overview"]/div[2]/div[1]/div[2]/text()');
    }
    const text2 = await el2.getProperty('textContent');
    const overview = await text2.jsonValue();

    const [el3] = await page.$x('//*[@id="ConditionsforEnrolment"]/div[2]/div');
    if (el3 == undefined) {
        [el3] = await page.$x('//*[@id="ConditionsforEnrolment"]/div[2]/div/text()');
    }
    let conditions = null;
    if (el3 !== undefined) {
        const text3 = await el3.getProperty('textContent');
        conditions = await text3.jsonValue();
    }

    let courseObj = {
        code: course.code,
        name: name,
        overview: overview,
        conditions: conditions,
        term1: course.term1,
        term2: course.term2,
        term3: course.term3,
    }

    courseInfo.push(courseObj);
    console.log(courseObj);
    fs.writeFileSync('data/courseInfo.json', JSON.stringify(courseInfo, null, 2));
    await browser.close();
}

// loops through all course names and gathers course data in data/courseInfo.json
for (const course of data) {
    await scrapeCourse(course);
}

// Use the below for checking a single course
// scrapeCourse({ "code": "MATH3261" });


