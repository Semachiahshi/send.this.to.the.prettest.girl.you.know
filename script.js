document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulace úspěšného přihlášení
    if (username === 'user' && password === 'user123') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('permission-screen').style.display = 'block';
    } else {
        alert('Chybné přihlašovací údaje');
    }
});

document.getElementById('allow-control').addEventListener('click', function() {
    document.getElementById('permission-screen').style.display = 'none';
    document.getElementById('admin-screen').style.display = 'block';
});

document.getElementById('deny-control').addEventListener('click', function() {
    alert('Odmítli jste povolení pro ovládání obrazovky');
    document.getElementById('permission-screen').style.display = 'none';
});

document.getElementById('admin-login').addEventListener('click', function() {
    const adminPassword = document.getElementById('admin-password').value;

    if (adminPassword === '221') {
        alert('Admin připojen');
        // Zde můžete implementovat reálné připojení k zařízení
        // Například pomocí WebRTC nebo WebSocket pro vzdálené ovládání
    } else {
        alert('Chybné administrátorské heslo');
    }
});