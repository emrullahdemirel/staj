// DOM elementleri
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mainContent = document.querySelector('.main-content');

// Sidebar durumu
let sidebarOpen = false;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Event listener'ları ekle
    setupEventListeners();

    // Tema ayarını yükle
    loadTheme();

    // Responsive kontrol
    handleResize();

    // Animasyon sınıfı ekle
    setTimeout(() => {
        document.querySelector('.content-section').classList.add('fade-in');
    }, 300);
});

// Event listener'ları ayarla
function setupEventListeners() {
    // Menu toggle butonu
    menuToggle.addEventListener('click', toggleSidebar);

    // Overlay tıklama
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Escape tuşu ile sidebar kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebarOpen) {
            closeSidebar();
        }
    });

    // Resize eventi
    window.addEventListener('resize', handleResize);

    // Navigation linkleri
    const navLinks = document.querySelectorAll('.nav-link:not(.has-submenu .nav-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.parentElement.classList.contains('has-submenu')) {
                setActiveNavItem(link.parentElement);

                // Mobilde sidebar'ı kapat
                if (window.innerWidth < 1024) {
                    closeSidebar();
                }
            }
        });
    });

    // Logout butonu
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', handleLogout);
}

// Sidebar aç/kapat
function toggleSidebar() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// Sidebar aç
function openSidebar() {
    sidebarOpen = true;
    sidebar.classList.add('active');
    menuToggle.classList.add('active');
    sidebarOverlay.classList.add('active');

    // Desktop'ta main content'i kaydır
    if (window.innerWidth >= 1024) {
        mainContent.classList.add('sidebar-open');
    }

    // Body scroll'ını engelle (mobil)
    if (window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
    }

    // Analytics
    trackEvent('sidebar_opened');
}

// Sidebar kapat
function closeSidebar() {
    sidebarOpen = false;
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    mainContent.classList.remove('sidebar-open');

    // Body scroll'ını geri aç
    document.body.style.overflow = '';

    // Analytics
    trackEvent('sidebar_closed');
}

// Submenu toggle
function toggleSubmenu(element) {
    event.preventDefault();

    const parentItem = element.parentElement;
    const isActive = parentItem.classList.contains('active');

    // Diğer tüm submenu'ları kapat
    const allSubmenus = document.querySelectorAll('.has-submenu');
    allSubmenus.forEach(item => {
        if (item !== parentItem) {
            item.classList.remove('active');
        }
    });

    // Mevcut submenu'yu toggle et
    parentItem.classList.toggle('active');

    // Analytics
    const submenuName = element.querySelector('.nav-text').textContent;
    trackEvent('submenu_toggled', { submenu: submenuName, opened: !isActive });
}

// Aktif navigation item'ı ayarla
function setActiveNavItem(navItem) {
    // Tüm aktif sınıfları kaldır
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => item.classList.remove('active'));

    // Yeni aktif item'ı ayarla
    navItem.classList.add('active');

    // Breadcrumb güncelle
    const navText = navItem.querySelector('.nav-text').textContent;
    updateBreadcrumb(navText);

    // Analytics
    trackEvent('nav_item_clicked', { page: navText });
}

// Breadcrumb güncelle
function updateBreadcrumb(pageName) {
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = `
        <span>Ana Sayfa</span>
        <i class="fas fa-chevron-right"></i>
        <span>${pageName}</span>
    `;
}

// Tema ayarlama
function setTheme(theme) {
    const body = document.body;

    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else if (theme === 'auto') {
        // Sistem temasını kullan
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', 'auto');
    }

    // Submenu'yu kapat
    const themeSubmenu = document.querySelector('.nav-link .fa-palette').closest('.has-submenu');
    themeSubmenu.classList.remove('active');

    // Success mesajı göster
    showNotification(`Tema "${theme}" olarak ayarlandı`, 'success');

    // Analytics
    trackEvent('theme_changed', { theme });
}

// Tema yükleme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.setAttribute('data-theme', 'dark');
        }
    } else if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// Responsive handling
function handleResize() {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
        // Desktop'ta overlay'i kaldır ve body scroll'ını geri aç
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Sidebar açıksa main content'i kaydır
        if (sidebarOpen) {
            mainContent.classList.add('sidebar-open');
        }
    } else {
        // Mobilde main content kaydırmasını kaldır
        mainContent.classList.remove('sidebar-open');

        // Sidebar açıksa overlay'i göster
        if (sidebarOpen) {
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Logout işlemi
function handleLogout() {
    const confirmed = confirm('Çıkış yapmak istediğinizden emin misiniz?');

    if (confirmed) {
        // Loading göster
        showNotification('Çıkış yapılıyor...', 'info');

        // Simulated logout
        setTimeout(() => {
            // Local storage temizle
            localStorage.removeItem('user');

            // Başarı mesajı
            showNotification('Başarıyla çıkış yapıldı', 'success');

            // Sidebar'ı kapat
            closeSidebar();

            // Analytics
            trackEvent('user_logout');

            // Redirect simülasyonu
            setTimeout(() => {
                showNotification('Giriş sayfasına yönlendiriliyorsunuz...', 'info');
            }, 1500);
        }, 1000);
    }
}

// Bildirim gösterme
function showNotification(message, type = 'info') {
    // Mevcut bildirimleri kaldır
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Stil ayarları
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        maxWidth: '300px',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    };

    // Tip'e göre renk ayarları
    const typeColors = {
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936',
        info: '#4299e1'
    };

    styles.backgroundColor = typeColors[type] || typeColors.info;

    // Stilleri uygula
    Object.assign(notification.style, styles);

    // Animasyon CSS'i ekle
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Analytics/tracking (demo)
function trackEvent(eventName, parameters = {}) {
    // Google Analytics veya başka tracking servisine event gönder
    console.log('Event tracked:', eventName, parameters);

    // Örnek: gtag kullanımı
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + B ile sidebar toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }

    // Alt + T ile tema değiştirme
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }
});

// System tema değişikliğini dinle
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'auto' || !savedTheme) {
        if (e.matches) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }
});

// Sayfa terk edilirken sidebar durumunu kaydet
window.addEventListener('beforeunload', () => {
    localStorage.setItem('sidebarWasOpen', sidebarOpen.toString());
});

// Sayfa yüklendiğinde sidebar durumunu geri yükle
window.addEventListener('load', () => {
    const sidebarWasOpen = localStorage.getItem('sidebarWasOpen') === 'true';
    if (sidebarWasOpen && window.innerWidth >= 1024) {
        openSidebar();
    }
});