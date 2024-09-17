# typeTextJS
## Description
Using javascript and CSS to animate HTML elements with "typing", "typewrite", "typed" or "fade in" effect.

## From the creator
*"I wanted to use a typed effect on my simple landing page website but the solutions I found were't doing what I was after. CSS effects often mess up responsiveness or simply don't look very good and controlling sequential reveals is messy."*

## Demo pages
- [Sequential reveal demo](https://66e98e4ae41dee00084fbaa2--typetextjs.netlify.app/sequential-demo)
- [Simultaneous reveal demo](https://66e98e4ae41dee00084fbaa2--typetextjs.netlify.app/simultaneous-demo)

## Usage
### Adding to site
I've used versions of this script within a basic HTML demo site and on a Hugo/NPM site. This should be fairly easy to implement anywhere.
- Add 'typeText.js' to a directory and import the script

`<script src="typeText.js"></script>`
- Create or edit an itialisation file and add to the page inline, or via an import.
- Dictate selectors to be hidden on page load (this will hide the items once the page loads so that text will display without fallback). For example:

`animatePage.hideAll(".services ul li, .contact, .email a, .social-icons a");`
- Dictate (the same) selectors that should be animated. For example:
```
setTimeout(() => {
    animatePage.typeInSequence(".services ul li, .contact, .email a", 60, false, function() {
        // After text animation, fade in icons sequentially
        animatePage.fadeInSequence(".social-icons a", 400);
    });
}, 500); // Delay before starting the animations
```
### Animating text to appear sequentially
`animatePage.typeInSequence("ul li, div, a", 60, false)`

In the above example, all selectors within the function are typed out one after another in the order that they appear in the DOM.

### Animating text to appear simultaneously
`animatePage.animateSimultaneously("ul li", 60, 'text');`

All selectors found at this level will be animated at the same time. In the above example all list items will typed out at the same time. More selectors could be added, all will be typed simultaneously.

### Animating non text items
`animatePage.fadeInSequence(".social-icons a", 400);`

fadeInSequence() should be used to animate items that do not contain text. These will fade in sequentially. Two of these functions could be used simultaneously to have the icons appear at the same time as other effects take place.

### Animating multiple elements
Use javascript to control the behaviour and timing of animated text elements. An example can be seen within 'simultaneousAnimation-init.js':
```
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
```
### Functions
#### `typeInSequence()`
`animatePage.typeInSequence("css selectors", speed-number, preserve-space-bool)`

- CSS Selectors, string
    - List of css selectors to select elements to animate within function.
- Speed, float
    - Speed as a numeric value
- Preserve Space, bool
    - TRUE: Will use CSS opacity to hide letters, maintaining space on the page. WILL NOT ADD A CURSOR
    - FALSE: Will use CSS display to hide letters, element should grow with typed text. Can cause issues with layout. Cursor class is added to element.

#### `fadeInSequence()`
For use with non text items like images or icons.

`animatePage.fadeInSequence("css selector", speed);`

- CSS Selectors, string
    - List of css selectors to select elements to animate within function.
- Speed, float
    - Speed as a numeric value

#### `animateSimultaneously()`
`animatePage.animateSimultaneously("css selectors", speed, 'text');`

- CSS Selectors, string
    - List of css selectors to select elements to animate within function.
- Speed, float
    - Speed as a numeric value
- Text, string
    - Dictates if the input selectors are text or not text. Change the value to anything other than 'text' for a fade in effect.
        - If 'text', will use the typeInSequence() 
        - If not 'text', will use fadeInSequence()

## Issues and comments
- The type effect will mess up spans within content. 
- The type effect will mess up all inline elements within a selector, for example an a tag. To avoid, a tags should be specified at the lowest level.
    - For example, if you want to animate an a tag within a div, enter selector as div a. Using just div will remove the a tag on typing.
- No JS
    - The script will not hide any text if there is no JS so text should still be seen.
    - I plan to add a fallback using CSS for these situations. In my use of this script I've used a `<noscript>` block to add css animations to reveal each line subsequently.