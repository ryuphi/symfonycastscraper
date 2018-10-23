import { GetCourseInfo } from 'src/common/interfaces';

const getCourseInfo: GetCourseInfo = async function getCourseInfo(page) {
    const lessons = [];

    const title = await page.evaluate(() => {
        const { scraper } = window as any;
        return scraper.findOne({ selector: 'h1.tuts-header-font' }).text();
    });

    const description = await page.evaluate(() => {
        const { scraper } = window as any;
        return scraper.findOne({ selector: 'div.course-overview.summary' }).get().innerText.trim();
    });

    const related = await page.evaluate(() => {
        const { scraper } = window as any;

        return scraper
            .find({ selector: '.related-courses a'})
            .map(el => el.getAttr('href'))
            .sort();
    });

    const lessonsUrls = await page.evaluate(() => {
        const { scraper } = window as any;

        return scraper
            // not comming soon...
            .find({ selector: '.title.chapter-list-item > .row div:first-child a:not(.js-no-follow-link):not(.challenge-square)'})
            .map(el => el.getAttr('href'))
    });

    return { title, description, related, lessonsUrls , lessons };
};

export { getCourseInfo };
