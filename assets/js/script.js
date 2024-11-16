/*====================
  Theme Setting Option Js
======================*/
let elements = document.querySelectorAll('.theme-icon');

elements.forEach(i => {
  i.addEventListener('click', function () {
    elements.forEach(j => j.classList.toggle('show'));
  });
});


// // Fungsi untuk mengatur class "active"
// function setActiveLink() {
//   // Ambil semua item navbar
//   const navLinks = document.querySelectorAll('.mobile-style-1 ul li');

//   // Loop melalui setiap item navbar
//   navLinks.forEach(link => {
//       // Ambil link dari item navbar
//       const href = link.querySelector('a').getAttribute('href');

//       // Cek apakah link sama dengan URL saat ini
//       if (href === window.location.pathname) {
//           // Tambahkan class "active" ke item navbar
//           link.classList.add('active');
//       } else {
//           // Hapus class "active" dari item navbar
//           link.classList.remove('active');
//       }
//   });
// }

// // Panggil fungsi setActiveLink() saat halaman dimuat
// window.addEventListener('load', setActiveLink);


// // Ambil konten navbar
// fetch('mobile-section.html')
//     .then(response => response.text())
//     .then(html => {
//         document.getElementById('mobile-section').innerHTML = html;
//     });

// Ambil konten footer
// fetch('footer.html')
//     .then(response => response.text())
//     .then(html => {
//         document.getElementById('footer').innerHTML = html;
//     });