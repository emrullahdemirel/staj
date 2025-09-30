// Ürün verileri
const urunler = [
    { id: 1, ad: "Laptop", aciklama: "Yüksek performanslı dizüstü bilgisayar", fiyat: 15000 },
    { id: 2, ad: "Telefon", aciklama: "Akıllı telefon - son model", fiyat: 8000 },
    { id: 3, ad: "Kulaklık", aciklama: "Kablosuz Bluetooth kulaklık", fiyat: 500 },
    { id: 4, ad: "Klavye", aciklama: "Mekanik gaming klavye", fiyat: 300 },
    { id: 5, ad: "Mouse", aciklama: "Optik gaming mouse", fiyat: 150 },
    { id: 6, ad: "Monitor", aciklama: "24 inç LED monitor", fiyat: 2000 },
    { id: 7, ad: "Tablet", aciklama: "10 inç tablet", fiyat: 3000 },
    { id: 8, ad: "Kamera", aciklama: "DSLR fotoğraf makinesi", fiyat: 12000 }
];

// Sepet state
let sepet = [];
let kullanici = null;

// Firebase konfigürasyonu (demo için sadece UI)
const firebaseConfig = {
    apiKey: "demo-api-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "demo-app-id"
};


// DOM elementleri
const urunlerContainer = document.getElementById('urunler');
const sepetIcerigiContainer = document.getElementById('sepetIcerigi');
const sepetAdetElement = document.getElementById('sepetAdet');
const sepetToplamElement = document.getElementById('sepetToplam');
const toplamFiyatElement = document.getElementById('toplamFiyat');
const odemeBtn = document.getElementById('odemeBtn');
const aramaInput = document.getElementById('aramaInput');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');
const authSwitchText = document.getElementById('authSwitchText');
const authSwitchLink = document.getElementById('authSwitchLink');
const kullaniciInfo = document.getElementById('kullaniciInfo');
const kullaniciEmail = document.getElementById('kullaniciEmail');
const cikisBtn = document.getElementById('cikisBtn');

let isRegistering = false;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    urunleriGoster();
    sepetGuncelle();

    // Event listeners
    aramaInput.addEventListener('input', urunleriFiltrele);
    odemeBtn.addEventListener('click', odemeYap);
    authForm.addEventListener('submit', authFormSubmit);
    authSwitchLink.addEventListener('click', authModeSwitch);
    cikisBtn.addEventListener('click', cikisYap);

    // Local storage'dan kullanıcı bilgisini yükle
    const savedUser = localStorage.getItem('kullanici');
    if (savedUser) {
        kullanici = JSON.parse(savedUser);
        kullaniciGirisYapildi();
    }

    // Local storage'dan sepeti yükle
    const savedCart = localStorage.getItem('sepet');
    if (savedCart) {
        sepet = JSON.parse(savedCart);
        sepetGuncelle();
    }
});

// Ürünleri göster
function urunleriGoster(filtreliUrunler = urunler) {
    urunlerContainer.innerHTML = '';

    filtreliUrunler.forEach(urun => {
        const urunElement = document.createElement('div');
        urunElement.className = 'urun-kart';
        urunElement.innerHTML = `
            <h3>${urun.ad}</h3>
            <p>${urun.aciklama}</p>
            <div class="urun-fiyat">${urun.fiyat}₺</div>
            <button class="ekle-btn" data-urun-id="${urun.id}">
                Sepete Ekle
            </button>
        `;

        // Butona event listener ekle
        const ekleBtn = urunElement.querySelector('.ekle-btn');
        ekleBtn.addEventListener('click', () => sepeteEkle(urun.id));

        urunlerContainer.appendChild(urunElement);
    });
}

// Ürünleri filtrele
function urunleriFiltrele() {
    const aramaMetni = aramaInput.value.toLowerCase();
    const filtreliUrunler = urunler.filter(urun =>
        urun.ad.toLowerCase().includes(aramaMetni) ||
        urun.aciklama.toLowerCase().includes(aramaMetni)
    );
    urunleriGoster(filtreliUrunler);
}

// Sepete ürün ekle
function sepeteEkle(urunId) {
    const urun = urunler.find(u => u.id === urunId);
    if (!urun) return;

    const mevcutUrun = sepet.find(item => item.id === urunId);

    if (mevcutUrun) {
        mevcutUrun.miktar++;
    } else {
        sepet.push({
            ...urun,
            miktar: 1
        });
    }

    sepetGuncelle();
    sepetKaydet();

    // Başarı mesajı
    showMessage(`${urun.ad} sepete eklendi!`, 'success');
}

// Sepetten ürün çıkar
function sepettenCikar(urunId) {
    sepet = sepet.filter(item => item.id !== urunId);
    sepetGuncelle();
    sepetKaydet();
}

// Ürün miktarını değiştir
function miktarDegistir(urunId, yeniMiktar) {
    const urun = sepet.find(item => item.id === urunId);
    if (!urun) return;

    if (yeniMiktar <= 0) {
        sepettenCikar(urunId);
    } else {
        urun.miktar = yeniMiktar;
        sepetGuncelle();
        sepetKaydet();
    }
}

// Sepeti güncelle
function sepetGuncelle() {
    const toplamAdet = sepet.reduce((toplam, item) => toplam + item.miktar, 0);
    const toplamFiyat = sepet.reduce((toplam, item) => toplam + (item.fiyat * item.miktar), 0);

    sepetAdetElement.textContent = toplamAdet;
    sepetToplamElement.textContent = toplamFiyat;
    toplamFiyatElement.textContent = toplamFiyat;

    // Ödeme butonunu aktif/pasif yap
    odemeBtn.disabled = sepet.length === 0;

    // Sepet içeriğini güncelle
    if (sepet.length === 0) {
        sepetIcerigiContainer.innerHTML = '<p class="bos-sepet">Sepetiniz boş</p>';
    } else {
        sepetIcerigiContainer.innerHTML = '';

        sepet.forEach(item => {
            const sepetUrunDiv = document.createElement('div');
            sepetUrunDiv.className = 'sepet-urun';
            sepetUrunDiv.innerHTML = `
                <div class="urun-detay">
                    <h4>${item.ad}</h4>
                    <p>${item.fiyat}₺</p>
                </div>
                <div class="miktar-kontrol">
                    <button class="miktar-btn azalt-btn" data-id="${item.id}">-</button>
                    <span class="miktar">${item.miktar}</span>
                    <button class="miktar-btn artir-btn" data-id="${item.id}">+</button>
                </div>
            `;

            // Butonlara event listener ekle
            const azaltBtn = sepetUrunDiv.querySelector('.azalt-btn');
            const artirBtn = sepetUrunDiv.querySelector('.artir-btn');

            azaltBtn.addEventListener('click', () => miktarDegistir(item.id, item.miktar - 1));
            artirBtn.addEventListener('click', () => miktarDegistir(item.id, item.miktar + 1));

            sepetIcerigiContainer.appendChild(sepetUrunDiv);
        });
    }
}

// Ödeme yap
function odemeYap() {
    if (!kullanici) {
        showMessage('Ödeme yapmak için giriş yapmalısınız!', 'error');
        return;
    }

    if (sepet.length === 0) {
        showMessage('Sepetiniz boş!', 'error');
        return;
    }

    const toplam = sepet.reduce((sum, item) => sum + (item.fiyat * item.miktar), 0);

    // Ödeme simülasyonu
    showMessage(`Ödeme başarılı! Toplam: ${toplam}₺`, 'success');

    // Sepeti temizle
    sepet = [];
    sepetGuncelle();
    sepetKaydet();
}

// Auth form submit
function authFormSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showMessage('Lütfen tüm alanları doldurun!', 'error');
        return;
    }

    // Basit email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Geçerli bir e-posta adresi girin!', 'error');
        return;
    }

    if (isRegistering) {
        // Kayıt ol
        kullanici = { email, password };
        localStorage.setItem('kullanici', JSON.stringify(kullanici));
        kullaniciGirisYapildi();
        showMessage('Kayıt başarılı!', 'success');
    } else {
        // Giriş yap
        const savedUser = localStorage.getItem('kullanici');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user.email === email && user.password === password) {
                kullanici = user;
                kullaniciGirisYapildi();
                showMessage('Giriş başarılı!', 'success');
            } else {
                showMessage('E-posta veya şifre hatalı!', 'error');
            }
        } else {
            showMessage('Kullanıcı bulunamadı! Önce kayıt olun.', 'error');
        }
    }
}

// Auth mode switch
function authModeSwitch(e) {
    e.preventDefault();
    isRegistering = !isRegistering;

    if (isRegistering) {
        authTitle.textContent = 'Kayıt Ol';
        authSubmit.textContent = 'Kayıt Ol';
        authSwitchText.textContent = 'Zaten hesabınız var mı?';
        authSwitchLink.textContent = 'Giriş Yap';
    } else {
        authTitle.textContent = 'Giriş Yap';
        authSubmit.textContent = 'Giriş Yap';
        authSwitchText.textContent = 'Hesabınız yok mu?';
        authSwitchLink.textContent = 'Kayıt Ol';
    }
}

// Kullanıcı giriş yaptı
function kullaniciGirisYapildi() {
    authForm.style.display = 'none';
    document.querySelector('.auth-switch').style.display = 'none';
    kullaniciInfo.style.display = 'block';
    kullaniciEmail.textContent = kullanici.email;
}

// Çıkış yap
function cikisYap() {
    kullanici = null;
    localStorage.removeItem('kullanici');

    authForm.style.display = 'block';
    document.querySelector('.auth-switch').style.display = 'block';
    kullaniciInfo.style.display = 'none';

    // Formu temizle
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    showMessage('Çıkış yapıldı!', 'success');
}

// Sepeti kaydet
function sepetKaydet() {
    localStorage.setItem('sepet', JSON.stringify(sepet));
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
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1001;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}