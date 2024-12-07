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

function getAnneeExperiences(jsonData) {
    let anneeExpValues = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];

        // Ajouter la valeur si elle n'existe pas déjà dans le tableau
        if (e.YearsCodePro && !anneeExpValues.includes(e.YearsCodePro)) {
            anneeExpValues.push(e.YearsCodePro);
        }
    }

    // Trier les valeurs : "Less than 1 year" en premier, numériques, puis non numériques
    anneeExpValues.sort((a, b) => {
        // Prioriser "Less than 1 year"
        if (a === "Less than 1 year") return -1;
        if (b === "Less than 1 year") return 1;

        // Convertir les valeurs en nombres si elles sont numériques
        const numA = !isNaN(a) ? parseFloat(a) : null;
        const numB = !isNaN(b) ? parseFloat(b) : null;

        // Si les deux sont numériques, comparer leurs valeurs
        if (numA !== null && numB !== null) {
            return numA - numB;
        }

        // Si l'un est numérique et pas l'autre, le numérique vient en premier
        if (numA !== null) return -1;
        if (numB !== null) return 1;

        // Les deux ne sont pas numériques, comparer comme chaînes
        return a.localeCompare(b);
    });

    return anneeExpValues;
}


function getDevType(jsonData) {
    let devTypeValues = [];

    // Parcourir toutes les données avec une boucle for
    for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];

        // Ajouter la valeur si elle n'existe pas déjà dans le tableau
        if (e.YearsCodePro && !devTypeValues.includes(e.DevType)) {
            devTypeValues.push(e.DevType);
        }
    }

    // Trier les valeurs par ordre alphabétique
    devTypeValues.sort((a, b) => a.localeCompare(b));

    return devTypeValues;
}
