// Fonction pour convertir les devises en euros
function convertToEuros(value, currencyCode) {
    let taux;

    // Définir les taux de change en dur (Exemples de taux fictifs)
    switch (currencyCode) {
        case "GBP\tPound sterling":
            taux = 0.93; // Exemple : 1 USD = 0.93 EUR
            break;
        case "PLN\tPolish zloty":
            taux = 1.14; // Exemple : 1 GBP = 1.14 EUR
            break;
        case "CHF\tSwiss franc":
            taux = 0.0063; // Exemple : 1 JPY = 0.0063 EUR
            break;
        case "USD\tUnited States dollar":
            taux = 0.69; // Exemple : 1 CAD = 0.69 EUR
            break;
        case "CAD\tCanadian dollar":
            taux = 0.61; // Exemple : 1 AUD = 0.61 EUR
            break;
        case "EUR European Euro":
            taux = 0.61; // Exemple : 1 AUD = 0.61 EUR
            break;
        case "NA":
            taux = 0.61; // Exemple : 1 AUD = 0.61 EUR
            break;
        default:
            console.error("Devise inconnue ou non supportée");
            return; // Si la devise n'est pas supportée
    }
    
    // Calculer le montant en euros
    const valueConvertie = value * taux;
    
    // Afficher le résultat
    console.log(`Le montant de ${value} ${currencyCode} est égal à ${valueConvertie.toFixed(2)} EUR`);
}

// Exemple d'utilisation
convertToEuros(100, "USD");  // Convertir 100 USD en EUR
convertToEuros(500, "GBP");  // Convertir 500 GBP en EUR
convertToEuros(10000, "JPY");  // Convertir 10 000 JPY en EUR
convertToEuros(200, "AUD");  // Convertir 200 AUD en EUR
