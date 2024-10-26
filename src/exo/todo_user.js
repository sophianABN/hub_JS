document.addEventListener('DOMContentLoaded', initializeApp);

// Cette fonction lance toutes les étapes nécessaires pour démarrer l'application
function initializeApp() {
    initializeFirebase();
    setupValidation();
    setupEventListeners();
    initializeButtonText(); 
}

// Configuration et initialisation de Firebase
function initializeFirebase() {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_TODOLIST_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_TODOLIST_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_TODOLIST_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_TODOLIST_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_TODOLIST_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_TODOLIST_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_TODOLIST_APP_ID
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    console.log("Firebase est prêt à l'emploi !");
}

// Configuration des regex et fonctions de validation
function setupValidation() {
    // Regex pour la validation
    window.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    window.passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,12}$/;
}

// Mise en place des écouteurs d'événements
function setupEventListeners() {
    // Gestionnaire de switch entre les formulaires
    document.getElementById('switchForm').addEventListener('click', toggleForms);
    
    // Gestionnaires des formulaires
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

// Fonction pour initialiser le texte du bouton
function initializeButtonText() {
    const loginForm = document.getElementById('loginForm');
    const switchButton = document.getElementById('switchForm');
    
    // On définit le texte initial du bouton en fonction du formulaire visible
    if (loginForm.classList.contains('hidden')) {
        switchButton.textContent = "Formulaire de connexion";
    } else {
        switchButton.textContent = "Formulaire d'inscription";
    }
}

// Fonction pour basculer entre les formulaires
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchButton = document.getElementById('switchForm');
    
    // On bascule l'affichage des formulaires
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
    
    // On met à jour le texte du bouton en fonction du formulaire visible
    if (loginForm.classList.contains('hidden')) {
        switchButton.textContent = "Formulaire de connexion";
    } else {
        switchButton.textContent = "Formulaire d'inscription";
    }
}

// Gestion de la connexion
async function handleLogin(e) {
    e.preventDefault();
    const email = sanitizeInput(document.getElementById('loginEmail').value);
    const password = sanitizeInput(document.getElementById('loginPassword').value);
    
    if (validateForm(email, password, 'login')) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('Connexion réussie');
            handleSuccessfulLogin();
        } catch (error) {
            console.error('Erreur de connexion:', error);
            handleLoginError(error);
        }
    }
}

// Gestion de l'inscription
async function handleRegister(e) {
    e.preventDefault();
    const email = sanitizeInput(document.getElementById('registerEmail').value);
    const password = sanitizeInput(document.getElementById('registerPassword').value);
    
    if (validateForm(email, password, 'register')) {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await createUserProfile(userCredential.user);
            console.log('Inscription réussie');
            handleSuccessfulRegistration();
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            handleRegistrationError(error);
        }
    }
}

// Fonction de validation des formulaires
function validateForm(email, password, formType) {
    const emailError = document.getElementById(`${formType}EmailError`);
    const passwordError = document.getElementById(`${formType}PasswordError`);
    
    // Validation email
    if (!window.emailRegex.test(email)) {
        emailError.textContent = "Format d'email invalide";
        return false;
    } else {
        emailError.textContent = "";
    }
    
    // Validation mot de passe
    if (!window.passwordRegex.test(password)) {
        passwordError.textContent = "Le mot de passe doit contenir entre 6 et 12 caractères, incluant un chiffre et un caractère spécial";
        return false;
    } else {
        passwordError.textContent = "";
    }
    
    return true;
}

// Fonction de sanitization pour prévenir les XSS
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

// Gestion des succès
function handleSuccessfulLogin() {
    // Afficher un message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'text-green-500 text-center mt-4';
    successMessage.textContent = 'Connexion réussie !';
    document.getElementById('loginForm').appendChild(successMessage);

    // Réinitialiser le formulaire
    document.getElementById('loginForm').reset();
    
    // Rediriger vers la page des tâches
    setTimeout(() => {
        window.location.href = '/exo/todo_task.html';
    }, 1500);
}

function handleSuccessfulRegistration() {
    // Afficher un message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'text-green-500 text-center mt-4';
    successMessage.textContent = 'Inscription réussie !';
    document.getElementById('registerForm').appendChild(successMessage);

    // Réinitialiser le formulaire
    document.getElementById('registerForm').reset();
    
    // Rediriger vers la page des tâches
    setTimeout(() => {
        window.location.href = '/exo/todo_task.html';
    }, 1500);
}

// Gestion des erreurs
function handleLoginError(error) {
    const errorMessage = getErrorMessage(error);
    document.getElementById('loginEmailError').textContent = errorMessage;
}

function handleRegistrationError(error) {
    const errorMessage = getErrorMessage(error);
    document.getElementById('registerEmailError').textContent = errorMessage;
}

// Fonction utilitaire pour traduire les codes d'erreur Firebase
function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'Cet email est déjà utilisé';
        case 'auth/invalid-email':
            return 'Email invalide';
        case 'auth/operation-not-allowed':
            return 'Opération non autorisée';
        case 'auth/weak-password':
            return 'Mot de passe trop faible';
        case 'auth/user-disabled':
            return 'Compte désactivé';
        case 'auth/user-not-found':
            return 'Utilisateur non trouvé';
        case 'auth/wrong-password':
            return 'Mot de passe incorrect';
        default:
            return 'Une erreur est survenue';
    }
}

// Fonction pour créer le profil utilisateur
async function createUserProfile(user) {
    try {
        const userRef = firebase.database().ref(`users/${user.uid}`);
        await userRef.set({
            email: user.email,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            lastLogin: firebase.database.ServerValue.TIMESTAMP,
            profile: {
                displayName: user.email.split('@')[0],
                photoURL: ''
            }
        });
        console.log('Profil utilisateur créé avec succès');
    } catch (error) {
        console.error('Erreur lors de la création du profil:', error);
    }
}
