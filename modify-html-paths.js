import { readFileSync, writeFileSync } from 'fs';

import { minify } from 'html-minifier';

const htmlContent = readFileSync('dist/index.html', 'utf8');


const modifiedHtmlContent = htmlContent
  .replace(/(src|href)="\/assets\//g, '$1="assets/');

// Минифицируем HTML
const minifiedHtml = minify(modifiedHtmlContent, {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true
});


writeFileSync('dist/index.html', minifiedHtml, 'utf8');

console.log('Paths modified successfully.');
