function treat(text, varsList, index) {
    varsList = varsList.map(el => [el[0], el[1][index % el.length]])
    for (couple of varsList) {
        text = text.replace(`{${couple[0]}}`, couple[1])
    }
    return text
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.runtime.onMessage.addListener(async request => {
    console.log(request)
    for (let i=0; i<request.emails.length; i++) {

        // Write new e-mail
        document.evaluate(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[1]/div[1]/div/div/div/div[1]/div/div",
            document,
        ).iterateNext().click()

        await sleep(1500)

        // Write data
        document.querySelector("textarea.vO").innerText = request.emails[i] + '\n'
        document.querySelector("div.fX").setAttribute("style", "max-height: 258px;")
        document.querySelector("input.aoT").value = request.subject
        document.querySelector("div.Am").innerText = treat(request.body, request.vars, i)
        
        await sleep(300)

        document.querySelector("div.aoO").click()

        await sleep(2000)
    }
})