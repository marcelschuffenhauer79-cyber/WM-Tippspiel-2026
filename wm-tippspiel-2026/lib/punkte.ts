export function berechnePunkte(
tippHeim: number,
tippGast: number,
ergebnisHeim: number,
ergebnisGast: number
) {

// Exaktes Ergebnis = 3 Punkte
if (
tippHeim === ergebnisHeim &&
tippGast === ergebnisGast
) {
return 3
}

const tippDifferenz = tippHeim - tippGast
const ergebnisDifferenz = ergebnisHeim - ergebnisGast

// Richtige Tendenz + richtige Differenz = 2 Punkte
if (tippDifferenz === ergebnisDifferenz) {
return 2
}

// Richtiger Sieger / richtige Tendenz = 1 Punkt
if (
(tippDifferenz > 0 && ergebnisDifferenz > 0) ||
(tippDifferenz < 0 && ergebnisDifferenz < 0) ||
(tippDifferenz === 0 && ergebnisDifferenz === 0)
) {
return 1
}

// Sonst 0 Punkte
return 0
}