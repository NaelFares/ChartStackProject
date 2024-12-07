function loadChartRevenuMoyenEfFramework(jsonData, critere) {

    const canvas = document.getElementById('chartRevenuMoyenEfFramework');
    canvas.width = 450;  // Largeur en pixels
    canvas.height = 450;

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

    var chart = new Chart(chartRevenuMoyenEfFramework, {
        type: 'radar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'Revenus moyens',
                data: sortedRevenus,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });

    addCountriesToDropDown("selectPaysEfFramework", chart, jsonData, critere, "selectExperienceEfFramework");
    addAnneeExpToDropDown("selectExperienceEfFramework", chart, jsonData, critere, "selectPaysEfFramework");

    return chart;
}
