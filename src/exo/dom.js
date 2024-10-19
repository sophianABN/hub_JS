// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Création et ajout de l'élément h2 "yoyoyo" 
    const container = document.querySelector('#content');
    const h2 = document.createElement('h2');
    h2.textContent = 'yoyoyo';
    h2.className = 'text-xl text-white font-bold mb-4';
    // Ajout de l'élément h2 avant le premier élément du container
    container.insertBefore(h2, container.firstChild);

    const buttons = document.querySelectorAll('#content button');
    const addClassBtn = buttons[0];
    const removeClassBtn = buttons[1];
    const toggleClassBtn = buttons[2];

    const textEditor = document.querySelector('#editor');
    const textarea = document.querySelector('textarea');

    const form = document.querySelector('form');

    // Gestion des différentes classes du titre 
    const targetElement = document.querySelector('#title');

    addClassBtn.addEventListener('click', (e) => {
        e.preventDefault();
        targetElement.classList.add('italic', '!text-green-500', 'bg-purple-500');
    });

    removeClassBtn.addEventListener('click', (e) => {
        e.preventDefault();
        targetElement.classList.remove('italic', '!text-green-500', 'bg-purple-500');
    });

    toggleClassBtn.addEventListener('click', (e) => {
        e.preventDefault();
        targetElement.classList.toggle('italic');
        targetElement.classList.toggle('!text-green-500');
        targetElement.classList.toggle('bg-purple-500');
    });

    // Synchroniser textarea avec text editor
    textarea.addEventListener('input', (e) => {
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
