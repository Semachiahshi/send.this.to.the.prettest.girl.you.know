function getLocation() {
    const statusElement = document.getElementById('status');
    const locationElement = document.getElementById('location');

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude.toFixed(6);
                const longitude = position.coords.longitude.toFixed(6);

                // Zobrazíme polohu na stránce
                statusElement.textContent = "Vaše poloha byla nalezena:";
                locationElement.innerHTML = `
                    Šířka: <strong>${latitude}</strong><br>
                    Délka: <strong>${longitude}</strong>
                `;

                // Odešleme polohu na server
                sendLocationToServer(latitude, longitude);
            },
            (error) => {
                statusElement.textContent = "Nepodařilo se získat vaši polohu.";
                locationElement.innerHTML = `<span class="error">${error.message}</span>`;
                console.error("Chyba při získávání polohy:", error);
            }
        );
    } else {
        statusElement.textContent = "Geolokace není podporována ve vašem prohlížeči.";
    }
}

function sendLocationToServer(latitude, longitude) {
    fetch('/api/saveLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Úspěšně uloženo:', data);
        })
        .catch((error) => {
            console.error('Chyba při odesílání na server:', error);
        });
}

window.onload = getLocation;
