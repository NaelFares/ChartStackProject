function loadChartRevenuMoyenEfExperience(jsonData, critere) {

    const canvas = document.getElementById('chartRevenuMoyenEfExperience');

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

    // Séparation des données numériques et non numériques
    const numericData = [];
    const nonNumericData = [];

    criteres.forEach((critere, index) => {
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

    const chartRevenuMoyenEfExperience = document.getElementById('chartRevenuMoyenEfExperience');

    // Création du graphique à barres avec légendes
    var chart = new Chart(chartRevenuMoyenEfExperience, {
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
                        text: "Années d'expériences"
                    }
                }
            }
        }
    });

    addCountriesToDropDown("selectPaysEfExperience", chart, jsonData, critere);

    return chart;
}



// Calculer le revenu moyen selon un critère, avec exclusion des valeurs extrêmes
function calculerListeRevenusMoyens(jsonData, critere, pays) {
    const revenusParCritere = {};

    // Définir les seuils pour exclure les outliers
    const revenuMin = 1000; // Par exemple : revenu minimum raisonnable
    const revenuMax = 500000; // Par exemple : revenu maximum raisonnable

    jsonData.forEach(item => {
        const revenu = parseFloat(item.CompTotal || 0); // Revenu 
        const devise = item.Currency; // Devise
        const valeurCritere = item[critere]; // Valeur du critère
        const paysItem = item.Country; // Pays de l'item

        // Si un pays spécifique est demandé, filtrer les données
        if (pays !== "Tous" && paysItem !== pays) {
            return; // Ignorer les données qui ne correspondent pas au pays
        }

        if (!isNaN(revenu) && devise && valeurCritere) {
            const revenuEnEuros = convertToEuros(revenu, devise);

            // Vérifier que le revenu converti est dans les limites acceptables
            if (revenuEnEuros !== null && revenuEnEuros >= revenuMin && revenuEnEuros <= revenuMax) {
                if (!revenusParCritere[valeurCritere]) {
                    revenusParCritere[valeurCritere] = { total: 0, count: 0 };
                }
                revenusParCritere[valeurCritere].total += revenuEnEuros;
                revenusParCritere[valeurCritere].count++;
            }
        }
    });

    // Préparer les résultats triés par critère
    const resultats = Object.keys(revenusParCritere)
        .map(cle => {
            const { total, count } = revenusParCritere[cle];
            return { critere: cle, revenuMoyen: (total / count).toFixed(2) };
        })
        .sort((a, b) => a.critere.localeCompare(b.critere)); // Tri par ordre croissant des critères

    // Extraire les critères et les revenus moyens
    const criteres = resultats.map(res => res.critere);
    const revenusMoyens = resultats.map(res => res.revenuMoyen);

    return { criteres, revenusMoyens };
}



function updateCountry(chart, country, jsonData, critere) {

    console.log(country);

    const { criteres, revenusMoyens } = calculerListeRevenusMoyens(jsonData, critere, country);

    // Séparation des critères en numériques et non numériques
    const numericData = [];
    const nonNumericData = [];

    criteres.forEach((critere, index) => {
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

