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
            image.className = 'card-img-top';
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