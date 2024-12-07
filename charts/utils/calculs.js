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


// Calculer le revenu moyen selon les plateformes cloud utilisées, avec exclusion des valeurs extrêmes
function calculerListeRevenusMoyensSelonPlateforme(jsonData, critere, pays, anneeExp) {
    const revenusParPlateforme = {};

    // Définir les seuils pour exclure les outliers
    const revenuMin = 1000; // Par exemple : revenu minimum raisonnable
    const revenuMax = 500000; // Par exemple : revenu maximum raisonnable

    jsonData.forEach(item => {
        const revenu = parseFloat(item.CompTotal || 0); // Revenu
        const devise = item.Currency; // Devise
        const valeurCritere = item[critere]; // Chaîne des plateformes cloud
        const paysItem = item.Country; // Pays de l'item
        const anneeExpItem = item.YearsCodePro; // Années d'expérience professionnelles

        // Si un pays spécifique est demandé, filtrer les données
        if (pays !== "Tous" && paysItem !== pays) {
            return; // Ignorer les données qui ne correspondent pas au pays
        }

        // Si une année d'expérience spécifique est demandée, filtrer les données
        if (anneeExp !== "Tous" && anneeExpItem !== anneeExp) {
            return; // Ignorer les données qui ne correspondent pas à l'année d'expérience
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


function calculerProportionsParCritere(jsonData, critere, devType, top) {
    const proportionsParCritere = {};

    // Parcourir les données JSON
    jsonData.forEach(item => {
        const valeurCritere = item[critere]; // Valeur du critère
        const typeDev = item.DevType; // Métier

        // Filtrer les données en fonction du métier
        if (typeDev !== devType) {
            return; // Ignorer les données qui ne correspondent pas au métier
        }

        if (valeurCritere) {
            // Extraire les critères sans doublons
            const criteres = valeurCritere.split(";").map(c => c.trim()).filter(Boolean);
            criteres.forEach(critere => {
                if (!proportionsParCritere[critere]) {
                    proportionsParCritere[critere] = { count: 0 };
                }
                proportionsParCritere[critere].count++;
            });
        }
    });

    // Calculer le total des critères individuels
    let totalCriteres = 0;
    Object.values(proportionsParCritere).forEach(entry => {
        totalCriteres += entry.count;
    });

    // Calculer les proportions par rapport au total des critères
    const resultats = Object.keys(proportionsParCritere)
        .map(critere => {
            const { count } = proportionsParCritere[critere];
            return { critere, proportion: ((count / totalCriteres) * 100).toFixed(2) };
        })
        .sort((a, b) => b.proportion - a.proportion) // Tri par ordre décroissant des proportions
        .slice(0, top); // Garder seulement les x (top) plus grandes proportions

    // Extraire les critères et les proportions
    const criteres = resultats.map(res => res.critere);
    const proportions = resultats.map(res => res.proportion);

    return { criteres, proportions };
}