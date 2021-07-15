//::::::::::: PAGE CONFIMRATION ET REMERCIEMENT ::::::::


function confirmation() {
    //Affichage id order
    const orderId = localStorage.getItem('orderId');
    document.querySelector('.confirmationPrix').textContent = orderId;

    //Affichage du prix 
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
                .then(json => affichagePrix(json))
                .catch(error => console.log({ error }));

        };
    }
}
let tableauPrixTotal = [];
function affichagePrix(cartItem){

     //Function calcule du prix total     
     tableauPrixTotal.push(cartItem.price / 100);

     //addition les prix du tableau
     let reducer = (acc, acr) => acc + acr;
     let prixTotalAddition = tableauPrixTotal.reduce(reducer, 0);
 
     //Bloque du cout total des produits
     document.querySelector('.orderNumber').textContent = 'TOTAL :' + prixTotalAddition + '$';
}



//********** FIN PAGE CONFIMRATION ET REMERCIEMENT ***********