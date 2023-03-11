const { default: puppeteer } = require('puppeteer');

const anime = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://jkanime.net/');
  // await page.waitForSelector('.listadoanime-home');

  const data = await page.evaluate(() => {
    const items = document.querySelectorAll('.anime__sidebar__comment__item');
    let animes = [];
    for (const item of items) {
      animes.push({
        Nombre: item.querySelector('h5').innerHTML,
        Imagen: item.querySelector('img').getAttribute('src'),
        Episodio: item
          .querySelector('h6')
          .innerHTML.split(' ')
          .filter((data) => {
            if (data != '') return data;
          })
          .pop(),
      });
    }
    return animes;
  });
  console.log(data);
  await browser.close();
};

anime();
