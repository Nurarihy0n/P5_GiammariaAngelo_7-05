// Validation des champs du formulaire et envoi

// document.forms['enregistrement'].addEventListener("submit", function(e) {

//     let erreur;
//     let inputs = this;

//     // traitement generique
//     for (let i = 0; i < inputs.length; i++) {
//         if(!inputs[i].value){
//             erreur = "Veuillez renseigner tous les champs";
//         }
//     }

//     if(erreur){
//         e.preventDefault();
//         document.getElementById('erreur').innerHTML= erreur;
//     } else {
//         alert('Formulaire envoye !')
//     }
// });
// -------------------------------------------------------------------------------------------------

// Requete fetch (API)
// const getCamera = async function () {
//     let response = await fetch('http://localhost:3000/api/cameras')
//         .then(function (response) {
//             console.log(response);
//             if (response.ok) {
//                 return response.json();
//             }
//             else {
//                 console.log('erreur de la requete')
//             }
//         })
// }

// // Recuperation des produit 
// const afficherCamera = async function () {
//     const tableau = await Promise.all([getCamera()])

//     // Creation tableau pour recuperer chaque produit

//     tableau.forEach(function (produits) {
//         produits.forEach(function (pdt) {
//             console.log(pdt)

//         })
//     })
// }

var request = new XMLHttpRequest;

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
    }
}

for (i = 0; i < getCamera.length; i++) {
    console.log(getCamera[i].name);
    console.log(getCamera[i].description);

    // creation element carte 
    var section = document.getElementById('carte-test');
    var divContainerCard = document.getElementById('divContainer');
    var divRow = document.getElementById('divRow');
    var divCol = document.createElement('div');
    divCol.className = 'col-12 col-md-4';

    // card
    var divCard = document.createElement('div');
    divCard.className = 'card card-cascade card-ecommerce border-black shadow';

    //card image
    var divCardImg = document.createElement('div');
    divCardImg.className = 'view view-cascade overlay';
    var image = document.createElement('img');
    image.className = 'card-img-top'
    var a = document.createElement('a');
    var divMask = document.createElement('div');
    divMask.className = 'mask rgba-white-slight';

    //card content
    var divCardContent = document.createElement('div');
    divCardContent.className = 'card-body card-body-cascade text-center';
    var carteTitle = document.createElement('h4');
    carteTitle.className = 'card-title';
    var paragraphe = document.createElement('p');
    paragraphe.className = 'card-text';

    //card footer
    var divFooter = document.createElement('div');
    divFooter.className = 'card-footer px-1';
    var spanFooter = document.createElement('span');
    spanFooter.className = 'float-letf float-weight-bold';
    var price = document.createElement('strong');

    // init appendChild Card
    divRow.appendChild(divCol);


    divCol.appendChild(divCard);
    divCard.appendChild(divCardImg);
    divCardImg.appendChild(image);
    image.appendChild(a);
    a.appendChild(divMask);

    divCardImg.appendChild(divCardContent);
    divCardContent.appendChild(carteTitle);
    divCardContent.appendChild(paragraphe);

    divCard.appendChild(divFooter);
    divFooter.appendChild(spanFooter);
    spanFooter.appendChild(price);


    image.src = camera[i].imageUrl;
    carteTitle.textContent = camera[i].name;
    paragraphe.textContent = camera[i].description;
    price.textContent = camera[i].price + '$';

    request.open('GET', 'http://localhost:3000/api/cameras');
    request.send();