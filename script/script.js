/**
 *
 * variable memory_array zet de plaatjes op die gebruikt gaan worden in het spel
 */
var memory_array= [ 'img/bat.jpg',      'img/bat.jpg',
                    'img/bug.jpg',      'img/bug.jpg',
                    'img/cat.jpg',      'img/cat.jpg',
                    'img/dog.jpg',      'img/dog.jpg',
                    'img/fly.jpg',      'img/fly.jpg',
                    'img/frog.jpg',     'img/frog.jpg'];
/**
 * Aantal plaatjes die omgeraaid zijn
 * @type {Array}
 */
var memory_values = [];

/**
 * bepaald het aantal plaatjes
 * @type {number}
 */
var difficulity = 0;

/**
 * Deze array geeft ID's aan de images
 * @type {Array}
 */
var memory_img_ids = [];

/**
 * deze variable houdt de opengedraaide kaartjes bij
 * @type {number}
 */
var uncoverd_tiles = 0;

/**
 * vult de variable met de speelknop
 * @type {HTMLElement}
 */
var playButton =  document.getElementById("playbutton");


/**
 * deze functie bepaald steld de waarde op die aan moeilijkheidsgraad,makkelijk & moeilijk worden gegeven
 */
function choice() {
    var array = [1,2,3];
    document.getElementById("array1").value = array[0];
    document.getElementById("array2").value = array[1];
    document.getElementById("array3").value = array[2];

/**
* currentAction pakt de waarde van choice om het in IF statements te vergelijken om een moeilijkheidsgraad te selecteren met de acties die daaronder vallen
* @type {string|Number|number|*|document.getElementById.value}
*/
    var currentAction = document.getElementById("selection").value;

    if (currentAction == 1) {                                                                   //geen moeilijkheidsgraad
        console.log("Er is geen difficulity geselecteerd!");
    }

    if (currentAction == 2){                                                                    //moeilijkheidsgraad makkelijk
        resetPictures();
        console.log("Makkelijk geselecteerd");
        difficulity = 8;
        memory_array.splice(8, 4);
        console.log(memory_array);
        shuffleArray(memory_array);
    }
    if (currentAction == 3) {                                                                   //moeilijkheidsgraad moeilijk
        resetPictures();
        console.log("Moeilijk geselecteerd");
        difficulity = 12;
        memory_array.push('img/fly.jpg','img/fly.jpg', 'img/frog.jpg', 'img/frog.jpg');
        shuffleArray(memory_array)
    }
}

/**
 * deze regel detecteerd als er geklikt wordt
 */
playButton.addEventListener("click", buttonClickHandler);

/**
 * deze functie voert uit als er dus geklikt is en kijkt of er wat ingevult is, veranderd de tekst van de knop en start een nieuw spel als er al eens op is geklikt
 * @param event
 */
function buttonClickHandler(event) {
    var item = document.getElementById("item").value;//item checken in invoerveld
    if(item == ""){                                                                             //error notificatie als er niks ingevuld is in het veld
        var message = "U bent uw naam vergeten in te vullen!";
        document.getElementById("playspace").innerHTML = message;
        event.preventDefault();
    }else {                                                                                     //start het spel
    event.preventDefault();
    playButton.value = "New game";
        disableField();
    choice();
    newGame();
    shuffleArray(memory_array);
}
}

/**
 * Deze functie zet het nieuwe spel op door kaartjes te gaan maken op het speelveld aan de hand van de waarde die is gegeven aan difficulity
 */
function newGame(){
    uncoverd_tiles = 0;
    var output = '';
    for(var i = 0; i < difficulity; i++) {
        output += '<div id="tile_'+i+'" onclick="memoryUncoverTile(this,\''+memory_array[i]+'\')"></div>';
    }
    document.getElementById('playspace').innerHTML = output;                                    //geeft de plek aan waar het spel gegenereerd gaat worden
}
/**
 * Deze functie zorgt voor de willekeurigheid van de plaatjes door memory_array te randomisen
 * @param memory_array
 */
function shuffleArray(memory_array) {
    var m = memory_array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);                                                    //randomise berekening

        // And swap it with the current element.
        t = memory_array[m];
        memory_array[m] = memory_array[i];
        memory_array[i] = t;
    }
}

/**
 * Deze 2 functies zorgen ervoor dat er wat gebeurd als er op een plaatje wordt geklikt door het te laten zien en ook weer erug te draaien. Verder houd het ook bij wanneer iemand heeft gewonnen en laat dan een alert zien.
 * @param tile
 * @param val
 */
function memoryUncoverTile(tile,val) {
    if(tile.innerHTML == "" && memory_values.length <2) {
    tile.style.background = 'url('+val+') no-repeat';                                           //kijkt of er 2 plaatjes omgedraaid zijn
        if(memory_values.length == 0) {
            memory_values.push(val);
            memory_img_ids.push(tile.id);
        } else if(memory_values.length == 1) {
            memory_values.push(val);
            memory_img_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]) {
                uncoverd_tiles += 2;
                memory_values = [];
                memory_img_ids = [];
                if(uncoverd_tiles == difficulity){                                              //kijkt wanneer alle plaatjes omgedraaid zijn om daarna acties uit te voeren
                    var naam = document.getElementById("item").value;
                    alert(naam + " heeft gewonnen! Het nieuwe spel is klaar voor gebruik!");     //haalt de naam op en presenteert het in de alert als er is gewonnen
                    console.log("hallo");
                    document.getElementById('playspace').innerHTML = "";
                    newGame();
                }
        }   else {                                                                              //als beide omgedraaide plaatjes niet matchen dan draaid dit het weer terug
            function flip2Back() {
            var card_1 = document.getElementById(memory_img_ids[0]);
            var card_2 = document.getElementById(memory_img_ids[1]);
            card_1.style.background = 'url(img/memory-bg.jpg)';
            card_1.innerHTML = "";
            card_2.style.background = 'url(img/memory-bg.jpg) no-repeat';
            card_2.innerHTML = "";
            memory_values = [];
            memory_img_ids = [];
        }
        setTimeout(flip2Back, 700);                                                             //aantal miliseconden wanneer het plaatje weer terug draait
       }

    }
}
}
/**
 * Deze functie reset de memory_array zodat het weer opnieuw gerandomised daarna kan worden voor een nieuw spel
 */
function resetPictures(){
    memory_array= [ 'img/bat.jpg',      'img/bat.jpg',
        'img/bug.jpg',      'img/bug.jpg',
        'img/cat.jpg',      'img/cat.jpg',
        'img/dog.jpg',      'img/dog.jpg'];
}

/**
 * Deze functie zet de ingevoerde naam vast als er op de knop wordt geklikt.
 */
function disableField() {
    if( document.getElementById("item").value.length > 0 ) {                                    //kijkt of er wat ingevuld is en lockt de balk vervolgens
        document.getElementById("item").disabled = true;
    }
}

// gebruik ctrl + alt + L

//toets:
//click event
//remove element
//html,css