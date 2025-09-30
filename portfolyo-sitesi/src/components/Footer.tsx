'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Ana Sayfa', href: '#hero' },
    { label: 'Hakkımda', href: '#about' },
    { label: 'Projeler', href: '#projects' },
    { label: 'İletişim', href: '#contact' },
  ]

  const academicLinks = [
    { label: 'Academia.edu', href: 'https://independent.academia.edu' },
    { label: 'ResearchGate', href: 'https://www.researchgate.net' },
    { label: 'ORCID', href: 'https://orcid.org' },
    { label: 'Google Scholar', href: 'https://scholar.google.com' },
  ]

  const resources = [
    { label: 'Blog', href: '#' },
    { label: 'Yayınlar', href: '#' },
    { label: 'Kaynaklar', href: '#' },
    { label: 'SSS', href: '#' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-max section-padding py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">Sanat Tarihi</h3>
                <p className="text-gray-400 text-sm">Portfolyo</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              Sanat tarihinin büyülü dünyasında yapılan araştırmalar ve keşifler.
              Geçmişin sanat eserleri ile günümüz arasında köprü kurmaya devam ediyorum.
            </p>

            <div className="flex space-x-4">
              {[
                { icon: '📧', href: 'mailto:emrullah@example.com', label: 'Email' },
                { icon: '💼', href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: '🐦', href: 'https://twitter.com', label: 'Twitter' },
                { icon: '📸', href: 'https://instagram.com', label: 'Instagram' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Akademik Ağlar</h4>
            <ul className="space-y-3">
              {academicLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Kaynaklar</h4>
            <ul className="space-y-3 mb-6">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-3">📬 Yeni Projeler</h5>
              <p className="text-sm text-gray-300 mb-3">
                Yeni projelerden haberdar olmak için e-postanızı bırakın.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-sm focus:outline-none focus:border-primary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-lg transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 text-center md:text-left mb-4 md:mb-0">
              <p>
                © {currentYear} Emrullah Demirel. Tüm hakları saklıdır.
              </p>
              <p className="mt-1">
                Next.js, TypeScript ve Supabase ile ❤️ ile geliştirilmiştir.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Kullanım Şartları
              </a>
              <button
                onClick={scrollToTop}
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors duration-200"
                aria-label="Yukarı çık"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Badge */}
      <div className="bg-gray-950 py-4">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Next.js 14
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              TypeScript
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
              Tailwind CSS
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Supabase
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}