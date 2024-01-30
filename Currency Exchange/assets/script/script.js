const dropList = document.querySelectorAll('form select'),
fromCurrency = document.querySelector('.from select'),
toCurrency = document.querySelector(".to select");
getButton = document.querySelector('form button');

for (let i = 0; i < dropList.length; i++) {
  for(let currency_code in country_list) {
    // Set NZD as the default FROM currency and JPN as TO currency.
    let selected = i == 0 ? currency_code == "NZD" ? "selected" : "" : currency_code == "JPN"
    ? "selected" : "";

    // creating Option tags, passing currency code as text and value
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

    // Inserting option tags inside select tag
    dropList[i].insertAdjacentHTML("beforeend", optionTag);

  }
  dropList[i].addEventListener("change",e => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for(let code in country_list) {
    // If currency code of country list is equal to option value
    if(code == element.value) {
      let imgTag = element.parentElement.querySelector("img")

      // Pass country code of selected currency code into img url for relevent flag
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", ()=> {
  getExchangeRate();
});

getButton.addEventListener("click",e => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector('form .icon');
exchangeIcon.addEventListener("click", ()=> {
  let tempCode = fromCurrency.value; 
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
})

function getExchangeRate(){
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  // If user doesnt enter any value or enters 0 than we'll put 1 by default.
  if(amountVal = "" || amountVal == "0"){
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting Exchange Rate...";
  // API integration details
  let url = `https://v6.exchangerate-api.com/v6/0d1dbec2d35bff56198ba5f1/latest/${fromCurrency.value}`;
  // Fetching api response and returning it with parsing into JS obj
  fetch(url).then(response => response.json()).then(result => {
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
  }).catch(() => {
    exchangeRateTxt.innerText = "Something went wrong";
  });
}