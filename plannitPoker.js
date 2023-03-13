import puppeteer from "puppeteer"

export const buildPlanning = async (issues) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  })

  const page = await browser.newPage()
  await page.goto(process.env.PLANNIT_POKER_URL, {
    waitUntil: "domcontentloaded",
  })
  await page.type('input[name="inputName"]',process.env.PLANNIT_USERNAME)

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[ng-bs-click="enter"]')
  ])
  await page.waitForNetworkIdle()
  await page.type('input[name="createRoomNameInput"]',process.env.PLANNIT_ROOM_NAME)
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[ng-bs-click="create"]')
  ])
  await page.waitForNetworkIdle()
  await page.type('textarea[name="inputName"]', issues)
  await page.click('button[ng-bs-click="createAndClose"]')
}
