function loadChartRevenuMoyenEfExperience(jsonData) {

    const { criteres, revenusMoyens }  = calculerListeRevenusMoyens(jsonData, "YearsCodePro");


    const lineChartFrance = document.getElementById('chartRevenuMoyenEfExperience');

    var chart = new Chart(lineChartFrance, {
        type: 'line',
        data: {
        labels: criteres,
        datasets: [{
            label: 'Revenus moyens',
            data: revenusMoyens,
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