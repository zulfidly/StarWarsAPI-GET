//fetch API practice
window.addEventListener("load", () => {
    fetchAPI(createButtonForEachRootResources, base_url)
})
function fetchAPI(fu, api_endpoint, objData, userInput) {
    printUserMessage(retrievingMessage())
    fetch(api_endpoint)
    .then((response) => response.json())
    .then((data) => fu(data, objData, userInput) )
    .catch((error) => fetchAPI_Error(error))
}

search.addEventListener("click", (e) => {
    e.preventDefault()
    initUserInfoMessages()
    document.querySelectorAll(".list-all-buttons").forEach((x) => x.removeEventListener("click", listenerAllRootButtons))

    if(inputField.value == "") {
        inputField.focus();
        inputField.classList.add("highlight");
    } else {
        inputField.classList.remove("highlight");

        currentUserInput = inputField.value
        const searchStr = "?search=" + currentUserInput

        array_of_Roots_Global.forEach((obj, ind) => {
            let rootResource = obj[0]
            let str = obj[1] + searchStr
            fetchAPI(displaySearchResultSummary, str, rootResource)
        })
        inputForm.reset();
    }
})

function displaySearchResultSummary(d, r) {
    if(d.count == 0) {
        search_results.innerHTML += `<li> ${d.count} results found for <em>" ${currentUserInput} "</em> <span class="root-words-without-results">${r}</span> </li>`
    } else {
        search_results.innerHTML += `<li class="underline-when-hovered"> <b> ${d.count} results found for <em>" ${currentUserInput} "</em> in <button class="root-words-with-results">${r}</button> </b> &nbsp <img class="tapIcon" src="./tap.png"> </li>`
    }
    addListenerToAllRootWordSearchedWithResult()
    if(search_results.childElementCount == array_of_Roots_Global.length) {
        printUserMessage("")
        document.querySelectorAll(".list-all-buttons").forEach((x) => x.addEventListener("click", listenerAllRootButtons))
    }
}

function addListenerToAllRootWordSearchedWithResult() {
    let buttons = document.querySelectorAll(".root-words-with-results")

    buttons.forEach((x) => x.addEventListener("click", (e) => {
        console.log(x.textContent, currentUserInput)
        let endpoint = base_url + x.textContent + "/?search=" + currentUserInput
        console.log(endpoint)
        fetchAPI(printListResource, endpoint, x.textContent, `for "<em>${currentUserInput}</em>"`)
    }))
}

pasteToInputField.forEach(n => n.addEventListener("click", () => {
    inputField.value = n.textContent;
}))

function fetchAPI_Error(error) {
    printUserMessage(`
    -Reload browser or try again- <br>
    ${error}
    `)
}

function initUserInfoMessages() {
    user_msg.innerHTML = ""
    search_results.innerHTML = ""
    card_infobox.innerHTML = ""
    prevBtn_ctnr.innerHTML = ""
    nextBtn_ctnr.innerHTML = ""
}
function printUserMessage(inputString) {
    user_msg.innerHTML = inputString
}
function retrievingMessage() {
    return `
    <div class="dot3-animation-ctnr">
        <div class="dot3"></div>
    </div>

    <p>&nbsp &nbsp Retrieving &nbsp &nbsp</p>
    
    <div class="dot3-animation-ctnr">
        <div class="dot3"></div>
    </div>
    `
}




