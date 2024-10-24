document.addEventListener('DOMContentLoaded', function() {

    const exercices = [
        { nom: "Exercice click", fichier: "click.html" },
        { nom: "Exercice DOM Event", fichier: "dom.html" },
        { nom: "Exercice Class", fichier: "class.html" },
        { nom: "Exercice PME", fichier: "pme.html" },
    ];

    function creerListeExercices() {
        const liste = document.createElement('ul');
        liste.className = 'list-disc pl-5 space-y-2';

        exercices.forEach(exercice => {
            const item = document.createElement('li');
            const lien = document.createElement('a');
            lien.href = `/exo/${exercice.fichier}`;
            lien.textContent = exercice.nom;
            lien.className = 'text-[#fb923c] hover:text-[#f97316] underline';
            item.appendChild(lien);
            liste.appendChild(item);
        });

        return liste;
    }

    // Ajout de la liste à la page
    const container = document.querySelector('#exercices-container');
    if (container) {
        const titre = document.createElement('h2');
        titre.textContent = 'Liste des exercices';
        titre.className = 'text-2xl text-white font-bold mb-4';
        container.appendChild(titre);
        container.appendChild(creerListeExercices());
    }
});

