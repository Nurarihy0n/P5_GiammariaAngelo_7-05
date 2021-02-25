
// recupération de l'API avec fetch
const getCameras = async function(){
	let reponse= await fetch('http://localhost:3000/api/cameras')
		if (reponse.ok){
		return await reponse.json();
	}else{
		alert('erreur');
	}
}

            
// creation  d'une fonction affichant l'ensemble des produits

const afficherCameras = async function(){
    const table = await Promise.all([getCameras()]) 
                
	table.forEach(function(produits){
 
		// creation de carte produit pour chaque élément du tableau                 
		produits.forEach(function(produit){
			
			//Dans le console.log on retrouve tous les produits auxquels on a accès
			console.log(produit)
			
			let container = document.getElementById('container')
			let cartes = document.createElement("section")
			let carte = document.createElement("div")
			let image = document.createElement("img")


			container.appendChild(cartes)
			cartes.appendChild(carte)
			carte.appendChild(image)
			


			cartes.setAttribute('class' , 'cartes')
			carte.setAttribute('class', 'carte')
			image.setAttribute('class', 'image')
		
			image.src = produit.imageUrl;
		
		})
	})
}
// lancement de la fonction 
  afficherCameras()
