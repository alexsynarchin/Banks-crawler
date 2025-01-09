import puppeteer from 'puppeteer';
import axios from "axios";
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    }); //открытие брауз

    const page = await browser.newPage();

    await page.goto('https://www.sravni.ru/bank/alfa-bank/');
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
    //const element = await page.waitForSelector('::-p-xpath(//h4[contains(text(), "Общая информация о банке")])');
    console.log(bankAdditionalData);
    await browser.close();
})();
