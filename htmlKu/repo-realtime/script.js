const username = 'fatkhurrhn';
const repoContainer = document.getElementById('repos');

// Fungsi untuk mengambil semua halaman repository
async function fetchAllRepositories() {
    let page = 1;
    let repos = [];
    let fetchMore = true;

    while (fetchMore) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100&sort=updated`);
            const data = await response.json();

            // Jika data kosong, maka semua repositori sudah diambil
            if (data.length === 0) {
                fetchMore = false;
            } else {
                repos = repos.concat(data); // Gabungkan data halaman ini ke daftar repositori
                page++;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            fetchMore = false;
        }
    }

    return repos;
}

// Fungsi untuk menampilkan repositori di HTML
function displayRepositories(repos) {
    // Sortir repositori berdasarkan waktu pembaruan terbaru
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    repoContainer.innerHTML = ''; // Kosongkan kontainer sebelum menampilkan data baru
    repos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repo';
        repoElement.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description'}</p>
            <small>Updated at: ${new Date(repo.updated_at).toLocaleString()}</small>
        `;
        repoContainer.appendChild(repoElement);
    });
}

// Fungsi utama untuk mengambil dan menampilkan repositori
async function loadRepositories() {
    const repos = await fetchAllRepositories();
    displayRepositories(repos);
}

// Memanggil loadRepositories() secara berkala untuk update real-time
loadRepositories();
setInterval(loadRepositories, 60000); // Update setiap 60 detik
