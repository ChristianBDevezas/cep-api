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

async function fetchCep(viaCepUrl) {
    const response = await fetch(viaCepUrl);
    console.log(response);
    if(!response.ok) throw new Error('Erro na resposta da rede');

    const data = await response.json();

    return data;
}

async function displayDataValues(viaCepUrl) {
    try {
        const data = await fetchCep(viaCepUrl);

        if(data.erro) {
            alert('CEP não encontrado.');
            console.log('ViaCEP: CEP não encontrado', data);
            return;
        }

        console.log('CEP DATA:', data);        

        const {cep, bairro, localidade, uf, logradouro} = data;

        let modalInfoCompletaText = {
            cep: "",
            bairro: "",
            logradouro: "",
            localidade: "",
            uf: ""
        };

        if(cep.match(/\d{5}-\d{3}/) !== null) {
            modalCep.innerHTML = `CEP: ${cep}`;
            modalInfoCompletaText.cep = cep;
        } else {
            modalCep.innerHTML = "";
        }

        if(bairro.length > 1) {
            modalBairro.innerHTML = `${bairro}`;
            modalInfoCompletaText.bairro = bairro;
        } else {
            modalBairro.innerHTML = "";
        }
        
        if(localidade.length > 2 && uf.match(/[A-Z]{2}/) !== null) {
            modalCidadeEstado.innerHTML = `${localidade} - ${uf}`;
            modalInfoCompletaText.localidade =  localidade;
            modalInfoCompletaText.uf =  uf;
        } else {
            modalCidadeEstado.innerHTML = "";
        }
        
        if(logradouro.length > 2) {
            modalLogradouro.innerHTML = `${logradouro}`;
            modalInfoCompletaText.logradouro = logradouro;
        } else {
            modalLogradouro.innerHTML = "";
        }

        // modalInfoCompleta.innerHTML = `${logradouro}  &nbsp; ${bairro}  &nbsp; ${localidade} - ${uf}  &nbsp; ${cep}`;
        modalInfoCompleta.innerHTML = `${modalInfoCompletaText.logradouro}  &nbsp; ${modalInfoCompletaText.bairro}  &nbsp; ${modalInfoCompletaText.localidade} - ${modalInfoCompletaText.uf}  &nbsp; ${modalInfoCompletaText.cep}`;

        // mostra o modal
        modal.classList.add("show");
        modal.classList.remove("hide");

        // reseta o timer do modal
        clearTimeout(modalTimeout);
        modalTimeout = setTimeout(closeModal, 20000);
    }
    catch(err) {
        console.error('Erro ao consultar ViaCEP:', err);
        alert('Erro ao buscar CEP!');
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const inputFieldValue = inputField.value;

    if(inputFieldValue.replace(/[^0-9]/,"").length < 8) {
        alert("Campo deve ser preenchido com o CEP!");
    }
    else {
        const cep = inputFieldValue.replace(/\D/g, "");
        const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;

        displayDataValues(viaCepUrl);
    }
});

modalClose.addEventListener("click", closeModal);