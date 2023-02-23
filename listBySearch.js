//fetch API practice
window.addEventListener("load", () => {
    checkRootResources()
})
let currentUserInput = ""
search.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".card-infobox").innerHTML = ""
    prevBtn_ctnr.innerHTML = ""
    nextBtn_ctnr.innerHTML = ""

    if(inputField.value == "") {
        search_results.innerHTML = ""
        inputField.focus();
        inputField.classList.add("highlight");
    } else {
        user_msg.innerHTML = retrievingMessage()
        inputField.classList.remove("highlight");
        currentUserInput = inputField.value
        searchRootResource(inputField.value);
        inputForm.reset();
        search_results.innerHTML = ""
    }
})

function searchRootResource(userInput) {
    fetch(base_url)
    .then((response) => response.json())
    .then((data) => wholeSearchAPI(data, userInput))
    .catch((error) => fetchAPIError(error))
}
function wholeSearchAPI(x, userInput) {
    const searchStr = "?search=" + userInput
    let arr = Object.entries(x)
    console.log(arr)
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

function fetchAPI(rootResource, string) {
    fetch(string)
    .then((response) => response.json())
    .then((data) => displaySearchResultInfo(rootResource, data))
    .catch((error) => fetchAPIError(error)) 
}

function displaySearchResultInfo(r, d) {
    if(d.count == 0) {
        search_results.innerHTML += `<li> ${d.count} results found in <span class="root-words">${r}</span> for "${currentUserInput}" </li>`
    } else {
        search_results.innerHTML += `<li> <b> ${d.count} results found in <span class="root-words">${r}</span> for "${currentUserInput}" </b> </li>`
        // console.log(r, d.count)
        let resultsPerRoot = d.count
        let ww = d.results
        let array = []
        let resultHeader = ""
        let resultBody = ""
        let result = card_infobox.innerHTML
    
        ww.forEach((obj, ind) => {
            array.push(Object.entries(obj))
        })
    
        for(i=0; i < resultsPerRoot; i++) {
            resultBody = ""
            resultHeader = `
            <tr> <th colspan="3"> Result ${i+1} of ${resultsPerRoot} found in <span class="root-words">${r}</span> </th> </tr>
            <tr> <th>#</th> <th>Description</th> <th>Info</th> </tr>
            `
            array[i].forEach((obj, ind) => {
                obj[0] = obj[0].replace(/_/g, " ")  //replace underscores with space
                if(typeof obj[1] == "object" && obj[1] !== null) {     
                    s = obj[1].toString()
                    obj[1] = s.replace(/,/g, ", ")      //if obj[1] is another array, insert space after comma
                }
                resultBody +=  `<tr> <td>${ind+1}</td> <td>${obj[0]}</td> <td>${obj[1]}</td> </tr>`
            })
            result += `<table style="background-color:${bgColorSelector(i)}"> ${resultHeader + resultBody} </table>`
        }
        card_infobox.innerHTML = result 
    }
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






