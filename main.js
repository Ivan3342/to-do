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
            id: Date(),
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
    lista.map((elementNiza) => {
        const checked = elementNiza.checked ? 'checked' : null;
        const li = document.createElement("li");
        li.classList.add("item");
        li.id = elementNiza.id;

        if(elementNiza.checked == true) {
            li.classList.add("checked");
        }
        else {
            if(li.classList.contains("checked")) {
                li.classList.remove("checked");
            }
        }

        li.innerHTML = `<span><input type="checkbox" class="checkbox" ${checked}>${elementNiza.sadrzaj}</span><button class="deleteDugme">🗑️</button>`;
        listaZadataka.appendChild(li);
        if(stavke.length > 0) {
            listaZadataka.style.border = "2px solid var(--davys-gray)";
        }
    })
}

const addToLocalStorage = listaZadataka => {
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

const toggle = id => {
    stavke.map(elementNiza => {
        if(elementNiza.id != id) {
            elementNiza.checked = !elementNiza.checked;
        }
    })

    addToLocalStorage(stavke);
}

const deleteItem = id => {
    stavke = stavke.filter(function(elementNiza) {
        return elementNiza.id != id;
    });

    addToLocalStorage(stavke);
}

getFromLocalStorage();

listaZadataka.addEventListener("click", (event) => {
    if(event.target.type == "checkbox") {
        toggle(event.target.parentElement.getAttribute("id"));
    }

    if(event.target.classList.contains("delete-button")) {
        deleteItem(event.target.parentElement.getAttribute("id"))
    }
})