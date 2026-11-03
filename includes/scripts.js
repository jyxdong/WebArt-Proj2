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

// Get the three text boxes and the form message.
let fields = document.getElementsByClassName("claim-box");
let hint = document.querySelector(".claim-hint");

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

//～Check each input.value before submitting the form.
document.querySelector(".submit-button").onclick = function() {
    if (
        fields[0].value !== "" &&
        fields[1].value !== "" &&
        fields[2].value !== ""
    ) {
        startReview();
    } else {
        hint.innerHTML = "<strong>Fill in all three boxes first.</strong>";
    }
};

// Appealing or refusing the offer starts another wait.
document.querySelector(".appeal-button").onclick = startReview;
document.querySelector(".no-button").onclick = startReview;

//～Each ending button opens its own final page instead of returning to the start.
document.querySelector(".give-up-button").onclick = function() {
    showPage("denied-final-page");
};
document.querySelector(".settle-button").onclick = function() {
    showPage("settled-final-page");
};
document.querySelector(".accept-button").onclick = function() {
    showPage("approved-final-page");
};
