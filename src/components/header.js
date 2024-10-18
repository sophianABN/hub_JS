export function createHeader() {
  return `
    <header class="bg-white shadow-md rounded-lg">
      <nav class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center">
          <a href="/">
            <img src="/avatar.jpg" alt="Logo" class="w-10 h-10 rounded-full mr-3">
          </a>
          <span class="text-xl font-bold text-gray-800">SoHUB.JS</span>
        </div>
        <ul class="flex space-x-6">
          <li class="relative" id="dropdown-lecons">
            <button class="dropdown-btn text-gray-600 hover:text-gray-900">Leçons ▼</button>
            <div class="dropdown-content hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <a href="#" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">Liste des leçons</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">leçon 1</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">leçon 2</a>
            </div>
          </li>
          <li class="relative" id="dropdown-exercices">
            <button class="dropdown-btn text-gray-600 hover:text-gray-900">Exercices ▼</button>
            <div class="dropdown-content hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <a href="/exo/exo_list.html" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">Liste des exercices</a>
              <a href="/exo/click.html" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">Exo click</a>
              <a href="/exo/dom.html" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">Exo DOM Event</a>
              <a href="/exo/class.html" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">Exercice Class</a>
            </div>
          </li>
          <li class="relative" id="dropdown-tp">
            <button class="dropdown-btn text-gray-600 hover:text-gray-900">TP ▼</button>
            <div class="dropdown-content hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <a href="#" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">Liste des TP</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">TP 1</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">TP 2</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">TP 3</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  `;
}
