updateStatus("Fetching keys...");
fetch('https://100insure.com/mi/api1.php', {method: 'GET'})
  .then(response => response.json())
  .then(data => convertToInt(data));

const translate = {
    "one" : 1,
    "two" : 2,
    "three" : 3,
    "four" : 4,
    "five" : 5,
    "six" : 6,
    "seven" : 7,
    "eight" : 8,
    "nine" : 9,
    "ten" : 10,
    "eleven" : 11,
    "twelve" : 12,
    "thirteen" : 13,
    "fourteen" : 14,
    "fifteen" : 15,
    "sixteen" : 16,
    "seventeen" : 17,
    "eighteen" : 18,
    "nineteen" : 19,
    "twenty" : 20,
    "thirty" : 30,
    "forty" : 40,
    "fifty" : 50,
    "sixty" : 60,
    "seventy" : 70,
    "eighty" : 80,
    "ninety" : 90,
}

function convertToInt(data){
    updateStatus("Translating keys to integers...");
    document.getElementById("keys-received").innerHTML = data.key1 + " and " + data.key2;
    let key1 = data.key1;
    let key2 = data.key2;
    let key1Translated = 0;
    let key2Translated = 0;

    for( const [key, value] of Object.entries(translate)){
        // key1
        if(key == key1.split('-')[0]){
            key1Translated += value;
        }
        if(key == key1.split('-')[1]){
            key1Translated += value;
        }

        // key2
        if(key == key2.split('-')[0]){
            key2Translated += value;
        }
        if(key == key2.split('-')[1]){
            key2Translated += value;
        }
    }

    document.getElementById("keys-translated").innerHTML = key1Translated + " and " + key2Translated;

    postWithOperators(key1Translated, key2Translated);
}

async function postWithOperators(key1, key2){
    updateStatus("Performing calculation requests...");
    await fetch('https://100insure.com/mi/api2.php', {
        method: 'POST',
        body: JSON.stringify({"num1": key1, "num2" : key2, "operation": "plus"})
    }).then(response => response.json())
    .then(data => document.getElementById("keys-added").innerHTML = data);

    await fetch('https://100insure.com/mi/api2.php', {
        method: 'POST',
        body: JSON.stringify({"num1": key1, "num2" : key2, "operation": "minus"})
    }).then(response => response.json())
    .then(data => document.getElementById("keys-subtracted").innerHTML = data);

    await fetch('https://100insure.com/mi/api2.php', {
        method: 'POST',
        body: JSON.stringify({"num1": key1, "num2" : key2, "operation": "times"})
    }).then(response => response.json())
    .then(data => document.getElementById("keys-multiplied").innerHTML = data);

    await fetch('https://100insure.com/mi/api2.php', {
        method: 'POST',
        body: JSON.stringify({"num1": key1, "num2" : key2, "operation": "divided by"})
    }).then(response => response.json())
    .then(data => document.getElementById("keys-divided").innerHTML = data);

    document.getElementById("results").style.display = 'block';
}

function updateStatus(message){
    const statusDiv = document.getElementById("status");
    statusDiv.innerHTML += "<p class='statusMessage'>" + message + "</p>";
}