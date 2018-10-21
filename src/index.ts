#!/usr/bin/env node 
import 'module-alias/register';
import * as dotenv from 'dotenv';

dotenv.config();

import { createBrowser } from 'src/common/browser';
import { auth as authConfig } from 'src/config';
import { reduceAsync, millisToMinutesAndSeconds } from 'src/common/utils';
import ora = require('ora');
import * as commander from 'commander';


const baseUrl = 'https://symfonycasts.com/';

commander
  .version('1.0.0')
  .description('Symfonycast course scraper!');

commander
  .command('course <courseUrl>')
  .description('scrape a course from given url')
  .action(async (courseUrl) => {
    try {
      const browser = await createBrowser();
  
      const spinner = ora('Log in...').start();
      await browser.authenticate(authConfig);
      spinner.succeed('Log in succed!');
      
      await browser.getPage(courseUrl, async page => {
        try {
          console.log('\n');
          let course = await browser.getCourseInfo(page);
          console.info(`Extracted info of course "${course.title}"`);
          
          await reduceAsync<string, any>(course.lessonsUrls,async (prev2, url, index) => {
            await browser.getPage(`${baseUrl}${url}`, async page => {
              const lesson = await browser.getLessonInfo(page, index);
              console.info(`Extracted info of lesson "${lesson.title}"`);
              
              await browser.downloadLesson(course.title, lesson);
            });
          }, 5);
        } catch (e) {
          console.error('Failed to get course info.');
          console.error(e.message);
          throw e;
        }
      });
      process.exit();
    } catch (e) {
      console.log(e);
      process.exit();
    }
  });

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
  commander.outputHelp()
  process.exit()
}

commander.parse(process.argv);
