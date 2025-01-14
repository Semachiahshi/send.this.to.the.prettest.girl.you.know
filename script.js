// Funkce pro zpracování polohy
function getLocation() {
    const statusElement = document.getElementById('status');
    const locationElement = document.getElementById('location');

    // Zkontrolujeme, zda je dostupná geolokace
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

                // Odešleme polohu do konzole
                console.log(`Vaše poloha: Šířka ${latitude}, Délka ${longitude}`);
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

// Spustíme získávání polohy při načtení stránky
window.onload = getLocation;
