
//Validation des champs du formulaire et envoi

let formCart = function () {
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
// -------------------------------------------------------------------------------------------------

let indexProduct = function () {

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

let productDetailsPage = function (json) {

    //1. Recuperer l'id (possibilite meme technique pour lentille dans panier avec urlParams.get)
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
        .then(json => afficherDetailsCard(json))
        .catch(error => console.log({ error }));

    //3. Mettre en place la card 

    function afficherDetailsCard(camera) {
        let rowDetail = document.getElementById('divRowDetail');
        let divImg = document.createElement('div');
        divImg.className = 'col-md-6 text-center align-self-center';
        let imageDiv = document.createElement('img');
        imageDiv.className = 'img-fluid';
        imageDiv.src = camera.imageUrl;

        let divInfo = document.createElement('div');
        divInfo.className = 'col-md-6 info';
        let rowTitle = document.createElement('div');
        rowTitle.className = 'row title';
        let col = document.createElement('div');
        col.className = 'col';
        let cardName = document.createElement('h2');
        cardName.textContent = camera.name;

        let pDescription = document.createElement('p');
        pDescription.textContent = camera.description;
        let aFocus = document.createElement('a');
        let rowPrice = document.createElement('div');
        rowPrice.className = 'row price';
        let label = document.createElement('label');
        label.className = 'radio';
        let input = document.createElement('input');
        input.setAttribute = ('type', 'radio');
        input.setAttribute = ('name', "focus1");
        let divRowFocus = document.createElement('div');
        divRowFocus.className = 'row';
        divRowFocus.textContent = camera.lenses;

        let detailCard = document.getElementById('detailCard');
        let rowLower = document.createElement('div');
        rowLower.className = 'row lower';
        let divButton = document.createElement('div');
        divButton.className = 'col text-right align-self-cente';
        let buttonAddCart = document.createElement('button');
        buttonAddCart.className = 'btn';
        buttonAddCart.textContent = 'Ajouter au panier';


        rowDetail.appendChild(divImg);
        divImg.appendChild(imageDiv);
        
        rowDetail.appendChild(divInfo);
        divInfo.appendChild(rowTitle);
        rowTitle.appendChild(col);
        col.appendChild(cardName);
        cardName.appendChild(pDescription);

        divInfo.appendChild(aFocus);
        aFocus.appendChild(rowPrice);
        rowPrice.appendChild(label);
        label.appendChild(input);
        rowPrice.appendChild(divRowFocus);

        detailCard.appendChild(rowLower);
        rowLower.appendChild(divButton);
        divButton.appendChild(buttonAddCart);

    }
}