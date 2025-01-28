const mosques = {
    "Aceh": {
        "Kabupaten Aceh Barat": {
            "Beji": [
                { name: "Masjid Baitul A'la", address: "Jl. Raya Beji", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Aceh+Barat" },
                { name: "Masjid Al-Mustafa", address: "Jl. Al-Mustafa Beji", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Masjid+Al-Mustafa+Beji" }
            ],
            "Bojongsari": [
                { name: "Masjid Al-Hidayah", address: "Jl. Raya Bojongsari", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Masjid+Al-Hidayah+Bojongsari" },
                { name: "Masjid Al-Firdaus", address: "Jl. Al-Firdaus Bojongsari", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Masjid+Al-Firdaus+Bojongsari" }
            ]
        }
    },
    "JAWA_BARAT": {
        "Depok": {
            "Beji": [
                { name: "Masjid Baitul Rahman", address: "Jl. Raya Beji, Depok", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Masjid+Baitul+Rahman+Beji+Depok" },
                { name: "Masjid Al-Muhajirin", address: "Jl. Al-Muhajirin Beji", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Masjid+Al-Muhajirin+Beji" }
            ],
            "Cilodong": [
                { name: "Masjid Al-Amin", address: "Jl. Raya Cilodong", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Masjid+Al-Amin+Cilodong" },
                { name: "Masjid Nurul Huda", address: "Jl. Nurul Huda Cilodong", image: "https://radarlampung.disway.id/upload/84c539eb6f736b3badbbd3a7c6bfaa24.jpg", mapLink: "https://www.google.com/maps?q=Masjid+Nurul+Huda+Cilodong" }
            ]
        }
    },
    // Daftar provinsi lainnya...
};

document.getElementById("province").addEventListener("change", function() {
    const province = this.value;
    const citySelect = document.getElementById("city");
    const districtSelect = document.getElementById("district");

    citySelect.innerHTML = '<option value="">Pilih Kabupaten/Kota</option>'; // Reset city dropdown
    districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>'; // Reset district dropdown

    if (province && mosques[province]) {
        const cities = Object.keys(mosques[province]);
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
});

document.getElementById("city").addEventListener("change", function() {
    const province = document.getElementById("province").value;
    const city = this.value;
    const districtSelect = document.getElementById("district");
    districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>'; // Reset district dropdown

    if (province && city && mosques[province] && mosques[province][city]) {
        const districts = Object.keys(mosques[province][city]);
        districts.forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
});

document.getElementById("district").addEventListener("change", function() {
    const province = document.getElementById("province").value;
    const city = document.getElementById("city").value;
    const district = this.value;
    const mosqueList = document.getElementById("mosque-list");

    // Clear previous mosque list
    mosqueList.innerHTML = '';

    if (province && city && district && mosques[province] && mosques[province][city] && mosques[province][city][district]) {
        mosques[province][city][district].forEach(mosque => {
            const mosqueCard = document.createElement("div");
            mosqueCard.classList.add("mosque-card");
            mosqueCard.innerHTML = `
                <img src="${mosque.image}" alt="Masjid Image">
                <div class="card-body">
                    <h3>${mosque.name}</h3>
                    <p>${mosque.address}</p>
                    <a href="${mosque.mapLink}" class="cta-button" target="_blank">Lihat di Google Maps</a>
                </div>
            `;
            mosqueList.appendChild(mosqueCard);
        });
    }
});
