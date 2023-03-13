import fetch from  'node-fetch';

export const getIssues = async () => {
  const URL = process.env.JIRA_API_URL
  const TOKEN = process.env.JIRA_AUTH_TOKEN
  const SPRINT = process.env.JIRA_SPRINT_NAME
  const request = await fetch(URL, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${TOKEN}`,
      'Accept': 'application/json',
    }
  })
  const response = await request.json()
  const issuesIds = response.sprints.find(({name}) => name === SPRINT)?.issuesIds
  if(!issuesIds) throw new Error(`Sprint name is wrong ${SPRINT}`)
  return response.issues.filter(issue => issuesIds.includes(issue.id)).map(issue => issue.key)
}