var currentId = 1;

function btnClick() {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const varsFields = document.getElementById('vars').children
        var vars = []

        for (let i=0; i < varsFields.length; i++) {
            let thisVar = varsFields[i]
            let name = thisVar.getElementsByTagName("input")[0].value
            let values = thisVar.getElementsByTagName("textarea")[0].value.split(',').map(e => e.trim())
            vars.push([name, values])
        }
        
        const emails = document.getElementById("emails").value.split(',').map(e => e.trim())
        const body = document.getElementById("body").value
        const subject = document.getElementById("subject").value

        const dict = {
            vars,
            emails,
            body,
            subject,
        }

        console.log(dict)
        chrome.tabs.sendMessage(tabs[0].id, dict)
    })
}

function addVar() {
    const nameInput = document.createElement('input')
    nameInput.placeholder = "name"

    const nameDiv = document.createElement('div')
    nameDiv.className = "name"
    nameDiv.appendChild(nameInput)


    const valueInput = document.createElement('textarea')
    valueInput.placeholder = "values"

    const valueDiv = document.createElement('div')
    valueDiv.className = "value"
    valueDiv.appendChild(valueInput)


    const deleteBtn = document.createElement('button')
    deleteBtn.className = "delete"
    deleteBtn.innerText = "X"
    deleteBtn.onclick = () => {
        document.getElementById('vars').removeChild(field)
    }

    const field = document.createElement('div')
    field.className = "varField"
    field.id = currentId.toString()
    field.appendChild(nameDiv)
    field.appendChild(valueDiv)
    field.appendChild(deleteBtn)

    document.getElementById('vars').appendChild(field)

    currentId++
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('enviarBtn').addEventListener('click', btnClick)
    document.getElementById('addBtn').addEventListener('click', addVar)
    addVar()
})
