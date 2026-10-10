# 📋 IP Address Tracker — Layihə Yol Xəritəsi və Git İşi (TODO.md)

Bu sənəd layihəni peşəkar standartlara uyğun şəkildə tamamlamaq, xüsusiyyətləri addım-addım bölmək və GitHub-da səliqəli commit/branch tarixçəsi qurmaq üçün hazırlanmışdır.

---

## 🌳 Git Filial (Branch) Strategiyası

Bu layihədə sənayedə geniş istifadə olunan **Feature Branch Workflow** tətbiq olunur:

* **`main`**: Yalnız canlıya (production) çıxmağa hazır, tam test edilmiş stabil kod.
* **`develop`**: Bütün tamamlanmış xüsusiyyətlərin birləşdirildiyi əsas inkişaf filialı.
* **`feature/<ad>`**: Hər bir konkret xüsusiyyət və ya modul üçün `develop`-dan ayrılan müvəqqəti filial.

> 💡 **Qayda:** Birbaşa `main` üzərində kod yazılmır. Hər xüsusiyyət öz branch-ında hazırlanır, test edilir, `develop`-a birləşdirilir və GitHub-a göndərilir.

---

## 📌 Mərhələ 1: Layihə və Git Repozitoriyasının Qurulması

- [ ] **Git inicializasiyası və ilk konfiqurasiya**
  - [ ] Terminalda git reposunu başlat: `git init`
  - [ ] `.gitignore` faylını yoxla (lazım gələrsə `.env`, IDE qovluqlarını əlavə et)
  - [ ] İlkin faylları əlavə et və ilk commit-i et
  - [ ] GitHub-da yeni repo yarat və lokal repoya bağla: `git remote add origin <URL>`
  - [ ] `main` filialını GitHub-a göndər: `git push -u origin main`
  - [ ] `develop` filialını yarat və ona keç: `git checkout -b develop`
  - [ ] `develop` filialını da GitHub-a göndər: `git push -u origin develop`

* **Commit nümunəsi:** `chore: initial repository setup with starter template`
* **Nə vaxt və hara push:** İlk commit-dən dərhal sonra `main` və `develop` filialları `origin`-ə push edilir.

---

## 📌 Mərhələ 2: Semantik HTML və İlkin Struktur

* **Filial:** `feature/semantic-html` (`develop`-dan ayrıl: `git checkout -b feature/semantic-html`)

- [ ] **HTML Bünövrəsi və Əlçatanlıq (A11y)**
  - [ ] Başlıq sahəsi (`<header>`): H1 başlığı və axtarış forması (`<form role="search">`)
  - [ ] Giriş sahəsi: `<input type="text">` (uyğun `aria-label`, `placeholder` və `id`)
  - [ ] Nəticələr paneli: İnformasiya kartı üçün semantik teqlər (məsələn, `<dl>`, `<section>` və ya `<ul>`)
  - [ ] Ekran oxuyucular üçün dinamik yenilənmə sahəsi: `aria-live="polite"`
  - [ ] Xəritə konteyneri: `<div id="map">` və ya `<main id="map" aria-label="Xəritə">`
  - [ ] Xətalar və yüklənmə vəziyyətləri üçün gizli/hazır bildiriş strukturu

* **Commit nümunəsi:** `feat(html): scaffold semantic structure and accessible search form`
* **Git əməliyyatları:**
  1. `git push -u origin feature/semantic-html`
  2. `git checkout develop`
  3. `git merge --no-ff feature/semantic-html`
  4. `git push origin develop`
  5. *(İstəyə görə)* `git branch -d feature/semantic-html`

---

## 📌 Mərhələ 3: CSS Arxitekturası və Responsive Dizayn

* **Filial:** `feature/ui-styling` (`develop`-dan ayrıl: `git checkout -b feature/ui-styling`)

- [ ] **CSS Qaydaları və Dəyişənlər**
  - [ ] `style-guide.md` əsasında CSS Custom Properties təyin et (Rubik şrifti, rənglər: Gray 950, Gray 400 və s.)
  - [ ] Müasir CSS reset / normalize əlavə et
  - [ ] Google Fonts-dan Rubik şriftini (400, 500, 700) qoş
- [ ] **Komponentlərin Tərtibatı (Mobile-First)**
  - [ ] Arxa fon şəkli (pattern-bg) və başlıq sahəsinin responsivliyi
  - [ ] Axtarış inputu və ox düyməsinin (`button`) hover/focus vəziyyətləri
  - [ ] Nəticələr kartının (IP, Location, Timezone, ISP) mütləq/nisbi yerləşməsi (overlay effekti)
  - [ ] Mobil görünüş (375px) tənzimləmələri
  - [ ] Desktop görünüş (1440px) üçün Media Query və Flexbox/Grid sütun bölücüləri (`border-left`)
  - [ ] Focus-visible vəziyyətlərinin klaviatura istifadəçiləri üçün aydın görünməsi

* **Commit nümunəsi:** `feat(css): build responsive layout and interactive states`
* **Git əməliyyatları:**
  1. `git push -u origin feature/ui-styling`
  2. `git checkout develop`
  3. `git merge --no-ff feature/ui-styling`
  4. `git push origin develop`

---

## 📌 Mərhələ 4: LeafletJS Xəritə İnteqrasiyası

* **Filial:** `feature/leaflet-map` (`develop`-dan ayrıl: `git checkout -b feature/leaflet-map`)

- [ ] **Leaflet İnteqrasiyası**
  - [ ] Leaflet CSS və JS kitabxanasını qoş (CDN və ya npm vasitəsilə)
  - [ ] Xəritə konteynerinin ölçülərini CSS-də dəqiqləşdir (hündürlük, z-index təbəqələri)
  - [ ] İlkin koordinatlarla Leaflet xəritəsini inisializasiya et
  - [ ] OpenStreetMap kafel (tile) qatını əlavə et
  - [ ] Fərdi marker ikonasını (`images/icon-location.svg`) xəritəyə əlavə et
  - [ ] Koordinatlar dəyişdikdə xəritənin mərkəzini dəyişən köməkçi funksiya yaz (`map.setView` / `map.flyTo`)

* **Commit nümunəsi:** `feat(map): initialize leaflet map with custom location pin`
* **Git əməliyyatları:**
  1. `git push -u origin feature/leaflet-map`
  2. `git checkout develop`
  3. `git merge --no-ff feature/leaflet-map`
  4. `git push origin develop`

---

## 📌 Mərhələ 5: IPify Geolocation API və İlkin Yüklənmə

* **Filial:** `feature/api-integration` (`develop`-dan ayrıl: `git checkout -b feature/api-integration`)

- [ ] **API Sorğuları və İlkin Məlumatlar**
  - [ ] IPify hesabı aç və API açarını əldə et
  - [ ] Asinxron məlumat gətirmə funksiyası qur (`async/await`, `fetch`)
  - [ ] Səhifə ilk dəfə açılanda istifadəçinin öz cari IP ünvanını müəyyən et və məlumatları gətir
  - [ ] DOM elementlərini dinamik olaraq yenilə:
    - IP Address
    - Location (şəhər, ölkə, poçt indeksi)
    - Timezone (UTC formatında)
    - ISP
  - [ ] Xəritəni gələn enlem/boylam (lat, lng) koordinatlarına hərəkət etdir

* **Commit nümunəsi:** `feat(api): integrate ipify geolocation for initial user IP fetch`
* **Git əməliyyatları:**
  1. `git push -u origin feature/api-integration`
  2. `git checkout develop`
  3. `git merge --no-ff feature/api-integration`
  4. `git push origin develop`

---

## 📌 Mərhələ 6: Axtarış, Giriş Validasiyası və Xətaların İdarəsi

* **Filial:** `feature/search-validation` (`develop`-dan ayrıl: `git checkout -b feature/search-validation`)

- [ ] **İstifadəçi Daxiletməsi və Validasiya**
  - [ ] Form submit hadisəsini (`submit` event) dinlə və `event.preventDefault()` tətbiq et
  - [ ] Daxil edilən dəyərin IP və ya Domen adı olduğunu yoxlayan regex/məntiq qur
  - [ ] Boş və ya yanlış format daxil edildikdə istifadəçiyə aydın xəta mesajı göstər
  - [ ] Sorğu zamanı yüklənmə (loading state/spinner və ya disable düymə) vəziyyəti göstər
  - [ ] Şəbəkə və API xətalarını (`catch`, HTTP status != 200) nəzakətlə qarşıla və istifadəçiyə bildiriş ver

* **Commit nümunəsi:** `feat(search): add ip/domain validation and robust error handling`
* **Git əməliyyatları:**
  1. `git push -u origin feature/search-validation`
  2. `git checkout develop`
  3. `git merge --no-ff feature/search-validation`
  4. `git push origin develop`

---

## 📌 Mərhələ 7: Kod Təmizliyi, Əlçatanlıq (A11y) və Test

* **Filial:** `feature/refactor-and-polish` (`develop`-dan ayrıl: `git checkout -b feature/refactor-and-polish`)

- [ ] **Son Yoxlamalar və Cilalama**
  - [ ] Kodun modullara/funksiyalara ayrılmasını (Clean Code) təmin et
  - [ ] Müxtəlif ekran ölçülərində (320px, 375px, 768px, 1024px, 1440px) dizayn uyğunluğunu yoxla
  - [ ] Yalnız klaviatura ilə naviqasiyanı sınaqdan keçir (Tab, Enter)
  - [ ] Lighthouse auditi apar (Performance, Accessibility, Best Practices)
  - [ ] `console.log` və artıq şərhləri təmizlə

* **Commit nümunəsi:** `refactor: clean up codebase and improve keyboard accessibility`
* **Git əməliyyatları:**
  1. `git push -u origin feature/refactor-and-polish`
  2. `git checkout develop`
  3. `git merge --no-ff feature/refactor-and-polish`
  4. `git push origin develop`

---

## 📌 Mərhələ 8: Buraxılış (Release) və Canlıya Yerləşdirmə

* **Filial:** `main`

- [ ] **Son Buraxılış və Sənədləşdirmə**
  - [ ] `README-template.md` faylını öz məlumatlarınla tamamlayıb `README.md` kimi yenilə
  - [ ] `develop` filialını `main`-ə birləşdir:
    ```bash
    git checkout main
    git merge --no-ff develop
    git push origin main
    ```
  - [ ] Versiya tag-i yarat:
    ```bash
    git tag -a v1.0.0 -m "Release v1.0.0: IP Address Tracker completed"
    git push origin v1.0.0
    ```
  - [ ] Canlı mühitə yerləşdir (Vercel, Netlify və ya GitHub Pages)
  - [ ] Canlı linki yoxla və Frontend Mentor platformasında həllini təqdim et

---

## 💡 Tez-tez İstifadə Olunan Əsas Git Əmrləri Konspekti

| Əməliyyat | Əmr |
|---|---|
| Yeni xüsusiyyət filialı yarat və keç | `git checkout -b feature/<ad>` |
| Dəyişiklikləri stage et | `git add .` |
| Standarta uyğun commit et | `git commit -m "feat(...): izahat"` |
| Filialı ilk dəfə GitHub-a göndər | `git push -u origin feature/<ad>` |
| `develop`-a qayıt və birləşdir | `git checkout develop && git merge --no-ff feature/<ad>` |
| Əsas inkişaf filialını push et | `git push origin develop` |
| Bitmiş lokal filialı sil | `git branch -d feature/<ad>` |
