// Fonction pour convertir les devises en euros
function convertToEuros(value, currencyCode) {
    let taux;

    // Taux de change en dur 
    switch (currencyCode) {
        case "GBP\tPound sterling":
            taux = 0.83461;
            break;
        case "PLN\tPolish zloty":
            taux = 4.33; 
            break;
        case "CHF\tSwiss franc":
            taux = 0.93520; 
            break;
        case "USD\tUnited States dollar":
            taux = 1.05362; 
            break;
        case "CAD\tCanadian dollar":
            taux = 1.48; 
            break;
        case "EUR European Euro":
            taux = 1; 
            break;
        case "NA":
            taux = null;
            break;
        case "AED United Arab Emirates dirham":
            taux = 3.85; 
            break;
        case "AFN\tAfghan afghani":
            taux = 71; 
            break;
        case "ALL\tAlbanian lek":
            taux = 98; 
            break;
        case "AMD\tArmenian dram":
            taux = 410; 
            break;
        case "ANG Netherlands Antillean guilder":
            taux = 1.89; 
            break;
        case "ARS\tArgentine peso":
            taux = 1057.63; 
            break;
        case "AUD\tAustralian dollar":
            taux = 1.61; 
            break;
        case "AWG\tAruban florin":
            taux = 1.88; 
            break;
        case "AZN\tAzerbaijan manat":
            taux = 1.78; 
            break;
        case "BAM\tBosnia and Herzegovina convertible mark":
            taux = 1.95; 
            break;
        case "BGN\tBulgarian lev":
            taux = 1.95; 
            break;
        case "BIF\tBurundi franc":
            taux = 3092; 
            break;
        case "BOB\tBolivian boliviano":
            taux = 7.27; 
            break;
        case "BRL\tBrazilian real":
            taux = 6.11; 
            break;
        case "CDF\tCongolese franc":
            taux = 3008.66; 
            break;
        case "CLP\tChilean peso":
            taux = 1026; 
            break;
        case "CNY\tChinese Yuan Renminbi":
            taux = 7.62; 
            break;
        case "COP\tColombian peso":
            taux = 4609.99; 
            break;
        case "CRC\tCosta Rican colon":
            taux = 535.90; 
            break;
        case "CUP\tCuban peso":
            taux = 25.23; 
            break;
        case "DJF\tDjiboutian franc":
            taux = 187; 
            break;
        case "FJD\tFijian dollar":
            taux = 2.39; 
            break;
        case "FKP\tFalkland Islands pound":
            taux = 0.83; 
            break;
        case "GHS\tGhanaian cedi":
            taux = 16.56; 
            break;
        case "GIP\tGibraltar pound":
            taux = 0.83; 
            break;
        case "HKD\tHong Kong dollar":
            taux = 8.18; 
            break;
        case "HUF\tHungarian forint":
            taux = 410; 
            break;
        case "IDR\tIndonesian rupiah":
            taux = 16745.42; 
            break;
        case "ILS\tIsraeli new shekel":
            taux = 3.83; 
            break;
        case "IRR\tIranian rial":
            taux = 44251; 
            break;
        case "JPY\tJapanese yen":
            taux = 161; 
            break;
        case "LAK\tLao kip":
            taux = 23074; 
            break;
        case "MYR\tMalaysian ringgit":
            taux = 4.69; 
            break;
        case "NOK\tNorwegian krone":
            taux = 11.69; 
            break;
        case "PEN\tPeruvian sol":
            taux = 3.98; 
            break;
        case "QAR\tQatari riyal":
            taux = 3.82; 
            break;
        case "SAR\tSaudi Arabian riyal":
            taux = 3.94; 
            break;
        case "SLL\tSierra Leonean leone":
            taux = 23857; 
            break;
        case "THB\tThai baht":
            taux = 36.50; 
            break;
        case "TWD\tNew Taiwan dollar":
            taux = 34.12; 
            break;
        case "UAH\tUkrainian hryvnia":
            taux = 43.56; 
            break;
        case "UGX\tUgandan shilling":
            taux = 3890; 
            break;
        case "UZS\tUzbekistani som":
            taux = 13491.81; 
            break;
        case "XPF\tCFP franc":
            taux = 119; 
            break;
        case "YER\tYemeni rial":
            taux = 262; 
            break;
        case "ZAR\tSouth African rand":
            taux = 19; 
            break;
        case "ZMW Zambian kwacha":
            taux = 29; 
            break;
        case "INR\tIndian rupee":
            taux = 88.59; 
            break;
        default:
            console.error("Devise inconnue ou non supportée");
            return; // Si la devise n'est pas supportée
    }

    // Vérifier si le taux de change est nul ou non défini
    if (taux === null) {
        console.log(`Le taux de change pour la devise ${currencyCode} n'est pas disponible.`);
        return; // Ne pas effectuer la conversion
    }
    
    // Calculer le montant en euros
    const valueConvertie = value / taux;
    
    // Afficher le résultat
    //console.log(`Le montant de ${value} ${currencyCode} est égal à ${valueConvertie.toFixed(2)} EUR`);
    return valueConvertie;
}