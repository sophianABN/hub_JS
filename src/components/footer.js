export function Footer() {
  const currentYear = new Date().getFullYear();
  const footer = document.createElement('footer');
  footer.className = 'bg-[#0e0e0e] shadow-md rounded-lg mt-8';
  footer.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-center items-center">
      <div class="text-gray-400 text-sm">
        &copy; ${currentYear} Sohub.js. Tous droits réservés.
      </div>
      <nav class="ml-4">
        <ul class="flex space-x-2 text-sm">
          <li><a href="#" class="text-gray-400 hover:text-gray-200">Mentions légales</a></li>
          <li><a href="#" class="text-gray-400 hover:text-gray-200">Politique de confidentialité</a></li>
          <li><a href="#" class="text-gray-400 hover:text-gray-200">Contact</a></li>
        </ul>
      </nav>
    </div>
  `;
  return footer;
}

