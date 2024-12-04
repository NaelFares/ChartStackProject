// Choisir quel fichier JSON utiliser
// Changer le chemin au besoin
function getUrlByContinent(continent) {
    switch (continent) {
        case "Amérique":
            return "../data/survey_results_NA.json";
        case "Europe":
            return "../data/survey_results_WE.json";
        default:
            console.error("Continent invalide. Veuillez choisir 'Amérique' ou 'Europe'.");
            return null;
    }
}