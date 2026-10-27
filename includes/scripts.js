//Codex assisted in this logic: help me to switch between pages by having a class for pages in html
// one screen using a class name passed into this function
let pages = document.getElementsByClassName("page");
function showPage(pageClass) {
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    document.querySelector("." + pageClass).style.display = "block";
}

//～Reuse one hover function for every button, including the mouseleave event.
function addHoverListener(button) {
    let originalClass = button.className;
    button.addEventListener("mouseenter", function() {
        button.className = originalClass + " button-hover";
    });
    button.addEventListener("mouseleave", function() {
        button.className = originalClass;
    });
}
let buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++) {
    addHoverListener(buttons[i]);
}

// Open the claim form from the airport screen.
document.querySelector(".start-button").onclick = function() {
    showPage("claim-page");
};

//～Use matching positions in two lists to copy each clicked fact into its box.
let truths = document.getElementsByClassName("truth");
let fields = document.getElementsByClassName("claim-box");
let hint = document.querySelector(".claim-hint");
for (let i = 0; i < truths.length; i++) {
    truths[i].onclick = function() {
        fields[i].innerHTML = truths[i].innerHTML;
        hint.innerHTML = "Click each fact to fill the form →";
    };
}

// Store the waiting time and the current review round.
let days = 0;
let reviewRound = 0;
let dayLength = 1000;
let daysPerReview = 21;

//～Split the day count into two digits with % and update the result text.
function updateDays() {
    let digits = document.getElementsByClassName("day-digit");
    digits[0].innerHTML = Math.floor(days / 10);
    digits[1].innerHTML = days % 10;
    let messages = document.getElementsByClassName("result-days");
    for (let i = 0; i < messages.length; i++) {
        messages[i].innerHTML = "You waited " + days + " days.";
    }
}

//～Combine the class timer example with three rounds of review results.
function startReview() {
    reviewRound++;
    let daysThisReview = 0;
    showPage("review-page");
    updateDays();
    let timer = setInterval(function() {
        days++;
        daysThisReview++;
        updateDays();
        if (daysThisReview === daysPerReview) {
            clearInterval(timer);
            if (reviewRound === 1) {
                showPage("declined-page");
            } else if (reviewRound === 2) {
                showPage("offer-page");
            } else {
                showPage("approved-page");
            }
        }
    }, dayLength);
}

// Submit the completed form, or ask the visitor to fill it first.
document.querySelector(".submit-button").onclick = function() {
    if (
        fields[0].innerHTML === truths[0].innerHTML &&
        fields[1].innerHTML === truths[1].innerHTML &&
        fields[2].innerHTML === truths[2].innerHTML
    ) {
        startReview();
    } else {
        hint.innerHTML = "<strong>Click all three facts first.</strong>";
    }
};

// Appealing or refusing the offer starts another wait.
document.querySelector(".appeal-button").onclick = startReview;
document.querySelector(".no-button").onclick = startReview;

// Accepting the final result changes the button text and stays on this screen.
document.querySelector(".accept-button").onclick = function() {
    document.querySelector(".accept-button .button-text").innerHTML = "Accepted";
};

//～Give several buttons a click handler that clears all boxes and starts over.
let restartButtons = document.getElementsByClassName("restart-button");
for (let i = 0; i < restartButtons.length; i++) {
    restartButtons[i].onclick = function() {
        days = 0;
        reviewRound = 0;
        for (let j = 0; j < fields.length; j++) {
            fields[j].innerHTML = "Click a fact";
        }
        hint.innerHTML = "Click each fact to fill the form →";
        showPage("airport-page");
    };
}
