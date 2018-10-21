import {FindCourses} from 'src/common/interfaces';

const findCourses: FindCourses = async function findCourses() {
    return this.getPage(`/courses/filtering`, async page => {
        // waiting for render...
        await page.waitFor(1500);

        return page.evaluate(() => {
            const { scraper } = window as any;
            return scraper
                .find({ selector: '.row > a'})
                .map(el => el.getAttr('href'))
                .sort();
        });
    });
};

export { findCourses }