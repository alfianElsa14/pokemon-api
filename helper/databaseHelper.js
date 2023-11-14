import fs, { readFileSync, writeFileSync } from 'fs'

const database = new URL('../db.json', import.meta.url)
export const loadData = () => JSON.parse(readFileSync(database))
export const storeData = (data) => writeFileSync(database, JSON.stringify(data))