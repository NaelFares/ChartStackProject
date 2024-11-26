// Fonction pour charger les données et mettre à jour le graphique
function loadDataBySelectContinent() {
    const continent = $("#selectContinentEfExperience").val(); // Récupère la valeur sélectionnée dans le <select>
    console.log("Continent selectionné : " + continent)
    const file = getUrlByContinent(continent); // Obtenir l'URL du fichier correspondant au continent

    if (file) {
        // Faire une requête AJAX pour récupérer les données
        let request = $.ajax({
            type: "GET",
            url: file
        });

        request.done(function(output) {
            console.log(`Données pour ${continent} chargées.`);
            loadChartRevenuMoyenEfExperience(output, "YearsCodePro"); // Charge le graphique
        });

        request.fail(function(http_error) {
            let server_msg = http_error.responseText;
            let code = http_error.status;
            let code_label = http_error.statusText;
            console.error(`Erreur ${code} (${code_label}): ${server_msg}`);
        });
    } else {
        console.error("Aucun fichier trouvé pour ce continent.");
    }
}

$(document).ready(function () {
    $("#selectContinentEfExperience").on("change", loadDataBySelectContinent);
    loadDataBySelectContinent(); // Charger les données initiales
});