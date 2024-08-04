document.addEventListener('DOMContentLoaded', function() {
    const uebergabeArt = document.getElementById('uebergabeArt');
    const abholungDetails = document.getElementById('abholungDetails');
    const adresseInput = document.getElementById('adresse');
    const form = document.getElementById('spendenForm');
    const confirmation = document.getElementById('confirmation');
    const confirmationDetails = document.getElementById('confirmationDetails');

    uebergabeArt.addEventListener('change', function() {
        if (uebergabeArt.value === 'abholung') {
            abholungDetails.style.display = 'block';
            adresseInput.setAttribute('required', 'required');
        } else {
            abholungDetails.style.display = 'none';
            adresseInput.removeAttribute('required');
            adresseInput.value = ''; // Reset address input if not needed
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const uebergabe = formData.get('uebergabeArt');
        const kleidungArt = formData.get('kleidungArt');
        const krisengebiet = formData.get('krisengebiet');
        const datum = new Date().toLocaleDateString();
        const uhrzeit = new Date().toLocaleTimeString();
        let adresse = '';

        if (uebergabe === 'abholung') {
            adresse = formData.get('adresse');
            const plzGesch�ftsstelle = '12'; // Beispiel-PLZ der Gesch�ftsstelle
            const plzAdresse = adresse.substring(0, 2);

            if (plzGesch�ftsstelle !== plzAdresse) {
                alert('Abholadresse ist nicht in der N�he der Gesch�ftsstelle.');
                return;
            }
        }

        const ort = uebergabe === 'abholung' ? adresse : 'Gesch�ftsstelle';

        // Erfolgreiche Registrierung anzeigen
        form.style.display = 'none';
        confirmation.style.display = 'block';
        confirmationDetails.innerHTML = `
            <strong>Art der Kleidung:</strong> ${kleidungArt}<br>
            <strong>Krisengebiet:</strong> ${krisengebiet}<br>
            <strong>Datum:</strong> ${datum}<br>
            <strong>Uhrzeit:</strong> ${uhrzeit}<br>
            <strong>Ort:</strong> ${ort}
        `;
    });
});