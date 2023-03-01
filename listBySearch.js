//fetch API practice
window.addEventListener("load", () => {
    fetchAPI(createButtonForEachRootResources, base_url)
    search.addEventListener("click", listenerSearchButton)
    inputField.addEventListener("input", () => {    inputField.classList.remove("highlight");   })
    pasteToInputField.forEach(n => n.addEventListener("click", () => {
        inputField.value = n.textContent;
    }))
})
function fetchAPI(fu, api_endpoint, objData, userInput) {
    printUserMessage(retrievingMessage())
    fetch(api_endpoint)
    .then((response) => response.json())
    .then((data) => fu(data, objData, userInput) )
    .catch((error) => fetchAPI_Error(error))
}

function listenerSearchButton(e) {
    e.preventDefault()

    if(isData_Retrieving_inProgress == false) {
        if(inputField.value == "") {
            inputField.focus();
            inputField.classList.add("highlight");
        } 
        else if(inputField.value !== "") {
            isData_Retrieving_inProgress = true
            inputField.classList.remove("highlight");
            initUserInfoMessages()
            currentUserInput = inputField.value
            const searchStr = "?search=" + currentUserInput
            array_of_Roots_Global.forEach((obj, ind) => {
                let rootResource = obj[0]
                let str = obj[1] + searchStr
                fetchAPI(displaySearchResultSummary, str, rootResource)
            })
            inputForm.reset();
        }
    } else if(isData_Retrieving_inProgress == true) {
        console.log("pineapple")
    }
}

function displaySearchResultSummary(d, r) {
    if(d.count == 0) {
        search_results.innerHTML += `<li> ${d.count} results found for <em>" ${currentUserInput} "</em> in <span class="root-words-without-results">${r}</span> </li>`
    } else {
        search_results.innerHTML += `<li class="underline-when-hovered"> <b> ${d.count} results found for <em>" ${currentUserInput} "</em> in <button class="root-words-with-results">${r}</button> </b> &nbsp <img class="tapIcon" src="./tap.png" /> </li>`
    }

    let buttons = document.querySelectorAll(".root-words-with-results")
    buttons.forEach((x) => x.addEventListener("click", addListenerToAllRootWordSearchedWithResult))
    
    if(search_results.childElementCount == array_of_Roots_Global.length) {
        printUserMessage("")
        isData_Retrieving_inProgress = false
    }
}

function addListenerToAllRootWordSearchedWithResult(e) {
    if(isData_Retrieving_inProgress == false) {
        isData_Retrieving_inProgress = true
        let endpoint = base_url + e.target.innerHTML + "/?search=" + currentUserInput
        console.log(endpoint)
        fetchAPI(printListResource, endpoint, e.target.innerHTML, `for "<em>${currentUserInput}</em>"`)
    } else if(isData_Retrieving_inProgress == true) {
        console.log("pineapple")
    }
}

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

        <p class="retrieving">&nbsp; &nbsp; Retrieving &nbsp; &nbsp;</p>

        <div class="dot3-animation-ctnr">
            <div class="dot3"></div>
        </div>
    `
}




