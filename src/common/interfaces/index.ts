import * as puppeteer from 'puppeteer';

interface Browser {
    getPage: GetPage;
    close: CloseBrowser;
    authenticate: Authenticate;
    findCourses: FindCourses;
    getCourseInfo: GetCourseInfo;
    getLessonInfo: GetLessonInfo;
    downloadLesson: DownloadLesson;
}

interface UserCredentials {
    username: string;
    password: string;
}

interface Course {
    title: string,
    description: string;
    related: string[];
    lessonsUrls: string[];
    lessons: Lesson[];
}

interface Lesson {
    index: string;
    title: string;
    videoUrl: string;
    script: string;
    subtitle: string;
}

type GetPage = (url: string, callback: (page: puppeteer.Page) => Promise<any>) => any;

type DownloadLesson = (courseName, lesson: Lesson) => any;

type CreateBrowser = () => Promise<Browser>;

type CloseBrowser = () => Promise<void>;

type Authenticate = (this: Browser, credentials: UserCredentials) => Promise<boolean>;

type FindCourses = (this: Browser) => Promise<string[]>;

type GetCourseInfo = (this: Browser, page: puppeteer.Page) => Promise<Course>;

type GetLessonInfo = (this: Browser, page: puppeteer.Page, index) => Promise<Lesson>;

export {
    CloseBrowser,
    CreateBrowser,
    GetPage,
    UserCredentials,
    Authenticate,
    FindCourses,
    GetCourseInfo,
    Course,
    GetLessonInfo,
    Lesson,
    DownloadLesson
}