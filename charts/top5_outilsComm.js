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
                backgroundColor: [
                    'rgba(255, 215, 0, 0.2)',
                    'rgba(192, 192, 192, 0.2)',
                    'rgba(205, 127, 50, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 171, 64, 0.2)',
                    'rgba(130, 3, 110, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 215, 0, 1)',
                    'rgba(192, 192, 192, 1)',
                    'rgba(205, 127, 50, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 171, 64, 1)',
                    'rgba(130, 3, 110, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            // Utilisez context.raw pour accéder directement à la valeur brute
                            return context.label + ': ' + context.raw.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    

    addDevTypeToDropDown("selectMetierTopOutilComm", chart, jsonData, critere, "selectTopOutilComm", "titre-com");
    addEventToDropDownTop("selectMetierTopOutilComm", chart, jsonData, critere, "selectTopOutilComm", "titre-com");

    return chart;
}