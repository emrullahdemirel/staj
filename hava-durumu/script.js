// OpenWeatherMap API anahtarı (demo için public key)
const API_KEY = 'demo-api-key'; // Gerçek kullanımda kendi API anahtarınızı kullanın
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elementleri
const sehirInput = document.getElementById('sehirInput');
const araBtn = document.getElementById('araBtn');
const loading = document.getElementById('loading');
const havaDurumuContainer = document.getElementById('havaDurumuContainer');
const hataMesaji = document.getElementById('hataMesaji');
const sonAramalar = document.getElementById('sonAramalar');
const aramaGecmisi = document.getElementById('aramaGecmisi');

// Hava durumu verileri için interface
interface HavaDurumuVerisi {
    name: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg?: number;
    };
    visibility?: number;
    clouds: {
        all: number;
    };
    dt: number;
}

// Demo veriler (API anahtarı olmadığında kullanılacak)
const demoVeriler = {
    'istanbul': {
        name: 'Istanbul',
        sys: { country: 'TR', sunrise: 1640836800, sunset: 1640870400 },
        main: { temp: 12, feels_like: 8, humidity: 65, pressure: 1013 },
        weather: [{ main: 'Clouds', description: 'az bulutlu', icon: '02d' }],
        wind: { speed: 3.5, deg: 230 },
        visibility: 10000,
        clouds: { all: 20 },
        dt: Date.now() / 1000
    },
    'ankara': {
        name: 'Ankara',
        sys: { country: 'TR', sunrise: 1640837200, sunset: 1640870800 },
        main: { temp: 5, feels_like: 2, humidity: 70, pressure: 1015 },
        weather: [{ main: 'Snow', description: 'hafif kar', icon: '13d' }],
        wind: { speed: 2.1, deg: 180 },
        visibility: 8000,
        clouds: { all: 80 },
        dt: Date.now() / 1000
    },
    'izmir': {
        name: 'Izmir',
        sys: { country: 'TR', sunrise: 1640837600, sunset: 1640871200 },
        main: { temp: 16, feels_like: 15, humidity: 60, pressure: 1012 },
        weather: [{ main: 'Clear', description: 'açık', icon: '01d' }],
        wind: { speed: 4.2, deg: 290 },
        visibility: 10000,
        clouds: { all: 5 },
        dt: Date.now() / 1000
    }
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Enter tuşu ile arama
    sehirInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            havaDurumuAra();
        }
    });

    // Son aramaları yükle
    sonAramalariYukle();

    // Varsayılan şehir (İstanbul) için hava durumunu göster
    setTimeout(() => {
        sehirInput.value = 'Istanbul';
        havaDurumuAra();
    }, 500);
});

// Hava durumu arama fonksiyonu
async function havaDurumuAra() {
    const sehir = sehirInput.value.trim();

    if (!sehir) {
        showMessage('Lütfen bir şehir adı girin!', 'error');
        return;
    }

    // Loading göster
    gosterLoading();

    try {
        // Demo için localStorage kontrolü
        const demoSehir = sehir.toLowerCase().replace(/ı/g, 'i');

        if (demoVeriler[demoSehir]) {
            // Demo veri kullan
            const veri = demoVeriler[demoSehir];
            havaDurumuGoster(veri);
            sonAramaEkle(sehir);
        } else {
            // Gerçek API çağrısı (demo amaçlı hata göster)
            throw new Error('API anahtarı gerekli veya şehir bulunamadı');
        }

    } catch (error) {
        console.error('Hava durumu verileri alınamadı:', error);
        hataGoster('Şehir bulunamadı veya API hatası oluştu. Demo şehirleri deneyin: Istanbul, Ankara, Izmir');
    }
}

// Gerçek API çağrısı (yorum olarak bırakıldı)
async function gercekAPICall(sehir) {
    const url = `${BASE_URL}?q=${encodeURIComponent(sehir)}&appid=${API_KEY}&units=metric&lang=tr`;

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Şehir bulunamadı');
        } else if (response.status === 401) {
            throw new Error('API anahtarı geçersiz');
        } else {
            throw new Error('Hava durumu verileri alınamadı');
        }
    }

    return await response.json();
}

// Hava durumu verilerini gösterme fonksiyonu
function havaDurumuGoster(veri) {
    gizleLoading();

    // Şehir bilgileri
    document.getElementById('sehirAdi').textContent = veri.name;
    document.getElementById('ulke').textContent = veri.sys.country;
    document.getElementById('tarihSaat').textContent = new Date().toLocaleString('tr-TR');

    // Ana hava durumu bilgileri
    document.getElementById('sicaklik').textContent = Math.round(veri.main.temp);
    document.getElementById('havaDurumu').textContent = veri.weather[0].main;
    document.getElementById('aciklama').textContent = veri.weather[0].description;

    // Hava durumu ikonu
    const iconCode = veri.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('havaIkonu').src = iconUrl;
    document.getElementById('havaIkonu').alt = veri.weather[0].description;

    // Detay bilgiler
    document.getElementById('hissedilen').textContent = Math.round(veri.main.feels_like) + '°C';
    document.getElementById('nem').textContent = veri.main.humidity + '%';
    document.getElementById('ruzgar').textContent = (veri.wind.speed * 3.6).toFixed(1) + ' km/h';
    document.getElementById('gorus').textContent = veri.visibility ? (veri.visibility / 1000).toFixed(1) + ' km' : 'N/A';
    document.getElementById('basinc').textContent = veri.main.pressure + ' hPa';
    document.getElementById('bulutluluk').textContent = veri.clouds.all + '%';

    // Güneş doğumu/batımı
    document.getElementById('gundogumu').textContent = new Date(veri.sys.sunrise * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('gunbatimi').textContent = new Date(veri.sys.sunset * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    // Hava durumu kartını göster
    havaDurumuContainer.style.display = 'block';
    hataMesaji.style.display = 'none';
}

// Loading göster/gizle
function gosterLoading() {
    loading.style.display = 'block';
    havaDurumuContainer.style.display = 'none';
    hataMesaji.style.display = 'none';
}

function gizleLoading() {
    loading.style.display = 'none';
}

// Hata göster
function hataGoster(mesaj) {
    gizleLoading();
    document.getElementById('hataDurum').textContent = mesaj;
    hataMesaji.style.display = 'block';
    havaDurumuContainer.style.display = 'none';
}

// Hava durumu temizle
function havaDurumuTemizle() {
    havaDurumuContainer.style.display = 'none';
    hataMesaji.style.display = 'none';
    sehirInput.value = '';
    sehirInput.focus();
}

// Son arama ekle
function sonAramaEkle(sehir) {
    let aramalar = JSON.parse(localStorage.getItem('sonAramalar') || '[]');

    // Dublicate'leri kaldır
    aramalar = aramalar.filter(item => item.toLowerCase() !== sehir.toLowerCase());

    // Yeni aramayı başa ekle
    aramalar.unshift(sehir);

    // Maksimum 5 arama sakla
    if (aramalar.length > 5) {
        aramalar = aramalar.slice(0, 5);
    }

    localStorage.setItem('sonAramalar', JSON.stringify(aramalar));
    sonAramalariGuncelle(aramalar);
}

// Son aramaları yükle
function sonAramalariYukle() {
    const aramalar = JSON.parse(localStorage.getItem('sonAramalar') || '[]');
    if (aramalar.length > 0) {
        sonAramalariGuncelle(aramalar);
    }
}

// Son aramaları güncelle
function sonAramalariGuncelle(aramalar) {
    if (aramalar.length === 0) {
        sonAramalar.style.display = 'none';
        return;
    }

    aramaGecmisi.innerHTML = aramalar.map(sehir =>
        `<span class="gecmis-item" onclick="gecmisAramaSecildi('${sehir}')">${sehir}</span>`
    ).join('');

    sonAramalar.style.display = 'block';
}

// Geçmiş arama seçildi
function gecmisAramaSecildi(sehir) {
    sehirInput.value = sehir;
    havaDurumuAra();
}

// Mesaj göster
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#00b894' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 1001;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideDown 0.3s ease;
    `;

    // Animasyon CSS'i ekle
    if (!document.querySelector('#messageAnimation')) {
        const style = document.createElement('style');
        style.id = 'messageAnimation';
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => {
                messageDiv.parentNode.removeChild(messageDiv);
            }, 300);
        }
    }, 3000);
}

// Konum tabanlı hava durumu (isteğe bağlı)
function konumHavaDurumu() {
    if (navigator.geolocation) {
        gosterLoading();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    // Konum tabanlı API çağrısı (demo için Istanbul göster)
                    const veri = demoVeriler['istanbul'];
                    havaDurumuGoster(veri);
                    showMessage('Konumunuz için hava durumu gösteriliyor', 'success');
                } catch (error) {
                    hataGoster('Konum bilgisi alınamadı');
                }
            },
            (error) => {
                hataGoster('Konum erişimi reddedildi');
            }
        );
    } else {
        hataGoster('Tarayıcınız konum bilgisini desteklemiyor');
    }
}

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
    // Ctrl + L ile input'a odaklan
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        sehirInput.focus();
        sehirInput.select();
    }

    // ESC ile temizle
    if (e.key === 'Escape') {
        havaDurumuTemizle();
    }
});