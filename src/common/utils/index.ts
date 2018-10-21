const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const getMilisecondsFromSeconds = (seconds: number): number => seconds * 1000;

const waitFor = (timeout: number): Promise<void> =>
    new Promise(resolve => {
        setTimeout(resolve, timeout);
    });

function reduceAsync<T, R>(
    arr: T[],
    fn: (result: R, curr: T, index: number) => R,
    waitForSeconds: number,
    startValue: R | undefined = undefined,
): Promise<R> {
    return Promise.resolve(
        arr.reduce(async (prev: Promise<R>, curr: T, index: number) => {
            const result = await prev;
            await waitFor(getMilisecondsFromSeconds(waitForSeconds));
            return Promise.resolve(fn(result, curr, index));
        }, Promise.resolve(startValue)),
    );
}

import * as fs from 'fs';
import * as path from 'path';

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
}

export {
    getMilisecondsFromSeconds,
    waitFor,
    reduceAsync,
    getRandomNumber,
    mkDirByPathSync
};