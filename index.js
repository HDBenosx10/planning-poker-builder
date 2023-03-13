import dotenv from 'dotenv'
import formatIssuesToWrite from './formatIssues.js'
import { getIssues } from './issues.js'
import { buildPlanning } from './plannitPoker.js'
dotenv.config()

const app = async () => {
    try {
        const issuesList = await getIssues()
        const issuesToWrite = formatIssuesToWrite(issuesList)
        buildPlanning(issuesToWrite)
    } catch(err) {
        console.error(err)
    }
}

app()