import puppeteer from 'puppeteer';
import axios from "axios";
import * as querystring from "node:querystring";
const inputs = process.argv
const bank_id = querystring.parse(inputs[2] || '').bank_id;
const link = querystring.parse(inputs[3] || '').link
const domain = 'http://api.finsvodka.ru/';
//const domain = 'http://banki-scrawler.loc';
//const link= 'https://www.sravni.ru/bank/alfa-bank/kredity';
//const bank_id = 1;
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args:[
            '--disable-infobars',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu=False',
            '--enable-webgl',
            '--window-size=1600,900',
            '--start-maximized',
        ]
    }); //открытие брауз

    const page = await browser.newPage();

    await page.goto(link);
    const isElementVisible = async (page, cssSelector) => {
        let visible = true;
        await page
            .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    };
    const selectorNoteCredits = '::-p-xpath(//div[contains(text(), "пока нет предложений")])';
    let NoteCredits = await isElementVisible(page, selectorNoteCredits);
    if(!NoteCredits) {
        const parentElement = await page.$('[class^="style_content__"]');
        const childElements = await parentElement.$$('[class^="Card_card"]');
        console.log(childElements.length);
        let data = [];
        for (const element of childElements) {
            try {

                await element.scrollIntoView();



                await element.click();
                await page.waitForSelector('[data-qa="Dialog"]');
                // const modalDialog = await page.$('[data-qa="Dialog"]');
                const closeBtn = await page.$('[class^="Dialog_module_close__"]');
                //let creditName = await modalDialog.$('div > div + div > div + div + div > div > span');
                //let title = await page.evaluate(el => el.textContent, creditName)
                //data.push(title);
                const creditData = await page.evaluate(() => {
                    let data = {};
                    let modalDialog = document.querySelector('[data-qa="Dialog"]');
                    data.name = modalDialog.querySelector('div > div + div > div + div + div > div > span')
                        .textContent;
                    let widgetsWrapper = modalDialog.querySelector('[class^="ProductInfo_widgets"]');
                    let widgetList = widgetsWrapper.querySelectorAll('[class^="style_value"]');
                    data.sum = widgetList[0].textContent;
                    data.term = widgetList[1].textContent;
                    data.review_time = widgetList[2].textContent;
                    data.age = widgetList[3].textContent;
                    data.income = widgetList[4].textContent;

                    return data;
                })
                await closeBtn.click();

                let creditBidSelector = "[style*='grid-area:secondCell-1'] div";
                if(await isElementVisible(element, creditBidSelector)) {
                    const creditBid =
                        await element.$eval("[style*='grid-area:secondCell-1'] div", data => {
                            return {
                                bid: data.textContent ? data.textContent : ""
                            }
                        })
                    Object.assign(creditData, creditBid);
                }
                let creditPskSelector = "[style*='grid-area:firstCell-1'] div";
                if(await isElementVisible(element, creditPskSelector)) {
                    const creditPsK =
                        await element.$eval("[style*='grid-area:firstCell-1'] div", data => {

                            return {
                                psk:data.textContent,
                            }
                        })
                    Object.assign(creditData, creditPsK);
                }
                data.push(creditData);
                await timeout(2500)
                // Add additional logic to handle the modal that opens
            } catch (error) {
                console.error('Error clicking on element:', error.message);
                // Handle the error as needed
            }
        }
        axios.post(domain + '/api/credits/store-or-update', {bank_id: bank_id, data: data})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })


        console.log(data)
    }


   await browser.close();
})();

