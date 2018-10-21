import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as ora from 'ora'

import {Lesson} from "src/common/interfaces";
import {DownloadLesson} from "src/common/interfaces";
import {mkDirByPathSync} from "src/common/utils";

const downloadLesson: DownloadLesson = async function downloadLessons(courseName, lesson: Lesson) {

    if (!fs.existsSync(path.resolve('courses' + '/' + courseName))){
        mkDirByPathSync(path.resolve('courses' + '/' + courseName));
    }

    const lessonName = lesson.title.replace('/', '-');

    const lessonVideoPath = path.resolve('courses', courseName, `${lesson.index+1} ${lessonName}`);
    const lessonSubPath = path.resolve('courses', courseName, `${lesson.index+1} ${lessonName}`);

    let spinner = null;

    spinner = ora('Downloading video...').start();
    await download({url: lesson.videoUrl, dirPath: lessonVideoPath, filename: `${lessonName}.mp4`});
    spinner.succeed(`Lesson video Downloaded!`);

    spinner = ora('Downloading subtitle...').start();
    await download({url: lesson.subtitle, dirPath: lessonSubPath, filename: `${lessonName}.vtt`});
    spinner.succeed(`${lessonName} Lesson Downloaded!`);

    console.log("\n");
};

const download = async function download({url, dirPath, filename}) {

    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'stream'
    });

    if (!fs.existsSync(dirPath)){
        mkDirByPathSync(dirPath);
    }

    response.data.pipe(fs.createWriteStream(dirPath + '/' + filename));
    let body = "";
    let cur = 0;

    return new Promise((resolve, reject) => {

        response.data.on('end', () => {
            resolve()
        });

        response.data.on('error', () => {
            reject()
        });
    });
};

export { downloadLesson };