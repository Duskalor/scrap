// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');
let Alldata = [];
const GotPhotos = async (numberPage) => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  for (let index = numberPage; index <= 5; index++) {
    console.log('Página Nro: ', index);
    await page.goto(`https://miohentai.com/tag/3d-hentai/page/${index}`);
    const data = await page.evaluate(() => {
      const items = document.querySelectorAll('.post-thumbnail');
      let nombres = [];
      for (const item of items) {
        nombres.push({
          nombre: item.querySelector('.miop').innerHTML,
          img: item.querySelector('.wp-post-image').getAttribute('data-src'),
          link: item.getAttribute('href'),
        });
      }
      return nombres;
    });
    Alldata = [...Alldata, ...data];
  }

  await browser.close();
  console.log('Información obtenida: ', Alldata);
};

GotPhotos(1);
