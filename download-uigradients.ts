// This file downloads community curated gradients from https://github.com/ghosh/uiGradients/blob/master/gradients.json and parses them to a json that can be typed by Typescript
const fs = require('fs').promises;
const https = require('https');

const url =
  'https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json';
type Gradients = Array<{ name: string; colors: [string, string] }>;

async function parseJSONAndWrite(json: Gradients) {
  const toWrite = json.reduce((ret, grad) => {
    return { ...ret, [grad.name]: grad.colors };
  }, {});
  await fs.writeFile('src/gradients.json', JSON.stringify(toWrite));
  await fs.writeFile(
    'src/gradient-types.ts',
    'export type GradientKeys = ' +
      Object.keys(toWrite)
        .map((val) => '"' + val + '"')
        .join(' | ')
  );
}

https
  .get(url, (res: any) => {
    let body = '';

    res.on('data', (chunk: any) => {
      body += chunk;
    });

    res.on('end', () => {
      try {
        const json = JSON.parse(body);
        parseJSONAndWrite(json)
          .then(() => console.log('Done!'))
          .catch(console.error);
      } catch (error) {
        console.error(error.message);
      }
    });
  })
  .on('error', (error: any) => {
    console.error(error.message);
  });
