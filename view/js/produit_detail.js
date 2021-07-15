//----------------------PAGE DU CHOIX DE LA LENTILLE ET D'AJOUT AU PANIER---------------------

function productDetailsPage(json) {

    //1. RECUPERATION DE L'ID 
    let urlParams = new URLSearchParams(window.location.search);
    let cameraId = urlParams.get("camera");
    let cameraURL = 'http://localhost:3000/api/cameras/' + cameraId;

    //2. RECUPERATION DE L'API
    fetch(cameraURL,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => productDetailsCard(json))
        .catch(error => traitementPageErreur(error));
}

// //PAGE ERREUR

function traitementPageErreur() {
    window.location.href = '../html/pageError.html';
}

//3. MISE EN PLACE DE LA CARD 

function productDetailsCard(camera) {

    document.getElementById('imageDiv').src = camera.imageUrl;
    document.getElementById('cardTitle').textContent = camera.name;
    document.getElementById('pDescription').textContent = camera.description;

    // CREATION DU SELECT POUR LES LENTILLES
    let select = document.getElementById('cameraLenses');
    let options = camera.lenses;

    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        let optionElt = document.createElement('option');
        optionElt.setAttribute('value', option);
        optionElt.textContent = option + ' / ' + (camera.price) / 100 + '$';
        select.appendChild(optionElt);
    }

    let detailCard = document.getElementById('detailCard');
    let rowLower = document.createElement('div');
    rowLower.className = 'row lower';
    let divButton = document.createElement('div');
    divButton.className = 'col text-right align-self-center divButton';
    let buttonAddCart = document.createElement('button');
    buttonAddCart.className = 'btn btn-primary';
    buttonAddCart.setAttribute("onclick", `addToCart("${camera._id}")`);
    buttonAddCart.textContent = 'Ajouter au panier';

    detailCard.appendChild(rowLower);
    rowLower.appendChild(divButton);
    divButton.appendChild(buttonAddCart);
}

//RECUPERATION API POUR PANIER
function addToCart(cameraId) {
    let cameraURL = 'http://localhost:3000/api/cameras/' + cameraId;
    fetch(cameraURL,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => addProductToCard(json))
        .catch(error => console.log({ error }));

}
// FONCTIONNALITE DU PANIER
function addProductToCard(camera) {

    let panier = localStorage.getItem("panier");

    if (!panier) {
        panier = {
            products: [camera._id]
        }
        localStorage.setItem('panier', JSON.stringify(panier));
        alert('Votre article a bien été ajouté a votre panier !')

    }
    else {
        let panierObject = JSON.parse(panier);
        panierObject.products.push(camera._id);
        localStorage.setItem('panier', JSON.stringify(panierObject));
        alert('Votre article a bien été ajouté a votre panier !')
    }

}

// **************** FIN PAGE DU CHOIX DE LA LENTILLE ET D'AJOUT AU PANIER **********************