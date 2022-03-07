'use strict';
const basketHtml = document.querySelector(".basket");
document.querySelector(".cartIconWrap").addEventListener("click", e => {
    basketHtml.classList.toggle("hidden");
});

const basket = {};
const badge = document.querySelector(".badge");
const basketTotal = document.querySelector(".basketTotal");
const basketTotalValue = document.querySelector(".basketTotalValue");

function addToCart(id, name, price) {
    if (!basket[id]) {
        basket[id] = { "id": id, "name": name, "price": price, "count": 1 };
    } else {
        basket[id].count++;
    }
    let totalSum = 0;
    let totalCount = 0;
    let basketRows = "";
    Object.values(basket).map(item => {
        totalCount += item.count;
        totalSum += item.price * item.count;
        basketRows += `<div class="basketRow basketItem">
<div>${item.name}</div>
<div>${item.count}</div>
<div>${item.price}</div>
<div>${item.price * item.count}</div>
</div>`;
    });
    badge.textContent = totalCount;
    basketTotalValue.textContent = totalSum;

    document.querySelectorAll(".basketItem").forEach(el => el.remove());

    basketTotal.insertAdjacentHTML("beforebegin", basketRows);
    console.dir(basket);
}

document.querySelector(".featuredItems").addEventListener("click", e => {
    if (!e.target.classList.contains("addToCart")) {
        return;
    }
    const featuredItem = e.target.closest(".featuredItem");
    addToCart(featuredItem.dataset.id,
        featuredItem.dataset.name,
        featuredItem.dataset.price);
});