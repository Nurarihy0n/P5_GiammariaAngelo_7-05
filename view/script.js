// -------------------------PAGE D'ACCEUIL----------------------------------------

function indexProduct() {

    // Requete fetch (API)
    const getCamera = async function () {
        await fetch('http://localhost:3000/api/cameras')
            .then(response => {
                return response.json()
                    .then(json => afficherCamera(json))
                    .catch(err => console.error(err));
            })
            .catch(error => {
                console.error("Error: ", error);
                return Error(error);
            });
    }


    const afficherCamera = async function (produits) {
        produits.forEach(function (camera) {

            this.name = camera.name;
            this.price = camera.price;
            this.description = camera.description;
            this.id = camera._id;

            // creation element carte 
            let section = document.getElementById('carte-test');
            let divContainerCard = document.getElementById('divContainer');
            let divRow = document.getElementById('divRow');
            let divCol = document.createElement('div');
            divCol.className = 'col-12 col-md-4 my-2';

            // card
            let divCard = document.createElement('div');
            divCard.className = 'card card-cascade card-ecommerce border-black shadow';

            //card image
            let divCardImg = document.createElement('div');
            divCardImg.className = 'view view-cascade overlay';
            let image = document.createElement('img');
            image.className = 'card-img-top'
            let a = document.createElement('a');
            let divMask = document.createElement('div');
            divMask.className = 'mask rgba-white-slight';

            //card content
            let divCardContent = document.createElement('div');
            divCardContent.className = 'card-body card-body-cascade text-center';
            let carteTitle = document.createElement('h4');
            carteTitle.className = 'card-title';
            let paragraphe = document.createElement('p');
            paragraphe.className = 'card-text';

            //card footer
            let divFooter = document.createElement('div');
            divFooter.className = 'card-footer px-1';
            let spanFooter = document.createElement('span');
            spanFooter.className = 'float-letf float-weight-bold';
            let price = document.createElement('strong');
            let buttonCard = document.createElement('button');
            buttonCard.className = 'float-right btn btn-primary stretched-link';
            buttonCard.textContent = '+ de details';

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
            spanFooter.appendChild(buttonCard);


            image.src = camera.imageUrl;
            carteTitle.textContent = this.name;
            paragraphe.textContent = this.description;
            price.textContent = (this.price) / 100 + '$';


            // Button Tracking id

            let cameraURL = './html/produit_detail.html?camera=' + this.id;
            buttonCard.addEventListener('click', function () {
                document.location.href = cameraURL;
            })
        })
    }

    getCamera()
}
//******************************* FIN DE LA PAGE D'ACCEUIL ******************************************/

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
        .catch(error => console.log({ error }));
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
            cameras: [camera],
            total: camera.price / 100
        }
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    else {
        let panierObject = JSON.parse(panier);
        panierObject.cameras.push(camera);
        panierObject.total = Number(panierObject.total) + Number(camera.price / 100);
        localStorage.setItem('panier', JSON.stringify(panierObject));
        alert('Votre article a bien ete ajouter a votre panier !')
    }

}

// **************** FIN PAGE DU CHOIX DE LA LENTILLE ET D'AJOUT AU PANIER **********************



//:::::::::::::::::::::::::::::: PAGE PANIER :::::::::::::::::::::::::::::::


// ===> RECUPERTION DES PRODUIT DU LOCALSTORAGE
function getCameraToCart() {
    let cameraURL = 'http://localhost:3000/api/cameras/' + cameraId;
    fetch(cameraURL,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => getCart(json))
        .catch(error => console.log({ error }));

}

function getCart() {
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);

    let table = document.querySelector('.table');

    if (!cartItems) {
        table.textContent = 'Votre panier est vide !';
    } else {
        let cameras = cartItems.cameras;
        for (let i = 0; i < cameras.length; i++) {
            let cartItem = cameras[i];

            let tbody = document.createElement('tbody');
            let tr = document.createElement('tr');
            let th = document.createElement('th');
            th.setAttribute("scope", "row");
            th.className = 'border-0';
            let divTitleProduct = document.createElement('div');
            divTitleProduct.className = 'p-2';
            let imgTitle = document.createElement('img');
            imgTitle.setAttribute("style", "width: 200px; height: auto");
            imgTitle.className = 'img-fluid rounded shadow-sm';
            imgTitle.src = cartItem.imageUrl;
            let divTitle = document.createElement('div');
            divTitle.className = 'ml-3 d-inline-block align-middle';
            let hTitle = document.createElement('h5');
            hTitle.className = 'mb-0';
            let hTitleDiv = document.createElement('div');
            hTitleDiv.className = 'd-inline-block align-middle';
            hTitleDiv.textContent = cartItem.name;

            let tdPrix = document.createElement('td');
            tdPrix.className = 'border-0 align-middle'
            tdPrix.textContent = cartItem.price / 100 + '$';

            document.querySelector('.divTotal').textContent = 'TOTAL :' + cartItems.total + '$';

            table.appendChild(tbody);
            tbody.appendChild(tr);
            tr.appendChild(th);
            th.appendChild(divTitleProduct);
            divTitleProduct.appendChild(imgTitle);
            divTitleProduct.appendChild(divTitle);
            divTitle.appendChild(hTitle);
            hTitle.appendChild(hTitleDiv);

            tr.appendChild(tdPrix);
        };
    }
}


// ------------- ENREGISTREMENT DU FORMULAIRE ET ENVOI AU SERVEUR ---------------

//Recuperation bouton 
let btnEnvoyerFormulaire = document.getElementById('envoyerFormulaire');

// Ecouter le bouton 
btnEnvoyerFormulaire.addEventListener('click', (e) => {

    e.preventDefault();
    //Recuperation des valeurs du formulaire dans le localStorage
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;


    //Valeur du fomulaire dans un objet
    const contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    }

    //Valeur du formulaire et des produits dans un objet 
    let panier = localStorage.getItem('panier');
    let productsList = JSON.parse(panier).cameras; 

    let products = [];
    for(let i = 0; i < productsList.length; i++){
        const product = productsList[i];
        products.push(product._id);
    }

    // ::::::::::::: GESTION DES CHAMPS DU FORMULAIRE :::::::::::::
    
    const regexForm = (value) => {
        return /^[A-Za-z]{2,20}$/.test(value);
    }

    //FirtsName control 
    function controlPrenom() {
        if (regexForm(firstName)) {
            return true;
        } else {
            return false;
        }
    }
    //LastName control
    function controlNom() {
        if (regexForm(lastName)) {
            return true;
        } else {
            return false;
        }
    }
    //email control 
    function controlEmail() {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return true;
        } else {
            return false;
        }
    }
     //City control
     function controlCity() {
        if (regexForm(city)) {
            return true;
        } else {
            return false;
        }
    }
    // Adress control
    function controlAddress(){
        if (/^\d+\s[A-z]+\s[A-z]+/.test(address)){
            return true;
        } else {
            return false;
        }
    }

    const aEnvoyer = {
        contact,
        products
    }
    console.log('aEnvoyer');
    console.log(aEnvoyer);  

    if (controlPrenom() && controlNom() && controlEmail() && controlCity() && controlAddress()){
        envoieVersServeur(aEnvoyer);
    } else {
        alert('Veuillez renseignez tous les champs');
    }
    //----------------- FIN DE LA VALIDATION DES CHAMPS DU FORMULAIRE ---------------

});




function envoieVersServeur(aEnvoyer) {
    fetch('http://localhost:3000/api/cameras/order',
        {
            method: 'POST',
            body: JSON.stringify(aEnvoyer),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => { 
            let idReponse = (json);
            orderId = idReponse.orderId;
            localStorage.setItem('orderId', orderId);
            envoieVersRemerciement();
        })
        .catch(error => console.log({error}))
}


//REDIRECTION SUR LA PAGE DE REMERCIEMENT
function envoieVersRemerciement() {
    window.location = '../html/confirmation.html';
}

// *********** FIN DE LA PAGE PANIER **************

//::::::::::: PAGE CONFIMRATION ET REMERCIEMENT ::::::::


function confirmation() {
    //Affichage id order
    const orderId = localStorage.getItem('orderId');
    document.querySelector('.confirmationPrix').textContent = orderId;

    //Affichage du prix 
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    document.querySelector('.orderNumber').textContent = cartItems.total + '$';
}

//********** FIN PAGE CONFIMRATION ET REMERCIEMENT ***********










