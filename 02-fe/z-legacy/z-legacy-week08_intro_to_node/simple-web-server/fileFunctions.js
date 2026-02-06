import { access, writeFile, mkdir, unlink, readFile } from 'fs/promises';
import { join } from 'path';

const createFileWithMessage = async (message) => {
    try {
        const now = new Date();
        const year = now.toLocaleString('default', { year: 'numeric' });
        const month = now.toLocaleString('default', { month: '2-digit' });
        const day = now.toLocaleString('default', { day: '2-digit' });

        const dirName = `${year}-${month}-${day}`;

        const fileName =
            now.toTimeString().slice(0, 8).replaceAll(':', '-') + '.txt';

        try {
            await access(dirName);
            console.log(`${dirName} exists`);
        } catch (error) {
            await mkdir(dirName);
            console.log(`${dirName} created`);
        }
        const filePath = join(dirName, fileName);
        await writeFile(filePath, message);
    } catch (error) {
        console.error(error);
    }
};

const deleteFileByName = async (filePath) => {
    try {
        await unlink(filePath);
        console.log(`Successfully deleted ${filePath}`);
    } catch (error) {
        console.error('Something went wrong', error);
    }
};

const readFileByName = async (filePath) => {
    try {
        const fileContent = await readFile(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        console.error('Something went wrong', error);
    }
};

export { createFileWithMessage, deleteFileByName, readFileByName };
