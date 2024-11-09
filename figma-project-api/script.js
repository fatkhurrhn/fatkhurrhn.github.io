const accessToken = 'figd_1OwV8s4-UF4Mbrml4G-nv--Nlobs8FLON9fCDP91';
// const accessToken = 'figd_M9LlCjp8B7NAAAZHhrIUX_yggi_PxqDrY8EoQdis';

const fileKey = '1381812388257069012'; // Ganti dengan file key project Figma Anda https://www.figma.com/design/rK2Wa7abdDjtab0xJiKzeY/HangApp?m=auto&t=YyQppeC5Z5h6pY19-6

// Mendapatkan detail proyek dari Figma API
async function getFigmaProjects() {
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Gagal mendapatkan data dari API');
    }

    const data = await response.json();
    displayProjects(data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('projects').innerText = 'Gagal memuat project Figma';
  }
}

// Menampilkan data project
function displayProjects(data) {
  const projectsDiv = document.getElementById('projects');
  const projectTitle = data.name || 'Unnamed Project';

  // Menampilkan nama project
  const projectElement = document.createElement('div');
  projectElement.className = 'project';
  projectElement.innerHTML = `
    <h2>${projectTitle}</h2>
    <p>ID Project: ${data.document.id}</p>
    <p>Last Modified: ${data.lastModified}</p>
  `;

  projectsDiv.appendChild(projectElement);
}

// Memanggil fungsi untuk menampilkan project
getFigmaProjects();
