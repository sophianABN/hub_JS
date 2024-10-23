export function createHeader() {
  return `
    <header class="bg-[#0e0e0e] shadow-md rounded-lg">
      <nav class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center">
          <a href="/">
            <img src="/logonobg.png" alt="Logo" class="w-full max-w-32">
          </a>
        </div>
        <ul class="flex space-x-6">
          <li class="relative" id="dropdown-lecons">
            <button class="dropdown-btn text-white hover:text-gray-200">Leçons ▼</button>
            <div class="dropdown-content hidden absolute right-0 mt-2 w-48 bg-[#433b36e6] rounded-md shadow-lg">
              <a href="#" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Liste des leçons</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">leçon 1</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">leçon 2</a>
            </div>
          </li>
          <li class="relative" id="dropdown-exercices">
            <button class="dropdown-btn text-white hover:text-gray-200">Exercices ▼</button>
            <div class="dropdown-content hidden absolute right-0 mt-2 w-48 bg-[#433b36e6] rounded-md shadow-lg">
              <a href="/exo/exo_list.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Liste des exercices</a>
              <a href="/exo/click.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Exo click</a>
              <a href="/exo/dom.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Exo DOM Event</a>
              <a href="/exo/class.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Exercice Class</a>
              <a href="/exo/pme.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Exercice PME</a>
              <a href="/exo/api_user.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Exercice API User</a>
              <a href="/exo/bibliotheque.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Exercice Bibliothèque</a>
              <a href="/exo/firebase.html" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Exercice Firebase</a>
            </div>
          </li>
          <li class="relative" id="dropdown-tp">
            <button class="dropdown-btn text-white hover:text-gray-200">TP ▼</button>
            <div class="dropdown-content hidden absolute right-0 mt-2 w-48 bg-[#433b36e6] rounded-md shadow-lg">
              <a href="#" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">Liste des TP</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">TP 1</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">TP 2</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-500 text-gray-200">TP 3</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  `;
}
