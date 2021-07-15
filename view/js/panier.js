//:::::::::::::::::::::::::::::: PAGE PANIER :::::::::::::::::::::::::::::::

//Recuperation des produits du panier
function getCart() {
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);

    let table = document.querySelector('.table');

    if (!cartItems) {
        table.textContent = 'Votre panier est vide !';
    } else {
        let cameras = cartItems.products;
        for (let i = 0; i < cameras.length; i++) {
            let cartItem = cameras[i];

            // ===> RECUPERTION API PANIER
            fetch('http://localhost:3000/api/cameras/' + cartItem,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(json => displayResumeCommande(json))
                .catch(error => console.log({ error }));

        };
    }
}
 // Creation d'un tableau pour stocker le prix total avant affichage
let tableauPrixTotal = [];

function displayResumeCommande(cartItem) {
    //Creation de l'affichage des produits

    //Bloque contenant tout les information
    let table = document.querySelector('.table');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute("scope", "row");
    th.className = 'border-0';
    let divTitleProduct = document.createElement('div');
    divTitleProduct.className = 'p-2';

    //Bloque image du produit
    let imgTitle = document.createElement('img');
    imgTitle.setAttribute("style", "width: 200px; height: auto");
    imgTitle.className = 'img-fluid rounded shadow-sm';
    imgTitle.src = cartItem.imageUrl;

    //Bloque nom du produit
    let divTitle = document.createElement('div');
    divTitle.className = 'ml-3 d-inline-block align-middle';
    let hTitle = document.createElement('h5');
    hTitle.className = 'mb-0';
    let hTitleDiv = document.createElement('div');
    hTitleDiv.className = 'd-inline-block align-middle';
    hTitleDiv.textContent = cartItem.name;

    //Bloque bouton de suppression de l'article
    let tdDelete = document.createElement('td');
    tdDelete.className = 'border-0 align-middle';
    tdDelete.innerHTML = `<button onclick="btnDltItem('${cartItem._id}')" class="btn"><ion-icon name="trash-outline"></ion-icon></button>`;

    //Bloque prix du produit
    let tdPrix = document.createElement('td');
    tdPrix.className = 'border-0 align-middle';
    tdPrix.textContent = cartItem.price / 100 + '$';

    //Function calcule du prix total     
    tableauPrixTotal.push(cartItem.price / 100);

    //addition les prix du tableau
    let reducer = (acc, acr) => acc + acr;
    let prixTotalAddition = tableauPrixTotal.reduce(reducer, 0);

    //Bloque du cout total des produits
    document.querySelector('.divTotal').textContent = 'TOTAL :' + prixTotalAddition + '$';

    //AppendChild de tous les produits 
    table.appendChild(tbody);
    tbody.appendChild(tr);
    tr.appendChild(th);
    th.appendChild(divTitleProduct);
    divTitleProduct.appendChild(imgTitle);
    divTitleProduct.appendChild(divTitle);
    divTitle.appendChild(hTitle);
    hTitle.appendChild(hTitleDiv);

    tr.appendChild(tdDelete);
    tr.appendChild(tdPrix);
}

//Function de suppression d'un produits via son id 

function btnDltItem(id) {
    let panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);

    for (let i = 0; i < panier.products.length; i++) {
        const itemId = panier.products[i]

        if (itemId == id) {
            panier.products.splice(i, 1);
            console.log(panier);
            window.location.href = "../html/panier.html";
        }
    }
    panierLocal = JSON.stringify(panier);
    localStorage.setItem('panier', panierLocal);

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
    let panierId = localStorage.getItem('panier');
    panierId = JSON.parse(panierId).products;

    let products = [];
    for (let i = 0; i < panierId.length; i++) {
        let productId = panierId[i];
        products.push(productId);
    }

    // ::::::::::::: GESTION DES CHAMPS DU FORMULAIRE :::::::::::::

    const regexForm = (value) => {
        return /^[A-Za-z]{2,20}$/.test(value);
    }

    //FirtsName control 
    function controlPrenom() {
        if (regexForm(firstName)) {
            document.getElementById('firstNameMissing').textContent = '';
            return true;
        } else {
            document.getElementById('firstNameMissing').textContent = '(Veuillez remplir ce champs - Lettre uniquement)';
            return false;
        }
    }
    //LastName control
    function controlNom() {
        if (regexForm(lastName)) {
            document.getElementById('lastNameMissing').textContent = '';
            return true;
        } else {
            document.getElementById('lastNameMissing').textContent = '(Veuillez remplir ce champs - Lettre uniquement)';
            return false;
        }
    }
    //email control 
    function controlEmail() {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            document.getElementById('emailMissing').textContent = '';
            return true;
        } else {
            document.getElementById('emailMissing').textContent = '(@mail invalid)';
            return false;
        }
    }
    //City control
    function controlCity() {
        if (regexForm(city)) {
            document.getElementById('cityMissing').textContent = '';
            return true;
        } else {
            document.getElementById('cityMissing').textContent = '(Votre adresse ne doit pas contenir de chiffres)';
            return false;
        }
    }
    // Adress control
    function controlAddress() {
        if (/^\d+\s[A-z]+\s[A-z]+/.test(address)) {
            document.getElementById('addressMissing').textContent = '';
            return true;
        } else {
            document.getElementById('addressMissing').textContent = '(Address invalid)';
            return false;
        }
    }

    const aEnvoyer = {
        contact,
        products
    }

    if (controlPrenom() && controlNom() && controlEmail() && controlCity() && controlAddress()) {
        envoieVersServeur(aEnvoyer);
    } else {
        document.getElementById('erreur').textContent = 'Veuillez renseignez tous les champs s\' il vous plait !';
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
            console.log(orderId);
            envoieVersRemerciement();
        })
        .catch(error => console.log({ error }))
}


// REDIRECTION SUR LA PAGE DE REMERCIEMENT
function envoieVersRemerciement() {
    window.location = '../html/confirmation.html';
}

// *********** FIN DE LA PAGE PANIER **************