export async function fetchQuote() {
  try {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent('https://zenquotes.io/api/quotes/');
    const response = await fetch(proxyUrl + targetUrl);
    const data = await response.json();
    
    // Parsez les données JSON reçues
    const quotes = JSON.parse(data.contents);
    
    // Choisir une citation aléatoire parmi celles reçues
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    return {
      q: quote.q,
      a: quote.a
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la citation:', error);
    return null;
  }
}

export function displayQuote(quote) {
  if (!quote) return '';

  return `
    <div class="bg-[#18181b] bg-opacity-90 rounded-lg shadow p-6 mt-8">
      <blockquote class="text-white">
        <p class="text-lg mb-4">"${quote.q}"</p>
        <footer class="text-gray-400">— ${quote.a}</footer>
      </blockquote>
    </div>
  `;
}
