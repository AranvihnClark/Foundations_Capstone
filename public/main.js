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

const baseURL = `http://localhost:4040`;

let dayNumber = 1;
let actionNumber = 1;
let timeOfDay = 'Morning';
let joesAction = true;

function start() {
    viewText.innerHTML = 'Hello. Welcome to Joe the Guard. Please click START on the left when you are ready to begin!';
}

function displayDayNumber() {
    dayVariable.innerHTML = dayNumber + `, ${timeOfDay}`;
}

function displayActionNumber() {
    actionVariable.innerHTML = actionNumber;
}

function displayActions() {
    let responseOne = `Start?`;

    actionOneText.innerHTML = responseOne;
}

function getView(view) {
    viewText.innerHTML = `${view}`;
}

function buttonSubmit() {
    axios.get(`${baseURL}`)
    .then(res => {
        // actionNumber = 3;
        // joesAction = false;

        // viewText.innerHTML = `test`;
        console.log(res.data);
        getView(res.data);
    })
    .catch(err => console.log(err));
}

displayDayNumber();
displayActionNumber();
displayActions();
start();

actionOneBtn.addEventListener(`click`, buttonSubmit);