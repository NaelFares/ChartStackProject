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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

function getAnneeExperiences(jsonData) {
    let anneeExpValues = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];

        // Ajouter la valeur si elle n'existe pas déjà dans le tableau
        if (e.YearsCodePro && !anneeExpValues.includes(e.YearsCodePro)) {
            anneeExpValues.push(e.YearsCodePro);
        }
    }

    // Trier les valeurs : "Less than 1 year" en premier, numériques, puis non numériques
    anneeExpValues.sort((a, b) => {
        // Prioriser "Less than 1 year"
        if (a === "Less than 1 year") return -1;
        if (b === "Less than 1 year") return 1;

        // Convertir les valeurs en nombres si elles sont numériques
        const numA = !isNaN(a) ? parseFloat(a) : null;
        const numB = !isNaN(b) ? parseFloat(b) : null;

        // Si les deux sont numériques, comparer leurs valeurs
        if (numA !== null && numB !== null) {
            return numA - numB;
        }

        // Si l'un est numérique et pas l'autre, le numérique vient en premier
        if (numA !== null) return -1;
        if (numB !== null) return 1;

        // Les deux ne sont pas numériques, comparer comme chaînes
        return a.localeCompare(b);
    });

    return anneeExpValues;
}


function getDevType(jsonData) {
    let devTypeValues = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];

        // Ajouter la valeur si elle n'existe pas déjà dans le tableau
        if (e.YearsCodePro && !devTypeValues.includes(e.DevType)) {
            devTypeValues.push(e.DevType);
        }
    }

    // Trier les valeurs par ordre alphabétique
    devTypeValues.sort((a, b) => a.localeCompare(b));

    return devTypeValues;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addCountriesToDropDown(selectIdCountry, chart, jsonData, critere, selectIdAnneeExp = null) {
    // Récupérer le <select> existant via son ID
    var selectElement = document.getElementById(selectIdCountry);
    if (!selectElement) {
        console.error(`Aucun élément <select> trouvé avec l'ID : ${selectIdCountry}`);
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

        if(selectIdAnneeExp){
            var selectAnneeExp = document.getElementById(selectIdAnneeExp);
            var anneeExp = selectAnneeExp.value;
            updateChart(chart, selectedCountry, jsonData, critere, anneeExp);
        } else {
            updateChart(chart, selectedCountry, jsonData, critere); 
        }
    
    });
}


function addAnneeExpToDropDown(selectIdAnneExp, chart, jsonData, critere, selectIdCountry) {
    // Récupérer le <select> existant via son ID
    var selectElement = document.getElementById(selectIdAnneExp);
    if (!selectElement) {
        console.error(`Aucun élément <select> trouvé avec l'ID : ${selectIdAnneExp}`);
        return;
    }

    // Effacer les options actuelles 
    selectElement.innerHTML = '';

    // Ajouter l'option "Toutes les années d'expériences"
    let allAnneeExperiencesOption = document.createElement('option');
    allAnneeExperiencesOption.value = "Tous";
    allAnneeExperiencesOption.text = "Toutes";
    allAnneeExperiencesOption.style.color = "black";
    allAnneeExperiencesOption.style.backgroundColor = "white"; // Applique le style donné
    selectElement.appendChild(allAnneeExperiencesOption);

    // Récupérer la liste des pays et les trier
    let anneeExperiences = getAnneeExperiences(jsonData);

    // Ajouter chaque pays au <select> avec les styles donnés
    for (let i = 0; i < anneeExperiences.length; i++) {
        let option = document.createElement('option');
        option.value = anneeExperiences[i];
        option.text = anneeExperiences[i];
        option.style.color = "black"; // Applique le style donné
        option.style.backgroundColor = "white"; // Applique le style donné
        selectElement.appendChild(option);
    }

    // Associer un événement 'change' au <select>
    selectElement.addEventListener('change', function() {
        // Récupérer la valeur sélectionnée
        var selectedAnneeExp = this.value;
        var selectCountry = document.getElementById(selectIdCountry);
        var selectedCountry = selectCountry.value;

        updateChart(chart, selectedCountry, jsonData, critere, selectedAnneeExp);
    
    
    });
}

function addDevTypeToDropDown(selectIdDevType, chart, jsonData, critere, selectIdTop, divIdTitle) {
    // Récupérer le <select> existant via son ID
    var selectElement = document.getElementById(selectIdDevType);
    if (!selectElement) {
        console.error(`Aucun élément <select> trouvé avec l'ID : ${selectIdDevType}`);
        return;
    }

    // Effacer les options actuelles 
    selectElement.innerHTML = '';

    // Récupérer la liste des pays et les trier
    let devTypes = getDevType(jsonData);

    // Ajouter chaque pays au <select> avec les styles donnés
    for (let i = 0; i < devTypes.length; i++) {
        let option = document.createElement('option');
        option.value = devTypes[i];
        option.text = devTypes[i];
        option.style.color = "black"; // Applique le style donné
        option.style.backgroundColor = "white"; // Applique le style donné
        selectElement.appendChild(option);
    }

    // Associer un événement 'change' au <select>
    selectElement.addEventListener('change', function() {
        // Récupérer la valeur sélectionnée
        var selectedDevType = this.value;
        var selectTop = document.getElementById(selectIdTop);
        var selectedTop = selectTop.value;

        updateChartTechnologies(chart, jsonData, critere, selectedDevType, selectedTop, divIdTitle);

    });
}


function addEventToDropDownTop(selectIdDevType, chart, jsonData, critere, selectIdTop, divIdTitle) {
    // Récupérer le <select> existant via son ID
    var selectElement = document.getElementById(selectIdTop);
    if (!selectElement) {
        console.error(`Aucun élément <select> trouvé avec l'ID : ${selectIdTop}`);
        return;
    }

    // Associer un événement 'change' au <select>
    selectElement.addEventListener('change', function() {
        // Récupérer la valeur sélectionnée
        var selectedTop = this.value;
        var selectDevType = document.getElementById(selectIdDevType);
        var selectedDevType = selectDevType.value;

        updateChartTechnologies(chart, jsonData, critere, selectedDevType, selectedTop, divIdTitle);

    });
}


function addDevTypeToDropDownTemporaire(selectIdDevType, jsonData) {
    // Récupérer le <select> existant via son ID
    var selectElement = document.getElementById(selectIdDevType);
    if (!selectElement) {
        console.error(`Aucun élément <select> trouvé avec l'ID : ${selectIdDevType}`);
        return;
    }

    // Effacer les options actuelles 
    selectElement.innerHTML = '';

    // Récupérer la liste des pays et les trier
    let devTypes = getDevType(jsonData);

    // Ajouter chaque pays au <select> avec les styles donnés
    for (let i = 0; i < devTypes.length; i++) {
        let option = document.createElement('option');
        option.value = devTypes[i];
        option.text = devTypes[i];
        option.style.color = "black"; // Applique le style donné
        option.style.backgroundColor = "white"; // Applique le style donné
        selectElement.appendChild(option);
    }

}

function updateChart(chart, country, jsonData, critere, anneeExp=null) {

    console.log(country);

    var pageName = $("body").data("page-name"); //Récupère le nom de la page dans le body

    // Déclaration de variables avant le switch
    let params = [];
    let revenusMoyens = [];

    switch (pageName) {
        case "dashboard1": {
            ({ criteres: params, revenusMoyens } = calculerListeRevenusMoyens(jsonData, critere, country));
            break;
        }
        case "dashboard2": {
            ({ plateformes: params, revenusMoyens } = calculerListeRevenusMoyensSelonPlateforme(jsonData, critere, country, anneeExp));
            break;
        }
        case "dashboard3": {
            // Cas traité dans la fonction updateChartTechnologies
            break;
        }
        default: {
            console.error("Nom de page inconnu pour addCountriesToDropDown:", pageName);
            return;
        }
    }

    // Créer un tableau d'objets combinant critères et revenus
    let combinedData = params.map((param, index) => ({
        param,
        revenu: revenusMoyens[index]
    }));

    // Tri personnalisé
    combinedData.sort((a, b) => {
        // Prioriser "Moins d'un an" ou autre valeur spécifique si nécessaire
        if (a.param === "Less than 1 year") return -1;
        if (b.param === "Less than 1 year") return 1;

        // Convertir les valeurs en nombres si elles sont numériques
        const numA = !isNaN(a.param) ? parseFloat(a.param) : null;
        const numB = !isNaN(b.param) ? parseFloat(b.param) : null;

        // Si les deux sont numériques, comparer leurs valeurs
        if (numA !== null && numB !== null) {
            return numA - numB;
        }

        // Si l'un est numérique et pas l'autre, le numérique vient en premier
        if (numA !== null) return -1;
        if (numB !== null) return 1;

        // Les deux ne sont pas numériques, comparer comme chaînes
        return a.param.localeCompare(b.param);
    });

    // Extraire les labels et revenus triés
    const sortedLabels = combinedData.map(item => item.param);
    const sortedRevenus = combinedData.map(item => item.revenu);

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

function updateChartTechnologies(chart, jsonData, critere, devType, top, divIdTitle) {

    const {criteres, proportions} = calculerProportionsParCritere(jsonData, critere, devType, top);

    // Séparation des critères en numériques et non numériques
    const numericData = [];
    const nonNumericData = [];

    criteres.forEach((critere, index) => {
        const proportion = proportions[index];
        if (!isNaN(parseFloat(critere))) {
            numericData.push({ critere: parseFloat(critere), proportion });
        } else {
            nonNumericData.push({ critere, proportion });
        }
    });

    // Tri des données numériques
    numericData.sort((a, b) => a.critere - b.critere);

    // Recombinaison des données triées : numériques d'abord, non numériques ensuite
    const sortedData = [
        ...numericData.map(({ critere, proportion }) => ({ critere: critere.toString(), proportion })),
        ...nonNumericData
    ];

    const sortedLabels = sortedData.map(item => item.critere);
    const sortedProportions = sortedData.map(item => item.proportion);

    // Mise à jour du titre du graphique en fonction de l'ID de la div
    const divElement = document.getElementById(divIdTitle);
    if (divElement) {
        const h6Element = divElement.querySelector('h6');
        if (h6Element) {
            const titreActuel = h6Element.textContent;
            const partieApresTop = titreActuel.substring(titreActuel.indexOf(' ') + 2);
            h6Element.textContent = `Top ${top} ${partieApresTop}`;
        } else {
            console.error("L'élément h6 n'a pas été trouvé dans la div spécifiée.");
        }
    } else {
        console.error("La div spécifiée n'a pas été trouvée.");
    }

    // Mise à jour des labels
    chart.data.labels = sortedLabels;

    // Mise à jour des données du dataset principal
    if (chart.data.datasets.length > 0) {
        chart.data.datasets[0].data = sortedProportions; // Met à jour les données uniquement
    } else {
        console.error("Le graphique ne contient aucun dataset pour mettre à jour les données.");
    }

    // Mise à jour du graphique
    chart.update();
}


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


// Calculer le revenu moyen selon les plateformes cloud utilisées, avec exclusion des valeurs extrêmes
function calculerListeRevenusMoyensSelonPlateforme(jsonData, critere, pays, anneeExp) {
    const revenusParPlateforme = {};

    // Définir les seuils pour exclure les outliers
    const revenuMin = 1000; // Par exemple : revenu minimum raisonnable
    const revenuMax = 500000; // Par exemple : revenu maximum raisonnable

    jsonData.forEach(item => {
        const revenu = parseFloat(item.CompTotal || 0); // Revenu
        const devise = item.Currency; // Devise
        const valeurCritere = item[critere]; // Chaîne des plateformes cloud
        const paysItem = item.Country; // Pays de l'item
        const anneeExpItem = item.YearsCodePro; // Années d'expérience professionnelles

        // Si un pays spécifique est demandé, filtrer les données
        if (pays !== "Tous" && paysItem !== pays) {
            return; // Ignorer les données qui ne correspondent pas au pays
        }

        // Si une année d'expérience spécifique est demandée, filtrer les données
        if (anneeExp !== "Tous" && anneeExpItem !== anneeExp) {
            return; // Ignorer les données qui ne correspondent pas à l'année d'expérience
        }

        if (!isNaN(revenu) && devise && valeurCritere) {
            const revenuEnEuros = convertToEuros(revenu, devise);

            // Vérifier que le revenu converti est dans les limites acceptables
            if (revenuEnEuros !== null && revenuEnEuros >= revenuMin && revenuEnEuros <= revenuMax) {
                // Extraire les plateformes sans doublons
                const plateformes = valeurCritere.split(";").map(p => p.trim()).filter(Boolean);
                plateformes.forEach(plateforme => {
                    if (!revenusParPlateforme[plateforme]) {
                        revenusParPlateforme[plateforme] = { total: 0, count: 0 };
                    }
                    revenusParPlateforme[plateforme].total += revenuEnEuros;
                    revenusParPlateforme[plateforme].count++;
                });
            }
        }
    });

    // Préparer les résultats triés par plateforme
    const resultats = Object.keys(revenusParPlateforme)
        .map(plateforme => {
            const { total, count } = revenusParPlateforme[plateforme];
            return { plateforme, revenuMoyen: (total / count).toFixed(2) };
        })
        .sort((a, b) => a.plateforme.localeCompare(b.plateforme)); // Tri par ordre croissant des plateformes

    // Extraire les plateformes et les revenus moyens
    const plateformes = resultats.map(res => res.plateforme);
    const revenusMoyens = resultats.map(res => res.revenuMoyen);

    return { plateformes, revenusMoyens };
}


function calculerProportionsParCritere(jsonData, critere, devType, top) {
    const proportionsParCritere = {};

    // Parcourir les données JSON
    jsonData.forEach(item => {
        const valeurCritere = item[critere]; // Valeur du critère
        const typeDev = item.DevType; // Métier

        // Filtrer les données en fonction du métier
        if (typeDev !== devType) {
            return; // Ignorer les données qui ne correspondent pas au métier
        }

        if (valeurCritere) {
            // Extraire les critères sans doublons
            const criteres = valeurCritere.split(";").map(c => c.trim()).filter(Boolean);
            criteres.forEach(critere => {
                if (!proportionsParCritere[critere]) {
                    proportionsParCritere[critere] = { count: 0 };
                }
                proportionsParCritere[critere].count++;
            });
        }
    });

    // Calculer le total des critères individuels
    let totalCriteres = 0;
    Object.values(proportionsParCritere).forEach(entry => {
        totalCriteres += entry.count;
    });

    // Calculer les proportions par rapport au total des critères
    const resultats = Object.keys(proportionsParCritere)
        .map(critere => {
            const { count } = proportionsParCritere[critere];
            return { critere, proportion: ((count / totalCriteres) * 100).toFixed(2) };
        })
        .sort((a, b) => b.proportion - a.proportion) // Tri par ordre décroissant des proportions
        .slice(0, top); // Garder seulement les x (top) plus grandes proportions

    // Extraire les critères et les proportions
    const criteres = resultats.map(res => res.critere);
    const proportions = resultats.map(res => res.proportion);

    return { criteres, proportions };
}
