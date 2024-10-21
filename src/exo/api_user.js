document.addEventListener('DOMContentLoaded', function() {
    const userCard = document.getElementById('userCard');

    async function loadUser() {
        try {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
            console.log('Réponse de l\'API :', data);
            
            const user = data.results[0];
            
            // Création de l'adresse complète
            const fullAddress = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`;
            
            // Mise à jour du contenu de la carte
            userCard.innerHTML = `
                <img src="${user.picture.large}" alt="Photo de profil" class="w-32 h-32 rounded-full mx-auto mb-4">
                <div class="space-y-4">
                    <h5 class="text-xl font-semibold text-gray-200">
                        ${user.name.title} ${user.name.first} ${user.name.last}
                    </h5>
                    <p class="text-gray-400">
                        ${user.email}
                    </p>
                    <p class="text-gray-400">
                        ${fullAddress}
                    </p>
                    <p class="text-gray-400">
                        ${user.phone}
                    </p>
                    <button id="loadNewUser" class="inline-block px-6 py-2 bg-[#f7971e] text-white rounded-lg hover:bg-[#ff9f0e] transition-colors">
                        Charger un nouvel utilisateur
                    </button>
                </div>
            `;
            
            // Ajout de l'écouteur d'événement sur le bouton
            document.getElementById('loadNewUser').addEventListener('click', loadUser);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            userCard.innerHTML = `
                <div class="text-red-600">
                    Une erreur est survenue lors du chargement des données.
                </div>
                <button id="loadNewUser" class="mt-4 inline-block px-6 py-2 bg-[#f7971e] text-white rounded-lg hover:bg-[#ff9f0e] transition-colors">
                    Réessayer
                </button>
            `;
            // Ajout de l'écouteur d'événement sur le bouton de réessai
            document.getElementById('loadNewUser').addEventListener('click', loadUser);
        }
    }

    
    loadUser();
});
