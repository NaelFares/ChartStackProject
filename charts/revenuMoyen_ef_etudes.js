// // Fonction pour gérer le processus complet de sélection et affichage des données
// function handleSelection(continent, pays) {
//     let urlFile;

//     // Si aucun continent n'est sélectionné, on affiche toutes les données
//     if (!continent) {
//         let { request1, request2 } = getAll();
        
//         // Attendre la fin des deux requêtes AJAX pour récupérer toutes les données
//         $.when(request1, request2).done(function(output1, output2) {
//             let combinedData = output1[0].concat(output2[0]);
//             console.log('Toutes les données sur les deux continents :', combinedData);
//             console.log(calculerListeRevenusMoyens(combinedData, "EdLevel"));
//         }).fail(function(http_error) {
//             let server_msg = http_error.responseText;
//             let code = http_error.status;
//             let code_label = http_error.statusText;
//             console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
//         });
//     }
//     // Si un continent est sélectionné, on affiche les données de ce continent
//     else {
//         urlFile = getUrlByContinent(continent);

//         if (urlFile) {
//             // Effectuer la requête AJAX pour récupérer les données du continent
//             let request = $.ajax({
//                 type: "GET",
//                 url: urlFile
//             });

//             request.done(function(output) {
//                 // Si un pays est également sélectionné, on filtre les données pour ce pays
//                 if (pays) {
//                     let countryData = getDataByCountry(pays, output);
//                     console.log(`Données pour ${pays}:`, countryData);
//                     console.log(calculerListeRevenusMoyens(countryData, "EdLevel"));
//                 } else {
//                     // Sinon, on affiche toutes les données du continent
//                     console.log(`Toutes les données pour le continent ${continent}:`, output);
//                     console.log(calculerListeRevenusMoyens(output, "EdLevel"));
//                 }
//             });

//             request.fail(function(http_error) {
//                 let server_msg = http_error.responseText;
//                 let code = http_error.status;
//                 let code_label = http_error.statusText;
//                 console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
//             });
//         }
//     }
// }

// // Exemple d'appel avec un continent et un pays
// let continent = "Europe"; // Continent sélectionné
// let pays = "France"; // Pays sélectionné
// handleSelection(continent, pays); // Appeler la fonction avec les paramètres choisis

// // Exemple d'appel avec seulement un continent
// continent = "Amérique"; // Continent sélectionné
// pays = ""; // Aucun pays sélectionné
// handleSelection(continent, pays); // Appeler la fonction avec seulement le continent

// // Exemple d'appel avec tous les continents
// continent = ""; // Aucun continent sélectionné
// pays = ""; // Aucun pays sélectionné
// handleSelection(continent, pays); // Appeler la fonction pour afficher toutes les données


function treatData(pays, continent) {
    // Récupérer l'URL du fichier JSON en fonction du continent
    let urlFile = getUrlByContinent(continent);
    // Récupérer les données du pays
    let dataCountry = getDataByCountry(pays, urlFile);
    
    // Calculer les revenus moyens par niveau d'études
    let data = calculerListeRevenusMoyens(dataCountry, "EdLevel");  // Ici, on suppose que "EdLevel" correspond au niveau d'études
    
    // Initialiser les tableaux pour les niveaux d'études et les revenus moyens
    let edLevelList = [];
    let revenuMoyenList = [];

    // Remplir les tableaux avec les données récupérées
    for (let level in data) {
        edLevelList.push(level);  // Les niveaux d'études
        revenuMoyenList.push(data[level].average);  // Les revenus moyens pour chaque niveau d'étude
    }

    // Trier les niveaux d'études
    edLevelList.sort((a, b) => a.localeCompare(b)); // On trie par ordre alphabétique ou selon les critères définis
    
    // Organiser les revenus moyens en fonction des niveaux d'études
    let sortedRevenus = [];
    for (let edLevel of edLevelList) {
        sortedRevenus.push(data[edLevel].average);
    }

    // Retourner les niveaux d'études et les revenus triés
    return [edLevelList, sortedRevenus];
}

// Test sur la fonction treatData
let continent = "Europe"; // Exemple de continent, peut être "Amérique" ou "Europe"
let pays = "France"; // Exemple de pays, peut être "France", "Allemagne", etc.

// Obtenir l'URL du fichier JSON en fonction du continent
let urlFile = getUrlByContinent(continent);

if (urlFile) {
    // Faire une requête AJAX pour récupérer les données du fichier JSON
    let request = $.ajax({
        type: "GET",
        url: urlFile
    });

    request.done(function(output) {
        // Utiliser la fonction getDataByCountry pour obtenir les données spécifiques du pays
        let dataCountry = getDataByCountry(pays, output);
        
        // Appliquer la fonction treatData pour calculer les revenus moyens par niveau d'études
        let [edLevelList, sortedRevenus] = treatData(pays, continent);
        
        // Afficher les données reçues pour le pays et les résultats du traitement
        console.log('Données pour le pays:', pays);
        console.log('Niveaux d\'études:', edLevelList);
        console.log('Revenus moyens:', sortedRevenus);

        // Optionnel : Tu peux aussi afficher ces résultats sur une chart ou un autre composant visuel
    });

    request.fail(function(http_error) {
        let server_msg = http_error.responseText;
        let code = http_error.status;
        let code_label = http_error.statusText;
        console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
    });
} else {
    console.error("Aucune requête AJAX n'a été effectuée.");
}

