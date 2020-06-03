//selecionar o select com name uf
const ufSelect = document.querySelector("[name = uf]")

//funçao para popular o select de estado
//registrar a função
function populateUFs() {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"

    fetch(url).then(res => res.json()).then(states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs() //rodando a função

//função para popular as cidades

ufSelect.addEventListener("change", getCities) //quando escolher o estdo aciona a função para pegar as cidades

//função que gera as cidades - o atributo event vem da função eventlistener acima
function getCities(event) {
    const citySelect = document.querySelector("[name = city]")
    const stateInput = document.querySelector("[name = state]")
    const ufId = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios?orderBy=nome`

    //caso o uf selecionada seja a opção selecione o estado
    if (ufId == "") {
        console.log("entrou no if")
        citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
        citySelect.disabled = true
    } else {
        //limpa as options caso tenha selecionado outro estado antes
        citySelect.innerHTML = ""
        fetch(url).then(res => res.json()).then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
        })
        citySelect.disabled = false
    }

    //coloca o texto do estado selecionado
    const indexOfState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfState].text
}