
document.addEventListener("DOMContentLoaded", function() {
    // Hide all elements initially
    animatePage.hideAll(".services ul li, .contact, .email a, .social-icons a");

    // Animate text elements sequentially
    setTimeout(() => {
        animatePage.typeInSequence(".services ul li, .contact, .email a", 60, false, function() {
            // After text animation, fade in icons sequentially
            animatePage.fadeInSequence(".social-icons a", 400);
        });
    }, 500); // Delay before starting the animations
});

