function hesapla() {
    const sayi1 = parseFloat(document.getElementById('sayi1').value);
    const sayi2 = parseFloat(document.getElementById('sayi2').value);
    const islem = document.getElementById('islem').value;
    const sonucElement = document.getElementById('sonuc');

    // Girdi kontrolü
    if (isNaN(sayi1) || isNaN(sayi2)) {
        sonucElement.textContent = "Lütfen geçerli sayılar girin!";
        sonucElement.className = "error";
        return;
    }

    if (islem === "") {
        sonucElement.textContent = "Lütfen bir işlem seçin!";
        sonucElement.className = "error";
        return;
    }

    let sonuc;
    let islemMetni;

    switch (islem) {
        case '+':
            sonuc = sayi1 + sayi2;
            islemMetni = `${sayi1} + ${sayi2} = ${sonuc}`;
            break;
        case '-':
            sonuc = sayi1 - sayi2;
            islemMetni = `${sayi1} - ${sayi2} = ${sonuc}`;
            break;
        case '*':
            sonuc = sayi1 * sayi2;
            islemMetni = `${sayi1} × ${sayi2} = ${sonuc}`;
            break;
        case '/':
            if (sayi2 === 0) {
                sonucElement.textContent = "Sıfıra bölme hatası!";
                sonucElement.className = "error";
                return;
            }
            sonuc = sayi1 / sayi2;
            islemMetni = `${sayi1} ÷ ${sayi2} = ${sonuc}`;
            break;
        default:
            sonucElement.textContent = "Geçersiz işlem!";
            sonucElement.className = "error";
            return;
    }

    // Sonucu göster
    sonucElement.textContent = islemMetni;
    sonucElement.className = "success";
}

// Enter tuşu ile hesaplama
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        hesapla();
    }
});

// Sayıları temizleme fonksiyonu
function temizle() {
    document.getElementById('sayi1').value = '';
    document.getElementById('sayi2').value = '';
    document.getElementById('islem').value = '';
    document.getElementById('sonuc').textContent = 'Sonuç burada görünecek';
    document.getElementById('sonuc').className = '';
}