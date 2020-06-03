const searchButton = document.querySelector("#page-home main a") //botão de busca
const modal = document.querySelector("#modal") //parte da page modal
const close = document.querySelector("#modal .header a") //botão de fechar

//quando clickar no botão de busca remove a class e page-modal aparece
searchButton.addEventListener("click", () => {
    modal.classList.remove("hide")
})

// quando clickar no botão de fechar na page-modal aplica a class e a page some
close.addEventListener("click", () => {
    modal.classList.add("hide")
})