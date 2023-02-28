//create a button for each root resources i.e. people, planets, films etc
function createButtonForEachRootResources(x) {
    initUserInfoMessages()
    array_of_Roots_Global = Object.entries(x)
    console.log(array_of_Roots_Global)
    let keys = Object.keys(x)
    let buttonsString = ""

    keys.forEach((x) => {
        buttonsString += `<button class="list-all-buttons">${x}</button>`
    })
    buttons_ctnr.innerHTML = buttonsString

    const buttons_root = document.querySelectorAll(".list-all-buttons")
    buttons_root.forEach((x) => x.addEventListener("click", listenerAllRootButtons))
}
function listenerAllRootButtons(e) {
        // console.log(e)
        document.querySelectorAll(".list-all-buttons").forEach((x) => x.removeEventListener("click", listenerAllRootButtons))
        initUserInfoMessages()
        let endpoint = base_url + e.target.innerHTML
        fetchAPI(printListResource, endpoint, e.target.innerHTML, "")
}

function printListResource(d, x, keywordInSearch) {
    console.log(d)
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

            if(typeof obj[1] == "string") {                // convert single URL string to hyperlink
                obj[1] = createHyperlinkIfTextIs_an_URL(obj[1]) 
            } else if(obj[1] instanceof Array && obj[1] !== null) {     // if obj[1] is a nested array
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

        if(i+1 == length) {
            //re-attach listener after previous requested content loaded
            document.querySelectorAll(".list-all-buttons").forEach((x) => x.addEventListener("click", listenerAllRootButtons))
        }
    
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
            fetchAPI(printListResource, d.next, x, keywordInSearch)
        })
    } else if(d.next == null && d.previous !== null) {
        prevBtn_ctnr.innerHTML = `<button id="prevBtn"> <<< Previous 10 </button>`
        nextBtn_ctnr.innerHTML = ""
        document.querySelector("#prevBtn").addEventListener("click", () => {
            fetchAPI(printListResource, d.previous, x, keywordInSearch)

        })
    } else if(d.next !== null && d.previous !== null) {
        nextBtn_ctnr.innerHTML = `<button id="nextBtn"> Next 10 >>> </button>`
        prevBtn_ctnr.innerHTML = `<button id="prevBtn"> <<< Previous 10 </button>`
        document.querySelector("#nextBtn").addEventListener("click", () => {
            fetchAPI(printListResource, d.next, x, keywordInSearch)
        })
        document.querySelector("#prevBtn").addEventListener("click", () => {
            fetchAPI(printListResource, d.previous, x, keywordInSearch)
        })
    }
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