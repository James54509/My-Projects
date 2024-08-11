let kittens = []

/**
 *DONE Called when submitting the new Kitten Form
 *DONE This method will pull data from the form
 *DONE use the provided function to give the data an id
 *DONE then add that data to the kittens list.
 *DONE Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let currentKitten = form.kittenName.value
  console.log(form.kittenName.value)
  
  let newKitten = {
    id: generateId(),
    name: currentKitten,
    mood: "Happy",
    affection: 5, 
  }
// making a local variable for kitten to compare an entered kitten name to the names in the array
  let kittenIfExists = kittens.find((kitten) => kitten.name == currentKitten)
  console.log(kittenIfExists)

  if (!kittenIfExists) {
    kittens.push(newKitten)
  }
  
  // @ts-ignore
  saveKittens()
  drawKittens()
  console.log(kittens)
  form.reset()
}

  
  










/**
 *DONE Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}


/**
 *DONE Attempts to retrieve the kittens string from localstorage
 *DONE then parses the JSON string into an array. 
 *DONE Finally sets the kittens array to the retrieved array
 */

function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittenData) {
    kittens = kittenData
  }
}

/**
 *DONE Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kittensList")

  // Go back and fill in HTML template for Kittens list
  // // STARTS HERE
  let kittensTemplate = ""
  kittens.forEach(currentKitten => {
    setKittenMood(currentKitten)
    console.log(currentKitten)

    kittensTemplate += `
    <div class="kitten ${currentKitten.mood ? currentKitten.mood.toLowerCase() : ''}">
      <h3>${currentKitten.name}</h3>
      <img src="${currentKitten.mood}-cat.jpg" height="250" alt="Moody Kittens">
      <p>${currentKitten.mood.toString("Mood: ")}</p>
      <p class="affection">${currentKitten.affection}<p>
      <button type="button" onclick='pet("${currentKitten.id.toString()}")'>Pet</button>
      <button type="button" onclick='catnip("${currentKitten.id.toString()}")'>Catnip</button>
      <button type="button" onclick='deleteKitten(${JSON.stringify(currentKitten)})'>Delete</button>
      
    </div>`
  })
  kittenListElement.innerHTML = kittensTemplate
}
  

/**
 *DONE Find the currentKitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  console.log(id)
  let foundKitten =  kittens.find((kitten) => kitten.id == id)
  if (foundKitten) {
    console.log(foundKitten)
    return foundKitten
  }else{
    console.log("Kitten ID doesn't exist!")
    return null
  }
}




/**
 *DONE Find the currentKitten in the array of kittens
 *DONE Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  
 //DONE Find the currentKitten in the array of kittens
  let kitten = findKittenById(id)
  console.log(id)
  
 //DONE Generate a random Number
  let randomNumber = Math.random()
  console.log(randomNumber)
 // if the number is greater than .5 
 //increase the kittens affection
 // otherwise decrease the affection
  if (randomNumber > .5) {
    kitten.affection += 1
  }else{
    kitten.affection-= 1
  }
 console.log(kitten)
 saveKittens()
 drawKittens()
 
  
}

/**
 *DONE Find the currentKitten in the array of kittens
 *DONE Set the currentKitten's mood to tolerant
 *DONE Set the currentKitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.mood = "tolerant"
  kitten.affection = 5
  saveKittens()
  drawKittens()
}


/**
 *DONE Sets the kittens mood based on its affection
 * @param {Kitten} currentKitten 
 */
function setKittenMood(currentKitten) {
  if (currentKitten.affection > 5) {
    currentKitten.mood = "happy"
  }else if(currentKitten.affection < 5){
    currentKitten.mood = "angry"
  }else{
    currentKitten.mood = "tolerant"
  }
  saveKittens()
  
}
    
  



/**
 *DONE Removes currentKitten from array in local storage and saves and 
 * redraws
 */
function deleteKitten(currentKitten){
  console.log(currentKitten)
  for (let i = 0; i < kittens.length; i++) {
    const arrayCat = kittens[i]
    const arrayCatID = arrayCat.id
    const currentKittenID = currentKitten.id
    if (arrayCatID == currentKittenID) {
      kittens.splice(i,1)
    }
  }
  window.localStorage.removeItem(currentKitten)
  saveKittens()
  drawKittens()

}

  



/**
 *PREFILLED DONE Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
  
  
  
  
    
    