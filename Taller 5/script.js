const STORAGE_KEY = "estudiantesRegistrados";

const form = document.getElementById("studentForm");
const fields = {
    studentId: document.getElementById("studentId"),
    cedula: document.getElementById("cedula"),
    apellidos: document.getElementById("apellidos"),
    nombres: document.getElementById("nombres"),
    direccion: document.getElementById("direccion"),
    telefono: document.getElementById("telefono"),
    correo: document.getElementById("correo"),
    facultad: document.getElementById("facultad"),
    nivel: document.getElementById("nivel"),
    paralelo: document.getElementById("paralelo")
};

const tableBody = document.getElementById("studentsTable");
const emptyMessage = document.getElementById("emptyMessage");
const counter = document.getElementById("counter");
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");

const patterns = {
    cedula: /^[0-9]{10}$/,
    apellidos: /^[A-Za-z\u00C0-\u017F]+(?:\s[A-Za-z\u00C0-\u017F]+)+$/,
    nombres: /^[A-Za-z\u00C0-\u017F]+(?:\s[A-Za-z\u00C0-\u017F]+)*$/,
    direccion: /^[A-Za-z\u00C0-\u017F0-9\s#.,-]{5,80}$/,
    telefono: /^0[2-9][0-9]{7,8}$/,
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
    facultad: /.+/,
    nivel: /^(10|[1-9])$/,
    paralelo: /^[A-Za-z]$/
};

const messages = {
    cedula: "La cedula debe tener exactamente 10 digitos.",
    apellidos: "Ingrese al menos dos apellidos, solo letras y espacios.",
    nombres: "Ingrese nombres validos, solo letras y espacios.",
    direccion: "La direccion debe tener entre 5 y 80 caracteres validos.",
    telefono: "Ingrese un telefono ecuatoriano valido de 9 o 10 digitos.",
    correo: "Ingrese un correo electronico valido.",
    facultad: "Seleccione una facultad.",
    nivel: "Seleccione un nivel.",
    paralelo: "Ingrese una sola letra para el paralelo."
};

let students = loadStudents();

function loadStudents() {
    const savedStudents = localStorage.getItem(STORAGE_KEY);
    return savedStudents ? JSON.parse(savedStudents) : [];
}

function saveStudents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function normalizeValue(name, value) {
    const trimmedValue = value.trim();

    if (name === "correo") {
        return trimmedValue.toLowerCase();
    }

    if (name === "paralelo") {
        return trimmedValue.toUpperCase();
    }

    return trimmedValue.replace(/\s+/g, " ");
}

function validateField(name, formatValue = false) {
    const field = fields[name];
    const value = normalizeValue(name, field.value);
    const fieldBox = field.closest(".field");
    const errorBox = document.getElementById(`${name}Error`);
    errorBox.textContent = "";
    let isValid = patterns[name].test(value);

    if (name === "cedula" && isValid) {
        const repeatedDigit = /^(\d)\1{9}$/.test(value);
        isValid = !repeatedDigit;
    }

    if (name === "cedula" && isValid) {
        const duplicated = students.some((student) => {
            return student.cedula === value && student.id !== fields.studentId.value;
        });

        if (duplicated) {
            isValid = false;
            errorBox.textContent = "Ya existe un estudiante con esta cedula.";
        }
    }

    if (!isValid && errorBox.textContent === "") {
        errorBox.textContent = messages[name];
    }

    if (isValid) {
        if (formatValue) {
            field.value = value;
        }

        errorBox.textContent = "";
        fieldBox.classList.remove("invalid");
        fieldBox.classList.add("valid");
        return true;
    }

    fieldBox.classList.remove("valid");
    fieldBox.classList.add("invalid");
    return false;
}

function validateForm() {
    const fieldNames = [
        "cedula",
        "apellidos",
        "nombres",
        "direccion",
        "telefono",
        "correo",
        "facultad",
        "nivel",
        "paralelo"
    ];

    return fieldNames.every((name) => validateField(name, true));
}

function getFormData() {
    return {
        id: fields.studentId.value || createId(),
        cedula: normalizeValue("cedula", fields.cedula.value),
        apellidos: normalizeValue("apellidos", fields.apellidos.value),
        nombres: normalizeValue("nombres", fields.nombres.value),
        direccion: normalizeValue("direccion", fields.direccion.value),
        telefono: normalizeValue("telefono", fields.telefono.value),
        correo: normalizeValue("correo", fields.correo.value),
        facultad: normalizeValue("facultad", fields.facultad.value),
        nivel: normalizeValue("nivel", fields.nivel.value),
        paralelo: normalizeValue("paralelo", fields.paralelo.value)
    };
}

function createId() {
    if (window.crypto && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `student-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function resetForm() {
    form.reset();
    fields.studentId.value = "";
    saveButton.textContent = "Guardar estudiante";

    document.querySelectorAll(".field").forEach((fieldBox) => {
        fieldBox.classList.remove("valid", "invalid");
    });

    document.querySelectorAll(".error").forEach((errorBox) => {
        errorBox.textContent = "";
    });
}

function renderStudents() {
    tableBody.innerHTML = "";
    emptyMessage.classList.toggle("hidden", students.length > 0);
    counter.textContent = `${students.length} ${students.length === 1 ? "registro" : "registros"}`;

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.cedula}</td>
            <td>
                <span class="student-name">${student.apellidos} ${student.nombres}</span>
                <span class="muted">${student.direccion}</span>
            </td>
            <td>
                ${student.telefono}
                <span class="muted">${student.correo}</span>
            </td>
            <td>${student.facultad}</td>
            <td>${student.nivel}</td>
            <td>${student.paralelo}</td>
            <td>
                <div class="table-actions">
                    <button type="button" data-action="edit" data-id="${student.id}">Editar</button>
                    <button type="button" class="delete" data-action="delete" data-id="${student.id}">Eliminar</button>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function fillForm(student) {
    fields.studentId.value = student.id;
    fields.cedula.value = student.cedula;
    fields.apellidos.value = student.apellidos;
    fields.nombres.value = student.nombres;
    fields.direccion.value = student.direccion;
    fields.telefono.value = student.telefono;
    fields.correo.value = student.correo;
    fields.facultad.value = student.facultad;
    fields.nivel.value = student.nivel;
    fields.paralelo.value = student.paralelo;
    saveButton.textContent = "Actualizar estudiante";

    Object.keys(patterns).forEach((name) => validateField(name, true));
    window.scrollTo({ top: 0, behavior: "smooth" });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const student = getFormData();
    const existingIndex = students.findIndex((item) => item.id === student.id);

    if (existingIndex >= 0) {
        students[existingIndex] = student;
    } else {
        students.push(student);
    }

    saveStudents();
    renderStudents();
    resetForm();
});

clearButton.addEventListener("click", resetForm);

Object.keys(patterns).forEach((name) => {
    fields[name].addEventListener("input", () => {
        if (name === "cedula") {
            fields[name].value = fields[name].value.replace(/\D/g, "");
        }

        document.getElementById(`${name}Error`).textContent = "";
        validateField(name);
    });

    fields[name].addEventListener("blur", () => validateField(name, true));
});

tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const studentId = button.dataset.id;
    const action = button.dataset.action;
    const selectedStudent = students.find((student) => student.id === studentId);

    if (action === "edit" && selectedStudent) {
        fillForm(selectedStudent);
    }

    if (action === "delete") {
        students = students.filter((student) => student.id !== studentId);
        saveStudents();
        renderStudents();

        if (fields.studentId.value === studentId) {
            resetForm();
        }
    }
});

renderStudents();
