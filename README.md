# CSGOPolygon-Autobet
Prosty skrypt na betowanie ostatniego wylosowanego koloru na ruletce CSGOPolygon

![](https://cdn.discordapp.com/attachments/747723783544242299/1088074788922204200/image.png)

## Użycie
1. Prawy przycisk myszy.
2. Kliknij na "Zbadaj element"
3. Z paska u góry wybierz "Konsola"
4. Wklej to:
```
fetch("https://raw.githubusercontent.com/BlacKlyExactly/CSGOPolygon-Autobet/main/autoi-bet.js")
.then(( res ) => res.text())
.then((t) => eval(t));
```
