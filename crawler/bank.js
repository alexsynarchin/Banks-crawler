import puppeteer from 'puppeteer';
import axios from "axios";
import * as querystring from "node:querystring";
const inputs = process.argv
const bank_id = querystring.parse(inputs[2] || '').bank_id;
const link = querystring.parse(inputs[3] || '').link;
const domain = 'http://api.finsvodka.ru';
//const domain = 'http://banki-scrawler.loc';
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
    //const testSelector =  page.locator('::-p-xpath(//[contains(text(), "Общая информация о банке")])');

    const bankAdditionalData = await page.evaluate(() => {
        let data = {};
        const additionalInfBlocks= document.querySelectorAll('[class^="legal-info_infoBlock"]');
        for (const block of additionalInfBlocks) {
            let classString = '[class^="legal-info_text"]';
            let title = block.querySelector('h5').textContent;
            switch(title) {
                case 'Регистрационный номер':
                    data.register_number = block.querySelector(classString +  ' span').textContent
                    data.register_number_link = block.querySelector(classString +  ' a').href;
                    break;
                case 'Головной офис':
                    data.head_office = block.querySelector(classString).textContent
                    break;
                case 'Телефоны':
                    data.phones = block.querySelector(classString).textContent
                    break;
                case 'Официальный сайт':
                    data.website = block.querySelector(classString +  ' a').href
            }

        }
        return data;

    })
    axios.post(domain + '/api/banks/store-or-update-item', {bank_id: bank_id, data: bankAdditionalData})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })



    //const element = await page.waitForSelector('::-p-xpath(//h4[contains(text(), "Общая информация о банке")])');
    console.log(bankAdditionalData);
    await browser.close();
})();
