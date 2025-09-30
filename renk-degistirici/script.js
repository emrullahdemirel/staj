// Rastgele renk paleti
const renkler = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3',
    '#ff9a9e', '#fecfef', '#fccb90', '#d57eeb',
    '#89f7fe', '#66a6ff', '#cd9cf2', '#f093fb',
    '#ffeef8', '#f3e7e9', '#84fab0', '#8fd3f4'
];

let mevcutRenkIndex = 0;

function rastgeleRenk() {
    // Mevcut renkten farklı bir renk seç
    let yeniIndex;
    do {
        yeniIndex = Math.floor(Math.random() * renkler.length);
    } while (yeniIndex === mevcutRenkIndex);

    mevcutRenkIndex = yeniIndex;
    return renkler[yeniIndex];
}

function rastgeleGradient() {
    const renk1 = rastgeleRenk();
    const renk2 = rastgeleRenk();
    const yon = Math.floor(Math.random() * 360);

    return `linear-gradient(${yon}deg, ${renk1}, ${renk2})`;
}

function renkDegistir() {
    const body = document.body;
    const renkKoduElement = document.getElementById('renkKodu');
    const button = document.getElementById('renkDegistirBtn');

    // Butona animasyon efekti
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    // Yeni gradient oluştur
    const yeniGradient = rastgeleGradient();

    // Arka planı değiştir
    body.style.background = yeniGradient;

    // Renk kodunu güncelle
    const renkKodu = yeniGradient.match(/#[a-fA-F0-9]{6}/g);
    if (renkKodu && renkKodu.length >= 2) {
        renkKoduElement.textContent = `${renkKodu[0]} → ${renkKodu[1]}`;
    }

    // Başarı mesajı göster (isteğe bağlı)
    showSuccessMessage();
}

function showSuccessMessage() {
    // Geçici bir başarı mesajı oluştur
    const message = document.createElement('div');
    message.textContent = '🎨 Renk değiştirildi!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    // CSS animasyonu ekle
    if (!document.querySelector('#slideInStyle')) {
        const style = document.createElement('style');
        style.id = 'slideInStyle';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(message);

    // 2 saniye sonra mesajı kaldır
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 2000);
}

// Sayfa yüklendiğinde ilk rengi ayarla
document.addEventListener('DOMContentLoaded', function() {
    const ilkGradient = rastgeleGradient();
    document.body.style.background = ilkGradient;

    // Renk kodunu güncelle
    const renkKodu = ilkGradient.match(/#[a-fA-F0-9]{6}/g);
    if (renkKodu && renkKodu.length >= 2) {
        document.getElementById('renkKodu').textContent = `${renkKodu[0]} → ${renkKodu[1]}`;
    }
});

// Klavye kısayolu: Space tuşu ile renk değiştir
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        renkDegistir();
    }
});