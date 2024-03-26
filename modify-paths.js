import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { minify } from 'html-minifier';

// Путь к директории dist
const distDir = 'dist';

// Читаем содержимое всех HTML файлов в директории dist
const htmlFiles = readdirSync(distDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = `${distDir}/${file}`;
  const htmlContent = readFileSync(filePath, 'utf8');
    
  // Заменяем пути
  const modifiedHtmlContent = htmlContent
    .replace(/(src|href)="\/assets\//g, '$1="assets/');

  // Минифицируем HTML
  const minifiedHtml = minify(modifiedHtmlContent, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true
  });

  // Перезаписываем файл
  writeFileSync(filePath, minifiedHtml, 'utf8');
});

console.log('Paths modified successfully.');
