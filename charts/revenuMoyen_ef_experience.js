// Supposons que jsonData1 et jsonData2 sont les données chargées à partir de chaque fichier JSON
let jsonData1 = ["data/survey_results_NA.json"];
let jsonData2 = ["data/survey_results_WE.json"];

// Ou avec concat()
let mergedData = jsonData1.concat(jsonData2);

// Maintenant mergedData contient toutes les données des deux fichiers
console.log(mergedData);
