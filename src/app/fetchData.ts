import fs from 'fs-extra';
import path from 'path';

export async function fetchDataFromFile<T>(filePath: string): Promise<T | null> {
    let result: T | null = null;
    try {
        const cacheFilePath = path.join(process.cwd(), filePath);
        await fs.ensureFile(cacheFilePath);
        result = await fs.readJson(cacheFilePath);
    } catch (e) {
        console.error(e);
    }
    return result;
}
