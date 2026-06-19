import { test, expect } from "@playwright/test";
import fs from "fs";

// test("my first scrape", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("https://www.romsgames.net/roms/playstation-portable/", {
//     waitUntil: "domcontentloaded",
//   });
//   const totalPageText = await page
//     .locator("xpath=/html/body/div[2]/section/div[1]/nav/ul[2]/li")
//     .all();
//   const totalPageNo =
//     await totalPageText[totalPageText.length - 1]?.innerText();
//   let gameData: {
//     title: string;
//     imgSrc: string;
//     url: string;
//   }[] = [];

//   for (let i = 1; i <= Number(totalPageNo); i++) {
//     await page.goto(
//       `https://www.romsgames.net/roms/playstation-portable/?page=${i}/`,
//       {
//         waitUntil: "domcontentloaded",
//         timeout: 60000,
//       },
//     );
//     const finalResult = await page.evaluate(() => {
//       const query = document.evaluate(
//         "/html/body/div[2]/section/div[1]/div[2]/a",
//         document,
//         null,
//         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//         null,
//       );

//       const gamesList = [];

//       for (let i = 0; i < query.snapshotLength; i++) {
//         const element = query.snapshotItem(i);
//         //@ts-ignore
//         const imgSrc = element?.getElementsByTagName("img")[0]?.src;
//         if (element) {
//           gamesList.push({
//             //@ts-ignore
//             title: element?.innerText.trim(),
//             //@ts-ignore
//             url: element.href,
//             imgSrc,
//           });
//         }
//       }

//       return gamesList;
//     });

//     gameData.push(...finalResult);
//     console.log(`Scraped page ${i} of ${totalPageNo}...`);
//   }
//   fs.writeFileSync(
//     "psp_games.json",
//     JSON.stringify(gameData, null, 2),
//     "utf-8",
//   );

//   console.log("Data successfully saved to psp_games.json");

//   await context.close();
// });

test("my second scrape", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://www.romsgames.net/playstation-portable-rom-talkman-shiki---shabe-lingual-eikaiwa/",
    {
      waitUntil: "domcontentloaded",
    },
  );

  await page.locator("button:has-text('Save Game')").click();
  await page.waitForTimeout(900);
});
