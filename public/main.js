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
const goodDiv = document.getElementById('good-travelers-div');
const evilDiv = document.getElementById('evil-travelers-div');
const unsureDiv = document.getElementById('unsure-travelers-div');

// View text element
const viewText = document.querySelector('#view-text');
const viewDiv = document.getElementById('view-div');

// Other Elements element
const dayVariable = document.querySelector('#day-number');
const mHealthNumber = document.querySelector('#mental-health-number');

// HTTP Request URL
const baseURL = `http://localhost:4040`;

// Declaration of various variables
// let dayNumber = 1;
let actionNumber = 1;
let timeOfDay = 'Morning';
let eventsCounter = 0;
let score = 0;
let hiddenScore = 0;

// Joe's variables
let joesAction = true;
let joesEventID = 0;
let joesEventsCounter = 0;
let morningEvents = [];
let noonEvents = [];
let eveningEvents = [];

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
let asked = false;
let sCounter = 0;
let checkedSpecial = false;
let easyCheck = -1
let mediumCheck = -1
let hardCheck = -1;
let unsureFilled = false;
let travelersToday = 0;

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

const restart = debounce(function() {
    // dayNumber = 1;
    actionNumber = 1;
    timeOfDay = 'Morning';
    eventsCounter = 0;
    score = 0;
    joesAction = true;
    joesEventID = 0;
    joesEventsCounter = 0;
    morningEvents = [];
    noonEvents = [];
    eveningEvents = [];
    gameDifficulty = 3;
    evilTravelers = gameDifficulty - (Math.ceil(gameDifficulty / 6) + 1);
    travelerID = 0;
    travelerCounter = -1;
    allTravelers = [];
    easyTravelers = [];
    mediumTravelers = [];
    hardTravelers = [];
    askForHelp = 0;
    asked = false;
    sCounter = 0;
    checkedSpecial = false;
    easyCheck = -1
    mediumCheck = -1
    hardCheck = -1;
    unsureFilled = false;
    travelersToday = 0;
    btnOneUsed = false;
    btnTwoUsed = false;
    btnThreeUsed = false;
    btnFourUsed = false;
    btnFiveUsed = false;
}, 500);

// The start of the app when it is first ran.
const start = debounce(function() {
    view = `Welcome to Joe the Guard!<br><br>
            In this simulator, you will play as Joe, the Guard and act as the sole guardian of whole may enter the Kingdom of Gloria. As you stand guard, you will meet with travelers and determine if they are safe travelers or if they have evil intentions. Or if you are unsure, you can send them to be held until the end of the day.<br><br>
            During this single day, you will also have a chance to take a break and give Joe a chance to recuperate his mental health. Keep in mind that his mental health contributes to your total score at the end of the day.<br><br>
            Please click START on the left when you are ready to begin!`;
    action = 'Start';

    // The below are functions that present the opening screen for users to see when it first renders.
    getView(view);
    displayActionOne(action);
    displayActionNumber(actionNumber);
    // displayDayNumber(dayNumber);
    joesHealth(0);
    getTravelers();
    getJoesEvents();
}, 1000);

function shuffler(array) {
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
        shuffler(allTravelers);

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
// function displayDayNumber() {
//     dayVariable.innerHTML = dayNumber + `, ${timeOfDay}`;
// }

// Displays Joe's current mental health.
function displayMHealthNumber(num) {
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
    if (checkedSpecial === false) {
        if (easyCheck === sCounter || mediumCheck === sCounter || hardCheck === sCounter) {
            actionFiveBtn.classList.remove('hide');
            actionFiveText.classList.remove('hide');
        }
    } else {
        if (checkedSpecial === true) {
            if(!(actionFiveText.classList.contains(`hide`))) {
            actionFiveBtn.classList.add('hide');
            actionFiveText.classList.add('hide');
            }
        }
    }

    if (asked) {
        if(!(actionFourText.classList.contains(`hide`))) {
            actionFourBtn.classList.add('hide');
            actionFourText.classList.add('hide');
            }
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
    viewDiv.scrollTop = viewDiv.scrollHeight;
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
        displayMHealthNumber(body.mental_health);
        
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

    // Hiding the good, evil, and unsure buttons
    if (!(goodBtn.classList.contains(`hide`))) {
        goodBtn.classList.add(`hide`);
    }

    if (!(evilBtn.classList.contains(`hide`))) {
        evilBtn.classList.add(`hide`);
    }

    if (!(unsureBtn.classList.contains(`hide`))) {
        unsureBtn.classList.add(`hide`);
    }
}

// A get request to pull the next event for Joe.
function getJoesEvents() {
    axios.get(`${baseURL}/joes-action`)
    .then(res => {
        let allEvents = res.data;
        shuffler(allEvents);

        allEvents.forEach(event => {
            if (event.time_of_day === 'Morning') {
                if (morningEvents.length <= gameDifficulty) {
                    morningEvents.push(event);
                }
            }

            if (event.time_of_day === 'Noon') {
                if (noonEvents.length <= gameDifficulty) {
                    noonEvents.push(event);
                }
            }
            
            if (event.time_of_day === 'Evening') {
                if (eveningEvents.length <= gameDifficulty) {
                    eveningEvents.push(event);
                }
            }
        })
    })
    .catch(err => console.log(err));
}

// This will refresh the event to the next main event.
function refreshJoeEvent() {
    clearView();

    if (timeOfDay === 'Morning') {    
        joesEventID = morningEvents[joesEventsCounter].joe_event_id;
        getView(morningEvents[joesEventsCounter].view_text);
        joeEventButtons(morningEvents[joesEventsCounter]);
    }

    if (timeOfDay === 'Noon') {    
        joesEventID = noonEvents[joesEventsCounter].joe_event_id;
        getView(noonEvents[joesEventsCounter].view_text);
        joeEventButtons(noonEvents[joesEventsCounter]);
    }

    if (timeOfDay === 'Evening') {    
        joesEventID = eveningEvents[joesEventsCounter].joe_event_id;
        getView(eveningEvents[joesEventsCounter].view_text);
        joeEventButtons(eveningEvents[joesEventsCounter]);
    }

    displayActionNumber(actionNumber);
}

function joeEventButtons(event) {
    if (event.hasOwnProperty(`button_one`)) {
        actionOneText.classList.remove(`hide`);
        actionOneBtn.classList.remove(`hide`);

        displayActionOne(event.button_one)
    } else if (!(actionOneText.classList.contains(`hide`))) {
        actionOneText.classList.add(`hide`);
        actionOneBtn.classList.add(`hide`);
    }

    if (event.hasOwnProperty(`button_two`)) {
        actionTwoText.classList.remove(`hide`);
        actionTwoBtn.classList.remove(`hide`);

        displayActionTwo(event.button_two)
    } else if (!(actionTwoText.classList.contains(`hide`))) {
        actionTwoText.classList.add(`hide`);
        actionTwoBtn.classList.add(`hide`);
    }

    if (event.hasOwnProperty(`button_three`)) {
        actionThreeText.classList.remove(`hide`);
        actionThreeBtn.classList.remove(`hide`);

        displayActionThree(event.button_three)
    } else if (!(actionThreeText.classList.contains(`hide`))) {
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

    // Resets action counter if need be.
    if (actionNumber === 0) {
        actionNumber = 3;
    }
}

function updateEventID() {
    let body = {
        id: joesEventID
    }
    axios.put(`${baseURL}/update`, body)
    .then()
    .catch(err => console.log(err));
}

function displayOutcome(num, event) {
    joesHealth(num);

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
    viewText.innerHTML = `Name: ${traveler.name}
                      <br>Age: ${traveler.age}
                      <br>Height: ${traveler.height}
                      <br>Weight: ${traveler.weight}`;

    getView(`<br><br> ${traveler.interrogate_traveler}`);

    displayActionOne('Inspect Features?');

    displayActionTwo('Inspect Clothing?');
    actionTwoText.classList.remove('hide');
    actionTwoBtn.classList.remove('hide');

    displayActionThree('Inspect Wares?');
    actionThreeText.classList.remove('hide');
    actionThreeBtn.classList.remove('hide');

    displayActionFour('Ask for help?');
    displayActionFive('Inspect ???');
    if (!(actionFiveText.classList.contains(`hide`))) {
        actionFiveText.classList.add(`hide`);
        actionFiveBtn.classList.add(`hide`);
    }

    goodBtn.classList.remove('hide');
    evilBtn.classList.remove('hide');
    unsureBtn.classList.remove('hide');

    // console.log(travelerID);
}

// Deletes good, evil, unsure, and all travelers maybe
function deleteAllSavedLists() {
    axios.delete(`${baseURL}/all-travelers`)
    .then()
    .catch(err => console.log(err));
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
            // Morning Joe Event
            case 1:
                updateEventID();
                switch (joesEventID) {
                    case 1:
                        score -= 2;
                        displayOutcome(10, 0);
                        break;
                    case 2:
                        score -= 2;
                        displayOutcome(10, 0);
                        break;
                    case 3:
                        score -= 2;
                        displayOutcome(10, 0);
                        break;
                    default:
                        break;
                }
                break;
            // Morning Event 1
            case 2:
                actionNumber--;

                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }

                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${easyTravelers[travelerCounter].inspect_features}`);
                break;
            // Morning Event 2
            case 3:
                actionNumber--; 

                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }

                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${easyTravelers[travelerCounter].inspect_features}`);
                break;
            // Morning Event 3
            case 4:
                actionNumber--; 
                
                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }
                
                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${easyTravelers[travelerCounter].inspect_features}`);
                break;
            // Noon
            case 4.5:
                if (actionOneText.innerHTML === 'Continue?') {
                    eventsCounter += 0.5;
                    timeOfDay = 'Noon';
                    // displayDayNumber();
                    refreshJoeEvent();
                    break;
                }
                break;
            // Noon Joe Event 1
            case 5:
                updateEventID();
                switch (joesEventID) {
                    case 4:
                        score -= 2;
                        displayOutcome(10, 0);
                        break;
                    case 5:
                        score += 2;
                        displayOutcome(-10, 0);
                        break;
                    case 6:
                        score -= 2;
                        displayOutcome(10, 0);
                        break;
                    default:
                        break;
                }
                break;
            // Noon Event 1
            case 6:
                actionNumber--;

                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }

                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${mediumTravelers[travelerCounter].inspect_features}`);
                break;
            // Noon Event 2
            case 7:
                actionNumber--; 

                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }

                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${mediumTravelers[travelerCounter].inspect_features}`);
                break;
            // Noon Event 3
            case 8:
                actionNumber--; 
                
                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }
                
                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${mediumTravelers[travelerCounter].inspect_features}`);
                break;
            // Evening
            case 8.5:
                if (actionOneText.innerHTML === 'Continue?') {
                    eventsCounter += 0.5;
                    timeOfDay = 'Evening';
                    // displayDayNumber();
                    refreshJoeEvent();
                    break;
                }
                break;
            // Evening Joe Event
            case 9:
                updateEventID();
                switch (joesEventID) {
                    case 7:
                        score -= 1;
                        displayOutcome(5, 0);
                        break;
                    case 8:
                        score -= 1;
                        displayOutcome(5, 0);
                        break;
                    case 9:
                        score -= 1;
                        displayOutcome(5, 0);
                        break;
                    default:
                        break;
                }
                break;
            // Evening Event 1
            case 10:
                actionNumber--;

                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }

                if (travelerID === 8) {
                    sCounter++;
                }

                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${hardTravelers[travelerCounter].inspect_features}`);
                break;
            // Evening Event 2
            case 11:
                actionNumber--; 

                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }

                if (travelerID === 8) {
                    sCounter++;
                }

                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${hardTravelers[travelerCounter].inspect_features}`);
                break;
            // Evening Event 3
            case 12:
                actionNumber--; 
                
                if (askForHelp === 0 && !asked) {
                    askForHelp++;
                }

                if (travelerID === 8) {
                    sCounter++;
                }
                
                if(!(actionOneText.classList.contains(`hide`))) {
                    actionOneText.classList.add(`hide`);
                    actionOneBtn.classList.add(`hide`);
                }
                getView(`<br><br>${hardTravelers[travelerCounter].inspect_features}`);
                break;
            // End
            case 12.5:
                if (actionOneText.innerHTML === 'Continue?') {
                    eventsCounter += 0.5;
                    actionNumber = 1;
                    timeOfDay = 'END';
                    displayActionNumber;
                    // displayDayNumber();
                    clearView();

                    if (actionTwoText.classList.contains(`hide`)) {
                        actionTwoText.classList.remove(`hide`);
                        actionTwoBtn.classList.remove(`hide`);
                    }
                    asked = true;
                    checkedSpecial = true;

                    getView(`Congrats! You've reached the end!<br><br>You scored a ${score + hiddenScore + Math.floor(+mHealthNumber.innerHTML / 2)} for your day in the life of Joe!`);

                    getView(`<br><br> For the ones that you put into unsure, we have provided you with the proper scoring adjustments already. Unfortunately, for fairness' sake, we will not be showing if you they are good or evil travelers.`)

                    actionOneText.innerHTML = `Restart?`;
                    actionTwoText.innerHTML = `Quit?`;
                    break;
                }
                break;
            case 13:
                if (!(actionTwoText.classList.contains(`hide`))) {
                    actionTwoText.classList.add(`hide`);
                    actionTwoBtn.classList.add(`hide`);
                }
                restart();
                deleteAllSavedLists();
                joesHealth(-100);
                clearView();
                start();
                getGoodDisplay();
                getEvilDisplay();
                getUnsureDisplay();
                break;
            default:

                // We increment our counters appropriately.
                eventsCounter += 0.5;
                travelerCounter++

                if (travelerCounter > 2) {
                    travelersToday++;
                    travelerCounter = 0;
                }

                // We also need to refresh the action counter.
                askForHelp = 0;
                sCounter = 0;
                checkedSpecial = false;
                actionNumber = 3;
                displayActionNumber();


                // This displays the next traveler's opening encounter.
                clearView();

                if (travelersToday === 0) {
                    easyCheck = easyTravelers[travelerCounter].special_counter;
                    displayTravelerEvent(easyTravelers[travelerCounter]);
                    travelerID = easyTravelers[travelerCounter].traveler_id;
                }
                if (travelersToday === 1) {
                    easyCheck = -1;
                    mediumCheck = mediumTravelers[travelerCounter].special_counter;
                    displayTravelerEvent(mediumTravelers[travelerCounter]);
                    travelerID = mediumTravelers[travelerCounter].traveler_id;
                }
                if (travelersToday === 2) {
                    mediumCheck = -1;
                    hardCheck = hardTravelers[travelerCounter].special_counter;
                    displayTravelerEvent(hardTravelers[travelerCounter]);
                    travelerID = hardTravelers[travelerCounter].traveler_id;
                }
                break;
        }
    }
}, 200)

const buttonTwoSubmit = debounce(function() {
    switch (eventsCounter) {
        case 1:
            updateEventID();
            switch (joesEventID) {
                case 1:
                    score += 2;
                    displayOutcome(-10, 1);
                    break;
                case 2:
                    score += 2;
                    displayOutcome(-10, 1);
                    break;
                case 3:
                    score -= 1;
                    displayOutcome(5, 1);
                    break;
                default:
                    break;
            }
            break;
        // Morning Event 1
        case 2:
            actionNumber--;

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }
            
            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Morning Event 2
        case 3:
            actionNumber--; 

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }
            
            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Morning Event 3
        case 4:
            actionNumber--; 
            
            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }
            
            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Noon Joe Event 1
        case 5:
            updateEventID();
            switch (joesEventID) {
                case 4:
                    score -= 1;
                    displayOutcome(5, 1);
                    break;
                case 5:
                    score -= 1;
                    displayOutcome(5, 1);
                    break;
                case 6:
                    score -= 1;
                    displayOutcome(5, 1);
                    break;
                default:
                    break;
            }
            break;
        // Noon Event 1
        case 6:
            actionNumber--;

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 5) {
                sCounter++;
            }

            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Noon Event 2
        case 7:
            actionNumber--; 

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 5) {
                sCounter++;
            }

            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Noon Event 3
        case 8:
            actionNumber--; 
            
            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 5) {
                sCounter++;
            }
            
            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Evening Joe Event
        case 9:
            updateEventID();
            switch (joesEventID) {
                case 7:
                    score -= 2;
                    displayOutcome(10, 1);
                    break;
                case 8:
                    score += 2;
                    displayOutcome(-10, 1);
                    break;
                case 9:
                    score += 2;
                    displayOutcome(-10, 1);
                    break;
                default:
                    break;
            }
            break;
        // Evening Event 1
        case 10:
            actionNumber--;
            
            if (travelerID === 12) {
                sCounter++;
            }

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Evening Event 2
        case 11:
            actionNumber--; 
            
            if (travelerID === 12) {
                sCounter++;
            }

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_clothing}`);
            break;
        // Evening Event 3
        case 12:
            actionNumber--; 
            
            if (travelerID === 12) {
                sCounter++;
            }

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }
            
            if(!(actionTwoText.classList.contains(`hide`))) {
                actionTwoText.classList.add(`hide`);
                actionTwoBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_clothing}`);
            break;
        // End
        case 13:
            restart();
            deleteAllSavedLists();
            joesHealth(-100);
            clearView();
            setTimeout(close(), 2000);
            break;
        default:
            break;
    }
}, 200)

const buttonThreeSubmit = debounce(function() {
    switch (eventsCounter) {
        case 1:
            updateEventID();
            switch (joesEventID) {
                case 1:
                    score -= 1;
                    displayOutcome(5, 2);
                    break;
                case 2:
                    score -= 2;
                    displayOutcome(10, 2);
                    break;
                case 3:
                    score += 2;
                    displayOutcome(-10, 2);
                    break;
                default:
                    break;
            }
            break;
        // Morning Event 1
        case 2:
            actionNumber--;

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 1 || travelerID === 3 || travelerID === 10) {
                sCounter++;
            }

            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_wares}`);
            break;
        // Morning Event 2
        case 3:
            actionNumber--; 

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 1 || travelerID === 3 || travelerID === 10) {
                sCounter++;
            }

            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_wares}`);
            break;
        // Morning Event 3
        case 4:
            actionNumber--; 
            
            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 1 || travelerID === 3 || travelerID === 10) {
                sCounter++;
            }

            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_wares}`);
            break;
        // Noon Joe Event 1
        case 5:
            updateEventID();
            switch (joesEventID) {
                case 4:
                    score += 2;
                    displayOutcome(-10, 2);
                    break;
                case 5:
                    score -= 2;
                    displayOutcome(10, 2);
                    break;
                case 6:
                    score += 2;
                    displayOutcome(-10, 2);
                    break;
                default:
                    break;
            }
            break;
        // Noon Event 1
        case 6:
            actionNumber--;

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 5 || travelerID === 11) {
                sCounter++;
            }

            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_wares}`);
            break;
        // Noon Event 2
        case 7:
            actionNumber--; 

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 5 || travelerID === 11) {
                sCounter++;
            }

            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_wares}`);
            break;
        // Noon Event 3
        case 8:
            actionNumber--; 
            
            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 5 || travelerID === 11) {
                sCounter++;
            }
            
            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_wares}`);
            break;
        // Evening Joe Event
        case 9:
            updateEventID();
            switch (joesEventID) {
                case 7:
                    score += 2;
                    displayOutcome(-10, 2);
                    break;
                case 8:
                    score -= 2;
                    displayOutcome(10, 2);
                    break;
                case 9:
                    score += 2;
                    displayOutcome(-10, 2);
                    break;
                default:
                    break;
            }
            break;
        // Evening Event 1
        case 10:
            actionNumber--;

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 7 || travelerID === 8 || travelerID === 9 || travelerID === 12) {
                sCounter++;
            }

            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_wares}`);
            break;
        // Evening Event 2
        case 11:
            actionNumber--; 

            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 7 || travelerID === 8 || travelerID === 9 || travelerID === 12) {
                sCounter++;
            }

            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_wares}`);
            break;
        // Evening Event 3
        case 12:
            actionNumber--; 
            
            if (askForHelp === 0 && !asked) {
                askForHelp++;
            }

            if (travelerID === 7 || travelerID === 8 || travelerID === 9 || travelerID === 12) {
                sCounter++;
            }
            
            if(!(actionThreeText.classList.contains(`hide`))) {
                actionThreeText.classList.add(`hide`);
                actionThreeBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_wares}`);
            break;
        default:
            break;
    }
}, 200)

const buttonFourSubmit = debounce(function() {
    switch (eventsCounter) {
        // Morning Event 1
        case 2:
            actionNumber--;

            if (travelerID === 2 || travelerID === 3 || travelerID === 4) {
                sCounter++
            }

            asked = true;

            getView(`<br><br>${easyTravelers[travelerCounter].ask_for_help}`);
            break;
        // Morning Event 2
        case 3:
            actionNumber--; 

            if (travelerID === 2 || travelerID === 3 || travelerID === 4) {
                sCounter++
            }

            asked = true;
            
            getView(`<br><br>${easyTravelers[travelerCounter].ask_for_help}`);
            break;
        // Morning Event 3
        case 4:
            actionNumber--;

            if (travelerID === 2 || travelerID === 3 || travelerID === 4) {
                sCounter++
            }
            
            asked = true;

            getView(`<br><br>${easyTravelers[travelerCounter].ask_for_help}`);
            break;
        // Noon Event 1
        case 6:
            actionNumber--;

            if (travelerID === 11) {
                sCounter++;
            }

            asked = true;

            getView(`<br><br>${mediumTravelers[travelerCounter].ask_for_help}`);
            break;
        // Noon Event 2
        case 7:
            actionNumber--;

            if (travelerID === 11) {
                sCounter++;
            }

            asked = true;

            getView(`<br><br>${mediumTravelers[travelerCounter].ask_for_help}`);
            break;
        // Noon Event 3
        case 8:
            actionNumber--;

            if (travelerID === 11) {
                sCounter++;
            }

            asked = true;

            getView(`<br><br>${mediumTravelers[travelerCounter].ask_for_help}`);
            break;
        // Evening Event 1
        case 10:
            actionNumber--;

            if (travelerID === 7 || travelerID === 9) {
                sCounter++;
            }

            asked = true;

            getView(`<br><br>${hardTravelers[travelerCounter].ask_for_help}`);
            break;
        // Evening Event 2
        case 11:
            actionNumber--;

            if (travelerID === 7 || travelerID === 9) {
                sCounter++;
            }

            asked = true;

            getView(`<br><br>${hardTravelers[travelerCounter].ask_for_help}`);
            break;
        // Evening Event 3
        case 12:
            actionNumber--;

            if (travelerID === 7 || travelerID === 9) {
                sCounter++;
            }

            asked = true;
            
            getView(`<br><br>${hardTravelers[travelerCounter].ask_for_help}`);
            break;
        default:
            break;
    }
}, 200)

const buttonFiveSubmit = debounce(function() {
    switch (eventsCounter) {
        // Morning Event 1
        case 2:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_special}`);
            break;
        // Morning Event 2
        case 3:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_special}`);
            break;
        // Morning Event 3
        case 4:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${easyTravelers[travelerCounter].inspect_special}`);
            break;
        // Noon Event 1
        case 6:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_special}`);
            break;
        // Noon Event 2
        case 7:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_special}`);
            break;
        // Noon Event 3
        case 8:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${mediumTravelers[travelerCounter].inspect_special}`);
            break;
        // Evening Event 1
        case 10:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_special}`);
            break;
        // Evening Event 2
        case 11:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_special}`);
            break;
        // Evening Event 3
        case 12:
            actionNumber--; 
            checkedSpecial = true;

            if(!(actionFiveText.classList.contains(`hide`))) {
                actionFiveText.classList.add(`hide`);
                actionFiveBtn.classList.add(`hide`);
            }
            getView(`<br><br>${hardTravelers[travelerCounter].inspect_special}`);
            break;
        default:
            break;
    }
}, 200);

function getGoodDisplay() {
    axios.get(`${baseURL}/good-travelers-list`)
    .then(res => {
        let list = res.data;
        let count = 0;
        goodView.innerHTML = '';
        while (count < list.length) {
            goodView.innerHTML += `<br>${list[count].name}`;
            count++;
        }
    })
    .catch(err => console.log(err));
}

function addToGood() {

    let body = {
        id: travelerID
    }

    axios.post(`${baseURL}/good-travelers`, body)
    .then(res => {
        asked = false;
        checkedSpecial = false;
        sCounter = 0;

        getGoodDisplay();

        let traveler = allTravelers.find(({ traveler_id }) => traveler_id === travelerID);
        viewText.innerHTML = `You let ${traveler.name} through the gates.`;
        continueBtn()

        // Update the mental health based on decision made.
        if (traveler.good === false) {
            score--;
            joesHealth(2);
        } else {
            score += 2;
        }

        goodDiv.scrollTop = goodDiv.scrollHeight;
        evilDiv.scrollTop = evilDiv.scrollHeight;
        unsureDiv.scrollTop = unsureDiv.scrollHeight;

        // To reset the number of actions for the continue section.
        actionNumber = 1;
        displayActionNumber();
        eventsCounter += 0.5;
    })
    .catch(err => console.log(err));
}

function getEvilDisplay() {
    axios.get(`${baseURL}/evil-travelers-list`)
    .then(res => {
        let list = res.data;
        let count = 0;
        evilView.innerHTML = '';
        while (count < list.length) {
            evilView.innerHTML += `<br>${list[count].name}`
            count++;
        }
    })
    .catch(err => console.log(err));
}

const addToEvil = debounce(function() {

    let body = {
        id: travelerID
    }

    axios.post(`${baseURL}/evil-travelers`, body)
    .then(res => {
        asked = false;
        checkedSpecial = false;
        sCounter = 0;

        getEvilDisplay();

        let traveler = allTravelers.find(({ traveler_id }) => traveler_id === travelerID)
        viewText.innerHTML = `You send ${traveler.name} to jail as a criminal.`;
        continueBtn();

        // Update the mental health based on decision made.
        if (traveler.good === true) {
            score--;
            joesHealth(2);
        } else {
            score += 2;
        }

        goodDiv.scrollTop = goodDiv.scrollHeight;
        evilDiv.scrollTop = evilDiv.scrollHeight;
        unsureDiv.scrollTop = unsureDiv.scrollHeight;

        // To reset the number of actions for the continue section.
        actionNumber = 1;
        displayActionNumber();
        eventsCounter += 0.5;
    })
    .catch(err => console.log(err));
}, 200);

function getUnsureDisplay() {

    axios.get(`${baseURL}/unsure-travelers-list`)
    .then(res => {
        let list = res.data;
        let count = 0;
        unsureView.innerHTML = '';
        while (count < list.length) {
            unsureView.innerHTML += `<br>${list[count].name}`
            count++;
        }
    })
    .catch(err => console.log(err));
}

const addToUnsure = debounce(function() {

    let body = {
        id: travelerID
    }

    axios.post(`${baseURL}/unsure-travelers`, body)
    .then(res => {
        asked = false;
        checkedSpecial = false;
        sCounter = 0;

        getUnsureDisplay();
        
        let traveler = allTravelers.find(({ traveler_id }) => traveler_id === travelerID).name;
        viewText.innerHTML = `You hold ${traveler} in the back room for questioning.`;
        continueBtn()

        // Update the mental health and score based on decision made.
        if (traveler.good === true) {
            hiddenScore++;
            joesHealth(1);
        } else if (traveler.good === false) {
            hiddenScore--;
            joesHealth(1);
        }

        goodDiv.scrollTop = goodDiv.scrollHeight;
        evilDiv.scrollTop = evilDiv.scrollHeight;
        unsureDiv.scrollTop = unsureDiv.scrollHeight;

        // To reset the number of actions for the continue section.
        actionNumber = 1;
        displayActionNumber();
        eventsCounter += 0.5;
    })
    .catch(err => console.log(err));
}, 200);

setTimeout(start(),2000);
if (btnOneUsed === false) {
    actionOneBtn.addEventListener(`click`, buttonOneSubmit);
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