//fetch API practice
window.addEventListener("load", () => {
    checkRootResources()
})
function checkRootResources() {
    printUserMessage(retrievingMessage())
    fetch(base_url)
    .then((response) => response.json())
    .then((data) => { createButtonForEachRootResources(data) })
    .catch((error) => fetchAPIError(error))
}

search.addEventListener("click", (e) => {
    e.preventDefault()
    initUserInfoMessages()

    if(inputField.value == "") {
        inputField.focus();
        inputField.classList.add("highlight");
    } else {
        user_msg.innerHTML = retrievingMessage()
        inputField.classList.remove("highlight");
        currentUserInput = inputField.value
        searchRootResource(currentUserInput);
        inputForm.reset();
    }
})

function searchRootResource(userInput) {
    fetch(base_url)
    .then((response) => response.json())
    .then((data) => wholeSearchAPI(data, userInput))
    .catch((error) => fetchAPIError(error))
}
function fetchAPI(rootResource, string) {
    fetch(string)
    .then((response) => response.json())
    .then((data) => displaySearchResultInfo(rootResource, data))
    .catch((error) => fetchAPIError(error)) 
}

function wholeSearchAPI(x, userInput) {
    const searchStr = "?search=" + userInput
    initUserInfoMessages()
    let arr = Object.entries(x)
    // console.log(arr)
    // console.log(Object.entries(x))
    // console.log(Object.entries(x).length)
    
    arr.forEach((obj, ind) => {
        // console.log(obj[1])
        let rootResource = obj[0]
        let str = obj[1] + searchStr
        fetchAPI(rootResource, str)

        if(ind == arr.length - 1) {
            printUserMessage("")
        } else {
            printUserMessage(retrievingMessage())
        }
    })
}

function displaySearchResultInfo(r, d) {
    if(d.count == 0) {
        search_results.innerHTML += `<li> ${d.count} results found for <em>"${currentUserInput}"</em> <span class="root-words-without-results">${r}</span> </li>`
    } else {
        search_results.innerHTML += `<li class="underline-when-hovered"> <b> ${d.count} results found for <em>"${currentUserInput}"</em> in <span class="root-words-with-results">${r}</span> </b> &nbsp <img class="tapIcon" src="./tap.png"> </li>`
        // console.log(r, d)
        let resultsPerRoot = d.count
        let ww = d.results
        let array = []
        let resultHeader = ""
        let resultBody = ""
        let result = card_infobox.innerHTML
    
        ww.forEach((obj, ind) => {
            array.push(Object.entries(obj))
        })
        card_infobox.innerHTML = result 
    }
    addListenerToAllRootWordSearchedWithResult()
}

function addListenerToAllRootWordSearchedWithResult() {
    let buttons = document.querySelectorAll(".root-words-with-results")
    buttons.forEach((x) => x.addEventListener("click", (e) => {
        console.log(x.textContent, currentUserInput)
        console.log(e)
        displayAllRootResource(x.textContent, "/?search=", currentUserInput, `for "<em>${currentUserInput}</em>"`)
    }))
}
function displayAllRootResource(x ,y ,z, keywordInSearch) {
    printUserMessage(retrievingMessage())

    fetch(base_url + x + y + z)
    .then((response) => response.json())
    .then((data) => printListResource(data, x, keywordInSearch))
    .catch((error) => fetchAPIError(error))
}

pasteToInputField.forEach(n => n.addEventListener("click", () => {
    inputField.value = n.textContent;
}))

function fetchAPIError(error) {
    printUserMessage(`
    -Reload browser or try again- <br>
    ${error}
    `)
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






