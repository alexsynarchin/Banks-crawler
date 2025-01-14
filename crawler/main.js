import puppeteer from 'puppeteer';
import axios from "axios";
const domain = 'http://api.finsvodka.ru';
//const domain = 'http://banki-scrawler.loc';
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
    });

    const page = await browser.newPage();

    try {
        await page.goto(`https://www.sravni.ru/banki/`, { waitUntil: 'load' });
        console.log("SUCCESS!!");
    } catch (e) {
        console.log(e);
        await browser.close();
    }
    //await page.click('text=Показать ещё 10 банков');
    const isElementVisible = async (page, cssSelector) => {
        let visible = true;
        await page
            .waitForSelector(cssSelector, { visible: true, timeout: 7000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    };
    const selectorForLoadMoreButton = '::-p-xpath(//span[contains(text(), "Показать ещё 10")])';
    //const element = await page.waitForSelector('::-p-xpath(//span[contains(text(), "Показать ещё 10")])');
    let loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
    while (loadMoreVisible) {

        await page
            .click(selectorForLoadMoreButton)
            .catch(() => {});
        loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
    }

    const data = await page.evaluate(() => {
        let data = [];


        const cards = document.querySelectorAll('[class^="card_wrapper"]');

        for (const card of cards) {
            const cardTitle = card.querySelector('h5').textContent;
            const cardLink = card.querySelector('a').href;
            const cardLogo = card.querySelector('[data-qa="Avatar"] img').src;
            const article = { name: cardTitle, link: cardLink, logo_link: cardLogo };
            data.push(article);
        }

        return data;

    })
    console.log(data);

    axios.post(domain + '/api/banks/store-or-update', {data: data})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    await browser.close();


})();
