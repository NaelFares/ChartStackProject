function loadChartRevenuMoyenEfEtude(jsonData, critere) {

    const canvas = document.getElementById('chartRevenuMoyenEfEtude');

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
    const { criteres, revenusMoyens } = calculerListeRevenusMoyens(jsonData, critere, "Tous");

    // Créer un tableau d'objets combinant critères et revenus
    let combinedData = criteres.map((critere, index) => ({
        critere,
        revenu: revenusMoyens[index]
    }));

    // Tri personnalisé
    combinedData.sort((a, b) => {
        // Prioriser "Moins d'un an" ou autre valeur spécifique si nécessaire
        if (a.critere === "Less than 1 year") return -1;
        if (b.critere === "Less than 1 year") return 1;

        // Convertir les valeurs en nombres si elles sont numériques
        const numA = !isNaN(a.critere) ? parseFloat(a.critere) : null;
        const numB = !isNaN(b.critere) ? parseFloat(b.critere) : null;

        // Si les deux sont numériques, comparer leurs valeurs
        if (numA !== null && numB !== null) {
            return numA - numB;
        }

        // Si l'un est numérique et pas l'autre, le numérique vient en premier
        if (numA !== null) return -1;
        if (numB !== null) return 1;

        // Les deux ne sont pas numériques, comparer comme chaînes
        return a.critere.localeCompare(b.critere);
    });

    // Extraire les labels et revenus triés
    const sortedLabels = combinedData.map(item => item.critere);
    const sortedRevenus = combinedData.map(item => item.revenu);

    const chartRevenuMoyenEfEtude = document.getElementById('chartRevenuMoyenEfEtude');

    // Création du graphique à barres avec légendes
    var chart = new Chart(chartRevenuMoyenEfEtude, {
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
                        text: "Niveau d'étude"
                    }
                }
            }
        }
    });

    addCountriesToDropDown("selectPaysEfEtude", chart, jsonData, critere);

    return chart;
}


