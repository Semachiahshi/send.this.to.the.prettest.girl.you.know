document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Přihlášení jako normální uživatel (bez hesla)
    if (username && !password) {
        alert(`Vítejte, ${username}! Jste přihlášen jako běžný uživatel.`);
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('permission-screen').style.display = 'block';
    }
    // Přihlášení jako administrátor (vyžaduje jméno a heslo)
    else if (username === 'semachiah' && password === 'tomasek') {
        alert('Vítejte, administrátore!');
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-screen').style.display = 'block';
    } else {
        alert('Chybné přihlašovací údaje. Zkuste to znovu.');
    }
});

document.getElementById('allow-control').addEventListener('click', function() {
    alert('Ovládání obrazovky povoleno.');
    document.getElementById('permission-screen').style.display = 'none';
    document.getElementById('admin-screen').style.display = 'block';
});

document.getElementById('deny-control').addEventListener('click', function() {
    alert('Ovládání obrazovky odmítnuto.');
    document.getElementById('permission-screen').style.display = 'none';
});

document.getElementById('admin-login').addEventListener('click', function() {
    const adminPassword = document.getElementById('admin-password').value;

    if (adminPassword === '221') {
        alert('Admin připojen.');
    } else {
        alert('Chybné administrátorské heslo.');
    }
});
