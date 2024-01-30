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