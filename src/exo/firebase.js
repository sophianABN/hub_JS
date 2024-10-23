// Ajout de l'écouteur d'événement DOMContentLoaded en haut du fichier
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation de Firebase
    initializeFirebase();
    // Initialisation des références
    initializeReferences();
    // Appel de la fonction pour lire les données des utilisateurs au chargement de la page
    readUserData();
    // Appel de la fonction pour réinitialiser le formulaire d'édition
    resetEditUserForm();
});

// Configuration de Firebase
function initializeFirebase() {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    console.log(`apiKey: ${apiKey}`);
    const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
    console.log(`authDomain: ${authDomain}`);
    const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
    console.log(`databaseURL: ${databaseURL}`);
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "test-ba3a9";
    console.log(`projectId: ${projectId}`);
    const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
    console.log(`storageBucket: ${storageBucket}`);
    const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
    console.log(`messagingSenderId: ${messagingSenderId}`);
    const appId = import.meta.env.VITE_FIREBASE_APP_ID;
    console.log(`appId: ${appId}`);
    
    const firebaseConfig = {
        apiKey,
        authDomain,
        databaseURL,
        projectId,
        storageBucket,
        messagingSenderId,
        appId
    };
    // Initialisation de l'application Firebase
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialisée avec succès.");
    
}

// Création d'une référence à la base de données Firebase
let dbRef;
let usersRef;

function initializeReferences() {
    dbRef = firebase.database().ref();
    usersRef = dbRef.child("users");
}

// Sélection des éléments du DOM
const addUserBtnUI = document.getElementById("add-user-btn");
const formUserUI = document.getElementById("add-user-form");
const formUserEditUI = document.getElementById("edit-user-module");
const userListUI = document.getElementById("user-list");
const userDetailUI = document.getElementById("user-detail");

// Ajout d'un écouteur d'événement sur le bouton d'ajout d'utilisateur
addUserBtnUI.addEventListener("click", addUserBtnClicked);
// Empêche la soumission par défaut du formulaire d'ajout d'utilisateur
formUserUI.addEventListener("submit", (event) => event.preventDefault());
// Empêche la soumission par défaut du formulaire d'édition d'utilisateur
formUserEditUI.addEventListener("submit", (event) => event.preventDefault());

// Fonction pour ajouter un nouvel utilisateur
function addUserBtnClicked() {
    const addUserInputs = document.getElementsByClassName("user-input");
    let newUser = {};
    // Parcourt tous les champs d'entrée pour créer un objet utilisateur
    for(let i = 0; i < addUserInputs.length; i++) {
        let key = addUserInputs[i].getAttribute('data-key');
        let value = addUserInputs[i].value;
        newUser[key] = value;
    }
    // Ajoute le nouvel utilisateur à Firebase et réinitialise le formulaire
    usersRef.push(newUser, function() {
        formUserUI.reset();
    });
}

// Fonction pour lire et afficher les données des utilisateurs
function readUserData() {
    usersRef.on("value", snap => {
        userListUI.innerHTML = "";
        snap.forEach(childSnap => {
            let key = childSnap.key;
            let value = childSnap.val();
            let $li = document.createElement("li");
            $li.innerHTML = `
                <div class="user-name cursor-pointer font-bold">${value.name}</div>
                <div class="user-details hidden mt-2"></div>
            `;
            $li.setAttribute("user-key", key);
            $li.querySelector('.user-name').addEventListener("click", userClicked);
            userListUI.append($li);
        });
    });
}

// Fonction appelée lorsqu'un utilisateur est cliqué dans la liste
function userClicked(event) {
    let userItem = event.target.closest('li');
    let userID = userItem.getAttribute("user-key");
    let userDetailsElement = userItem.querySelector('.user-details');

    if (userDetailsElement.classList.contains('hidden')) {
        const userRef = dbRef.child('users/' + userID);
        userDetailsElement.innerHTML = "";
        userRef.once("value", snap => {
            let user = snap.val();
            userDetailsElement.innerHTML = `
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Email:</strong> ${user.mail}</p>
                <button class="edit-user bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 mt-2">Modifier</button>
                <button class="delete-user bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2">Supprimer</button>
            `;
            userDetailsElement.querySelector('.edit-user').addEventListener('click', () => editButtonClicked(userID));
            userDetailsElement.querySelector('.delete-user').addEventListener('click', () => deleteButtonClicked(userID));
        });
        userDetailsElement.classList.remove('hidden');
    } else {
        userDetailsElement.classList.add('hidden');
    }
}

// Fonction pour gérer le clic sur le bouton d'édition
function editButtonClicked(userID) {
    const userRef = dbRef.child('users/' + userID);
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");
    const editUserForm = document.getElementById("edit-user-module");
    const selectUserMessage = document.getElementById("select-user-message");

    // Cacher le message et afficher le formulaire
    selectUserMessage.classList.add("hidden");
    editUserForm.classList.remove("hidden");

    // Remplit le formulaire d'édition avec les données actuelles de l'utilisateur
    userRef.once("value").then(snap => {
        const user = snap.val();
        editUserInputsUI.forEach(input => {
            const key = input.getAttribute("data-key");
            input.value = user[key];
        });
    });
    // Configure le bouton de sauvegarde pour appeler saveUserBtnClicked
    editUserForm.querySelector('#edit-user-btn').onclick = function() {
        saveUserBtnClicked(userID);
    };
}

// Fonction pour sauvegarder les modifications d'un utilisateur
function saveUserBtnClicked(userID) {
    const userRef = dbRef.child('users/' + userID);
    var editedUserObject = {};
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");
    // Collecte les données modifiées du formulaire
    editUserInputsUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key");
        let value = textField.value;
        editedUserObject[key] = value;
    });
    // Met à jour les données de l'utilisateur dans Firebase
    userRef.update(editedUserObject);
    formUserEditUI.reset();
    
    // Après la mise à jour, cacher le formulaire et afficher le message
    const editUserForm = document.getElementById("edit-user-module");
    const selectUserMessage = document.getElementById("select-user-message");
    editUserForm.classList.add("hidden");
    selectUserMessage.classList.remove("hidden");
}

// Fonction pour supprimer un utilisateur
function deleteButtonClicked(userID) {
    const userRef = dbRef.child('users/' + userID);
    // Supprime l'utilisateur de Firebase
    userRef.remove();
    // Nettoie l'affichage des détails et réinitialise le formulaire d'édition
    userDetailUI.innerHTML = "";
    document.getElementById("edit-user-module").reset();
}

// Ajoutez cette fonction pour réinitialiser l'affichage du formulaire d'édition
function resetEditUserForm() {
    const editUserForm = document.getElementById("edit-user-module");
    const selectUserMessage = document.getElementById("select-user-message");
    editUserForm.classList.add("hidden");
    selectUserMessage.classList.remove("hidden");
    editUserForm.reset();
}
