function loadChartRevenuMoyenEfFramework(jsonData, critere) {

    const canvas = document.getElementById('chartRevenuMoyenEfFramework');

    // Vérifier si le canvas existe
    if (!canvas) {
        console.error("Le canvas pour le graphique n'existe pas dans le DOM.");
        return;
    }

    // Vérifier si un graphique est déjà associé à ce canvas
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy(); // Supprime le graphique existant
        console.log("Graphique existant supprimé.");
    }

    // Extraction des critères et revenus moyens
    const { plateformes, revenusMoyens } = calculerListeRevenusMoyensSelonPlateforme(jsonData, critere, "Tous", "Tous");

    // Séparation des données numériques et non numériques
    const numericData = [];
    const nonNumericData = [];

    plateformes.forEach((critere, index) => {
        const revenu = revenusMoyens[index];
        if (!isNaN(parseFloat(critere))) {
            numericData.push({ critere: parseFloat(critere), revenu });
        } else {
            nonNumericData.push({ critere, revenu });
        }
    });

    // Tri des données numériques
    numericData.sort((a, b) => a.critere - b.critere);

    // Recombinaison des données triées : numériques d'abord, non numériques ensuite
    const sortedData = [
        ...numericData.map(({ critere, revenu }) => ({ critere: critere.toString(), revenu })),
        ...nonNumericData
    ];

    const sortedLabels = sortedData.map(item => item.critere);
    const sortedRevenus = sortedData.map(item => item.revenu);

    const chartRevenuMoyenEfFramework = document.getElementById('chartRevenuMoyenEfFramework');

    // Couleurs par défaut
    const defaultColor = 'rgba(75, 192, 192, 0.2)';
    const colors = {
        gold:  'rgba(255, 215, 0, 0.5)',
        silver: 'rgba(192, 192, 192, 0.5)',
        bronze: 'rgba(205, 127, 50, 0.5)'
    };
    const defaultBorder = 'rgba(75, 192, 192, 1)';
    const borders = {
        gold:  'rgba(255, 215, 0, 1)',
        silver: 'rgba(192, 192, 192, 1)',
        bronze: 'rgba(205, 127, 50, 1)'
    };

    // Appliquer la couleur par défaut à toutes les barres
    const backgroundColors = new Array(sortedRevenus.length).fill(defaultColor);
    const bordersColors = new Array(sortedRevenus.length).fill(defaultBorder);

    // Identifier les 3 valeurs les plus grandes
    const sortedIndices = [...sortedRevenus]
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value) // Tri décroissant
        .slice(0, 3) // Prendre les 3 plus grandes valeurs
        .map(item => item.index);

    // Appliquer les couleurs or, argent, bronze aux indices des 3 valeurs les plus élevées
    if (sortedIndices.length >= 3) {
        backgroundColors[sortedIndices[0]] = colors.gold;   // Or
        backgroundColors[sortedIndices[1]] = colors.silver; // Argent
        backgroundColors[sortedIndices[2]] = colors.bronze;  // Bronze
    }
    if (sortedIndices.length >= 3) {
        bordersColors[sortedIndices[0]] = borders.gold;   // Or
        bordersColors[sortedIndices[1]] = borders.silver; // Argent
        bordersColors[sortedIndices[2]] = borders.bronze;  // Bronze
    }


    // Création du graphique à barres avec légendes
    var chart = new Chart(chartRevenuMoyenEfFramework, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'Revenus moyens',
                data: sortedRevenus,
                backgroundColor: backgroundColors, // Couleur des barres
                borderColor: bordersColors,       // Couleur des bordures
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Orientation horizontale
            plugins: {
                legend: {
                    display: true, // Affiche la légende
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Revenus Moyens (€)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Framework utilisé"
                    },
                    ticks: {
                        autoSkip: false, // Désactiver l'échantillonnage des ticks
                        maxRotation: 90, // Rotation maximale des labels pour éviter les chevauchements
                        minRotation: 45  // Rotation minimale des labels
                    }
                }
            }
        }
    });

    addCountriesToDropDown("selectPaysEfFramework", chart, jsonData, critere, "selectExperienceEfFramework");
    addAnneeExpToDropDown("selectExperienceEfFramework", chart, jsonData, critere, "selectPaysEfFramework");

    return chart;
}
