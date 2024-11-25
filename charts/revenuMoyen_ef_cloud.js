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