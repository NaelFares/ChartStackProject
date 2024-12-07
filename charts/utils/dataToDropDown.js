
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