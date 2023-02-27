# [Star Wars API (GET)](https://fidly-sw-api-get.netlify.app/) 

## Description
- this was coded in such a way the nested data's were deconstructed from a single API root [https://swapi.dev/api/](https://swapi.dev/api/)
- uses get().then().catch()
- use of array methods pre-dominantly


### The fetch function was re-factored into a single function (output was retrieved by chain calling multiple functions previously)

```
function fetchAPI(fu, api_endpoint, objData, userInput) {
    printUserMessage(retrievingMessage())
    fetch(api_endpoint)
    .then((response) => response.json())
    .then((data) => fu(data, objData, userInput) )
    .catch((error) => fetchAPI_Error(error))
}
```
