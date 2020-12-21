// Validation des champs du formulaire et envoi

document.forms['enregistrement'].addEventListener("submit", function(e) {

    let erreur;
    let inputs = this;

    // traitement generique
    for (let i = 0; i < inputs.length; i++) {
        if(!inputs[i].value){
            erreur = "Veuillez renseigner tous les champs";
        }
    }

    if(erreur){
        e.preventDefault();
        document.getElementById('erreur').innerHTML= erreur;
    } else {
        alert('Formulaire envoye !')
    }
});
// -------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => { });

const getProductList = () => {
    fetch(apiGetUrl)
        .then((response) => response.json())
        .then((data) => {
            loadDataInDom(data);
        })
        .catch((error) => {
            console.log("error", error);
        });
};

let testRequestTitle = document.getElementById('test-requete-title');
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
    }
};
xhr.open('GET', '​https://localhost:3000/api/furniture');
xhr.send();


// Array -----------Teddy---------------

class Teddy {
    constructor(color, id, name, price, imageUrl, description) {
        this.color = color;
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }
}
let firstTeddy = new Teddy("Tan, Chocolate, Black, White", "5be9c8541c9d440000665243", 'Norbert', 2900, "http://localhost:3000/images/teddy_1.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
let secondTeddy = new Teddy("Pale brown, Dark brown, white", "5beaa8bf1c9d440000a57d94", 'Arthur', 3900, "http://localhost:3000/images/teddy_2.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
let thirdTeddy = new Teddy("Brown", "5beaaa8f1c9d440000a57d95", "Lenny and Carl", 5900, "http://localhost:3000/images/teddy_3.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
let fourTeddy = new Teddy("Brown, Blue, Pink", "5beaabe91c9d440000a57d96", "Gustave", 4500, "http://localhost:3000/images/teddy_4.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
let fiveTeddy = new Teddy("Beige, Tan, Chocolate", "55beaacd41c9d440000a57d97", "Garfunkel", 5500, "http://localhost:3000/images/teddy_5.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
console.log(Teddy);

let allTeddy = [firstTeddy, secondTeddy, thirdTeddy, fourTeddy, fiveTeddy];
console.log(allTeddy);

for(let i = 0; i < allTeddy; i++){
    let nameTeddy = document.getElementById('test-title');
    nameTeddy.innerHTML = firstTeddy.name;
    document.getElementById('test-p').innerHTML = firstTeddy.description;
}