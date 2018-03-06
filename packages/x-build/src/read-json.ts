import {FilePath} from './types';
import * as fs from 'fs-extra';

export default async function readJSON<T>(path: FilePath): Promise<T> {
	return JSON.parse(
		await fs.readFile(path, 'utf8')
	) as T;
};
