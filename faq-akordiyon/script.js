document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    // Her FAQ item'ına animasyon gecikmesi ekle
    faqItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });

    // FAQ sorularına event listener ekle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        // Click event
        question.addEventListener('click', () => {
            toggleFAQ(item, question, answer);
        });

        // Keyboard navigation
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item, question, answer);
            }
        });

        // Tab navigation için focusable yap
        question.setAttribute('tabindex', '0');
    });

    function toggleFAQ(item, question, answer) {
        const isActive = item.classList.contains('active');

        // Diğer tüm FAQ'ları kapat (accordion davranışı)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');

                otherItem.classList.remove('active');
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = '0';
            }
        });

        // Mevcut FAQ'ı toggle et
        if (isActive) {
            // Kapat
            item.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0';
        } else {
            // Aç
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');

            // Dinamik yükseklik hesaplama
            const scrollHeight = answer.scrollHeight;
            answer.style.maxHeight = scrollHeight + 'px';

            // Smooth scroll için scroll position ayarla
            setTimeout(() => {
                const rect = question.getBoundingClientRect();
                const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                if (!isVisible) {
                    question.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }

        // Analytics veya tracking için event gönder (isteğe bağlı)
        trackFAQInteraction(question.textContent.trim(), !isActive);
    }

    // FAQ etkileşimlerini takip et
    function trackFAQInteraction(question, isOpened) {
        // Google Analytics veya başka tracking servisine event gönder
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_interaction', {
                'question': question,
                'action': isOpened ? 'open' : 'close'
            });
        }

        // Console'da log (geliştirme için)
        console.log(`FAQ ${isOpened ? 'açıldı' : 'kapatıldı'}: ${question}`);
    }

    // Sayfa yüklendiğinde URL hash kontrol et
    function checkURLHash() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement && targetElement.classList.contains('faq-answer')) {
                const faqItem = targetElement.closest('.faq-item');
                const question = faqItem.querySelector('.faq-question');

                // Belirtilen FAQ'ı aç
                setTimeout(() => {
                    toggleFAQ(faqItem, question, targetElement);
                }, 300);
            }
        }
    }

    // URL hash'i kontrol et
    checkURLHash();

    // Hash değişikliklerini dinle
    window.addEventListener('hashchange', checkURLHash);

    // Arama fonksiyonu (isteğe bağlı)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'FAQ\'larda ara...';
        searchInput.className = 'faq-search';

        // Arama stilini ekle
        const searchStyle = document.createElement('style');
        searchStyle.textContent = `
            .faq-search {
                width: 100%;
                padding: 1rem;
                margin-bottom: 2rem;
                border: 2px solid #e5e5e5;
                border-radius: 8px;
                font-size: 1rem;
                background: white;
            }
            .faq-search:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            .faq-item.hidden {
                display: none;
            }
        `;
        document.head.appendChild(searchStyle);

        // Arama input'unu container'ın başına ekle
        const faqContainer = document.querySelector('.faq-container');
        faqContainer.parentNode.insertBefore(searchInput, faqContainer);

        // Arama fonksiyonunu ekle
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span:first-child').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('active'); // Gizli item'ları kapat
                }
            });

            // Arama sonuçlarını takip et
            if (searchTerm.length > 2) {
                trackFAQInteraction(`Arama: ${searchTerm}`, true);
            }
        });
    }

    // Arama fonksiyonunu etkinleştir (yorumu kaldır)
    // addSearchFunctionality();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC ile tüm FAQ'ları kapat
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');

                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            });
        }
    });

    // Resize event'inde yükseklikleri yeniden hesapla
    window.addEventListener('resize', () => {
        faqItems.forEach(item => {
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});