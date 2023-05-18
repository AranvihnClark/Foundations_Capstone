// Day number element
const dayVariable = document.querySelector('#day-number');

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

// View text element
const viewText = document.querySelector('#view-text');

// HTTP Request URL
const baseURL = `http://localhost:4040`;

// Declaration of various variables
let dayNumber = 1;
let actionNumber = 1;
let timeOfDay = 'Morning';
let travelerID = 0;
let eventsID = 0;
let joesAction = true;

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
}

// Displays the number of day the user is currently on.
function displayDayNumber() {
    dayVariable.innerHTML = dayNumber + `, ${timeOfDay}`;
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

// Displays the view window with text.
function getView(view) {
    viewText.innerHTML = `${view}`;
}

// Displays the continue button after each choice is made.
// Necessary so the user has enough time to read the view before moving to the next event.
function continueBtn() {

    // This should never be needed but just in case if a glitch happens, this will make sure the button is revealed.
    actionOneText.classList.remove(`hide`);
    actionOneBtn.classList.remove(`hide`);

    displayActionOne(`Continue?`)

    // The below wlil be used to hide all other buttons if they don't already exist.
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
    axios.get(`${baseURL}/next-action`)
    .then(res => {
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

function refreshTravelerEvent() {
    if (res.data[0].hasOwnProperty(`occupation`)) {
        travelerID = res.data[0].occupation;
    }
}

const buttonOneSubmit = debounce(function() {
    if (actionOneText.innerHTML === 'Start') {
        eventsID++;
        refreshJoeEvent();
        return;
    }
    switch (eventsID) {
        case 1:
            axios.get(`${baseURL}/outcome`)
            .then(res => {
                getView(`${res.data[0].response}`)

                actionNumber--;
                displayActionNumber();
                continueBtn();
            })
            .catch(err => console.log(err));
            break;
        case 2:
            console.log(eventsID);
            break;
        case 3:
            console.log(eventsID);
            break;
        case 4:
            console.log(eventsID);
            break;
        case 5:
            console.log(eventsID);
            break;
        case 6:
            console.log(eventsID);
            break;
        case 7:
            console.log(eventsID);
            break;
        case 8:
            console.log(eventsID);
            break;
        case 9:
            console.log(eventsID);
            break;
        default:
            break;
    }
}, 200)

const buttonTwoSubmit = debounce(function() {
    switch (eventsID) {
        case 1:
            axios.get(`${baseURL}/outcome`)
            .then(res => {
                getView(res.data[1].response)

                actionNumber--;
                displayActionNumber();
                continueBtn();
            })
            .catch(err => console.log(err));
            break;
        case 2:
            console.log(eventsID);
            break;
        case 3:
            console.log(eventsID);
            break;
        case 4:
            console.log(eventsID);
            break;
        case 5:
            console.log(eventsID);
            break;
        case 6:
            console.log(eventsID);
            break;
        case 7:
            console.log(eventsID);
            break;
        case 8:
            console.log(eventsID);
            break;
        case 9:
            console.log(eventsID);
            break;
        default:
            break;
    }
}, 200)

const buttonThreeSubmit = debounce(function() {
    switch (eventsID) {
        case 1:
            axios.get(`${baseURL}/outcome`)
            .then(res => {
                getView(res.data[2].response)

                actionNumber--;
                displayActionNumber();
                continueBtn();
            })
            .catch(err => console.log(err));
            break;
        case 2:
            console.log(eventsID);
            break;
        case 3:
            console.log(eventsID);
            break;
        case 4:
            console.log(eventsID);
            break;
        case 5:
            console.log(eventsID);
            break;
        case 6:
            console.log(eventsID);
            break;
        case 7:
            console.log(eventsID);
            break;
        case 8:
            console.log(eventsID);
            break;
        case 9:
            console.log(eventsID);
            break;
        default:
            break;
    }
}, 200)

const buttonFourSubmit = debounce(function() {
    
}, 200)

const buttonFiveSubmit = debounce(function() {
    
}, 200)

start();

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