window.onload = load;
const API_ADDRESS = "https://free.currencyconverterapi.com/api/v5/";

function load(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let keys = Object.keys(JSON.parse(this.responseText).results);
            let selectFrom = document.getElementById("inCurrency");
            let selectTo = document.getElementById("outCurrency");
            for(let currency of keys){
                let option = document.createElement("option");
                option.text = currency;
                selectFrom.add(option);
            }
            for(let currency of keys){
                let option = document.createElement("option");
                option.text = currency;
                selectTo.add(option);
            }
        }
    };
    let request = API_ADDRESS + "currencies";
    xhttp.open("GET", request, true);
    xhttp.send();
}

function check() {
    if (checkFields()) {
        let xhttp = new XMLHttpRequest();
        let inCurrency = document.getElementById("inCurrency").value;
        let outCurrency = document.getElementById("outCurrency").value;
        let inAmount = document.getElementById("inAmount").value;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200)
                document.getElementById("outAmount").value = inAmount * JSON.parse(this.responseText)[inCurrency + "_" + outCurrency];
        };
        let request = API_ADDRESS + "convert?q=" + inCurrency + "_" + outCurrency + "&compact=ultra";
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

function checkFields() {
    let inCurrency = document.getElementById("inCurrency").value;
    let outCurrency = document.getElementById("outCurrency").value;
    let inAmount = document.getElementById("inAmount").value;
    return (inAmount >= 0) && (!isNaN(inAmount)) && (inCurrency !== "") && (outCurrency !== "");
}