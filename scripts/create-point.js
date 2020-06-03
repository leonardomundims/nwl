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

//itens de coleta
const items = document.querySelector("[name = items]") //pegar o input hidenn nma=items
let selectedItems = [] //array para armazenar os itens selecionados
const intensToCollect = document.querySelectorAll(".itens-grid li") //pegar todas as li

//adiciona um event listener em cada li
for (const item of intensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//realiza varias atividade quando clicka no item
function handleSelectedItem(event) {

    //--------- adicionar ou remover classe de uma tag usando JS  --------------- 
    const itemLi = event.target

    itemLi.classList.toggle("selected") //toggle é tipo botão liga/desliga -> se tiver a classe remove, se não tiver adiciona

    //--------- atividades referentes a manipulação do formulario para gerear dados para o back-end -------

    const itemId = itemLi.dataset.id //pega o data-id do item selecionado

    //verificar se já existem itens selecionados
    const alreadySelected = selectedItems.findIndex(item => item == itemId)
        // essa função retorna o index -1 caso não tenha nada dentro do array ou um valor a partir de zero caso exista

    //caso tenha item clickado já esteja dentro do array precisa remover
    if (alreadySelected != -1) {
        const filteredItems = selectedItems.filter(item => item != itemId) //essa função filtra, ou seja, remove o item seleciona caso ele esteja dentro do array 
            //após remover o item atualiza o array
        selectedItems = filteredItems

    } else {
        //caso o item não esteja dentro do array precisa adicionar
        selectedItems.push(itemId) //essa função faz um push, ou seja, empurra para dentro do array o id do item selecionado
    }

    //finalmente adiciona os ids dos itens selecionados ao "value" do input hiden
    items.value = selectedItems
}