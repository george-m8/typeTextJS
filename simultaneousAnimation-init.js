document.addEventListener("DOMContentLoaded", function() {
    // Hide all elements
    animatePage.hideAll(".services ul li, .contact, .email a, .social-icons a");

    // Animate text elements sequentially
    setTimeout(() => {

        // Animate text elements simultaneously
        animatePage.animateSimultaneously(".services ul li", 60, 'text');
        // After animate the contact and email elements sequentially
        animatePage.typeInSequence(".contact, .email a", 60, false, function() {
            // After text animation, fade in icons sequentially
            animatePage.fadeInSequence(".social-icons a", 400);
        });
    }, 500); // Delay before starting the animations
});