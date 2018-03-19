import { readFileSync } from 'fs';

export default (path: string): object => JSON.parse(readFileSync(path).toString());
