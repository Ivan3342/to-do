const inputForm = document.getElementById("inputForm");
const inputPolje = document.getElementById("inputPolje");
const inputSlanje = document.getElementById("inputSlanje");
const listaZadataka = document.getElementById("itemi");

let stavke = [];

inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    dodaj(inputPolje.value);
})

const dodaj = (tekst) => {
    if(tekst !== "") {
        const stavka = {
            id: Date.now(),
            sadrzaj: tekst,
            checked: false
        }
        stavke.push(stavka);
        addToLocalStorage(stavke);
        inputPolje.value = "";
    }
}

const renderList = (lista) => {
    listaZadataka.innerHTML = "";
    lista.forEach((elementNiza) => {
        const cekiran = elementNiza.checked ? 'checked' : '';
        const li = document.createElement("li");
        li.classList.add("item");
        li.id = elementNiza.id;
        const span = document.createElement("span");
        span.id = "sadrzajItema";
        if (elementNiza.checked) {
            span.classList.add("checked");
        }
        span.innerHTML = `
            <input type="checkbox" class="checkbox" ${cekiran} data-id="${elementNiza.id}">
            ${elementNiza.sadrzaj}
        `;
        li.appendChild(span);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteDugme");
        deleteButton.innerHTML = "🗑️";
        li.appendChild(deleteButton);

        listaZadataka.appendChild(li);
    });
    if (lista.length === 0) {
        listaZadataka.style.border = "none";
    } else {
        listaZadataka.style.border = "2px solid var(--davys-gray)";
    }
}

const addToLocalStorage = (listaZadataka) => {
    localStorage.setItem('todos', JSON.stringify(listaZadataka));
    renderList(listaZadataka);
}

const getFromLocalStorage = () => {
    const reference = localStorage.getItem('todos');

    if(reference) {
        stavke = JSON.parse(reference);
        renderList(stavke);
    }
}

const toggle = (id) => {
    stavke = stavke.map(element => {
        if (element.id == id) {
            element.checked = !element.checked;
        }
        return element;
    });

    addToLocalStorage(stavke);
}

const deleteItem = id => {
    stavke = stavke.filter(function(elementNiza) {
        return elementNiza.id != id;
    });

    addToLocalStorage(stavke);

    if (stavke.length === 0) {
        listaZadataka.style.border = "none";
    }
}

getFromLocalStorage();

listaZadataka.addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
        const taskId = event.target.getAttribute("data-id");
        toggle(taskId);
    }

    if (event.target.classList.contains("deleteDugme")) {
        const taskId = event.target.parentElement.getAttribute("id");
        deleteItem(taskId);
    }
});
