function loadChartTopOutilCommUtilise(jsonData, critere) {

    const canvas = document.getElementById('chartTopCommUtilise'); 
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

    addDevTypeToDropDownTemporaire("selectMetierTopOutilComm", jsonData);

    let devType = document.getElementById('selectMetierTopOutilComm').value;

    // Extraction des critères et proportions
    const { criteres, proportions } = calculerProportionsParCritere(jsonData, critere, devType, 5);

    // Séparation des données numériques et non numériques
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

    // Création du graphique à barres avec légendes
    var chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'Proportion d\'utilisation',
                data: sortedProportions,
                //backgroundColor: 'rgba(75, 192, 192, 0.2)',
                //borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,           // Permet au graphique de s'ajuster dynamiquement
            maintainAspectRatio: false, // Permet de ne pas conserver l'aspect ratio par défaut
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Proportion d\'utilisation'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Outils de communication"
                    }
                }
            }
        }
    });

    addDevTypeToDropDown("selectMetierTopOutilComm", chart, jsonData, critere, "selectTopOutilComm", "titre-com");
    addEventToDropDownTop("selectMetierTopOutilComm", chart, jsonData, critere, "selectTopOutilComm", "titre-com");

    return chart;
}