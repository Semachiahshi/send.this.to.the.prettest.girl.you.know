let studentAnswers = []; // Pole pro sledování odpovědí studenta
let adminWatching = false; // Indikátor, zda admin sleduje studenta

document.getElementById('student-btn').addEventListener('click', function () {
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('student-screen').style.display = 'block';
    loadDictation();
});

document.getElementById('admin-btn').addEventListener('click', function () {
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('admin-screen').style.display = 'block';
});

document.getElementById('admin-login').addEventListener('click', function () {
    const adminPassword = document.getElementById('admin-password').value;
    if (adminPassword === 'admin123') {
        alert('Vítejte, administrátore!');
        document.getElementById('admin-screen').style.display = 'none';
        document.getElementById('admin-management').style.display = 'block';
    } else {
        alert('Chybné heslo!');
    }
});

document.getElementById('freeze-dictation').addEventListener('click', function () {
    alert('Diktát byl zmražen!');
    document.getElementById('submit-dictation').disabled = true;
    const inputs = document.querySelectorAll('#dictation-container input');
    inputs.forEach(input => input.disabled = true);
});

document.getElementById('remove-student').addEventListener('click', function () {
    alert('Student byl odstraněn!');
    document.getElementById('student-screen').style.display = 'none';
    document.getElementById('role-selection').style.display = 'block';
});

document.getElementById('explain-dictation').addEventListener('click', function () {
    const explanation = `
        1. Měl jsi s **ním** to štěstí. (Používá se "n" s tvrdým i, protože jde o mužský rod.)
        2. Včelky letěly kolem květ___. (Správná odpověď je "in" pro ženský rod.)
        ... (a tak dále pro všech 10 vět)
    `;
    alert(`Vysvětlení:\n${explanation}`);
});

document.getElementById('watch-student').addEventListener('click', function () {
    adminWatching = true;
    alert('Sledujete pokrok studenta.');
    updateAdminView();
});

function loadDictation() {
    const sentences = [
        "Měl jsi s ___m to štěstí.",
        "Včelky letěly kolem květ___.",
        "Dítě si hrálo s hračk___.",
        "Soused přišel s nov__m autem.",
        "Na stole ležela kn__ha.",
        "Děti běhaly po dvoř___.",
        "Pes se schoval pod lav__ci.",
        "Včera jsem viděl obrovsk__ho slona.",
        "Maminka pekla koláč___.",
        "V parku seděla stará pan__."
    ];

    const correctAnswers = ["n", "in", "ami", "ým", "i", "e", "kou", "ého", "e", "í"];
    const container = document.getElementById('dictation-container');
    container.innerHTML = ''; // Vyčistíme předchozí cvičení
    studentAnswers = Array(sentences.length).fill(null); // Inicializace sledování odpovědí

    sentences.forEach((sentence, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${sentence.replace("___", `<input type="text" id="input-${index}" maxlength="3" oninput="updateStudentAnswer(${index}, this.value)">`)}`;
        container.appendChild(div);
    });

    document.getElementById('submit-dictation').addEventListener('click', function () {
        let score = 0;
        sentences.forEach((_, index) => {
            const answer = document.getElementById(`input-${index}`).value.trim();
            if (answer === correctAnswers[index]) {
                score++;
                document.getElementById(`input-${index}`).style.backgroundColor = 'lightgreen';
            } else {
                document.getElementById(`input-${index}`).style.backgroundColor = 'lightcoral';
            }
        });

        alert(`Vaše skóre je: ${score}/${sentences.length}`);
        if (adminWatching) {
            alert('Admin vidí aktuální skóre studenta.');
        }
    });
}

function updateStudentAnswer(index, value) {
    studentAnswers[index] = value;
    if (adminWatching) {
        updateAdminView();
    }
}

function updateAdminView() {
    const adminView = document.getElementById('admin-view');
    if (!adminView) return;

    adminView.innerHTML = '';
    studentAnswers.forEach((answer, index) => {
        const div = document.createElement('div');
        div.textContent = `Věta ${index + 1}: ${answer || "nevyplněno"}`;
        adminView.appendChild(div);
    });
}
