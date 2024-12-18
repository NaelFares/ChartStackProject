function loadChartRevenuMoyenEfCloud(jsonData, critere) {

    const canvas = document.getElementById('chartRevenuMoyenEfCloud');

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

    const chartRevenuMoyenEfCloud = document.getElementById('chartRevenuMoyenEfCloud');

    // Création du graphique à barres avec légendes
    var chart = new Chart(chartRevenuMoyenEfCloud, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'Revenus moyens',
                data: sortedRevenus,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur des barres
                borderColor: 'rgba(75, 192, 192, 1)',       // Couleur des bordures
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
                        text: "Plateforme de cloud utilisée"
                    },
                    ticks: {
                        autoSkip: false, // Désactiver l'échantillonnage des ticks
                        minRotation: 30  // Rotation minimale des labels
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Revenus Moyens (€)'
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

    addCountriesToDropDown("selectPaysEfCloud", chart, jsonData, critere, "selectExperienceEfCloud");
    addAnneeExpToDropDown("selectExperienceEfCloud", chart, jsonData, critere, "selectPaysEfCloud");

    return chart;
}