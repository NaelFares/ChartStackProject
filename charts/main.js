// Fonction pour charger les données et mettre à jour le graphique
function loadDataBySelectContinent(selectElement = null) {
    // Si un élément spécifique est fourni, utiliser sa valeur ; sinon, charger tous les `select` ayant la classe "continents"
    if (selectElement) {
        const continent = $(selectElement).val(); // Récupère la valeur sélectionnée dans ce <select>
        console.log("Continent sélectionné : " + continent);
        const file = getUrlByContinent(continent); // Obtenir l'URL du fichier correspondant au continent

        if (file) {
            // Faire une requête AJAX pour récupérer les données
            let request = $.ajax({
                type: "GET",
                url: file
            });

            request.done(function (output) {
                console.log(`Données pour ${continent} chargées.`);
                loadChartRevenuMoyenEfExperience(output, "YearsCodePro"); // Charge le graphique
            });

            request.fail(function (http_error) {
                let server_msg = http_error.responseText;
                let code = http_error.status;
                let code_label = http_error.statusText;
                console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
            });
        } else {
            console.error("Aucun fichier trouvé pour ce continent.");
        }
    } else {
        // Charger les données pour tous les `select` ayant la classe "continents"
        $(".continents").each(function () {
            const continent = $(this).val(); // Récupère la valeur sélectionnée dans chaque <select>
            console.log("Chargement initial pour le continent : " + continent);
            const file = getUrlByContinent(continent); // Obtenir l'URL du fichier correspondant

            if (file) {
                // Faire une requête AJAX pour chaque fichier correspondant
                let request = $.ajax({
                    type: "GET",
                    url: file
                });

                request.done(function (output) {
                    console.log(`Données initiales pour ${continent} chargées.`);
                    loadChartRevenuMoyenEfExperience(output, "YearsCodePro"); // Charge le graphique
                });

                request.fail(function (http_error) {
                    let server_msg = http_error.responseText;
                    let code = http_error.status;
                    let code_label = http_error.statusText;
                    console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
                });
            } else {
                console.error("Aucun fichier trouvé pour ce continent : " + continent);
            }
        });
    }
}

// Gestion des événements au chargement de la page
$(document).ready(function () {
    // Charger les données initiales pour tous les `select` ayant la classe "continents"
    loadDataBySelectContinent();

    // Écouter les changements sur chaque `select` ayant la classe "continents" et charger les données pour celui-ci
    $(".continents").on("change", function () {
        loadDataBySelectContinent(this); // Passe le `select` modifié comme paramètre
    });
});
