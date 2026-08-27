# Svatební stránky V & H

Elegantní svatební webové stránky s jemným designem a zvýrazněním iniciál snoubenců.

## 💕 Koncept

Svatební stránky pro **Verču & Honzu** (nebo upravte podle svých jmen):
- **V** - Verča (první iniciála)
- **H** - Honza (první iniciála)

Iniciály "V" a "H" jsou jemně zvýrazněny elegantní zlatohnědou barvou, připomínající romantický a nadčasový styl svatby.

## 📁 Struktura projektu

```
vheselka/
├── index.html      # Hlavní HTML soubor
├── styles.css      # CSS styly - elegantní svatební design
├── script.js       # JavaScript pro odpočet, animace a RSVP
└── README.md       # Tento soubor
```

## 🎨 Design

### Barevné schéma
- **Primární**: Teplá zlatohnědá (#8B7355)
- **Akcent**: Jemná zlatá (#D4AF87)  
- **Růžová**: Pastelová růžová (#E8CCD0)
- **Neutrální**: Šedé odstíny a bílá

### Typografie
- Nadpisy: Georgia (serif) - elegantní, nadčasová
- Text: Segoe UI (sans-serif) - čitelná, moderní

## 📄 Sekce stránek

1. **Uvítací stránka** 
   - Jména snoubenců (iniciály V & H zvýrazněné)
   - Datum svatby
   - Odpočet do svatby (dny, hodiny, minuty)

2. **Náš příběh**
   - První setkání
   - Zasnoubení
   - Svatba

3. **Detaily svatby**
   - Obřad (místo a čas)
   - Hostina (místo a čas)
   - Večírek (program)
   - Dress code

4. **Program dne**
   - Časová osa s událostmi svatebního dne
   - Od příchodu hostů až po večerní zábavu

5. **RSVP (Potvrzení účasti)**
   - Formulář pro hosty
   - Jméno, email, telefon
   - Počet hostů
   - Potvrzení účasti (ano/ne)
   - Speciální požadavky

## 🚀 Jak spustit

1. **Otevřete soubor přímo:**
   - Dvakrát klikněte na `index.html`
   
2. **S Live Serverem (doporučeno):**
   - V VS Code: pravý klik na `index.html` → "Open with Live Server"

## ✨ Interaktivní funkce

### Odpočet do svatby
- Automaticky počítá dny, hodiny a minuty do svatby
- Nastaveno na: **15. června 2027, 14:00**
- Po svatbě zobrazí: "Jsme svoji! 💕"

### RSVP formulář
- Plně funkční frontend
- Pro skutečné odesílání potřebujete backend (např. EmailJS, Formspree, nebo vlastní server)
- Aktuálně pouze simuluje odeslání s vizuálním feedbackem

### Easter egg
- Klikněte 3× na logo pro srdíčkovou animaci 💕

### Další funkce
- Plynulé scrollování mezi sekcemi
- Animace při načtení a scrollování
- Responzivní navigace
- Jemný parallax efekt pozadí

## 🎯 Přizpůsobení

### 1. Změna jmen
V [index.html](index.html) najděte:
```html
<h1 class="hero-title">
    <span class="title-vh">V</span>erča <span class="ampersand">&</span> <span class="title-vh">H</span>onza
</h1>
```
Změňte "Verča" a "Honza" na vaše jména a upravte iniciály.

### 2. Změna data svatby
V [script.js](script.js) najděte:
```javascript
const weddingDate = new Date('2027-06-15T14:00:00').getTime();
```
A v [index.html](index.html):
```html
<p class="wedding-date">15. června 2027</p>
```

### 3. Změna míst
V [index.html](index.html) upravte sekci `#details`:
```html
<p class="detail-location">Kostel sv. Mikuláše<br>Malá Strana, Praha</p>
```

### 4. Úprava programu
V sekci `#program` upravte časovou osu podle vašeho plánu.

### 5. Změna barev
V [styles.css](styles.css) v sekci `:root`:
```css
:root {
    --primary: #8B7355;        /* Vaše hlavní barva */
    --accent: #D4AF87;         /* Akcentová barva */
    --rose: #E8CCD0;           /* Růžová */
}
```

## 📱 Responzivita

Plně responzivní design pro všechna zařízení:
- 📱 Mobil: < 480px
- 📱 Tablet: 481px - 768px  
- 💻 Desktop: > 768px

## 🔗 Připojení RSVP na backend

Pro skutečné odesílání RSVP máte několik možností:

### Možnost 1: EmailJS (nejjednodušší)
1. Registrujte se na [emailjs.com](https://www.emailjs.com/)
2. Přidejte jejich skript do HTML
3. Upravte JavaScript pro odesílání

### Možnost 2: Formspree
1. Registrujte se na [formspree.io](https://formspree.io/)
2. Změňte `action` ve formuláři

### Možnost 3: Vlastní backend
- Node.js + Express + Nodemailer
- PHP skript
- Google Forms API

## 💡 Tipy

- **Logo**: Klikněte 3× na logo pro srdíčka
- **Navigace**: Automaticky se zvýrazňuje aktuální sekce
- **Formulář**: Po odeslání ukáže zprávu a resetuje se
- **Odpočet**: Aktualizuje se každou minutu

## 📝 TODO (volitelné rozšíření)

- [ ] Galerie fotografií
- [ ] Mapa s umístěním míst
- [ ] Seznam darů
- [ ] Ubytování pro hosty
- [ ] Fotogalerie ze svatby (po svatbě)
- [ ] Hudební playlist
- [ ] Přání a vzkazy od hostů

## 📄 Licence

Volně použitelné pro vaši svatbu. Šťastný den! 💕
