// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Création et ajout de l'élément h2 "yoyoyo" 
    const container = document.querySelector('.bg-amber-50');
    const h2 = document.createElement('h2');
    h2.textContent = 'yoyoyo';
    h2.className = 'text-xl font-bold mb-4';
    // Ajout de l'élément h2 avant le premier élément du container
    container.insertBefore(h2, container.firstChild);

    const addClassBtn = document.querySelectorAll('button')[0];
    const removeClassBtn = document.querySelectorAll('button')[1];
    const toggleClassBtn = document.querySelectorAll('button')[2];

    const textEditor = document.querySelector('.bg-blue-100 div');
    const textarea = document.querySelector('textarea');

    const form = document.querySelector('form');


    // Gestion des differentesclasses du titre 
    const targetElement = document.querySelector('#title');

    addClassBtn.addEventListener('click', () => {
        targetElement.classList.add('italic', 'text-green-500', 'bg-purple-500');
    });

    removeClassBtn.addEventListener('click', () => {
        targetElement.classList.remove('italic', 'text-green-500', 'bg-purple-500');
    });

    toggleClassBtn.addEventListener('click', () => {
        targetElement.classList.toggle('italic');
        targetElement.classList.toggle('text-green-500');
        targetElement.classList.toggle('bg-purple-500');
    });

    // Synchroniser textarea avec text editor
    textarea.addEventListener('keyup', (e) => {
        textEditor.textContent = e.target.value;
    });

    // Gestion du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
    
        const email = form.querySelector('input[type="email"]').value;
        const pseudo = form.querySelector('input[placeholder="pseudo"]').value;
        const password = form.querySelector('input[placeholder="mot de passe"]').value;
        const textareaContent = form.querySelector('textarea').value;

        const formData = {
            email: email,
            pseudo: pseudo,
            password: password,
            textareaContent: textareaContent
        };
        console.log('Le formulaire a été envoyé');
        console.log('Données du formulaire :', formData);

    });
});
