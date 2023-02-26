//create a button for each root resources i.e. people, planets, films etc
function createButtonForEachRootResources(x) {
    initUserInfoMessages()

    let keys = Object.keys(x)
    let buttonsString = ""

    keys.forEach((x) => {
        // console.log(x)
        buttonsString += `<button class="list-all-buttons">${x}</button>`
    })
    buttons_ctnr.innerHTML = buttonsString
    addListenerToAllRootButtons()
}
function addListenerToAllRootButtons() {
    let buttons = document.querySelectorAll(".list-all-buttons")
    buttons.forEach((x) => x.addEventListener("click", (e) => {
        initUserInfoMessages()
        displayAllRootResource(x.textContent, "", "", "")
    }))
}


function printListResource(d, x, keywordInSearch) {
    console.log(d)
    // console.log(d.results, d.results.length)
    // console.log(d.next, d.previous, typeof d.previous)
    let t = null
    if(d.next == null && d.previous == null) t = 1  
    else if(d.next !== null && d.previous  == null) t = (d.next.slice(-1)*1)-1 
    else if(d.next  == null && d.previous !== null) t = (d.previous.slice(-1)*1)+1 
    else if(d.next !== null && d.previous !== null) t = (d.next.slice(-1)*1)-1 
    
    let currentPageNumber = t
    let pageAdjuster = (currentPageNumber - 1) * 10

    createPrevNextButtonsAccordingly(d, x, keywordInSearch)

    let array = []
    d.results.forEach((obj) => {
        array.push(Object.entries(obj))
    })
    console.log(array)
    let length = d.results.length
    let result = ""
    for(i=0; i < length; i++) {
        resultBody = ""
        resultHeader = `
        <tr> <th colspan="3"> Viewing ${i+1+pageAdjuster} of ${d.count} ${keywordInSearch} in <span class="root-words-without-results">${x}</span></th> </tr>
        <tr> <th>#</th> <th>Description</th> <th>Info</th> </tr>
        `
        //structure each table contents
        array[i].forEach((obj, ind) => {
            obj[0] = obj[0].replace(/_/g, " ")  //replace underscores with space

            if( typeof obj[1] == "string") {                // convert single URL string to hyperlink
                obj[1] = createHyperlinkIfTextIs_an_URL(obj[1]) 
            } else if(obj[1] instanceof Array && obj[1] !== null) {     // if obj[1] is a nested array, insert space after comma
                s = obj[1].toString()
                let arr = s.split(",")      // structure each text link into an index in one array
                let x = ""
                arr.forEach((obj, ind) => {
                    x += createHyperlinkIfTextIs_an_URL(arr[ind])
                })
                obj[1] = x
            } 
            resultBody +=  `<tr> <td>${ind+1}</td> <td>${obj[0]}</td> <td>${obj[1]}</td> </tr>`
        })
        result += `<table> ${resultHeader + resultBody} </table>`
        card_infobox.innerHTML = result 
    }
    printUserMessage("")
}
function createHyperlinkIfTextIs_an_URL(string) {
    if(string.startsWith('http')) {
        return `<a href="${string}" target="_blank"> ${string} </a>`
    }
    return string
}

function createPrevNextButtonsAccordingly(d, x, keywordInSearch) {
    if(d.next == null && d.previous == null) {
        prevBtn_ctnr.innerHTML = ""
        nextBtn_ctnr.innerHTML = ""
    } else if(d.next !== null && d.previous == null) {
        prevBtn_ctnr.innerHTML = ""
        nextBtn_ctnr.innerHTML = `<button id="nextBtn"> Next 10 >>> </button>`
        document.querySelector("#nextBtn").addEventListener("click", () => {
            goToUserChosenPage(d.next, x, keywordInSearch)
        })
    } else if(d.next == null && d.previous !== null) {
        prevBtn_ctnr.innerHTML = `<button id="prevBtn"> <<< Previous 10 </button>`
        nextBtn_ctnr.innerHTML = ""
        document.querySelector("#prevBtn").addEventListener("click", () => {
            goToUserChosenPage(d.previous, x, keywordInSearch)
        })
    } else if(d.next !== null && d.previous !== null) {
        nextBtn_ctnr.innerHTML = `<button id="nextBtn"> Next 10 >>> </button>`
        prevBtn_ctnr.innerHTML = `<button id="prevBtn"> <<< Previous 10 </button>`
        document.querySelector("#nextBtn").addEventListener("click", () => {
            goToUserChosenPage(d.next, x, keywordInSearch)
        })
        document.querySelector("#prevBtn").addEventListener("click", () => {
            goToUserChosenPage(d.previous, x, keywordInSearch)
        })
    }
}

function goToUserChosenPage(n, x, keywordInSearch) {
    printUserMessage(retrievingMessage())
    fetch(n)
    .then((response) => response.json())
    .then((data) => { printListResource(data, x, keywordInSearch) })
    .catch((error) => fetchAPIError(error))
}

function initUserInfoMessages() {
    user_msg.innerHTML = ""
    search_results.innerHTML = ""
    card_infobox.innerHTML = ""
    prevBtn_ctnr.innerHTML = ""
    nextBtn_ctnr.innerHTML = ""
}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {  scrollFunction()    };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}