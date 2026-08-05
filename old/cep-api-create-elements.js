const form = document.querySelector("form");
const inputField = document.getElementById("cep");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
let modalTimeout;

function createModal() {
    // close button
    const modalClose = document.createElement("div");
    modalClose.classList.add("modal__close");

    const iconClose = document.createElement("i");
    iconClose.classList.add("fa-solid", "fa-x");

    modalClose.appendChild(iconClose);
    modal.appendChild(modalClose);

    // article for the top of modal
    const article1 = document.createElement("article");
    article1.classList.add("modal__top", "flex-item");

    const spanTop = document.createElement("span");
    spanTop.classList.add("modal__top__icon");

    const iconLocation1 = document.createElement("i");
    iconLocation1.classList.add("fa-solid", "fa-location-dot");

    spanTop.appendChild(iconLocation1);
    article1.appendChild(spanTop);

    const h2 = document.createElement("h2");
    h2.classList.add("modal__top__cep");
    h2.innerText = "CEP 02180-050";

    article1.appendChild(h2);

    modal.appendChild(article1);

    // close button event
    modalClose.addEventListener("click", closeModal);
}

createModal();

function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");

    clearTimeout(modalTimeout);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const inputFieldValue = inputField.value;

    if(inputFieldValue == "") {
        alert("Campo deve ser preenchido com o CEP!");
    }
    else {
        modal.classList.add("show");
        modal.classList.remove("hide");

        clearTimeout(modalTimeout);
        modalTimeout = setTimeout(closeModal, 7500);
    }
});