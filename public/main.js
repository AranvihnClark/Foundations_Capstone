// Action text elements
const actionVariable = document.querySelector('#action-number');
const actionOneText = document.querySelector('#option-one-text');
const actionTwoText = document.querySelector('#option-two-text');
const actionThreeText = document.querySelector('#option-three-text');
const actionFourText = document.querySelector('#option-four-text');
const actionFiveText = document.querySelector('#option-five-text');

// Action button elements
const actionOneBtn = document.querySelector('#button-one');
const actionTwoBtn = document.querySelector('#button-two');
const actionThreeBtn = document.querySelector('#button-three');
const actionFourBtn = document.querySelector('#button-four');
const actionFiveBtn = document.querySelector('#button-five');

// Good, Evil, Unsure button elements
const goodBtn = document.querySelector('#good-button');
const evilBtn = document.querySelector('#evil-button');
const unsureBtn = document.querySelector('#unsure-button');

// Good, Evil, Unsure text elements
const goodView = document.querySelector('#good-travelers-view');
const evilView = document.querySelector('#evil-travelers-view');
const unsureView = document.querySelector('#unsure-travelers-view');

// View text element
const viewText = document.querySelector('#view-text');

// Other Elements element
const dayVariable = document.querySelector('#day-number');
const mHealthNumber = document.querySelector('#mental-health-number');

// HTTP Request URL
const baseURL = `http://localhost:4040`;

// Declaration of various variables
let dayNumber = 1;
let actionNumber = 1;
let timeOfDay = 'Morning';
let eventsCounter = 0;
let joesAction = true;
let score = 0;

// Game difficulty variable - for scalability if I ever need to maket he project bigger.
// We'll let it be 3 for now for three travelers a day.
let gameDifficulty = 3;
let evilTravelers = gameDifficulty - (Math.ceil(gameDifficulty / 6) + 1);

// Traveler variables
let travelerID = 0;
let travelerCounter = -1;
let allTravelers = [];
let easyTravelers = [];
let mediumTravelers = [];
let hardTravelers = [];
let askForHelp = 0;
let sCounter = 0;
let easyCheck = -1
let mediumCheck = -1
let hardCheck = -1;
let unsureFilled = false;

// Buttons clicked?
let btnOneUsed = false;
let btnTwoUsed = false;
let btnThreeUsed = false;
let btnFourUsed = false;
let btnFiveUsed = false;

// IMPORTANT!! This function lets the server wait until the the current function action is completed.
// Helps prevent quick double clicks from registering twice.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// The start of the app when it is first ran.
function start() {
    view = 'Hello. Welcome to Joe the Guard. Please click START on the left when you are ready to begin!';
    action = 'Start';

    // The below are functions that present the opening screen for users to see when it first renders.
    getView(view);
    displayActionOne(action);
    displayActionNumber(actionNumber);
    displayDayNumber(dayNumber);
    joesHealth(0);
    getTravelers();
}

function shuffleTravlers(array) {
    let currentIndex = array.length,  randomIndex;

        // Loops while there are still indexes to randomize.
        while (currentIndex != 0) {
      
          // Randomly picks a traveler.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current traveler.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    return array;
}

// Gets all the travelers and sorts them into three arrays based on difficulty.
function getTravelers() {
    axios.get(`${baseURL}/travelers`)
    .then(res => {
        
        // Creating a variable to make it easier to use and manipulate our travelers
        allTravelers = res.data;
        
        // Counting variables to confirm we don't have more than what we need.
        // We use arrays to hold one count for each traveler difficulty.
        let count = [0, 0, 0];
        let evilCount = [0, 0, 0];

        // First let's randomize our travelers and insert them into the game variables.
        // I wasn't going to create a function but on the off chance I need it again, it keeps me DRY (or my DRY than I would be if I didn't use a function)
        shuffleTravlers(allTravelers);

        // Now let's grab all of the easy travelers that we need.

        // Assigning easy travelers to their respective array.
        allTravelers.forEach(traveler => {
            if (traveler.difficulty === 'Easy') {
                if (traveler.good === false && evilCount[0] < evilTravelers) {
                    easyTravelers.push(traveler);
                    evilCount[0]++
                }

                if (traveler.good === true && count[0] < (gameDifficulty - evilTravelers)) {
                    easyTravelers.push(traveler);
                    count[0]++
                }
            }
            
            // Assigning medium travelers to their respective array.
            if (traveler.difficulty === 'Medium') {
                if (traveler.good === false && evilCount[1] < evilTravelers) {
                    mediumTravelers.push(traveler);
                    evilCount[1]++
                }

                if (traveler.good === true && count[1] < (gameDifficulty - evilTravelers)) {
                    mediumTravelers.push(traveler);
                    count[1]++
                }
            }
            
            // Assigning hard travelers to their respective array.
            if (traveler.difficulty === 'Hard') {
                if (traveler.good === false && evilCount[2] < evilTravelers) {
                    hardTravelers.push(traveler);
                    evilCount[2]++
                }

                if (traveler.good === true && count[2] < (gameDifficulty - evilTravelers)) {
                    hardTravelers.push(traveler);
                    count[2]++
                }
            }
        })
        travelerID = easyTravelers[0].traveler_id;
    })
    .catch(err => console.log(err));
}

// Displays the number of day the user is currently on.
function displayDayNumber() {
    dayVariable.innerHTML = dayNumber + `, ${timeOfDay}`;
}

// Displays Joe's current mental health.
function displayMHeatlthNumber(num) {
    mHealthNumber.innerHTML = num;
}

// Displays the number of actions the user has left.
function displayActionNumber() {
    actionVariable.innerHTML = actionNumber;
}

// Below are functions that help to display the text of what each button will be for.
function displayActionOne(action) {
    actionOneText.innerHTML = `${action}`;
}

function displayActionTwo(action) {
    actionTwoText.innerHTML = `${action}`;
}

function displayActionThree(action) {
    actionThreeText.innerHTML = `${action}`;
}

function displayActionFour(action) {
    actionFourText.innerHTML = `${action}`;
}

function displayActionFive(action) {
    actionFiveText.innerHTML = `${action}`;
}

// Clears the display
function clearView() {
    return viewText.innerHTML = '';
}

// Displays the view window with text.
function getView(view) {
    viewText.innerHTML += `${view}`;
    displayActionNumber();

    // Reveals the ask for help button
    if (askForHelp > 0) {
        actionFourBtn.classList.remove('hide');
        actionFourText.classList.remove('hide');
    }

    // Reveals the special interrogation button.
    if (easyCheck === sCounter || mediumCheck === sCounter || hardCheck === sCounter) {
        actionFiveBtn.classList.remove('hide');
        actionFiveText.classList.remove('hide');
    }

    if (actionNumber === 0) {
        if(!(actionOneText.classList.contains(`hide`))) {
            actionOneText.classList.add(`hide`);
            actionOneBtn.classList.add(`hide`);
        }
        if(!(actionTwoText.classList.contains(`hide`))) {
            actionTwoText.classList.add(`hide`);
            actionTwoBtn.classList.add(`hide`);
        }
    
        if (!(actionThreeText.classList.contains(`hide`))) {
            actionThreeText.classList.add(`hide`);
            actionThreeBtn.classList.add(`hide`);
        }
    
        if (!(actionFourText.classList.contains(`hide`))) {
            actionFourText.classList.add(`hide`);
            actionFourBtn.classList.add(`hide`);
        }
    
        if (!(actionFiveText.classList.contains(`hide`))) {
            actionFiveText.classList.add(`hide`);
            actionFiveBtn.classList.add(`hide`);
        }
    }
}

// Gets Joe's mental health and then updates it
function joesHealth(decrease) {
    axios.get(`${baseURL}/joe`)
    .then(res => {
        
        // First we need to make sure the mental health doesn't exceed 100.
        if (res.data[0].mental_health - decrease > 100) {
            res.data[0].mental_health = 100;
        } else {
            res.data[0].mental_health -= decrease;
        }

        // This gets the current mental health of Joe and stores it into our newly made object for the PUT request.        
        let body = {
            mental_health: res.data[0].mental_health
        };

        // We then display Joe's current mental health.
        displayMHeatlthNumber(body.mental_health);
        
        // Then we update it to the database below.
        axios.put(`${baseURL}/joe/`, body)
        .then()
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

// Displays the continue button after each choice is made.
// Necessary so the user has enough time to read the view before moving to the next event.
function continueBtn() {

    // This should never be needed but just in case if a glitch happens, this will make sure the button is revealed.
    actionOneText.classList.remove(`hide`);
    actionOneBtn.classList.remove(`hide`);

    displayActionOne(`Continue?`)

    // The below will be used to hide all other buttons if they don't already exist.
    // We dont' want two 'hide' classes to be added.
    if(!(actionTwoText.classList.contains(`hide`))) {
        actionTwoText.classList.add(`hide`);
        actionTwoBtn.classList.add(`hide`);
    }

    if (!(actionThreeText.classList.contains(`hide`))) {
        actionThreeText.classList.add(`hide`);
        actionThreeBtn.classList.add(`hide`);
    }

    if (!(actionFourText.classList.contains(`hide`))) {
        actionFourText.classList.add(`hide`);
        actionFourBtn.classList.add(`hide`);
    }

    if (!(actionFiveText.classList.contains(`hide`))) {
        actionFiveText.classList.add(`hide`);
        actionFiveBtn.classList.add(`hide`);
    }
}

// This will refresh the event to the next main event.
function refreshJoeEvent() {

    // A get request to pull the next event for Joe.
    axios.get(`${baseURL}/next-joe-action`)
    .then(res => {
        // Clears the view first.
        clearView();
        getView(res.data[0].view_text);
        
        if (res.data[0].hasOwnProperty(`button_one`)) {
            actionOneText.classList.remove(`hide`);
            actionOneBtn.classList.remove(`hide`);

            displayActionOne(res.data[0].button_one)
        } else if (!(actionOneText.classList.contains(`hide`))) {
            actionOneText.classList.add(`hide`);
            actionOneBtn.classList.add(`hide`);
        }

        if (res.data[0].hasOwnProperty(`button_two`)) {
            actionTwoText.classList.remove(`hide`);
            actionTwoBtn.classList.remove(`hide`);

            displayActionTwo(res.data[0].button_two)
        } else if (!(actionTwoText.classList.contains(`hide`))) {
            actionTwoText.classList.add(`hide`);
            actionTwoBtn.classList.add(`hide`);
        }

        if (res.data[0].hasOwnProperty(`button_three`)) {
            actionThreeText.classList.remove(`hide`);
            actionThreeBtn.classList.remove(`hide`);

            displayActionThree(res.data[0].button_three)
        } else if (!(actionThreeText.classList.contains(`hide`))) {
            actionThreeText.classList.add(`hide`);
            actionThreeBtn.classList.add(`hide`);
        }

        if (res.data[0].hasOwnProperty(`button_four`)) {
            actionFourText.classList.remove(`hide`);
            actionFourBtn.classList.remove(`hide`);

            displayActionFour(res.data[0].button_four)
        } else if (!(actionFourText.classList.contains(`hide`))) {
            actionFourText.classList.add(`hide`);
            actionFourBtn.classList.add(`hide`);
        }

        if (res.data[0].hasOwnProperty(`button_five`)) {
            actionFiveText.classList.remove(`hide`);
            actionFiveBtn.classList.remove(`hide`);

            displayActionFive(res.data[0].button_five)
        } else if (!(actionFiveText.classList.contains(`hide`))) {
            actionFiveText.classList.add(`hide`);
            actionFiveBtn.classList.add(`hide`);
        }

        if (actionNumber === 0) {
            actionNumber = 3;
        }
        
        displayActionNumber(actionNumber);
    })
    .catch(err => console.log(err));
}

function displayOutcome(num, event) {
    joesHealth(num);
    
    if (mHealthNumber <= 80) {
        axios.get(`${baseURL}/low-menatal-Health`)
        .then()
        .catch(err => console.log(err));
    }
    axios.get(`${baseURL}/outcome`)
        .then(res => {
            getView(`<br><br>${res.data[event].response}`)

            displayActionNumber();
            continueBtn();
            eventsCounter += 0.5;
        })
        .catch(err => console.log(err));
}

function displayTravelerEvent(traveler) {
    viewText.innerHTML = traveler.interrogate_traveler;
    displayActionOne('Inspect Features?');

    displayActionTwo('Inspect Clothing?');
    actionTwoText.classList.remove('hide');
    actionTwoBtn.classList.remove('hide');

    displayActionThree('Inspect Wares?');
    actionThreeText.classList.remove('hide');
    actionThreeBtn.classList.remove('hide');

    displayActionFour('Ask for help?');
    displayActionFive('Inspect ???');

    goodBtn.classList.remove('hide');
    evilBtn.classList.remove('hide');
    unsureBtn.classList.remove('hide');

    // console.log(travelerID);
}


const buttonOneSubmit = debounce(function() {
    if (actionOneText.innerHTML === 'Start') {
        eventsCounter++;

        // Then we display Joe's event.
        refreshJoeEvent();
        return;
    }
    if (actionNumber > 0) {
        switch (eventsCounter) {
            case 1:
                score -= 2;
                displayOutcome(10, 0);
                break;
            case 2:
                actionNumber--; 
                askForHelp++;
                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${easyTravelers[travelerCounter].inspect_features}`);
                break;
            case 2.5:
                break;
            case 3:
                console.log(eventsCounter);
                break;
            case 4:
                console.log(eventsCounter);
                break;
            case 5:
                console.log(eventsCounter);
                break;
            // May not need the below for all buttons...
            case 6:
                console.log(eventsCounter);
                break;
            case 7:
                console.log(eventsCounter);
                break;
            case 8:
                console.log(eventsCounter);
                break;
            case 9:
                console.log(eventsCounter);
                break;
            default:

                // We increment our counters appropriately.
                eventsCounter += 0.5;
                travelerCounter++;

                // We also need to refresh the action counter.
                actionNumber = 3;
                displayActionNumber();

                easyCheck = easyTravelers[travelerCounter].special_counter;
                mediumCheck = mediumTravelers[travelerCounter].special_counter;
                hardCheck = hardTravelers[travelerCounter].special_counter;

                // This displays the next traveler's opening encounter.
                clearView();
                displayTravelerEvent(easyTravelers[travelerCounter]);
                break;
        }
    }
}, 200)

const buttonTwoSubmit = debounce(function() {
    switch (eventsCounter) {
        case 1:
            score += 2;
            displayOutcome(-10, 1);
            break;
        case 2:
            actionNumber--; 
            askForHelp++;
            if(!(actionOneText.classList.contains(`hide`))) {
                actionOneText.classList.add(`hide`);
                actionOneBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_clothing}`);
            break;
        case 3:
            console.log(eventsCounter);
            break;
        case 4:
            console.log(eventsCounter);
            break;
        case 5:
            console.log(eventsCounter);
            break;
        case 6:
            console.log(eventsCounter);
            break;
        // May not need the below for all buttons...
        case 7:
            console.log(eventsCounter);
            break;
        case 8:
            console.log(eventsCounter);
            break;
        case 9:
            console.log(eventsCounter);
            break;
        default:
            break;
    }
}, 200)

const buttonThreeSubmit = debounce(function() {
    switch (eventsCounter) {
        case 1:
            score -= 1;
            displayOutcome(5, 2);
            break;
        case 2:
            if (travelerID === 1 || travelerID === 2 || travelerID === 3) {
                sCounter++;
                console.log(sCounter);
            }
            actionNumber--;
            askForHelp++;
            if(!(actionOneText.classList.contains(`hide`))) {
                actionOneText.classList.add(`hide`);
                actionOneBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_wares}`);
            break;
        case 3:
            displayOutcome(5, 2);
            console.log(eventsCounter);
            break;
        case 4:
            console.log(eventsCounter);
            break;
        case 5:
            console.log(eventsCounter);
            break;
        case 6:
            console.log(eventsCounter);
            break;
        // May not need the below for all buttons...
        case 7:
            console.log(eventsCounter);
            break;
        case 8:
            console.log(eventsCounter);
            break;
        case 9:
            console.log(eventsCounter);
            break;
        default:
            break;
    }
}, 200)

const buttonFourSubmit = debounce(function() {
    switch (eventsCounter) {
        case 2:
            if (travelerID === 3) {
                sCounter++;
            }
            actionNumber--; 
            if(!(actionOneText.classList.contains(`hide`))) {
                actionOneText.classList.add(`hide`);
                actionOneBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].ask_for_help}`);
            break;
        case 3:
            console.log(eventsCounter);
            break;
        case 4:
            console.log(eventsCounter);
            break;
        case 5:
            console.log(eventsCounter);
            break;
        default:
            break;
    }
}, 200)

const buttonFiveSubmit = debounce(function() {
    switch (eventsCounter) {
        case 2:
            actionNumber--; 
            if(!(actionOneText.classList.contains(`hide`))) {
                actionOneText.classList.add(`hide`);
                actionOneBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_special}`);
            break;
        case 3:
            console.log(eventsCounter);
            break;
        case 4:
            console.log(eventsCounter);
            break;
        case 5:
            console.log(eventsCounter);
            break;
        default:
            break;
    }
}, 200);

function getGoodDisplay() {
    axios.get(`${baseURL}/good-travelers-list`)
    .then(res => {
        console.log(res.data)

        let list = res.data;
        let count = 0;
        while (count < list.length) {
            console.log(list[count].name);
            goodView.innerHTML += `<br>${list[count].name}`
            count++;
        }
    })
    .catch(err => console.log(err));
}

const addToGood = debounce(function() {
    eventsCounter++;

    let body = {
        id: travelerID
    }

    axios.post(`${baseURL}/good-travelers`, body)
    .then(res => {
        getGoodDisplay();
        eventsCounter += 0.5;

        // let display = allTravelers.includes(travelerID);
        // viewText.innerHTML = `You place ${display}`;
    })
    .catch(err => console.log(err));
}, 200);

function getEvilDisplay() {
    axios.get(`${baseURL}/evil-travelers-list`)
    .then(res => {
        console.log(res.data)

        let list = res.data;
        let count = 0;
        while (count < list.length) {
            console.log(list[count].name);
            evilView.innerHTML += `<br>${list[count].name}`
            count++;
        }
    })
    .catch(err => console.log(err));
}

const addToEvil = debounce(function() {
    eventsCounter++;

    let body = {
        id: travelerID
    }

    axios.post(`${baseURL}/evil-travelers`, body)
    .then(res => {
        getEvilDisplay();
        eventsCounter += 0.5;
    })
    .catch(err => console.log(err));
}, 200);

function getUnsureDisplay() {
    axios.get(`${baseURL}/unsure-travelers-list`)
    .then(res => {
        console.log(res.data)

        let list = res.data;
        let count = 0;
        while (count < list.length) {
            console.log(list[count].name);
            unsureView.innerHTML += `<br>${list[count].name}`
            count++;
        }
    })
    .catch(err => console.log(err));
}

const addToUnsure = debounce(function() {
    eventsCounter++;

    let body = {
        id: travelerID
    }

    axios.post(`${baseURL}/unsure-travelers`, body)
    .then(res => {
        getUnsureDisplay();
        eventsCounter += 0.5;
    })
    .catch(err => console.log(err));
}, 200);

start();

const test = debounce(function() {

}, 200);

if (btnOneUsed === false) {
    actionOneBtn.addEventListener(`click`, test);
}
if (btnTwoUsed === false) {
    actionTwoBtn.addEventListener(`click`, buttonTwoSubmit);
}
if (btnThreeUsed === false) {
    actionThreeBtn.addEventListener(`click`, buttonThreeSubmit);
}
if (btnFourUsed === false) {
    actionFourBtn.addEventListener(`click`, buttonFourSubmit);
}
if (btnFiveUsed === false) {
    actionFiveBtn.addEventListener(`click`, buttonFiveSubmit);
}

goodBtn.addEventListener(`click`, addToGood);
evilBtn.addEventListener(`click`, addToEvil);
unsureBtn.addEventListener(`click`, addToUnsure);