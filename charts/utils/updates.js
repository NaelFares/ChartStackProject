function updateChart(chart, country, jsonData, critere, anneeExp=null) {

    console.log(country);

    var pageName = $("body").data("page-name"); //Récupère le nom de la page dans le body

    // Déclaration de variables avant le switch
    let params = [];
    let revenusMoyens = [];

    switch (pageName) {
        case "dashboard1": {
            ({ criteres: params, revenusMoyens } = calculerListeRevenusMoyens(jsonData, critere, country));
            break;
        }
        case "dashboard2": {
            ({ plateformes: params, revenusMoyens } = calculerListeRevenusMoyensSelonPlateforme(jsonData, critere, country, anneeExp));
            break;
        }
        case "dashboard3": {
            // Cas traité dans la fonction updateChartTechnologies
            break;
        }
        default: {
            console.error("Nom de page inconnu pour addCountriesToDropDown:", pageName);
            return;
        }
    }

    // Créer un tableau d'objets combinant critères et revenus
    let combinedData = params.map((param, index) => ({
        param,
        revenu: revenusMoyens[index]
    }));

    // Tri personnalisé
    combinedData.sort((a, b) => {
        // Prioriser "Moins d'un an" ou autre valeur spécifique si nécessaire
        if (a.param === "Less than 1 year") return -1;
        if (b.param === "Less than 1 year") return 1;

        // Convertir les valeurs en nombres si elles sont numériques
        const numA = !isNaN(a.param) ? parseFloat(a.param) : null;
        const numB = !isNaN(b.param) ? parseFloat(b.param) : null;

        // Si les deux sont numériques, comparer leurs valeurs
        if (numA !== null && numB !== null) {
            return numA - numB;
        }

        // Si l'un est numérique et pas l'autre, le numérique vient en premier
        if (numA !== null) return -1;
        if (numB !== null) return 1;

        // Les deux ne sont pas numériques, comparer comme chaînes
        return a.param.localeCompare(b.param);
    });

    // Extraire les labels et revenus triés
    const sortedLabels = combinedData.map(item => item.param);
    const sortedRevenus = combinedData.map(item => item.revenu);

    // Mise à jour des labels
    chart.data.labels = sortedLabels;

    // Mise à jour des données du dataset principal
    if (chart.data.datasets.length > 0) {
        chart.data.datasets[0].data = sortedRevenus; // Met à jour les données uniquement
    } else {
        console.error("Le graphique ne contient aucun dataset pour mettre à jour les données.");
    }

    // Mise à jour du graphique
    chart.update();
}




function updateChartTechnologies(chart, jsonData, critere, devType, top, divIdTitle) {

    const {criteres, proportions} = calculerProportionsParCritere(jsonData, critere, devType, top);

    // Séparation des critères en numériques et non numériques
    const numericData = [];
    const nonNumericData = [];

    criteres.forEach((critere, index) => {
        const proportion = proportions[index];
        if (!isNaN(parseFloat(critere))) {
            numericData.push({ critere: parseFloat(critere), proportion });
        } else {
            nonNumericData.push({ critere, proportion });
        }
    });

    // Tri des données numériques
    numericData.sort((a, b) => a.critere - b.critere);

    // Recombinaison des données triées : numériques d'abord, non numériques ensuite
    const sortedData = [
        ...numericData.map(({ critere, proportion }) => ({ critere: critere.toString(), proportion })),
        ...nonNumericData
    ];

    const sortedLabels = sortedData.map(item => item.critere);
    const sortedProportions = sortedData.map(item => item.proportion);

    // Mise à jour du titre du graphique en fonction de l'ID de la div
    const divElement = document.getElementById(divIdTitle);
    if (divElement) {
        const h6Element = divElement.querySelector('h6');
        if (h6Element) {
            const titreActuel = h6Element.textContent;
            const partieApresTop = titreActuel.substring(titreActuel.indexOf(' ') + 2);
            h6Element.textContent = `Top ${top} ${partieApresTop}`;
        } else {
            console.error("L'élément h6 n'a pas été trouvé dans la div spécifiée.");
        }
    } else {
        console.error("La div spécifiée n'a pas été trouvée.");
    }

    // Mise à jour des labels
    chart.data.labels = sortedLabels;

    // Mise à jour des données du dataset principal
    if (chart.data.datasets.length > 0) {
        chart.data.datasets[0].data = sortedProportions; // Met à jour les données uniquement
    } else {
        console.error("Le graphique ne contient aucun dataset pour mettre à jour les données.");
    }

    // Mise à jour du graphique
    chart.update();
}