const convertButton = document.querySelector(".convert-button");
const currencySelectFrom = document.querySelector(".currency-select-from");
const currencySelect = document.querySelector(".currency-select");
const currencyImageFrom = document.getElementById("currency-img-from");
const currencyNameFrom = document.getElementById("currency-name-from");

function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    // Validação: Se o input estiver vazio ou for zero, não faz nada
    if (inputCurrencyValue === "" || inputCurrencyValue == 0) {
        alert("Por favor, digite um valor válido");
        return;
    }

    const valueToConvert = parseFloat(inputCurrencyValue);

    const dolarToday = 5.2;
    const euroToday = 6.2;
    const libraToday = 7.2;
    const bitcoinToday = 300000;

    // 1. Converter o valor de origem para uma base comum (Real)
    let valueInReal;
    if (currencySelectFrom.value == "real") valueInReal = valueToConvert;
    if (currencySelectFrom.value == "dolar") valueInReal = valueToConvert * dolarToday;
    if (currencySelectFrom.value == "euro") valueInReal = valueToConvert * euroToday;
    if (currencySelectFrom.value == "libra") valueInReal = valueToConvert * libraToday;
    if (currencySelectFrom.value == "bitcoin") valueInReal = valueToConvert * bitcoinToday;

    // 2. Formatar o valor de origem (lado esquerdo)
    const formatConfigFrom = {
        "real": ["pt-BR", "BRL"],
        "dolar": ["en-US", "USD"],
        "euro": ["de-DE", "EUR"],
        "libra": ["en-GB", "GBP"]
    };

    if (currencySelectFrom.value === "bitcoin") {
        currencyValueToConvert.innerHTML = `${valueToConvert.toFixed(6)} BTC`;
    } else {
        const [locale, curr] = formatConfigFrom[currencySelectFrom.value];
        currencyValueToConvert.innerHTML = new Intl.NumberFormat(locale, { style: "currency", currency: curr }).format(valueToConvert);
    }

    // 3. Converter da base Real para a moeda de destino (lado direito)
    if (currencySelect.value == "real") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valueInReal);
    } else if (currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(valueInReal / dolarToday);
    } else if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(valueInReal / euroToday);
    } else if (currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(valueInReal / libraToday);
    } else if (currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = `${(valueInReal / bitcoinToday).toFixed(6)} BTC`;
    }
}

// Funções de troca de imagem/nome (Mantenha as suas, estão ótimas!)
function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    const currencies = {
        "real": ["Real", "./assets/real.png"],
        "dolar": ["Dólar Americano", "./assets/dolar.png"],
        "euro": ["Euro", "./assets/euro.png"],
        "libra": ["Libra Esterlina", "./assets/libra.png"],
        "bitcoin": ["Bitcoin", "./assets/bitcoin.png"]
    };

    const [name, img] = currencies[currencySelect.value];
    currencyName.textContent = name;
    currencyImage.src = img;

    convertValues();
}

function changeCurrencyFrom() {
    const currencies = {
        "real": ["Real", "./assets/real.png"],
        "dolar": ["Dólar Americano", "./assets/dolar.png"],
        "euro": ["Euro", "./assets/euro.png"],
        "libra": ["Libra Esterlina", "./assets/libra.png"],
        "bitcoin": ["Bitcoin", "./assets/bitcoin.png"]
    };

    const [name, img] = currencies[currencySelectFrom.value];
    currencyNameFrom.textContent = name;
    currencyImageFrom.src = img;

    convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
currencySelectFrom.addEventListener("change", changeCurrencyFrom);
convertButton.addEventListener("click", convertValues);