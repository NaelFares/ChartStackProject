
// continent = //mettre le get;
// pays = // mettre le get;
// urlFile = getUrlByContinent(continent);
// data = getDataByCountry(pays, urlFile);
// calculerListeRevenusMoyens(data, critere = "EdLevel");


// Fonction pour gérer le processus complet de sélection et affichage des données
function handleSelection(continent, pays) {
    let urlFile;

    // Si aucun continent n'est sélectionné, on affiche toutes les données
    if (!continent) {
        let { request1, request2 } = getAll();
        
        // Attendre la fin des deux requêtes AJAX pour récupérer toutes les données
        $.when(request1, request2).done(function(output1, output2) {
            let combinedData = output1[0].concat(output2[0]);
            console.log('Toutes les données sur les deux continents :', combinedData);
            console.log(calculerListeRevenusMoyens(combinedData, "EdLevel"));
        }).fail(function(http_error) {
            let server_msg = http_error.responseText;
            let code = http_error.status;
            let code_label = http_error.statusText;
            console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
        });
    }
    // Si un continent est sélectionné, on affiche les données de ce continent
    else {
        urlFile = getUrlByContinent(continent);

        if (urlFile) {
            // Effectuer la requête AJAX pour récupérer les données du continent
            let request = $.ajax({
                type: "GET",
                url: urlFile
            });

            request.done(function(output) {
                // Si un pays est également sélectionné, on filtre les données pour ce pays
                if (pays) {
                    let countryData = getDataByCountry(pays, output);
                    console.log(`Données pour ${pays}:`, countryData);
                    console.log(calculerListeRevenusMoyens(countryData, "EdLevel"));
                } else {
                    // Sinon, on affiche toutes les données du continent
                    console.log(`Toutes les données pour le continent ${continent}:`, output);
                    console.log(calculerListeRevenusMoyens(output, "EdLevel"));
                }
            });

            request.fail(function(http_error) {
                let server_msg = http_error.responseText;
                let code = http_error.status;
                let code_label = http_error.statusText;
                console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
            });
        }
    }
}

// Exemple d'appel avec un continent et un pays
let continent = "Europe"; // Continent sélectionné
let pays = "France"; // Pays sélectionné
handleSelection(continent, pays); // Appeler la fonction avec les paramètres choisis

// Exemple d'appel avec seulement un continent
continent = "Amérique"; // Continent sélectionné
pays = ""; // Aucun pays sélectionné
handleSelection(continent, pays); // Appeler la fonction avec seulement le continent

// Exemple d'appel avec tous les continents
continent = ""; // Aucun continent sélectionné
pays = ""; // Aucun pays sélectionné
handleSelection(continent, pays); // Appeler la fonction pour afficher toutes les données
