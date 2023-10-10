"use strict";
let counters = JSON.parse(localStorage.getItem("counters")) || {};

const sectionForConstructor = document.querySelector("section");
const sectionParent = document.querySelector(".items");
const getPageName = document.querySelector("title").textContent;

import {nekiss} from "./itemsForShop.js";
const nekis = JSON.parse(localStorage.getItem("productList")) || nekiss;
saveNekis();
// заполнение страницы товарами из базы данных
switch(getPageName){
    case "candies":{
        addNewProduct(nekis.candies);
        break;
    }
    case "phones":{
        addNewProduct(nekis.phones);
        break;
    }
    case "towels":{
        addNewProduct(nekis.towels);
        break;
    }
    case "pants":{
        addNewProduct(nekis.pants);
        break;
    }
}

function addNewProduct(obj){
    sectionParent.innerHTML = "";
    for(let item in obj){
        if(typeof(obj[item]) == "object"){
            const clone = sectionForConstructor.cloneNode(true);
            clone.querySelector("h3").textContent = obj[item].title;
            clone.querySelector("img").src = obj[item].img;
            clone.querySelector("p").textContent = obj[item].price;
            clone.querySelector("h4").textContent = "КУПИТЬ";
            clone.style.display = "block"
            sectionParent.appendChild(clone)
        }
    }
}



//добавление в корзину купленных товаров


function restartProductCart(){
    const productBuyButtonElements = document.querySelectorAll("section h4");
    productBuyButtonElements.forEach(function(item) {
        item.addEventListener("click", function(event) {
            let target = event.target;
            if (target.tagName === "H4") {
                let h4 = target.parentElement;
                h4 = h4.parentElement;
                h4 = h4.parentElement;
                h4 = h4.parentElement;
                h4 = h4.parentElement; // не смешная шутка
                let parentTag = h4;
                h4 = parentTag.querySelector("h3");
                let itemText = h4.textContent;
    
                let price = parentTag.querySelector("p");
                let itemPrice = price.textContent;
    
                const image = parentTag.querySelector("img");
                const itemImage = image.getAttribute("src");
                
                target.textContent = "В корзине!"
    
    
                counters[itemText] = {
                    count: ((counters[itemText] && counters[itemText].count) || 0) + 1,
                    price: itemPrice,
                    image: itemImage,
                };
    
    
                localStorage.setItem("counters", JSON.stringify(counters));
            }
        });
    });
}
restartProductCart()

// функция поиска

const findInput = document.querySelector(".inputFind");
const findInputResult = document.querySelector(".divForInput");
findInput.oninput = function() {
    const sectionForInput = document.querySelectorAll("section");
    findInputResult.innerHTML = "";
    findInputResult.style.display = "flex";
    sectionForInput.forEach(function(item){
        for(let i = 0; item.querySelector("H3").textContent.toLowerCase().includes(findInput.value.toLowerCase()) && i < 1; i++){
            const clone = item.cloneNode(true);
            findInputResult.appendChild(clone);
            restartProductCart();
        }
    })
    if(findInput.value == ""){
        findInputResult.style.display = "none"
        findInputResult.textContent = ""
    }
}

const productSections = document.querySelectorAll("section");

productSections.forEach(section => {
    const deleteButton = section.querySelector(".deleteThatElement");
    deleteButton.addEventListener("click", () => {
        const deleteButtonParent = deleteButton.parentElement;
        for(let item in nekis){
            for(let prop in nekis[item]){
                if(nekis[item][prop].title == deleteButtonParent.querySelector("h3").textContent){
                    delete(nekis[item][prop])
                    saveNekis()
                }
            }
        }
        section.remove();

    });
});

function saveNekis(){
    localStorage.setItem("productList", JSON.stringify(nekis));
}

