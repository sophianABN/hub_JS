// On attend que la page soit entièrement chargée avant de démarrer l'application
document.addEventListener('DOMContentLoaded', initializeApp);

// Cette fonction lance toutes les étapes nécessaires pour démarrer l'application
function initializeApp() {
    // On commence par configurer Firebase
    initializeFirebase();
    // Ensuite, on prépare les liens vers notre base de données
    initializeReferences();
    // On met en place les "écouteurs" pour réagir aux actions de l'utilisateur
    setupEventListeners();
    // On va chercher et affiche les données des utilisateurs
    readUserData();
    // On s'assure que le formulaire d'édition est bien caché au départ
    resetEditUserForm();
}

// Cette fonction configure Firebase avec nos informations secrètes
function initializeFirebase() {
    // On récupère les informations de configuration depuis nos variables d'environnement
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
    // On démarre Firebase avec ces informations
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase est prêt à l'emploi !");
}

// Ces variables vont nous permettre d'accéder facilement à notre base de données
let dbRef, usersRef;

// Cette fonction prépare nos raccourcis vers la base de données
function initializeReferences() {
    // dbRef pointe vers la racine de notre base de données
    dbRef = firebase.database().ref();
    // usersRef pointe spécifiquement vers la partie "users" de notre base
    usersRef = dbRef.child("users");
}

// Cette fonction prépare l'application à réagir aux actions de l'utilisateur
function setupEventListeners() {
    // On récupère les éléments importants de notre page
    const addUserBtnUI = document.getElementById("add-user-btn");
    const formUserUI = document.getElementById("add-user-form");
    const formUserEditUI = document.getElementById("edit-user-module");

    // Quand on clique sur le bouton d'ajout, on appelle la fonction pour ajouter un utilisateur
    addUserBtnUI.addEventListener("click", addUserBtnClicked);
    // On empêche le formulaire de se soumettre tout seul (on veut gérer ça nous-mêmes)
    formUserUI.addEventListener("submit", (event) => event.preventDefault());
    formUserEditUI.addEventListener("submit", (event) => event.preventDefault());
}

// Cette fonction s'occupe d'ajouter un nouvel utilisateur quand on clique sur le bouton
function addUserBtnClicked() {
    // On récupère toutes les informations saisies dans le formulaire
    const addUserInputs = document.getElementsByClassName("user-input");
    // On transforme ces informations en un objet facile à utiliser
    const newUser = Array.from(addUserInputs).reduce((acc, input) => {
        acc[input.getAttribute('data-key')] = input.value;
        return acc;
    }, {});

    // On ajoute ce nouvel utilisateur à notre base de données
    usersRef.push(newUser, () => {
        // Une fois ajouté, on vide le formulaire pour le prochain ajout
        document.getElementById("add-user-form").reset();
    });
}

// Cette fonction va chercher et affiche la liste de tous les utilisateurs
function readUserData() {
    const userListUI = document.getElementById("user-list");
    // On "écoute" les changements dans la base de données
    usersRef.on("value", snap => {
        // On vide la liste actuelle
        userListUI.innerHTML = "";
        // Pour chaque utilisateur dans la base...
        snap.forEach(childSnap => {
            // ...on crée un élément dans la liste
            const userItem = createUserListItem(childSnap.key, childSnap.val());
            userListUI.appendChild(userItem);
        });
    });
}

// Cette fonction crée un élément de liste pour un utilisateur
function createUserListItem(key, value) {
    // On crée un nouvel élément de liste
    const li = document.createElement("li");
    // On lui donne un identifiant unique
    li.setAttribute("user-key", key);

    // On crée un div pour afficher le nom de l'utilisateur
    const nameDiv = document.createElement("div");
    nameDiv.className = "user-name cursor-pointer font-bold";
    nameDiv.textContent = value.name;
    // Quand on clique sur le nom, ça affichera les détails
    nameDiv.addEventListener("click", userClicked);

    // On crée un div (caché au début) pour les détails de l'utilisateur
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "user-details hidden mt-2";

    // On ajoute ces éléments à notre élément de liste
    li.appendChild(nameDiv);
    li.appendChild(detailsDiv);

    return li;
}

// Cette fonction gère ce qui se passe quand on clique sur un utilisateur dans la liste
function userClicked(event) {
    // On trouve l'élément de liste correspondant à l'utilisateur cliqué
    const userItem = event.target.closest('li');
    const userID = userItem.getAttribute("user-key");
    const userDetailsElement = userItem.querySelector('.user-details');

    // Si les détails sont cachés, on les affiche. Sinon, on les cache.
    if (userDetailsElement.classList.contains('hidden')) {
        showUserDetails(userID, userDetailsElement);
    } else {
        userDetailsElement.classList.add('hidden');
    }
}

// Cette fonction affiche les détails d'un utilisateur
function showUserDetails(userID, detailsElement) {
    // On va chercher les informations de l'utilisateur dans la base de données
    const userRef = dbRef.child('users/' + userID);
    userRef.once("value", snap => {
        const user = snap.val();
        // On vide les détails existants
        detailsElement.innerHTML = '';

        // On crée des éléments pour afficher l'âge et l'email
        const ageP = createParagraphElement('Age', user.age);
        const emailP = createParagraphElement('Email', user.mail);
        // On crée des boutons pour modifier et supprimer l'utilisateur
        const editButton = createButtonElement('Modifier', 'edit-user bg-blue-500 hover:bg-blue-700', () => editButtonClicked(userID));
        const deleteButton = createButtonElement('Supprimer', 'delete-user bg-red-500 hover:bg-red-700', () => deleteButtonClicked(userID));

        // On ajoute tous ces éléments à notre div de détails
        detailsElement.appendChild(ageP);
        detailsElement.appendChild(emailP);
        detailsElement.appendChild(editButton);
        detailsElement.appendChild(deleteButton);

        // On affiche les détails
        detailsElement.classList.remove('hidden');
    });
}

// Cette fonction crée un paragraphe avec un label et une valeur
function createParagraphElement(label, value) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value));
    return p;
}

// Cette fonction crée un bouton avec un texte, des classes et une action
function createButtonElement(text, className, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = `${className} text-white font-bold py-1 px-2 rounded mr-2 mt-2`;
    button.addEventListener('click', clickHandler);
    return button;
}

// Cette fonction gère ce qui se passe quand on clique sur le bouton "Modifier"
function editButtonClicked(userID) {
    // On va chercher les informations de l'utilisateur
    const userRef = dbRef.child('users/' + userID);
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");
    const editUserForm = document.getElementById("edit-user-module");
    const selectUserMessage = document.getElementById("select-user-message");

    // On cache le message de sélection et on affiche le formulaire d'édition
    selectUserMessage.classList.add("hidden");
    editUserForm.classList.remove("hidden");

    // On remplit le formulaire avec les informations actuelles de l'utilisateur
    userRef.once("value").then(snap => {
        const user = snap.val();
        editUserInputsUI.forEach(input => {
            const key = input.getAttribute("data-key");
            input.value = user[key];
        });
    });

    // On prépare le bouton de sauvegarde pour qu'il mette à jour cet utilisateur spécifique
    editUserForm.querySelector('#edit-user-btn').onclick = () => saveUserBtnClicked(userID);
}

// Cette fonction sauvegarde les modifications apportées à un utilisateur
function saveUserBtnClicked(userID) {
    const userRef = dbRef.child('users/' + userID);
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");
    // On récupère toutes les nouvelles informations saisies
    const editedUserObject = Array.from(editUserInputsUI).reduce((acc, input) => {
        acc[input.getAttribute("data-key")] = input.value;
        return acc;
    }, {});

    // On met à jour l'utilisateur dans la base de données
    userRef.update(editedUserObject);
    // On cache le formulaire d'édition
    resetEditUserForm();
}

// Cette fonction supprime un utilisateur de la base de données
function deleteButtonClicked(userID) {
    const userRef = dbRef.child('users/' + userID);
    userRef.remove();
    // On s'assure que le formulaire d'édition est caché après la suppression
    resetEditUserForm();
}

// Cette fonction cache le formulaire d'édition et réinitialise ses champs
function resetEditUserForm() {
    const editUserForm = document.getElementById("edit-user-module");
    const selectUserMessage = document.getElementById("select-user-message");
    editUserForm.classList.add("hidden");
    selectUserMessage.classList.remove("hidden");
    editUserForm.reset();
}
