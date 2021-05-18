
//Validation des champs du formulaire et envoi

function formCart() {
    document.forms['enregistrement'].addEventListener("submit", function (e) {

        let erreur;
        let inputs = this;

        // traitement generique
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                erreur = "Veuillez renseigner tous les champs";
            }
        }

        if (erreur) {
            e.preventDefault();
            document.getElementById('erreur').innerHTML = erreur;
        } else {
            alert('Formulaire envoye !')
        }
    });
}
// -------------------------PAGE D'ACCEUIL------------------------------------------------------------------------

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
            console.log(camera)

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

//----------------------PAGE DU CHOIX DE LA LENTILLE ET D'AJOUT AU PANIER---------------------

function productDetailsPage(json) {

    //1. Recuperer l'id
    let urlParams = new URLSearchParams(window.location.search);
    let cameraId = urlParams.get("camera");
    let cameraURL = 'http://localhost:3000/api/cameras/' + cameraId;

    //2. Recuper l'api
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

//3. Mettre en place la card 

function productDetailsCard(camera) {

    document.getElementById('imageDiv').src = camera.imageUrl;
    document.getElementById('cardTitle').textContent = camera.name;
    document.getElementById('pDescription').textContent = camera.description;


    let select = document.getElementById('cameraLenses');
    let options = camera.lenses;
    console.log(options);

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

function addToCart(cameraId) {
    let cameraURL = 'http://localhost:3000/api/cameras/' + cameraId;
    console.log('addToCart');
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

function addProductToCard(camera) {
    let panier = localStorage.getItem("panier");

    if (!panier) {
        panier = {
            cameras: [camera],
            lenses: camera.lenses,
            total: camera.price / 100
        }
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    else {
        let panierObject = JSON.parse(panier);
        panierObject.cameras.push(camera);
        panierObject.total = Number(panierObject.total) + Number(camera.price / 100);
        localStorage.setItem('panier', JSON.stringify(panierObject));
        alert('Votre article a bien ete ajoute au panier !');
    }
}
// ===> Recuperation des produits du localstorage

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

function getCart(camera) {
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    let produitsContainer = document.querySelector('.produits-container');
    let produits = document.querySelector('.produits');

    if (!cartItems) {
        produitsContainer.textContent = 'Votre panier est vide !';
    } else {
        let produitName = document.createElement('div');
        produitName.textContent = this.name;
        produits.appendChild(produitName);
    }
}

getCart();
