import { createHeader } from './components/header.js';
import { Footer } from './components/footer.js';
import { fetchQuote, displayQuote } from './components/quote.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Ajout du header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = createHeader();
  }

  // Ajout de la citation
  const quoteContainer = document.getElementById('quote-container');
  if (quoteContainer) {
    const quote = await fetchQuote();
    quoteContainer.innerHTML = displayQuote(quote);
  }

  // Ajout du footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.appendChild(Footer());
  }

  // Gestion des menus dropdowns
  const dropdowns = document.querySelectorAll('.dropdown-btn');
  
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const content = e.target.nextElementSibling;
      content.classList.toggle('hidden');
      
      // Ferme les autres dropdowns
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== e.target) {
          otherDropdown.nextElementSibling.classList.add('hidden');
        }
      });
    });
  });

  // Fermer les dropdowns quand on clique en dehors
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-btn')) {
      const dropdownContents = document.querySelectorAll('.dropdown-content');
      dropdownContents.forEach(content => {
        content.classList.add('hidden');
      });
    }
  });
});
