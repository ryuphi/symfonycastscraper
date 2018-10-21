import 'module-alias/register';
import * as dotenv from 'dotenv';

dotenv.config();

import { createBrowser } from 'src/common/browser';
import { auth as authConfig } from 'src/config';
import { reduceAsync} from "src/common/utils";

(async () => {
    try {
        const browser = await createBrowser();
        await browser.authenticate(authConfig);

        const url = "";

        await browser.getPage(url, async page => {
            try {
                console.time('course');
                console.log('\n');
                let course = await browser.getCourseInfo(page);
                console.info(`Extracted info of course "${course.title}"`);

                await reduceAsync<string, any>(course.lessonsUrls,async (prev2, url, index) => {
                    await browser.getPage(url, async page => {
                        const lesson = await browser.getLessonInfo(page, index);
                        console.info(`Extracted info of lesson "${lesson.title}"`);

                        await browser.downloadLesson(course.title, lesson);

                        course.lessons.push(lesson);
                    });
                }, 5);

                console.timeEnd('course');
            } catch (e) {
                console.error('Failed to get course info.');
                console.error(e.message);
                throw e;
            }
        });

    } catch (e) {
        console.log(e);
    }
})();