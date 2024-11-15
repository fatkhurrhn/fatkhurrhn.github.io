// Ambil elemen tombol
const toggleButton = document.getElementById('dark-mode-toggle');

// Event listener untuk toggle Dark Mode
toggleButton.addEventListener('click', () => {
    // Toggle kelas "dark-mode" pada body
    document.body.classList.toggle('dark-mode');
    
    // Toggle Dark Mode di elemen header, footer, dan semua proyek
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('.project').forEach(project => {
        project.classList.toggle('dark-mode');
    });
});
