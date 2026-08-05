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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const inputFieldValue = inputField.value;

    if(inputFieldValue.length < 9) {
        alert("Campo deve ser preenchido com o CEP!");
    }
    else {
        modal.classList.add("show");
        modal.classList.remove("hide");

        clearTimeout(modalTimeout);
        modalTimeout = setTimeout(closeModal, 20000);

        const cep = inputFieldValue.replace(/\D/g, "");
        const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;

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

            console.log('ViaCEP:', data);
            // preencher o modal com os dados retornados
            const dataCep = data.cep;
            const dataBairro = data.bairro;
            const dataCidade = data.localidade;
            const dataEstado = data.estado;
            const dataLogradouro = data.logradouro;

            modalCep.innerHTML = `CEP: ${dataCep}`;
            modalBairro.innerHTML = `${dataBairro}`;
            modalCidadeEstado.innerHTML = `${dataCidade} - ${dataEstado}`;
            modalLogradouro.innerHTML = `${dataLogradouro}`;
            modalInfoCompleta.innerHTML = `${dataLogradouro}, ${dataBairro}, ${dataCidade} - ${dataEstado}, ${dataCep}`;
        })
        .catch((err) => {
            console.error('Erro ao consultar ViaCEP:', err);
            alert('Erro ao buscar CEP!');
        });
    }
});

modalClose.addEventListener("click", closeModal);