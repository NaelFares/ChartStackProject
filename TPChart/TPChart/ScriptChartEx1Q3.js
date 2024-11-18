// // Fonction qui filtre les données pour un pays donné
// function getCountryData(country, jsonData) {
//     // Utiliser la méthode filter pour ne garder que les enregistrements du pays spécifié
//     let countryData = jsonData.filter(function(e) {
//         return e.Country === country;
//     });

//     return countryData;
// }


// Fonction qui filtre les données pour un pays donné en utilisant une boucle for
function getCountryData(country, jsonData) {
    let countryData = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];
        
        // Vérifier si le pays correspond
        if (e.Country === country) {
            countryData.push(e); // Ajouter l'enregistrement au tableau si c'est le bon pays
        }
    }

    return countryData; // Retourner les données filtrées
}

function getYears(jsonData) {

    let yearsValues = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];

        // Boucle pour éviter les doublons, ou bien utiliser un Set
        if(!yearsValues.includes(e.Year)){
            yearsValues.push(e.Year);
        }
    }

    return yearsValues; 
}

function aggregateYears(yearsList, jsonData) {

    let yearsMap = {};

    // Parcourir toutes les données avec une boucle for, avec la technique du prof pour le for
    for (let i of yearsList) {
        yearsMap[i] = 0; // Initialiser la clé pour chaque année à 0, sinon ne fonctionne
        for (let j of jsonData) {
            if(i == j.Year){
                yearsMap[i] += 1;
            }
        }
    }
    return yearsMap; 
}

// Tester la fonction avec une requête AJAX
let request = $.ajax({
    type: "GET",
    url: "JO.json"
});

request.done(function(output) {
    // Utiliser la fonction pour récupérer les données de la France
    // let franceData = getCountryData("France", output);
    let yearsValues = getYears(output);

    let yearsMap = aggregateYears(yearsValues, output);
    
    // Afficher les 3 premiers éléments
    alert("Le dictionnaire est : " + JSON.stringify(yearsMap));
});

request.fail(function(http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
});
