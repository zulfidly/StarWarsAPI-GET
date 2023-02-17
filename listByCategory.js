nextBtn_ctnr = document.querySelector("#nextBtn-ctnr")
prevBtn_ctnr = document.querySelector("#prevBtn-ctnr")

function thisIsFunny(x) {
    dataGlobal = x
    console.log(dataGlobal)
}

function checkRootResources() {
    fetch(base_url)
    .then((response) => response.json())
    .then((data) => { createButtonForEachRootResources(data) })
    .catch((error) => printError(error))
}

function createButtonForEachRootResources(x) {
    let keys = Object.keys(x)
    buttons_ctnr.innerHTML = ""
    let buttonsString = ""
    keys.forEach((x) => {
        // console.log(x)
        buttonsString += `<button class="list-all-buttons">${x}</button>`
    })
    buttons_ctnr.innerHTML = buttonsString
    addListenerToListAllButtons()
}
function addListenerToListAllButtons() {
    let buttons = document.querySelectorAll(".list-all-buttons")
    buttons.forEach((x) => x.addEventListener("click", () => {
        displayAllRootResource(x)
    }))
}
function displayAllRootResource(x) {
    initUserInfoMeassages()
    user_msg.innerHTML = "Retrieving..."
    // console.log(x.textContent)
    fetch(base_url + x.textContent)
    .then((response) => response.json())
    .then((data) => printListResource(data, x))
    .catch((error) => printError(error))
}

function printListResource(d, x) {
    // console.log(d)
    // console.log(d.results, d.results.length)
    // console.log(d.next, d.previous, typeof d.previous)

    // console.log(d.next.slice(-1))
    let t = null
    if(d.next == null && d.previous == null) t = 1  
    else if(d.next !== null && d.previous  == null) t = (d.next.slice(-1)*1)-1 
    else if(d.next  == null && d.previous !== null) t = (d.previous.slice(-1)*1)+1 
    else if(d.next !== null && d.previous !== null) t = (d.next.slice(-1)*1)-1 
    

    let currentPageNumber = t
    let multiplier = (currentPageNumber - 1) * 10

    createPrevNextButtonsAccordingly(d, x)

    let array = []
    d.results.forEach((obj) => {
        array.push(Object.entries(obj))
    })
    // console.log(array)
    // search_results.innerHTML = `<li> ${d.count} results found in <span class="root-words">${x.textContent}</span>`
    let length = d.results.length
    let result = ""
    // const results_card_ctnr = document.querySelector(".results-card-ctnr")
    // const results_cards = results_card_ctnr.querySelector(".results-card")
    // const card_infobox = results_cards.querySelector(".card-infobox") 
    for(i=0; i < length; i++) {
        resultBody = ""
        resultHeader = `
        <tr> <th colspan="3"> Viewing ${i+1+multiplier} of ${d.count} in <span class="root-words">${x.textContent}</span>)</th> </tr>
        <tr> <th>#</th> <th>Description</th> <th>Info</th> </tr>
        `
        array[i].forEach((obj, ind) => {
            obj[0] = obj[0].replace(/_/g, " ")  //replace underscores with space
            if(typeof obj[1] == "object" && obj[1] !== null) {     //if obj[1] is another array, spread them with coma
                s = obj[1].toString()
                obj[1] = s.replace(/,/g, ", ")
            }
            resultBody +=  `<tr> <td>${ind+1}</td> <td>${obj[0]}</td> <td>${obj[1]}</td> </tr>`
        })
        result += `<table class="card-table"> ${resultHeader + resultBody} </table>`
        card_infobox.innerHTML = result         
    }
    user_msg.innerHTML = ""

}

function createPrevNextButtonsAccordingly(d, x) {

    if(d.next == null && d.previous == null) {
        prevBtn_ctnr.innerHTML = ""
        nextBtn_ctnr.innerHTML = ""
    } else if(d.next !== null && d.previous == null) {
        prevBtn_ctnr.innerHTML = ""
        nextBtn_ctnr.innerHTML = `<button id="nextBtn" class="">Next Page >></button>`
        document.querySelector("#nextBtn").addEventListener("click", () => {
            goNextPage(d.next, x)
        })
    } else if(d.next == null && d.previous !== null) {
        prevBtn_ctnr.innerHTML = `<button id="prevBtn" class=""><< Previous Page</button>`
        nextBtn_ctnr.innerHTML = ""
        document.querySelector("#prevBtn").addEventListener("click", () => {
            goPrevPage(d.previous, x)
        })
    } else if(d.next !== null && d.previous !== null) {
        nextBtn_ctnr.innerHTML = `<button id="nextBtn" class="">Next Page >></button>`
        prevBtn_ctnr.innerHTML = `<button id="prevBtn" class=""><< Previous Page</button>`
        // navBtn_ctnr.innerHTML = `<button id="prevBtn" class="">Previous Page</button> <button id="nextBtn" class="">Next Page</button>`
        document.querySelector("#nextBtn").addEventListener("click", () => {
            goNextPage(d.next, x)
        })
        document.querySelector("#prevBtn").addEventListener("click", () => {
            goPrevPage(d.previous, x)
        })
    }
}

function goNextPage(n, x) {
    user_msg.innerHTML = "Retrieving..."

    fetch(n)
    .then((response) => response.json())
    .then((data) => { printListResource(data, x) })
    .catch((error) => printError(error))
}
function goPrevPage(n, x) {
    user_msg.innerHTML = "Retrieving..."

    fetch(n)
    .then((response) => response.json())
    .then((data) => { printListResource(data, x) })
    .catch((error) => printError(error))
}

function initUserInfoMeassages() {
    user_msg.innerHTML = ""
    search_results.innerHTML = ""
    card_infobox.innerHTML = ""
    prevBtn_ctnr.innerHTML = ""
    nextBtn_ctnr.innerHTML = ""
}