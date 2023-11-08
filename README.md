# konzultacio-menedzser

Group project for "Szoftverarchitekturak"

- A feladat egy olyan webes alkalmazás elkészítése, mely támogatja a hallgatók és konzulensük közötti hatékonyabb kommunikációt. A rendszer segítségével lehet időpontot foglalni a konzulenshez, le lehet írni a konzultáción felteendő kérdéseket (melyekre a konzulens írásban is válaszolhat), illetve lehet böngészni a már feltett és megválaszolt kérdések között. A rendszer emelett segít a hallgatói munka nyomon követésében, továbbá értesítéseket küld mind a hallgatónak, mind az oktatónak, ha nem az ütemterv szerint halad a féléves munka.

## Google docs specifikacio

[Specifikacio](https://docs.google.com/document/d/1ctFtlfLklXy_IX6-GofUvsz_W1LZxXLIm9OnVt4GPAI/edit?usp=sharing)

## Figma design

[Figma](https://www.figma.com/files/team/1290368291715136509)

## Laravel

Ha forntendet fejléesztünk ezt nem kell elinditani, mehet az elesrol.
A backendhez pedig:
php 8.1.X
mysql server

backend indítása (laravel mappából futtatva)
`php artisan serve`

migrációk db-hez:
`php artisan migrate:fresh --seed`

## React:

node package manager kell

(react mappából futtatva)

`npm install` a könyvtárak importálására

`npm run build` mindig push elott!

`npm run dev` local dev server inditasa

## Additional dev:

recommend VSCode
recommendend Extensions: prettier, eslint, laravel, php, gitgraph
