// Définition de la classe Livre
class Livre {
    constructor(titre, auteur, disponible = true) {
      this.titre = titre;
      this.auteur = auteur;
      this.disponible = disponible;
    }
  
    emprunter() {
      if (this.disponible) {
        this.disponible = false;
      } else {
        throw new Error("Le livre n'est pas disponible.");
      }
    }
  
    retourner() {
      this.disponible = true;
    }
  }
  
  // Définition de la classe Bibliotheque
  class Bibliotheque {
    constructor(nom) {
      this.nom = nom;
      this.livres = this.chargerLivres();
    }
  
    chargerLivres() {
      const livresStockes = localStorage.getItem('livres');
      if (livresStockes) {
        return JSON.parse(livresStockes).map(livre => new Livre(livre.titre, livre.auteur, livre.disponible));
      }
      return [];
    }
  
    sauvegarderLivres() {
      localStorage.setItem('livres', JSON.stringify(this.livres));
    }
  
    ajouterLivre(livre) {
      this.livres.push(livre);
      this.sauvegarderLivres();
    }
  
    emprunterLivre(titre) {
      const livre = this.livres.find(l => l.titre === titre);
      if (!livre) {
        throw new Error("Le livre n'existe pas dans la bibliothèque.");
      }
      livre.emprunter();
      this.sauvegarderLivres();
    }
  
    retournerLivre(titre) {
      const livre = this.livres.find(l => l.titre === titre);
      if (!livre) {
        throw new Error("Le livre n'existe pas dans la bibliothèque.");
      }
      livre.retourner();
      this.sauvegarderLivres();
    }
  }
  
  // Création de l'instance de la bibliothèque
  const maBibliotheque = new Bibliotheque("Ma Bibliothèque");
  
  // Fonction pour afficher les livres dans l'interface utilisateur
  function afficherLivres() {
    const livresDiv = document.getElementById('livres');
    livresDiv.innerHTML = '';
    maBibliotheque.livres.forEach(livre => {
      const livreElement = document.createElement('div');
      livreElement.className = 'mb-2 p-2 bg-[#433b36e6] rounded-md';
      livreElement.innerHTML = `
        <strong>${livre.titre}</strong> par ${livre.auteur} - 
        <span class="${livre.disponible ? 'text-green-500' : 'text-red-500'}">
          ${livre.disponible ? 'Disponible' : 'Emprunté'}
        </span>
      `;
      livresDiv.appendChild(livreElement);
    });
  }
  
  // Gestion du formulaire d'ajout de livre
  document.getElementById('ajouterLivreForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const nouveauLivre = new Livre(titre, auteur);
    maBibliotheque.ajouterLivre(nouveauLivre);
    afficherLivres();
    this.reset();
  });
  
  // Gestion du formulaire d'emprunt/retour de livre
  document.getElementById('gererLivreForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const titre = document.getElementById('titreLivre').value;
    const action = e.submitter.id === 'emprunterBtn' ? 'emprunter' : 'retourner';
    
    try {
      if (action === 'emprunter') {
        maBibliotheque.emprunterLivre(titre);
      } else {
        maBibliotheque.retournerLivre(titre);
      }
      afficherLivres();
      alert(`Le livre "${titre}" a été ${action === 'emprunter' ? 'emprunté' : 'retourné'} avec succès.`);
    } catch (error) {
      alert(`Erreur : ${error.message}`);
    }
    
    this.reset();
  });
  
  // Afficher les livres
  afficherLivres();
  