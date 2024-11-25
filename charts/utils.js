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
    const valueConvertie = value * taux;
    
    // Afficher le résultat
    console.log(`Le montant de ${value} ${currencyCode} est égal à ${valueConvertie.toFixed(2)} EUR`);
    return valueConvertie.toFixed(2);
}

// Exemple d'utilisation
//convertToEuros(100, "GBP\tPound sterling");  // Convertir 100 USD en EUR
//convertToEuros(500, "EUR European Euro");  // Convertir 500 GBP en EUR
//convertToEuros(10000, "NA");  // Convertir 10 000 JPY en EUR
//convertToEuros(200, "USD\tUnited States dollar");  // Convertir 200 AUD en EUR

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour récupérer les deux fichiers JSON
function getAll() {
    // Définir les chemins des fichiers
    let file1 = "../data/survey_results_NA.json";
    let file2 = "../data/survey_results_WE.json";

    // Effectuer deux requêtes AJAX pour récupérer les fichiers
    let request1 = $.ajax({
        type: "GET",
        url: file1
    });

    let request2 = $.ajax({
        type: "GET",
        url: file2
    });

    // Retourner un objet avec les deux requêtes
    return { request1, request2 };
}

// // Lancer les requêtes
// let { request1, request2 } = getAll();

// // Effectuer les deux requêtes AJAX
// $.when(request1, request2).done(function(output1, output2) {
//     // Concaténer les résultats des deux fichiers
//     let combinedData = output1[0].concat(output2[0]);

//     // Afficher les données concaténées
//     console.log('Données concaténées pour les continents :');
//     console.log(combinedData);
// }).fail(function(http_error) {
//     let server_msg = http_error.responseText;
//     let code = http_error.status;
//     let code_label = http_error.statusText;
//     console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
// });

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

// // Définir le continent choisi
// let continent = "Europe"; // Par exemple, "Amérique" ou "Europe"
// let file = getUrlByContinent(continent); // Obtenir le chemin du fichier JSON

// if (file) {
//     // Faire une requête AJAX pour récupérer les données du fichier JSON
//     let request = $.ajax({
//         type: "GET",
//         url: file
//     });

//     request.done(function(output) {
//         // Afficher les données reçues pour le continent sélectionné
//         console.log('Données reçues pour le continent:');
//         console.log(output);
        
//         // Ici, tu peux appeler d'autres fonctions pour traiter ces données
//     });

//     request.fail(function(http_error) {
//         let server_msg = http_error.responseText;
//         let code = http_error.status;
//         let code_label = http_error.statusText;
//         console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
//     });
// } else {
//     console.error("Aucune requête AJAX n'a été effectuée.");
// }

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

// // Tester la fonction avec une requête AJAX
// let request = $.ajax({
//     type: "GET",
//     url: "../data/survey_results_NA.json"
// });

// request.done(function(output) {
//     // Utiliser la fonction pour récupérer les données de la France
//     let data = getDataByCountry("United States of America", output);
//     let data2 = getDataByCountry("Canada", output);

//     // Afficher les 3 premiers éléments
//     console.log(data);
//     console.log(data2);

// });

// request.fail(function(http_error) {
//     let server_msg = http_error.responseText;
//     let code = http_error.status;
//     let code_label = http_error.statusText;
//     alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
// });


// file = getUrlByContinent(continent)
// getDataByCountry(pays, file)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Test sur les deux fonctions
// let continent = "Europe"; // Par exemple, "Amérique" ou "Europe"
// let file = getUrlByContinent(continent); // Obtenir le chemin du fichier JSON

// if (file) {
//     // Faire une requête AJAX pour récupérer les données du fichier JSON
//     let request = $.ajax({
//         type: "GET",
//         url: file
//     });

//     request.done(function(output) {
//         // Afficher les données reçues pour le continent sélectionné
//         console.log('Données reçues pour le pays:');
//         console.log(getDataByCountry("France", output));
        
//         // Ici, tu peux appeler d'autres fonctions pour traiter ces données
//     });

//     request.fail(function(http_error) {
//         let server_msg = http_error.responseText;
//         let code = http_error.status;
//         let code_label = http_error.statusText;
//         console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
//     });
// } else {
//     console.error("Aucune requête AJAX n'a été effectuée.");
// }
