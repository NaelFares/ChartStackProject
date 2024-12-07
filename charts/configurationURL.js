// Changer le chemin au besoin
const AMERIQUE_JSON_PATH = "../data/survey_results_NA.json";
const EUROPE_JSON_PATH = "../data/survey_results_WE.json";

// Choisir quel fichier JSON utiliser
function getUrlByContinent(continent) {
    switch (continent) {
        case "Amérique":
            return AMERIQUE_JSON_PATH;
        case "Europe":
            return EUROPE_JSON_PATH;
        default:
            console.error("Continent invalide. Veuillez choisir 'Amérique' ou 'Europe'.");
            return null;
    }
}