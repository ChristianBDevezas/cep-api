const form = document.querySelector("form");
const inputField = document.getElementById("cep");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalCep = document.querySelector(".modal__top__cep");
const modalBairro = document.querySelector(".modal__middle__district--info");
const modalCidadeEstado = document.querySelector(".modal__middle__state--info");
const modalLogradouro = document.querySelector(".modal__middle__street--info");
const modalInfoCompleta = document.querySelector(".modal__footer__info");
let modalTimeout;

function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");

    clearTimeout(modalTimeout);
};

function displayDataValues(viaCepUrl) {
    fetch(viaCepUrl)
    .then((response) => {
        if(!response.ok) throw new Error('Erro na resposta da rede');
        return response.json();
    })
    .then((data) => {
        if(data.erro) {
            alert('CEP não encontrado.');
            console.log('ViaCEP: CEP não encontrado', data);
            return;
        }

        console.log('CEP DATA:', data);

        const dataCep = data.cep;
        const dataBairro = data.bairro;
        const dataCidade = data.localidade;
        const dataEstado = data.estado;
        const dataLogradouro = data.logradouro;

        // insere os dados no modal
        modalCep.innerHTML = `CEP: ${dataCep}`;
        modalBairro.innerHTML = `${dataBairro}`;
        modalCidadeEstado.innerHTML = `${dataCidade} - ${dataEstado}`;
        modalLogradouro.innerHTML = `${dataLogradouro}`;
        modalInfoCompleta.innerHTML = `${dataLogradouro}, ${dataBairro}, ${dataCidade} - ${dataEstado}, ${dataCep}`;

        // mostra o modal
        modal.classList.add("show");
        modal.classList.remove("hide");

        // reseta o timer do modal
        clearTimeout(modalTimeout);
        modalTimeout = setTimeout(closeModal, 20000);
    })
    .catch((err) => {
        console.error('Erro ao consultar ViaCEP:', err);
        alert('Erro ao buscar CEP!');
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const inputFieldValue = inputField.value;

    if(inputFieldValue.length < 8) {
        alert("Campo deve ser preenchido com o CEP!");
    }
    else {
        const cep = inputFieldValue.replace(/\D/g, "");
        const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;

        displayDataValues(viaCepUrl);
    }
});

modalClose.addEventListener("click", closeModal);