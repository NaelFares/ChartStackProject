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

// On extrait les données nous intéressant
// Les médailles obtenues par années, pour un pays donné.
function treatData(country,jsonData) {
    // On récupère les données du pays qui nous intéresse
    let countryData = getCountryData(country,jsonData);

    let yearsList = getYears(countryData)

    // On aggrège le nombre d'athlètes ayant gagné une médaille par année.
    let dataDict = aggregateYears(yearsList, countryData);

    yearsList.sort(function(a, b){return a-b});

    // On récupère les années correspondantes et on les range dans un array
    let values = [];
    for (let year of yearsList){
      values.push(dataDict[year]);
    }

    return [yearsList, values];
}



// Tester la fonction avec une requête AJAX
let request = $.ajax({
    type: "GET",
    url: "JO.json"
});

request.done(function(output) {
    // Utiliser la fonction pour récupérer les données de la France
    let tabRes = treatData("France",output);
    
    // Afficher les 3 premiers éléments
    alert("Les listes des années et des nombres sont : \n" + JSON.stringify(tabRes));
});

request.fail(function(http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
});
