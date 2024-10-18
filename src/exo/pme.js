// Définition de la classe Employee
class Employee {
  constructor(nom, prenom, age, salaireMensuel) {
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.salaireMensuel = salaireMensuel;
  }

  // Méthode pour calculer le coût annuel d'un employé
  coutAnnuel(nombreMois, tauxCharges) {
    return this.salaireMensuel * nombreMois * (1 + tauxCharges);
  }
}

// Définition de la classe PME
class PME {
  constructor(nom, equipe, revenus, fraisFixes, fraisAchats) {
    this.nom = nom;
    this.equipe = equipe; // Un tableau d'objets Employee
    this.revenus = revenus;
    this.fraisFixes = fraisFixes;
    this.fraisAchats = fraisAchats;
  }

  // Méthode pour calculer et afficher le bilan annuel
  bilanAnnuel(nombreMois, tauxCharges) {
    // Calcul du coût total des employés
    const coutTotalEmployes = this.equipe.reduce((total, employe) => 
      total + employe.coutAnnuel(nombreMois, tauxCharges), 0);
    
    // Calcul du résultat
    const resultat = this.revenus - this.fraisFixes - this.fraisAchats - coutTotalEmployes;
    
    console.log(`Bilan annuel de ${this.nom}:`);
    console.log(`Revenus: ${this.revenus.toLocaleString()} €`);
    console.log(`Frais fixes: ${this.fraisFixes.toLocaleString()} €`);
    console.log(`Frais d'achats: ${this.fraisAchats.toLocaleString()} €`);
    console.log(`Coût total des employés: ${coutTotalEmployes.toLocaleString()} €`);
    console.log(`Résultat: ${resultat.toLocaleString()} €`);
    
    return `
      <h2><strong>Bilan annuel de ${this.nom}</strong></h2>
      <p>Revenus: ${this.revenus.toLocaleString()} €</p>
      <p>Frais fixes: ${this.fraisFixes.toLocaleString()} €</p>
      <p>Frais d'achats: ${this.fraisAchats.toLocaleString()} €</p>
      <p>Coût total des employés: ${coutTotalEmployes.toLocaleString()} €</p>
      <p><strong>Résultat: ${resultat.toLocaleString()} €</strong></p>
    `;
  }
}

// Création des employés
const employe1 = new Employee("Dupont", "Jean", 30, 2000);
const employe2 = new Employee("Martin", "Marie", 35, 3000);
const employe3 = new Employee("Durand", "Pierre", 40, 4000);

// Création de la PME
const maPME = new PME(
  "ADRAR PME",
  [employe1, employe2, employe3],
  300000,
  20000,
  50000
);

// Affichage du bilan annuel dans la page HTML et dans la console
document.addEventListener('DOMContentLoaded', () => {
  const bilanElement = document.getElementById('bilan');
  bilanElement.innerHTML = maPME.bilanAnnuel(12, 0.9);
});
