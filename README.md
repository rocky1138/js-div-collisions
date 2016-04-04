# js-div-collisions 1.0
HTML element collision detection library. Does one div touch another?

[Live Demo](https://johnrockefeller.net/js-div-collisions/) or take a look at example.html for a basic gist on how to use it.

This is the engine used in [Super Markup World](http://www.supermarkupworld.com), a game where players must learn HTML+CSS in order to build platforms to jump across in order to reach the end goal in each level.

## How it works

There are two main components to js-div-collisions:

1. On page load, instructing js-div-collisions to search the page for obstacles, found by CSS class name, e.g., .platform. If your platforms move, this must be done every iteration through the game loop.
2. In the game loop, instructing js-div-collisions to check for collisions between your player and elements with any of your obstacle CSS class names.

## Installation

1. Include the collisions.min.js JS file in your <head> block.
2. Load your HTML level.
3. Create a variable to contain all of your obstacles:  `var obstacles = Collision.updateObstacles('platform'); // <div class='platform'></div>`
4. Define the CSS id of the player element: `Collision.setTargetId('player'); // <div id='player'></div>`
5. Begin your game loop.
6. Iterate through collisions, if any were found.
  ```
  var collisions = Collision.getCollisions(),
      i,
      numCollisions = [];

      // Are there any collisions this frame?
      numCollisions = collisions.length;
    
      // Find out what they're touching.
      for (i = 0; i < numCollisions; i++) {
      }
  ```
7. Handle any collisions in the for-loop.

## Collision object values

In the for-loop above, a collision at any given element in the array might look like the object below. Plenty of information is given in order for you to handle it with respect to your game logic.
```
collision[i] = {
  horizontalEDiff, // how far into the East side of the obstacle the player has collided.
  horizontalWDiff, // how far into the West side of the obstacle the player has collided.
  obstacle {
    className, // CSS class name of obstacle (e.g., lava, water, platform).
    rect { // Details about the dimensions of the obstacle (how tall it is, where it is on screen).
      bottom,
      height,
      left,
      right,
      top,
      width
    }
  },
  touchingEast,  // boolean: Is the player touching the East side of the obstacle?
  touchingNorth, // boolean: Is the player touching the North side of the obstacle?
  touchingSouth, // boolean: Is the player touching the South side of the obstacle?
  touchingWest,  // boolean: Is the player touching the West side of the obstacle?
  verticalSDiff, // how far into the South side of the obstacle the player has collided.
  verticalNDiff  // how far into the North side of the obstacle the player has collided.
}
```
