document.addEventListener("DOMContentLoaded", function() {
    // Hide all elements
    animatePage.hideAll(".services ul li, .contact, .email a, .social-icons a");

    // Animate everything simultaneously
    setTimeout(() => {
        animatePage.animateSimultaneously(".services ul li, .contact, .email a", 60, 'text');
        animatePage.animateSimultaneously(".social-icons a", 400, 'non-text');
    }, 500); // Delay before starting the animations
});