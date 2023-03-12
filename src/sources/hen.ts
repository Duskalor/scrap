import puppeteer, { Browser } from 'puppeteer';
import { animeModel } from '../model/animeModel';
// const puppeteer = require('puppeteer');
type hen = {
  nombre: string | null;
  img: string | null;
  link: string | null;
};
let Alldata: hen[] = [];
let browser: Browser;
let page: {
  setViewport: (arg0: { width: number; height: number }) => any;
  goto: (arg0: string) => any;
  evaluate: (arg0: () => hen[]) => any;
};
export const Anime = async (numberPage: number) => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  for (let index = 1; index <= numberPage; index++) {
    //console.log('Página Nro: ', index);
    await page.goto(`https://miohentai.com/tag/3d-hentai/page/${index}`);
    const data: hen[] = await page.evaluate(() => {
      const items = document.querySelectorAll('.post-thumbnail');
      let nombres: hen[] = [];
      for (const item of items) {
        nombres.push({
          nombre: item.querySelector('.miop')?.innerHTML,
          img: item.querySelector('.wp-post-image')?.getAttribute('data-src'),
          link: item.getAttribute('href'),
        } as hen);
      }
      return nombres;
    });
    Alldata = [...Alldata, ...data];
  }

  animeModel.deleteMany({}).then(() => {
    animeModel.insertMany(Alldata);
    browser.close();
  });

  // console.log('Información obtenida: ', Alldata);
};
