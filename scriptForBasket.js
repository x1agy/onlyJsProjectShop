"use strict";
let iteratorForCountItems = parseInt(localStorage.getItem("itemCount")) || 0;
let counters = JSON.parse(localStorage.getItem("counters")) || {};
const basketList = document.querySelector(".basketList");
const buyButton = document.querySelector(".buyButton");

const findInput = document.querySelector(".inputFind");
const findInputResult = document.querySelector(".divForInput");

// функция поиска
findInput.oninput = function() {
    const sectionForInput = document.querySelectorAll("section");
    findInputResult.innerHTML = "";
    findInputResult.style.display = "flex";
    sectionForInput.forEach(function(item){
        for(let i = 0; item.querySelector("H3").textContent.toLowerCase().includes(findInput.value.toLowerCase()) && i < 1; i++){
            const clone = item.cloneNode(true);
            findInputResult.appendChild(clone);
        }
    })
    if(findInput.value == ""){
        findInputResult.style.display = "none"
        findInputResult.textContent = ""
    }
}

function updateBasket(obj) {
    basketList.innerHTML = '';
    for (let item in obj) {
        basketList.innerHTML += `<section>
                                    <img src="${obj[item].image}">
                                    <h3>${item}</h3>
                                    <h4>${obj[item].price}<h4>
                                    <table>
                                        <tr>
                                            <td><button class="plus" data-item="${item}">+</button><td>
                                            <td><h4>${obj[item].count}<h4><td>  
                                            <td><button class="minus" data-item="${item}">-</button><br><td>
                                        </tr>        
                                    </table>
                                </section>`; 
                                
                        
    }

}

// функция подсчета суммы 
basketList.addEventListener("click", function(event) {
    let target = event.target;
    if (target.classList.contains('plus') || target.classList.contains('minus')) {
        let itemName = target.getAttribute('data-item');
        if (target.classList.contains('plus')) {
            counters[itemName].count++;
        } else if (target.classList.contains('minus') && counters[itemName].count > 0) {
            counters[itemName].count--;
        }
        if (counters[itemName].count == 0){
            delete counters[itemName];
        }

        updateIter();
        localStorage.setItem("counters", JSON.stringify(counters));
        updateBasket(counters);
    }
});


function updateIter() {
    iteratorForCountItems = Object.values(counters).reduce((total, item) => total + item.count, 0);
    localStorage.setItem("itemCount", iteratorForCountItems);
    finalValue()
}
function finalValue(){
    let cost = 0;
    for(let item in counters){
        cost += counters[item].price.slice(0, -1) * counters[item].count;
    }
    let temp = document.querySelector(".finalValue");
    temp.textContent = ""
    temp.textContent += "Финальная стоимость:" + " " + cost + " $";
}
buyButton.addEventListener("click", function(){
    alert("Спасибо за покупку!! Ваши деньги, наши деньги")
})


finalValue()
updateBasket(counters);