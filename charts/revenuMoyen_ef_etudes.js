
function fetchData(continent = null, country = null) {
    // Si aucun continent et aucun pays n'est précisé : récupérer toutes les données
    if (!continent && !country) {
        let { request1, request2 } = getAll();

        return $.when(request1, request2).then(
            (data1, data2) => {
                // Concaténer les données des deux fichiers
                const allData = data1[0].concat(data2[0]);
                // Calculer les moyennes par niveau d'étude
                return calculerListeRevenusMoyens(allData, "EdLevel");
            },
            (http_error) => {
                console.error(`Erreur lors de la récupération des données globales : ${http_error.statusText}`);
            }
        );
    }

    // Si un continent est précisé, mais pas de pays
    if (continent && !country) {
        const url = getUrlByContinent(continent);

        if (url) {
            return $.ajax({
                type: "GET",
                url: url,
            }).then(
                (data) => {
                    // Calculer les moyennes par niveau d'étude pour le continent
                    return calculerListeRevenusMoyens(data, "EdLevel");
                },
                (http_error) => {
                    console.error(`Erreur lors de la récupération des données pour le continent : ${http_error.statusText}`);
                }
            );
        } else {
            console.error("URL invalide pour le continent spécifié.");
            return null;
        }
    }

    // Si un continent et un pays sont précisés
    if (continent && country) {
        const url = getUrlByContinent(continent);

        if (url) {
            return $.ajax({
                type: "GET",
                url: url,
            }).then(
                (data) => {
                    // Filtrer les données pour le pays
                    const countryData = getDataByCountry(country, data);
                    // Calculer les moyennes par niveau d'étude pour le pays
                    calculerListeRevenusMoyens(countryData, "EdLevel");
                    console.log("resultat calcul moyenne pour france", calculerListeRevenusMoyens(countryData, "EdLevel"));
                },
                (http_error) => {
                    console.error(`Erreur lors de la récupération des données pour le pays : ${http_error.statusText}`);
                }
            );
        } else {
            console.error("URL invalide pour le continent spécifié.");
            return null;
        }
    }

    // Si une configuration incorrecte est fournie
    console.error("Configuration invalide. Fournissez un continent et/ou un pays valide.");
    return null;
}

// Test 1 : Récupérer toutes les données et afficher la moyenne des revenus par niveau d'étude
fetchData().then(data => {
    console.log("Moyenne des revenus par niveau d'étude (toutes les données) :");
    console.table(data);
});

// Test 2 : Récupérer les données pour un continent (Europe) et afficher la moyenne des revenus par niveau d'étude
fetchData("Europe").then(data => {
    console.log("Moyenne des revenus par niveau d'étude (Europe) :");
    console.table(data);
});

// Test 3 : Récupérer les données pour un pays (France en Europe) et afficher la moyenne des revenus par niveau d'étude
fetchData("Europe", "France").then(data => {
    console.log("Moyenne des revenus par niveau d'étude (France) :");
    console.table(data);
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// // Test sur la fonction treatData
// let continent = "Europe"; // Exemple de continent, peut être "Amérique" ou "Europe"
// let pays = "France"; // Exemple de pays, peut être "France", "Allemagne", etc.

// // Obtenir l'URL du fichier JSON en fonction du continent
// let urlFile = getUrlByContinent(continent);

// if (urlFile) {
//     // Faire une requête AJAX pour récupérer les données du fichier JSON
//     let request = $.ajax({
//         type: "GET",
//         url: urlFile
//     });

//     request.done(function(output) {
//         // Utiliser la fonction getDataByCountry pour obtenir les données spécifiques du pays
//         let dataCountry = getDataByCountry(pays, output);
        
//         // Appliquer la fonction treatData pour calculer les revenus moyens par niveau d'études
//         let [edLevelList, sortedRevenus] = treatData(pays, continent);
        
//         // Afficher les données reçues pour le pays et les résultats du traitement
//         console.log('Données pour le pays:', pays);
//         console.log('Niveaux d\'études:', edLevelList);
//         console.log('Revenus moyens:', sortedRevenus);

//         // Optionnel : Tu peux aussi afficher ces résultats sur une chart ou un autre composant visuel
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

