let fileClaimButton = document.getElementById("file-claim-button");
let keepWaitingButton = document.getElementById("keep-waiting-button");


// hover listeners to button.
function addHoverListener(button) {

    button.addEventListener("mouseenter", function() {
        button.className = "button button-hover";
    });

    // Change back to the default variant when mouse leaves 
    button.addEventListener("mouseleave", function() {
        button.className = "button";
    });

}


addHoverListener(fileClaimButton);
addHoverListener(keepWaitingButton);
