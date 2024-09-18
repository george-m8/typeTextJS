// Dependency: typeText.js

// Hide all elements then type them in sequence. Elements are typed in sequence, then icons are faded in sequentially.
document.addEventListener("DOMContentLoaded", function() {
    // Hide all elements initially
    animatePage.hideAll(".class div a, .class2 span, .class3 a, .class4 h3");

    // Animate text elements sequentially
    setTimeout(() => {
        //animatePage.typeInSequence("selector(s)", speed, maintainSpace, function() {
        animatePage.typeInSequence(".class div a, .class2 span, .class3 a", 60, false, function() {
            // After text animation, fade in icons sequentially
            //animatePage.fadeInSequence("selector(s)", speed);
            animatePage.fadeInSequence(".class4 h3", 400);
        });
    }, 500); // Delay before starting the animations
});


// Alternatively, animate items simultaneously:
// The script below will hide all elements initially, then animate all text elements simultaneously. Since the same function can not be used for text and icons, I've duplicated the function with different parameters for icons.
document.addEventListener("DOMContentLoaded", function() {
    // Hide all elements
    animatePage.hideAll(".class div a, .class2 span, .class3 a, .class4 h3");

    // Animate text elements sequentially
    setTimeout(() => {

        // Animate text elements simultaneously
        //animatePage.animateSimultaneously("selector(s)", speed, 'type');
        animatePage.animateSimultaneously(".class div a, .class2 span, .class3 a, .class4 h3", 60, 'text');
        // Icons within selector will fade in at the same time. fadeInSequence() could be used to fade in icons sequentially in a similar manner to the text elements.
        animatePage.animateSimultaneously(".icon-class i", 60, 'icon');
    }, 500); // Delay before starting the animations
});
