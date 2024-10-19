class Imc {
  constructor(nom, poids, taille) {
    this.nom = nom;
    this.poids = poids;
    this.taille = taille;
  }

  calculerImc() {
    return (this.poids / (this.taille * this.taille)).toFixed(2);
  }

  display() {
    return `${this.nom} pèse ${this.poids} kg pour ${this.taille} m et a un IMC de ${this.calculerImc()}.`;
  }
}

// Gestionnaire d'événement pour le formulaire
document.getElementById('imcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const poids = parseFloat(document.getElementById('poids').value);
    const taille = parseFloat(document.getElementById('taille').value);
    
    const personne = new Imc(nom, poids, taille);
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = personne.display();
    resultDiv.classList.add('p-4', 'bg-gray-800', 'rounded-md', 'mt-4');

    console.log(personne.display()); // Affichage dans la console également
});

// Programme principal
const list = [
  new Imc("Alice", 65, 1.65),
  new Imc("Bob", 80, 1.80),
  new Imc("Charlie", 70, 1.75)
];

list.forEach(personne => console.log(personne.display()));
