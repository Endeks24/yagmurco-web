# yağmur&co – Web Sitesi

GitHub Pages üzerinde çalışan, derleme gerektirmeyen statik site (HTML + CSS + JS).

## Dosyalar

| Dosya | Görevi |
|---|---|
| `index.html` | Ana sayfa (tüm bölümler) |
| `config.js` | **Ajans adı, domain, telefon, e-posta, sosyal medya linkleri** |
| `assets/style.css` | Tasarım |
| `assets/main.js` | Menü, animasyonlar, iletişim formu |
| `assets/favicon.svg` | Tarayıcı sekmesi ikonu |
| `assets/logo/` | Logo dosyaları (koyu/açık zemin, işaret, sosyal medya profil görseli) |
| `404.html` | Bulunamayan sayfa |
| `CNAME.example` | Özel domain için şablon |
| `.nojekyll` | GitHub'ın Jekyll işlemesini kapatır |

## 1. GitHub'a yükleme

1. GitHub'da yeni bir depo (repository) oluşturun, örn. `ajans-web`.
2. Bu klasördeki tüm dosyaları depoya yükleyin (*Add file → Upload files*; `.nojekyll` dahil).
3. **Settings → Pages** bölümünde *Source: Deploy from a branch*, *Branch: `main` / `(root)`* seçip kaydedin.
4. 1–2 dakika sonra site `https://KULLANICIADI.github.io/ajans-web/` adresinde yayında olur.

## 2. Ajans adını ve bilgileri girme

Sadece `config.js` dosyasını düzenleyin: `name`, `shortName`, `email`, `phone`, `whatsapp`, sosyal medya linkleri vb.
Sayfadaki tüm alanlar otomatik güncellenir.

Ajans adı (yağmur&co) ve logo sayfaya işlenmiş durumda.

## 3. Domain bağlama

1. `CNAME.example` dosyasının adını `CNAME` yapın ve içine sadece domaininizi yazın (örn. `www.ajansadi.com`).
2. Domain sağlayıcınızın DNS panelinde:
   - `www` için **CNAME** kaydı → `KULLANICIADI.github.io`
   - Kök domain (`ajansadi.com`) için **A** kayıtları →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. GitHub'da **Settings → Pages → Custom domain** alanına domaini yazın, DNS doğrulandıktan sonra **Enforce HTTPS** kutusunu işaretleyin.

## 4. İletişim formu

GitHub Pages sunucu tarafı kod çalıştırmadığı için form iki şekilde çalışır:

- **Varsayılan:** Gönder'e basınca ziyaretçinin e-posta uygulaması, form bilgileri dolu şekilde açılır.
- **Önerilen:** [formspree.io](https://formspree.io) üzerinde ücretsiz form oluşturun, verilen ID'yi `config.js` → `formspreeId` alanına yazın. Mesajlar doğrudan e-postanıza gelir.

## 5. Sonra eklenebilecekler

- Gerçek çekimlerden fotoğraf/video ile **Referanslar / Portfolyo** bölümü
- Müşteri logoları ve yorumları (izinli, gerçek olanlar)
- KVKK aydınlatma metni sayfası (`kvkk.html`)
- Google Analytics veya Plausible ölçüm kodu
