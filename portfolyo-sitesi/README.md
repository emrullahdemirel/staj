# 🎨 Sanat Tarihi Portfolyo Sitesi

Modern ve responsive bir sanat tarihi portfolyo sitesi. Next.js 14, TypeScript ve Supabase kullanılarak geliştirilmiştir.

## ✨ Özellikler

- **Modern Tasarım**: Responsive ve kullanıcı dostu arayüz
- **TypeScript**: Tip güvenliği ve geliştirici deneyimi
- **Supabase Entegrasyonu**: Backend veritabanı ve API
- **Performans Optimizasyonu**: Next.js 14 App Router
- **SEO Dostu**: Meta etiketleri ve sitemap
- **Accessibility**: WCAG standartlarına uygun
- **Dark/Light Mode**: Tema değiştirme özelliği

## 🚀 Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS
- **Veritabanı**: Supabase
- **Deployment**: Vercel
- **Paket Yöneticisi**: npm

## 📦 Kurulum

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/emrullahdemirel/sanat-tarihi-portfolyo.git
   cd sanat-tarihi-portfolyo
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Çevre değişkenlerini ayarlayın**
   ```bash
   cp .env.example .env.local
   ```

   `.env.local` dosyasını kendi Supabase bilgilerinizle güncelleyin:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

   Site [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🗄️ Veritabanı Yapısı

### Projects Tablosu
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  period TEXT NOT NULL,
  image_url TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  content TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### RLS (Row Level Security) Politikaları
```sql
-- Herkes projeleri okuyabilir
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

-- Sadece kimlik doğrulaması yapan kullanıcılar proje ekleyebilir
CREATE POLICY "Users can insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Sadece proje sahibi güncelleyebilir
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

-- Sadece proje sahibi silebilir
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout bileşeni
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── About.tsx         # Hakkımda bölümü
│   ├── Contact.tsx       # İletişim formu
│   ├── Footer.tsx        # Site alt bilgisi
│   ├── Header.tsx        # Site başlığı
│   ├── Hero.tsx          # Ana banner
│   ├── LoadingScreen.tsx # Yükleme ekranı
│   └── Projects.tsx      # Projeler listesi
├── lib/                  # Yardımcı kütüphaneler
│   └── supabase.ts      # Supabase istemcisi
└── types/               # TypeScript tip tanımları
    └── index.ts         # Ana tip dosyası
```

## 🎨 Stil Sistemi

### Renk Paleti
- **Primary**: #667eea → #764ba2 (Mor-mavi gradient)
- **Secondary**: #d946ef → #c026d3 (Pembe gradient)
- **Gri Tonları**: gray-50 → gray-900

### Tipografi
- **Başlıklar**: Playfair Display (serif)
- **Gövde Metni**: Inter (sans-serif)

### Bileşen Sınıfları
```css
.btn-primary       # Ana buton stili
.btn-secondary     # İkincil buton stili
.card             # Kart bileşeni
.section-padding  # Bölüm padding'i
.container-max    # Maksimum genişlik container
.text-gradient    # Gradient metin
```

## 🚀 Deployment

### Vercel ile Deploy
1. GitHub'a kod gönder
2. Vercel'e import et
3. Çevre değişkenlerini ayarla
4. Deploy et

### Manuel Build
```bash
npm run build
npm start
```

## 📊 SEO ve Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Meta Tags**: Dinamik og:image ve meta descriptions
- **Sitemap**: Otomatik sitemap.xml üretimi
- **Robots.txt**: SEO optimizasyonu

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit atın (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

**Emrullah Demirel**
- Website: [https://emrullah-portfolyo.vercel.app](https://emrullah-portfolyo.vercel.app)
- Email: emrullah@example.com
- LinkedIn: [linkedin.com/in/emrullah](https://linkedin.com/in/emrullah)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Vercel](https://vercel.com/) - Deployment platform
- [Unsplash](https://unsplash.com/) - Ücretsiz görseller

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!