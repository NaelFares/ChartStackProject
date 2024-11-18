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

function loadChart(country, jsonData) {

    let tabData = treatData(country,jsonData);
    let years = tabData[0];
    let values = tabData[1];

    const lineChartFrance = document.getElementById('lineChartFrance');

    var chart = new Chart(lineChartFrance, {
        type: 'line',
        data: {
        labels: years,
        datasets: [{
            label: 'Nombre de médailles gagnées par année : France',
            data: values,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });

    return chart;
}


function updateCountry(chart, country, jsonData) {

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

function createCountriesDropDown(chart, jsonData){
   
    // Créer l'élément <select>
    var selectElement = document.createElement("select");

    let countries = getCountries(jsonData);
    countries.sort();

    for(let i = 0; i < countries.length; i ++) {
        let option = document.createElement('option');
        option.value = countries[i];
        option.text = countries[i];
        // On ajoute l'option au dropDown
        selectElement.appendChild(option);
    }

    // Associer le <select> à la div avec l'ID "myDiv"
    document.getElementById("selectDiv").appendChild(selectElement);

    // Associer l'événement change au <select>
    selectElement.addEventListener('change', function() {
        // Récupérer la valeur sélectionnée (le pays)
        var selectedCountry = this.value;

        // Appeler updateCountry avec la valeur sélectionnée
        updateCountry(chart, selectedCountry, jsonData);
    });
}


// Tester la fonction avec une requête AJAX
let request = $.ajax({
    type: "GET",
    url: "JO.json"
});

request.done(function(output) {
   let chart = loadChart("France", output);

   // Associe l'événement onclick au bouton après avoir créé le graphique
   $('#updateButton').on('click', function() {
    // Appelle la fonction updateCountry et passe le graphique
    updateCountry(chart, 'Brazil', output);
    });

    createCountriesDropDown(chart, output);
});

request.fail(function(http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
});



// Pour + ////////////////////////////////////////////////////////////////////////////////////////////////////

function filter(jsonData, valeur, critere) {
    let valeurData = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];
        
        // Vérifier si le pays correspond
        if (e.critere === valeur) {
            valeurData.push(e); // Ajouter l'enregistrement au tableau si c'est le bon pays
        }
    }

    return valeurData; // Retourner les données filtrées
}


function getValues(jsonData, critere) {

    let valuesList = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];

        // Boucle pour éviter les doublons, ou bien utiliser un Set
        if(!valuesList.includes(e.critere)){
            valuesList.push(e.critere);
        }
    }

    return valuesList; 
}
