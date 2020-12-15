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
//-------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {});

const getProductList = () => {
    fetch(apiGetUrl)
        .then((response) => response.json())
        .then((data) => {
            loadDataInDom(data);
        })
        .catch((error) => {
            console.log("error", error);
        });};

document.getElementById('test-requete-title').innerHTML = '<p>il est une autre fois</p>';
// let xhr = new XMLHttpRequest();

// xhr.onreadystatechange = function() {
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
//         let response = JSON.parse(this.responseText);
       
//  console.log(response);
//         testRequestTitle.innerHTML = 'on essaye juste';
//     }
// };
//     xhr.open('GET', '​http://localhost:3000/api/furniture');
//     xhr.send();