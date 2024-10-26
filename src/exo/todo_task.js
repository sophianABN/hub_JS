document.addEventListener('DOMContentLoaded', initializeApp);

// Variables globales
let dbRef;
let tasksRef;

// Configuration de l'application
function initializeApp() {
    initializeFirebase();
    checkAuth();
}

// Configuration Firebase 
function initializeFirebase() {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_TODOLIST_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_TODOLIST_AUTH_DOMAIN,
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

// Vérification de l'authentification
function checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Utilisateur connecté
            console.log('Utilisateur connecté:', user.email);
            setupApp(user);
        } else {
            // Utilisateur non connecté, redirection vers la page de connexion
            window.location.href = '/exo/todo_user.html';
        }
    });
}

// Configuration de l'application une fois l'utilisateur authentifié
function setupApp(user) {
    setupReferences(user);
    setupEventListeners();
    loadTasks();
    setupLogoutButton(); 
}

// Configuration des références
function setupReferences(user) {
    if (!user) return;
    
    dbRef = firebase.database().ref();
    tasksRef = dbRef.child(`users/${user.uid}/tasks`);
}

// Chargement des tâches
function loadTasks() {
    tasksRef.on('value', (snapshot) => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        snapshot.forEach((childSnapshot) => {
            const task = childSnapshot.val();
            const taskId = childSnapshot.key;
            addTaskToDOM(taskId, task);
        });
    });
}

// Ajout d'une tâche au DOM
function addTaskToDOM(taskId, task) {
    const taskList = document.getElementById('taskList');
    
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between p-3 bg-[#27272a] rounded-lg';
    li.id = `task-${taskId}`;

    // Conteneur pour le texte et les boutons
    const contentDiv = document.createElement('div');
    contentDiv.className = 'flex items-center justify-between w-full';

    // Texte de la tâche (avec mode édition)
    const textSpan = document.createElement('span');
    textSpan.className = 'text-white flex-grow';
    textSpan.textContent = task.text;

    // Input pour l'édition (caché par défaut)
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'bg-[#433b36e6] text-white px-2 py-1 rounded-md mr-2 flex-grow hidden';
    editInput.value = task.text;

    // Conteneur pour les boutons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'flex gap-2';

    // Bouton "Terminé"
    const completeButton = document.createElement('button');
    completeButton.className = `${task.status === 'completed' ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'} text-white px-3 py-1 rounded-md text-sm`;
    completeButton.textContent = task.status === 'completed' ? 'Terminé' : 'Terminer';
    completeButton.onclick = () => toggleTaskStatus(taskId, task.status);

    // Ajout du style barré si la tâche est terminée
    textSpan.className = `text-white flex-grow ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`;

    // Bouton éditer
    const editButton = document.createElement('button');
    editButton.className = 'bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm';
    editButton.textContent = 'Éditer';
    editButton.onclick = () => toggleEditMode(taskId, textSpan, editInput, editButton);

    // Bouton supprimer
    const deleteButton = document.createElement('button');
    deleteButton.className = 'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm';
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = () => deleteTask(taskId);

    // Assemblage des éléments
    buttonsDiv.appendChild(completeButton);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
    contentDiv.appendChild(textSpan);
    contentDiv.appendChild(editInput);
    contentDiv.appendChild(buttonsDiv);
    li.appendChild(contentDiv);
    taskList.appendChild(li);
}

// Fonction pour basculer le mode édition
function toggleEditMode(taskId, textSpan, editInput, editButton) {
    const isEditing = textSpan.classList.contains('hidden');
    
    if (isEditing) {
        // Sauvegarder les modifications
        const newText = editInput.value.trim();
        if (newText) {
            updateTask(taskId, newText);
        }
        textSpan.classList.remove('hidden');
        editInput.classList.add('hidden');
        editButton.textContent = 'Éditer';
    } else {
        // Activer le mode édition
        textSpan.classList.add('hidden');
        editInput.classList.remove('hidden');
        editInput.focus();
        editButton.textContent = 'Sauvegarder';
    }
}

// Fonction pour mettre à jour une tâche
async function updateTask(taskId, newText) {
    try {
        await tasksRef.child(taskId).update({
            text: newText,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        });
        console.log('Tâche mise à jour avec succès !');
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
    }
}

// Fonction pour supprimer une tâche
async function deleteTask(taskId) {
    try {
        await tasksRef.child(taskId).remove();
        console.log('Tâche supprimée avec succès !');
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
    }
}

// Gestion de l'ajout d'une tâche
async function handleAddTask(e) {
    e.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        try {
            await addTaskToFirebase(taskText);
            taskInput.value = '';
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
        }
    }
}

// Fonction pour ajouter une tâche à Firebase
async function addTaskToFirebase(taskText) {
    try {
        await tasksRef.push({
            text: taskText,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            userId: firebase.auth().currentUser.uid,
            status: 'active'  // statut par défaut
        });
        console.log('Tâche ajoutée avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
        throw error;
    }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
}

// Configuration du bouton de déconnexion
function setupLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.onclick = handleLogout;
}

// Gestion de la déconnexion
async function handleLogout() {
    try {
        await firebase.auth().signOut();
        window.location.href = '/exo/todo_user.html';
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
    }
}

// Fonction pour basculer le statut d'une tâche
async function toggleTaskStatus(taskId, currentStatus) {
    try {
        const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
        await tasksRef.child(taskId).update({
            status: newStatus,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        });
        console.log('Statut de la tâche mis à jour avec succès !');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
    }
}
