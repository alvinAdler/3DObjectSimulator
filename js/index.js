window.addEventListener("keydown", (ev) => {
    const key = document.querySelector(`#button-${ev.key}`)

    if(!key){
        return
    }

    key.style.backgroundColor = "white"
    key.style.color = "#EB4034"
})

window.addEventListener("keyup", (ev) => {

    const key = document.querySelector(`#button-${ev.key}`)

    if(!key){
        return
    }
    
    key.style.backgroundColor = "#EB4034"
    key.style.color = "white"
})