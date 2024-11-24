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
    }

    stavke.push(stavka);
    /*addToLocalStorage(stavke);*/
    inputPolje.value = "";
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

        li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>${elementNiza.sadrzaj}<button class="deleteDugme">🗑️</button>`;
        listaZadataka.append(li);
    })
}