const form = document.querySelector("form");
const inputField = document.getElementById("cep");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
let modalTimeout;

const inputFieldValue = "04182-020";
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
    const dataCep = data.cep;
    const dataLogradouro = data.logradouro;
    const dataCidade = data.localidade;
    const dataEstado = data.estado;
    return [dataCep, dataLogradouro, dataCidade, dataEstado];
})
.then((cepArray) => {
    console.log(cepArray);
    console.log("CEP:"+cepArray[0], "Logradouro:"+cepArray[1], "Cidade:"+cepArray[2], "Estado:"+cepArray[3]);
})
.catch((err) => {
    console.error('Erro ao consultar ViaCEP:', err);
    alert('Erro ao buscar CEP!');
});


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

        // const cep = inputFieldValue.replace(/\D/g, "");
        // const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;

        // fetch(viaCepUrl)
        // .then((response) => {
        //     if(!response.ok) throw new Error('Erro na resposta da rede');
        //     return response.json();
        // })
        // .then((data) => {
        //     if(data.erro) {
        //         alert('CEP não encontrado.');
        //         console.log('ViaCEP: CEP não encontrado', data);
        //         return;
        //     }

        //     console.log('ViaCEP:', data);
        //     // Aqui você pode popular o modal com os dados retornados, se desejar.
        // })
        // .catch((err) => {
        //     console.error('Erro ao consultar ViaCEP:', err);
        //     alert('Erro ao buscar CEP!');
        // });
    }
});

modalClose.addEventListener("click", closeModal);