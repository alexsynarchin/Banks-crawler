import puppeteer from 'puppeteer';
import axios from "axios";
const domain = 'http://api.finsvodka.ru';
//const domain = 'http://banki-scrawler.loc';
(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args:['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://www.sravni.ru/banki/');
    //await page.click('text=Показать ещё 10 банков');
    const isElementVisible = async (page, cssSelector) => {
        let visible = true;
        await page
            .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
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

        for (const title of cards) {
            const cardTitle = title.querySelector('h5').textContent;
            const titleLink = title.querySelector('a').href;

            const article = { name: cardTitle, link: titleLink };
            data.push(article);
        }

        return data;

    })
    let i = 0;
    for (let item of data) {
        try {
            await page.goto(item.link);
            console.log('Открываю страницу: ', item.link);
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
            data[i] = Object.assign({}, data[i], bankAdditionalData);
        } catch (error) {
            console.log(error);
            console.log('Не удалось открыть страницу: ', item.link);
        }
        i++;
    }
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
