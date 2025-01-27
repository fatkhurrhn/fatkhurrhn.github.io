// Update tanggal

const Update = new Date();
const getThn = Update.getFullYear();
const getBln = Update.getMonth() + 1;
const getHari = Update.getDate() ;

const Tgl = `${getThn}-${getBln}-${getHari}`;

const tampilKota = document.querySelector('.judul-kota');
tampilKota.textContent = localStorage.judulkota;


function getjadwalsholat(){
    fetch('https://api.myquran.com/v2/sholat/jadwal/'+ localStorage.idkota + '/' + getThn + '/' + getBln + '/' + getHari)
        .then(response => response.json())
        .then(data => {
            const jadwal = data.data.jadwal;
            document.querySelector('.Imsak').textContent = jadwal.imsak;
            document.querySelector('.Subuh').textContent = jadwal.subuh;
            document.querySelector('.Terbit').textContent = jadwal.terbit;
            document.querySelector('.Zuhur').textContent = jadwal.dzuhur;
            document.querySelector('.Ashar').textContent = jadwal.ashar;
            document.querySelector('.Magrib').textContent = jadwal.maghrib;
            document.querySelector('.Isya').textContent = jadwal.isya;
            document.querySelector('.Date').textContent = jadwal.tanggal;
            console.log(jadwal);
        });
}

const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function(){
    const valueSearch = inputSearch.value.length;

    if(valueSearch > 0) {
        cardList.classList.remove('hidden-list');

        fetch('https://api.myquran.com/v2/sholat/kota/semua')
            .then(response => response.json())
            .then(response => {
                const kota = response.data;
                let listKota = '';
                kota.forEach(k => {
                    listKota += `<a href="#" data-idkota="${k.id}" id="kota" class="list-group-item list-group-item-action">${k.lokasi}</a>`;
                });

                const namaKota = document.querySelector('.card-list');
                namaKota.innerHTML = listKota


                const isiKota = document.querySelectorAll('#kota');
                isiKota.forEach(kota => {

                    const filterSearchText = inputSearch.value.toLowerCase();
                    const itemSearch = kota.firstChild.textContent.toLowerCase();

                    if(itemSearch.indexOf(filterSearchText) != -1 ) {
                        kota.setAttribute("style", "display : block");
                    } else {
                        kota.setAttribute("style", "display : none !important");
                    }

                    kota.addEventListener('click', function() {
                        const idKota = this.dataset.idkota;
                        const judulKota = this.textContent;
                        window.localStorage.setItem('idkota', idKota);
                        window.localStorage.setItem('judulkota', judulKota);
                        namaKota.classList.add('hidden-list');
                        inputSearch.value = '';
                        location.reload();
                        // alert(`Kota ${judulKota} Berhasil Dipilih`);
                        console.log(idKota);
                    });
                })
                console.log(isiKota);
            });
    } else {
        cardList.classList.add('hidden-list');
    }
    console.log(valueSearch);
});

getjadwalsholat();