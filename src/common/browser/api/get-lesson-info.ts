import {GetLessonInfo} from "src/common/interfaces";

const getLessonInfo: GetLessonInfo = async function getLessonInfo(page, index) {

    const title = await page.evaluate(() => {
        const { scraper } = window as any;
        return scraper.findOne({ selector: 'h1.account-header' }).text().trim();
    });

    const subtitle = await page.evaluate(() => {
        const { video } = window as any;

        let captionDetails = video.captionDetails || null;

        if (! captionDetails) return null;

        return captionDetails.src || null;
    });

    const videoUrl = await page.evaluate(() => {
        const { scraper } = window as any;
        return scraper.findOne({selector: 'video#js-video-player_html5_api'}).getAttr('src');
    });

    const script = await page.evaluate(() => {
        const { scraper } = window as any;
        return scraper.findOne({ selector: 'a[data-download-type="script"]'}).getAttr('href');
    });

    return {
        index,
        title,
        subtitle,
        videoUrl,
        script
    };
};

export { getLessonInfo };