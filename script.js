
function getRandomNumber(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNumber = getRandomNumber(10000, 99999)
let randomNumberStr = String(randomNumber);
let randomNumberStrOriginal = randomNumberStr;
let numberSize = 5;
console.log(randomNumberStr);
let numGuss = 0;

// toDo: hacerLoVertical

function checkNumber()
{
    numGuss++;
    // get the useer number
    var element = document.getElementById("guess");
    var userNumberStr = String(element.value);
    
    // for each difit, check if the are the same
    const actualMark = [0, 0, 0, 0, 0] // 0 -> that char is not in the string, 1 -> that char is it, 2 -> that char is in that exact position 
    for (var index = 0; index < randomNumberStr.length; index++)
    {
        if (userNumberStr[index] == randomNumberStr[index])
        {
            actualMark[index] = 2;
            randomNumberStr = setCharAt(randomNumberStr, index, '*');
        }
        console.log("after check: " + randomNumberStr);

    }
    
    for (var index = 0; index < randomNumberStr.length; index++)
    {
        for (var i = 0; i < randomNumberStr.length; i++)
        {
            if (actualMark[index] != 2 && userNumberStr[index] == randomNumberStr[i])
            {
                console.log("is in " + randomNumberStr[i] + " in position " + i + "for " + randomNumberStr);
                actualMark[index] = 1;
            }
        }
        
    }

    // Generate the container that contains all the guess
    // crate the container
    let newContainer = document.createElement('div');
    var idGuess = "guess" + numGuss
    newContainer.id = idGuess;
    newContainer.className = "guess-history"

    // Insert in the html
    let idContainer = "new-guess";
    let place = document.getElementById(idContainer);
    if (place) {
        place.appendChild(newContainer);
    } else {
        place.error(`Container with id "${idContainer}" not found.`);
    }

    // generate the color boxes
    for (var index = 0; index < numberSize; index++)
    {
        newGuessHistoryInstance(userNumberStr[index], actualMark[index], idGuess)
    }

    randomNumberStr = randomNumberStrOriginal;
    
    var advertisment = document.getElementById("adverisment");
    if (randomNumberStr == userNumberStr)
    {
        // Show the secret number
        var container = document.getElementById("secretNumber");
        var childDivs = container.getElementsByTagName("div");

        for (var index = 0; index < childDivs.length; index++)
        {
            childDivs[index].textContent = randomNumberStr[index];
        }

        // Change the advertisment
        advertisment.textContent = "Has acertado, enhorabuena!!! ;)"
    }
    else 
    {
        advertisment.textContent = "Tu intento es: " + userNumberStr;
    }
}

function setCharAt(str,index,chr) {
    var repacedStr = "";
    if(index < str.length-1) 
    {
        repacedStr = str.substring(0,index) + chr + str.substring(index+1); 
    }
    return repacedStr;
}

function newGuessHistoryInstance(number, actualMark, idGuess)
{
   
    let newGues = document.createElement('div');

    // Set properties and attributes
    switch (actualMark)
    {
        case 1:
            newGues.className = 'digit inTheNumber';
            break;
        case 2:
            newGues.className = 'digit isCorrect';
            break;
        default:
            newGues.className = 'digit notFound';
            break;
    }
    newGues.innerHTML = String(number);

    // Add the gues
    let container = document.getElementById(idGuess);
    if (container) {
        container.appendChild(newGues);
    } else {
        console.error(`Container with id "${idGuess}" not found.`);
    }
}
