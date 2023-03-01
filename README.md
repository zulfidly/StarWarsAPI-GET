# [Star Wars API (GET)](https://fidly-sw-api-get.netlify.app/) 

## Description
- HTML, Vanilla JS + CSS
- this was coded in such a way the nested data's were deconstructed from a single API root [https://swapi.dev/api/](https://swapi.dev/api/)
- uses get().then().catch()
- use of array methods pre-dominantly


#### The fetch function has been re-factored into a single function 
- Data was retrieved by chain calling multiple fetch functions previously, due to its asynchronous nature
```
function fetchAPI(fu, api_endpoint, objData, userInput) {
    printUserMessage(retrievingMessage())
    fetch(api_endpoint)
    .then((response) => response.json())
    .then((data) => fu(data, objData, userInput) )
    .catch((error) => fetchAPI_Error(error))
}
```
#### Modified event listner handler :
```
buttons_root.forEach((x) => x.addEventListener("click", listenerAllRootButtons))
function listenerAllRootButtons(e) {
    initUserInfoMessages()
    let endpoint = base_url + e.target.innerHTML
    fetchAPI(printListResource, endpoint, e.target.innerHTML, "")
}
    document.querySelectorAll(".list-all-buttons").forEach((x) => x.removeEventListener("click", listenerAllRootButtons))
```

#### CSS outline property removed and all clickable elements wrapped with button tag, this is to enable focused element displayed distinctively (i.e. by pressing Tab). 

#### Dark mode added

#### added variable "isData_Retrieving_inProgress" to ensure current user request is first completed before allowing subsequent user request.