/* -------------------------------------------------------- */



/*                      Kontakt html                        */



/* -------------------------------------------------------- */

// Gemini je pomogao sa skriptom za validaciju forme
// Preuzimanje elemenata iz forme
const forma = document.getElementById('kontaktForma');
const resetDugme = document.getElementById('resetDugme');
const uspjehPoruka = document.getElementById('uspjehPoruka');

// Funkcija koja se pokreće kada se klikne "pošalji"
forma.addEventListener('submit', function(dogadjaj) {
    dogadjaj.preventDefault(); // Sprječava klasično slanje i osvježavanje stranice
    
    ocistiGreske(); // Prvo brišemo stare greške prije nove provjere
    uspjehPoruka.classList.add('skriveno'); // Sakrij prethodnu poruku o uspjehu
    
    let formaValidna = true;

    // Preuzimanje vrijednosti iz input polja, trim uklanja prazne prostore na početku i kraju
    const ime = document.getElementById('ime').value.trim();
    const prezime = document.getElementById('prezime').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefon = document.getElementById('telefon').value.trim();
    const tema = document.getElementById('tema').value;
    const poruka = document.getElementById('poruka').value.trim();

    // Validacija polja
    if (ime === '') {
        prikaziGresku('ime', 'Ime je obavezno.');
        formaValidna = false;
    }

    if (prezime === '') {
        prikaziGresku('prezime', 'Prezime je obavezno.');
        formaValidna = false;
    }

    // REGEX za Email (provjerava da li postoji @ i tačka za domenu)
    // [^\s@]+ Ovdje mora biti barem jedan znak, a ti znakovi ne smiju biti razmaci i ne smiju biti @
    // @ i \. su znakovi, ^ i $ označavaju početak i kraj stringa
    // / na pocetku i kraju označavaju da je ovo regularni izraz
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        prikaziGresku('email', 'E-mail adresa je obavezna.');
        formaValidna = false;
    } else if (!emailRegex.test(email)) {
        prikaziGresku('email', 'Unesite ispravan format (npr. ime@domena.com).');
        formaValidna = false;
    }

    // REGEX za Telefon (dozvoljene cifre, razmaci i crtice)
    // ^[\d\s\-]+$ označava da string mora početi i završiti s dozvoljenim znakovima
    const telefonRegex = /^[\d\s\-]+$/;
    if (telefon === '') {
        prikaziGresku('telefon', 'Broj telefona je obavezan.');
        formaValidna = false;
    } else if (!telefonRegex.test(telefon)) {
        prikaziGresku('telefon', 'Dozvoljene su samo cifre, razmaci i crtice.');
        formaValidna = false;
    }

    if (tema === '') {
        prikaziGresku('tema', 'Molimo odaberite temu upita iz padajućeg menija.');
        formaValidna = false;
    }

    if (poruka === '') {
        prikaziGresku('poruka', 'Poruka ne može biti prazna.');
        formaValidna = false;
    }

    // Prikaz uspješne poruke ako nema grešaka
    if (formaValidna) {
        // Personalizirana poruka koja koristi uneseno Ime
        uspjehPoruka.innerHTML = `<strong>Uspješno poslano!</strong> Hvala ti, ${ime}, na kontaktu. Javit ćemo se uskoro.`;
        uspjehPoruka.classList.remove('skriveno');
        uspjehPoruka.classList.add('poruka-zelena');
        forma.reset(); // Prazni sva polja u formi nakon slanja
    }
});

// Funkcija koja se pokreće kada se klikne RESET
resetDugme.addEventListener('click', function() {
    forma.reset(); // Vraća formu na početno stanje
    ocistiGreske(); // Uklanja crvene okvire i tekst grešaka
    uspjehPoruka.classList.add('skriveno'); // Sakriva poruku o uspjehu ako je bila prikazana
});

// Pomoćna funkcija za ispis pojedinačne greške
function prikaziGresku(idPolja, poruka) {
    const polje = document.getElementById(idPolja);
    const spanGreska = document.getElementById(idPolja + 'Greska');
    
    polje.classList.add('input-greska'); // Dodaje klasu za crveni okvir
    spanGreska.innerText = poruka;       // Upisuje tekst greške ispod polja
}

// Pomoćna funkcija za brisanje svih grešaka sa forme
function ocistiGreske() {
    // Uklanjanje crvenih okvira sa svih polja
    const svaPolja = document.querySelectorAll('.input-greska');
    svaPolja.forEach(polje => polje.classList.remove('input-greska'));

    // Brisanje teksta grešaka
    const svePoruke = document.querySelectorAll('.greska-tekst');
    svePoruke.forEach(poruka => poruka.innerText = '');
}
