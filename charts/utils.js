// Ensemble de fonctions qu'on réutilise

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour récupérer les deux fichiers JSON
function getAll(isArray=false) {
    // Définir les chemins des fichiers
    let file1 = "../data/survey_results_NA.json";
    let file2 = "../data/survey_results_WE.json";

    try {
        // Lire et parser les fichiers JSON
        const json1 = JSON.parse(fs.readFileSync(file1, 'utf8'));
        const json2 = JSON.parse(fs.readFileSync(file2, 'utf8'));

        // Fusionner en fonction du type
        const mergedJson = isArray 
            ? { data: [...json1, ...json2] } // Si tableaux, les combiner sous une clé "data"
            : { ...json1, ...json2 };       // Sinon fusionner les objets

        return mergedJson;

    } catch (error) {
        console.error('Erreur lors de la fusion des fichiers JSON:', error.message);
        return null;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Choisir quel fichier JSON utiliser
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Trier les documents par pays
function getDataByCountry(country, jsonFiles) {
    let result = [];  // Créer un tableau pour stocker les résultats

    // Parcourir les fichiers JSON
    for (let key in jsonFiles) {
        let item = jsonFiles[key];

        // Si l'élément correspond au pays recherché, l'ajouter au résultat
        if (item.Country === country) {
            // Vérifier si le tableau est déjà vide ou non
            let existingCountryIndex = result.findIndex(obj => obj[country]);

            if (existingCountryIndex === -1) {
                // Si ce pays n'existe pas encore dans le tableau, ajouter un objet avec ce pays et son tableau de documents
                result.push({ [country]: [item] });
            } else {
                // Si le pays existe déjà, ajouter le document à son tableau
                result[existingCountryIndex][country].push(item);
            }
        }
    }

    return result;  // Retourner le tableau avec un objet par pays, contenant tous ses documents
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Calculer le revenu moyen selon un critère, avec exclusion des valeurs extrêmes
function calculerListeRevenusMoyens(jsonData, critere, pays) {
    const revenusParCritere = {};

    // Définir les seuils pour exclure les outliers
    const revenuMin = 1000; // Par exemple : revenu minimum raisonnable
    const revenuMax = 500000; // Par exemple : revenu maximum raisonnable

    jsonData.forEach(item => {
        const revenu = parseFloat(item.CompTotal || 0); // Revenu 
        const devise = item.Currency; // Devise
        const valeurCritere = item[critere]; // Valeur du critère
        const paysItem = item.Country; // Pays de l'item

        // Si un pays spécifique est demandé, filtrer les données
        if (pays !== "Tous" && paysItem !== pays) {
            return; // Ignorer les données qui ne correspondent pas au pays
        }

        if (!isNaN(revenu) && devise && valeurCritere) {
            const revenuEnEuros = convertToEuros(revenu, devise);

            // Vérifier que le revenu converti est dans les limites acceptables
            if (revenuEnEuros !== null && revenuEnEuros >= revenuMin && revenuEnEuros <= revenuMax) {
                if (!revenusParCritere[valeurCritere]) {
                    revenusParCritere[valeurCritere] = { total: 0, count: 0 };
                }
                revenusParCritere[valeurCritere].total += revenuEnEuros;
                revenusParCritere[valeurCritere].count++;
            }
        }
    });

    // Préparer les résultats triés par critère
    const resultats = Object.keys(revenusParCritere)
        .map(cle => {
            const { total, count } = revenusParCritere[cle];
            return { critere: cle, revenuMoyen: (total / count).toFixed(2) };
        })
        .sort((a, b) => a.critere.localeCompare(b.critere)); // Tri par ordre croissant des critères

    // Extraire les critères et les revenus moyens
    const criteres = resultats.map(res => res.critere);
    const revenusMoyens = resultats.map(res => res.revenuMoyen);

    return { criteres, revenusMoyens };
}



function updateCountry(chart, country, jsonData, critere) {

    console.log(country);

    const { criteres, revenusMoyens } = calculerListeRevenusMoyens(jsonData, critere, country);

    // Séparation des critères en numériques et non numériques
    const numericData = [];
    const nonNumericData = [];

    criteres.forEach((critere, index) => {
        const revenu = revenusMoyens[index];
        if (!isNaN(parseFloat(critere))) {
            numericData.push({ critere: parseFloat(critere), revenu });
        } else {
            nonNumericData.push({ critere, revenu });
        }
    });

    // Tri des données numériques
    numericData.sort((a, b) => a.critere - b.critere);

    // Recombinaison des données triées : numériques d'abord, non numériques ensuite
    const sortedData = [
        ...numericData.map(({ critere, revenu }) => ({ critere: critere.toString(), revenu })),
        ...nonNumericData
    ];

    const sortedLabels = sortedData.map(item => item.critere);
    const sortedRevenus = sortedData.map(item => item.revenu);

    // Mise à jour des labels
    chart.data.labels = sortedLabels;

    // Mise à jour des données du dataset principal
    if (chart.data.datasets.length > 0) {
        chart.data.datasets[0].data = sortedRevenus; // Met à jour les données uniquement
    } else {
        console.error("Le graphique ne contient aucun dataset pour mettre à jour les données.");
    }

    // Mise à jour du graphique
    chart.update();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCountries(jsonData) {

    let countryValues = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];

        // Boucle pour éviter les doublons, ou bien utiliser un Set
        if(!countryValues.includes(e.Country)){
            countryValues.push(e.Country);
        }
    }

    return countryValues; 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateContinent(chart, country, jsonData) {

    let tabData = treatData(country,jsonData);
    let years = tabData[0];
    let values = tabData[1];

    chart.data.labels = years;
    
    chart.data.datasets = [
        {
            label: "Nombre de médailles gagnées par année : " + country,
            data: values,
        }
    ];
    
    chart.update();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addCountriesToDropDown(selectId, chart, jsonData, critere) {
    // Récupérer le <select> existant via son ID
    var selectElement = document.getElementById(selectId);
    if (!selectElement) {
        console.error(`Aucun élément <select> trouvé avec l'ID : ${selectId}`);
        return;
    }

    // Effacer les options actuelles 
    selectElement.innerHTML = '';

    // Ajouter l'option "Tous les pays"
    let allCountriesOption = document.createElement('option');
    allCountriesOption.value = "Tous";
    allCountriesOption.text = "Tous les pays";
    allCountriesOption.style.color = "black";
    allCountriesOption.style.backgroundColor = "white"; // Applique le style donné
    selectElement.appendChild(allCountriesOption);

    // Récupérer la liste des pays et les trier
    let countries = getCountries(jsonData);
    countries.sort();

    // Ajouter chaque pays au <select> avec les styles donnés
    for (let i = 0; i < countries.length; i++) {
        let option = document.createElement('option');
        option.value = countries[i];
        option.text = countries[i];
        option.style.color = "black"; // Applique le style donné
        option.style.backgroundColor = "white"; // Applique le style donné
        selectElement.appendChild(option);
    }

    // Associer un événement 'change' au <select>
    selectElement.addEventListener('change', function() {
        // Récupérer la valeur sélectionnée
        var selectedCountry = this.value;

        // Appeler la fonction updateCountry avec la sélection
        updateCountry(chart, selectedCountry, jsonData, critere);
    });
}

