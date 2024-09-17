(function(global) {
    // Helper function to escape special characters in the text to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML; // Ensures any special characters are escaped
    }

    // Function to type out an element with letters wrapped in spans and animate opacity or visibility (for text elements)
    function typeEffect(element, speed, maintainSpace, callback) {
        let text = element.textContent;
        element.textContent = ""; // Clear text content

        let htmlWithSpans = "";
        for (let char of text) {
            htmlWithSpans += `<span>${escapeHtml(char)}</span>`;
        }
        element.innerHTML = htmlWithSpans; // Set the element's HTML with spans

        element.style.visibility = "visible"; // Make the element visible

        let i = 0;
        const spans = element.querySelectorAll('span'); // Select all span-wrapped characters

        element.classList.add('type-animation-started'); // Add class if needed for styling
        if (maintainSpace) {
            spans.forEach(span => {
                span.style.opacity = 0; // Initially invisible
                span.style.transition = `opacity ${speed / 1000}s`; // Set transition speed
            });
        } else {
            element.classList.add('cursor');
            spans.forEach(span => {
                span.style.display = 'none'; // Initially hide all letters
            });
        }

        function typing() {
            if (i < spans.length) {
                if (maintainSpace) {
                    spans[i].style.opacity = 1;
                } else {
                    spans[i].style.display = 'inline';
                }
                i++;
                setTimeout(typing, speed);
            } else {
                element.classList.remove('cursor');
                element.textContent = text; // Restore original content
                if (callback) callback();
            }
        }
        typing();
    }

    // Function to fade in non-text elements
    function fadeEffect(element, speed, callback) {
        element.style.visibility = "visible";
        element.style.opacity = 0;
        element.style.transition = `opacity ${speed / 1000}s`;
        element.style.opacity = 1;
        setTimeout(() => {
            if (callback) callback();
        }, speed);
    }

    // Exposed Functions

    // Hide all selected elements
    function hideAll(selectors) {
        const elements = document.querySelectorAll(selectors);
        elements.forEach(item => {
            item.style.visibility = "hidden"; // Hide elements immediately
        });
    }

    // Animate text elements in sequence
    function typeInSequence(selectors, speed, maintainSpace = false, callback) {
        const elements = document.querySelectorAll(selectors);
        let index = 0;
        function processNext() {
            if (index < elements.length) {
                typeEffect(elements[index], speed, maintainSpace, processNext);
                index++;
            } else if (callback) {
                callback();
            }
        }
        processNext();
    }

    // Animate non-text elements in sequence
    function fadeInSequence(selectors, speed, callback) {
        const elements = document.querySelectorAll(selectors);
        let index = 0;
        function processNext() {
            if (index < elements.length) {
                fadeEffect(elements[index], speed, processNext);
                index++;
            } else if (callback) {
                callback();
            }
        }
        processNext();
    }

    // Animate elements simultaneously
    function animateSimultaneously(selectors, speed, type, maintainSpace = false, callback) {
        const elements = document.querySelectorAll(selectors);
        let animationsRemaining = elements.length;

        elements.forEach(item => {
            if (type === 'text') {
                typeEffect(item, speed, maintainSpace, () => {
                    animationsRemaining--;
                    if (animationsRemaining === 0 && callback) {
                        callback();
                    }
                });
            } else {
                fadeEffect(item, speed, () => {
                    animationsRemaining--;
                    if (animationsRemaining === 0 && callback) {
                        callback();
                    }
                });
            }
        });
    }

    // Expose these functions to the global scope
    global.animatePage = {
        hideAll: hideAll,
        typeInSequence: typeInSequence,
        fadeInSequence: fadeInSequence,
        animateSimultaneously: animateSimultaneously
    };

})(window);
