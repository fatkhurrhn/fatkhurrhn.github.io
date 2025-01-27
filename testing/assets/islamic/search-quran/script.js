let quranData = [];

async function fetchQuranData() {
    try {
        // Fetch Arabic text
        const arabicResponse = await fetch('https://api.quran.com/api/v4/quran/verses/uthmani');
        if (!arabicResponse.ok) throw new Error('Network response was not ok for Arabic text');
        const arabicData = await arabicResponse.json();

        // Fetch translations
        const translations = {
            english: await fetchTranslation(131),
            urdu: await fetchTranslation(97),
            indonesian: await fetchTranslation(33),
            turkish: await fetchTranslation(77),
            french: await fetchTranslation(31),
            bengali: await fetchTranslation(161),
            german: await fetchTranslation(27)
        };

        // Combine Arabic and translations data
        quranData = arabicData.verses.map((verse, index) => ({
            surah: { number: Math.floor(verse.verse_key.split(':')[0]), englishName: '' },
            numberInSurah: parseInt(verse.verse_key.split(':')[1]),
            text: verse.text_uthmani,
            englishTranslation: translations.english[index].text,
            urduTranslation: translations.urdu[index].text,
            indonesianTranslation: translations.indonesian[index].text,
            turkishTranslation: translations.turkish[index].text,
            frenchTranslation: translations.french[index].text,
            bengaliTranslation: translations.bengali[index].text,
            germanTranslation: translations.german[index].text
        }));

        await loadSurahNames();
        console.log('Quran data loaded successfully');
    } catch (error) {
        console.error('Error fetching Quran data:', error);
    }
}

async function fetchTranslation(translationId) {
    const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translationId}`);
    if (!response.ok) throw new Error(`Network response was not ok for translation ${translationId}`);
    const data = await response.json();
    return data.translations;
}

async function loadSurahNames() {
    try {
        const response = await fetch('https://api.quran.com/api/v4/chapters');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const surahNames = data.chapters.reduce((acc, surah) => {
            acc[surah.id] = surah.name_simple;
            return acc;
        }, {});
        
        quranData.forEach(ayah => {
            ayah.surah.englishName = `Surah ${surahNames[ayah.surah.number]}`;
        });
    } catch (error) {
        console.error('Error loading surah names:', error);
    }
}

// Search function
async function searchAyah(query) {
    if (quranData.length === 0) {
        await fetchQuranData();
    }

    const matches = [];
    const lowerQuery = query.toLowerCase();
    const selectedLanguage = document.getElementById('languageSelect').value;

    for (const ayah of quranData) {
        if (ayah.text.includes(query) || 
            ayah[`${selectedLanguage}Translation`].toLowerCase().includes(lowerQuery)) {
            matches.push(ayah);
        }
    }

    return matches;
}

// Event listener for search input
let debounceTimeout;
document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = this.value;
        if (query.length > 2) {
            const matches = await searchAyah(query);
            displaySearchResults(matches, query);
        }
    }, 300);
});

// Event listener for language selection
document.getElementById('languageSelect').addEventListener('change', async function() {
    const query = document.getElementById('searchBox').value;
    if (query.length > 2) {
        const matches = await searchAyah(query);
        displaySearchResults(matches, query);
    }
});

let currentPage = 1;
const resultsPerPage = 20;
let allMatches = [];

function addCustomStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* General Styling */
        .bg-light-cyan {
            background-color: rgba(103, 178, 180, 0.2);
        }
        .text-slate {
            color: #2b2b2b;
        }
        .p-4 {
            padding: 1rem;
        }
        .mt-5 {
            margin-top: 1.25rem;
        }
        .rounded-lg {
            border-radius: 0.5rem;
        }

        /* Card Styling */
        .bg-white {
            background-color: #ffffff;
        }
        .shadow-md {
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .overflow-hidden {
            overflow: hidden;
        }
        .mb-4 {
            margin-bottom: 1rem;
        }
        .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
        .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
        }
        .text-white {
            color: #ffffff;
        }
        .font-semibold {
            font-weight: 600;
        }
        .pb-4 {
            padding-bottom: 1rem;
        }
        .pt-8 {
            padding-top: 2rem;
        }
        .text-right {
            text-align: right;
        }
        .dir-rtl {
            direction: rtl;
        }
        .text-2xl {
            font-size: 1.5rem;
            font-weight: smal;
        }
        .font-arabic {
            font-family: 'Amiri', serif;
        }
        .text-cyan {
            color: #164150;
        }
        ..leading-normal {
            line-height: 1.5;
        }

        /* Load More Button */
        .w-full {
            width: 100%;
        }
        .bg-cyan {
            background-color: #164150;
        }
        .hover-bg-hover-cyan:hover {
            background-color: #164150;
        }
        ..transition {
            transition: all 0.3s;
        }
        .duration-300 {
            transition-duration: 300ms;
        }

        /* Highlighting */
        .bg-highlight {
            background-color: rgba(103, 178, 180, 0.5);
            color: #164150;
        }
    `;
    document.head.appendChild(style);
}

// Call the function to apply styles
addCustomStyles();

function displaySearchResults(matches, query, isNewSearch = true) {
    const searchResults = document.getElementById('searchResults');
    const searchInfo = document.getElementById('searchInfo');
    const resultCount = document.getElementById('resultCount');
    const selectedLanguage = document.getElementById('languageSelect').value;

    if (isNewSearch) {
        searchResults.innerHTML = '';
        currentPage = 1;
        allMatches = matches;
    }

    if (!Array.isArray(allMatches) || allMatches.length === 0) {
        searchResults.innerHTML = '<div class="p-4 bg-light-cyan rounded-lg text-slate mt-5">No matches found</div>';
        searchInfo.classList.add('hidden');
        return;
    }

    searchInfo.classList.remove('hidden');
    resultCount.textContent = `${allMatches.length} Search Results`;

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentMatches = allMatches.slice(startIndex, endIndex);

    // Remove existing "Load More" button if it exists
    const existingLoadMoreBtn = document.getElementById('loadMoreBtn');
    if (existingLoadMoreBtn) {
        existingLoadMoreBtn.remove();
    }

    // Create a container for the new results
    const newResultsContainer = document.createElement('div');

    currentMatches.forEach(match => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'bg-white rounded-lg shadow-md overflow-hidden mb-4';
        resultDiv.innerHTML = `
            <div class="bg-cyan py-2 px-4">
                <h3 class="text-white font-semibold">${match.surah.englishName} ${match.numberInSurah}</h3>
            </div>
            <div class="px-4 pb-4 pt-8">
                <div class="mb-8 text-right" dir="rtl">
                    <span class="text-2xl font-arabic text-cyan leading-normal">${match.text}</span>
                </div>
                <p class="text-cyan ${['urdu', 'arabic', 'bengali'].includes(selectedLanguage) ? 'text-right font-urdu leading-9' : ''}" ${['urdu', 'arabic', 'bengali'].includes(selectedLanguage) ? 'dir="rtl"' : ''}>
                    ${highlightSearchTerm(match[`${selectedLanguage}Translation`], query)}
                </p>
            </div>
        `;
        newResultsContainer.appendChild(resultDiv);
    });

    // Append the new results to the search results container
    searchResults.appendChild(newResultsContainer);

    // Add "Load More" button if there are more results
    if (endIndex < allMatches.length) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'loadMoreBtn';
        loadMoreBtn.className = 'w-full py-2 bg-cyan text-white rounded-lg hover-bg-hover-cyan transition duration-300';
        loadMoreBtn.textContent = 'Load More';
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            displaySearchResults(allMatches, query, false);
        });
        searchResults.appendChild(loadMoreBtn);
    }

    // Scroll to the newly added results
    if (!isNewSearch) {
        newResultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Highlight search term in text
function highlightSearchTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-highlight">$1</mark>');
}


// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const contentDivs = document.querySelectorAll('#intro');

    intro.style.display = 'flex';
    contentDivs.forEach(div => div.classList.add('hidden-content'));

    // Fetch Quran data when the page loads
    fetchQuranData();
});

// Ensure the intro fades out after the entire page is fully loaded
window.onload = () => {
    const intro = document.getElementById('intro');
    const contentDivs = document.querySelectorAll('#intro');

    setTimeout(() => {
        intro.classList.add('fade-out');
        setTimeout(() => {
            intro.style.display = 'none';
            contentDivs.forEach(div => div.classList.remove('hidden-content'));
        }, 2000);
    }, 3000);
};