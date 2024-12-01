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
    const { criteres, revenusMoyens } = calculerListeRevenusMoyensSelonCloud(jsonData, critere, "Tous");

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
                        text: "Plateforme de cloud utilisée"
                    }
                }
            }
        }
    });

    addCountriesToDropDown("selectPaysEfCloud", chart, jsonData, critere);

    return chart;
}


// Calculer le revenu moyen selon les plateformes cloud utilisées, avec exclusion des valeurs extrêmes
function calculerListeRevenusMoyensSelonCloud(jsonData, critere, pays) {
    const revenusParPlateforme = {};

    // Définir les seuils pour exclure les outliers
    const revenuMin = 1000; // Par exemple : revenu minimum raisonnable
    const revenuMax = 500000; // Par exemple : revenu maximum raisonnable

    jsonData.forEach(item => {
        const revenu = parseFloat(item.CompTotal || 0); // Revenu
        const devise = item.Currency; // Devise
        const valeurCritere = item[critere]; // Chaîne des plateformes cloud
        const paysItem = item.Country; // Pays de l'item

        // Si un pays spécifique est demandé, filtrer les données
        if (pays !== "Tous" && paysItem !== pays) {
            return; // Ignorer les données qui ne correspondent pas au pays
        }

        if (!isNaN(revenu) && devise && valeurCritere) {
            const revenuEnEuros = convertToEuros(revenu, devise);

            // Vérifier que le revenu converti est dans les limites acceptables
            if (revenuEnEuros !== null && revenuEnEuros >= revenuMin && revenuEnEuros <= revenuMax) {
                // Extraire les plateformes sans doublons
                const plateformes = valeurCritere.split(";").map(p => p.trim()).filter(Boolean);
                plateformes.forEach(plateforme => {
                    if (!revenusParPlateforme[plateforme]) {
                        revenusParPlateforme[plateforme] = { total: 0, count: 0 };
                    }
                    revenusParPlateforme[plateforme].total += revenuEnEuros;
                    revenusParPlateforme[plateforme].count++;
                });
            }
        }
    });

    // Préparer les résultats triés par plateforme
    const resultats = Object.keys(revenusParPlateforme)
        .map(plateforme => {
            const { total, count } = revenusParPlateforme[plateforme];
            return { plateforme, revenuMoyen: (total / count).toFixed(2) };
        })
        .sort((a, b) => a.plateforme.localeCompare(b.plateforme)); // Tri par ordre croissant des plateformes

    // Extraire les plateformes et les revenus moyens
    const plateformes = resultats.map(res => res.plateforme);
    const revenusMoyens = resultats.map(res => res.revenuMoyen);

    return { plateformes, revenusMoyens };
}


function updateCountry(chart, country, jsonData, critere) {
    console.log(country);

    // Appeler la fonction adaptée pour calculer les revenus moyens par plateforme
    const { plateformes, revenusMoyens } = calculerListeRevenusMoyensSelonCloud(jsonData, critere, country);

    // Séparation des plateformes en numériques et non numériques (bien que peu probable ici)
    const numericData = [];
    const nonNumericData = [];

    plateformes.forEach((plateforme, index) => {
        const revenu = revenusMoyens[index];
        if (!isNaN(parseFloat(plateforme))) {
            numericData.push({ plateforme: parseFloat(plateforme), revenu });
        } else {
            nonNumericData.push({ plateforme, revenu });
        }
    });

    // Tri des données numériques
    numericData.sort((a, b) => a.plateforme - b.plateforme);

    // Recombinaison des données triées : numériques d'abord, non numériques ensuite
    const sortedData = [
        ...numericData.map(({ plateforme, revenu }) => ({ plateforme: plateforme.toString(), revenu })),
        ...nonNumericData
    ];

    const sortedLabels = sortedData.map(item => item.plateforme);
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


// Charger le fichier JSON avec fetch
fetch('../data/survey_results_NA.json') // Remplace le chemin par celui de ton fichier
    .then(response => response.json())
    .then(jsonData => {
        // Appeler la fonction de calcul
        const result = calculerListeRevenusMoyensSelonCloud(jsonData, "PlatformHaveWorkedWith", "France");
        console.log("Plateformes : ", result.plateformes);
        console.log("Revenus moyens : ", result.revenusMoyens);
    })
    .catch(error => console.error("Erreur lors du chargement du fichier JSON :", error));

