let cargarDatos = () => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            let escritores = xml.getElementsByTagName('escritor')
            for (let escritor of escritores) {
                let id = escritor.querySelector('id').textContent
                let nombre  = escritor.querySelector('nombre').textContent
                
                let plantilla = `<option value="${id}">${nombre}</option>`
                document.querySelector('select').innerHTML += plantilla
            }
        })
        .catch(console.error);
}

let mostrarDatos = (index,text) => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
        .then(response => response.text())
        .then(data => {
            for (let datos in data['frases']){
                if (datos['id_autor']==Number(index)) {
                    let plantilla = 
                    `<div class="col-lg-3">
                        <div class="test-inner">
                            <div class="test-author-thumb d-flex">
                                <div class="test-author-info">
                                    <h4>${text}</h4>
                                </div>
                            </div>
                            <span>${datos['texto']}</span>
                            <i class="fa fa-quote-right"></i>
                        </div>
                    </div>`
                    document.getElementsById('frases').innerHTML += plantilla 
                }
            }
        })
        .catch(console.error);
}

window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
})

document.querySelector('select').addEventListener('change', (event)=>{
    let select = document.querySelector('div.input-group > select')
    let index = select.options[select.selectedIndex].value
    let text = select.options[select.selectedIndex].text
    mostrarDatos(index,text)
    document.getElementsById('frases').innerHTML = "" 

})