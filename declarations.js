const root = document.querySelector(":root")
const search_results = document.querySelector("#search-results")
const buttons_ctnr = document.querySelector("#list-all-root-resource-btn-ctnr")

const search = document.querySelector(".searchButton")
const inputField = document.querySelector(".inputField")
const inputForm = document.querySelector(".inputForm")
const pasteToInputField = document.querySelectorAll(".pasteToInputField")
const base_url = "https://swapi.dev/api/"
let scrollTopBtn = document.getElementById("scrollTopBtn");

const results_card_ctnr = document.querySelector(".results-card-ctnr")
const results_cards = results_card_ctnr.querySelector(".results-card")
const card_infobox = results_cards.querySelector(".card-infobox") 

let user_msg = document.querySelector("#user-msg")

const nextBtn_ctnr = document.querySelector("#nextBtn-ctnr")
const prevBtn_ctnr = document.querySelector("#prevBtn-ctnr")

let currentUserInput = ""
let array_of_Roots_Global = []


