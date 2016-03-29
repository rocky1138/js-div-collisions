/**
 * js-div-collisions
 * Copyright (C) 2016 John Rockefeller <jrockefeller1@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

var Collision;

(function () {
    
    'use strict';

    Collision = {
        
        targetId: null,
        obstacles: [],
        
        /**
         * Probably your player. This is the thing we're going to check
         * to see if it's rubbed up against anything.
         * @param {string} id - the CSS id of your player/target.
         */
        setTargetId: function (id) {
            this.targetId = id;
        },
        
        /**
         * Updating this every frame is not required, only the first time
         * that obstacles are placed on the screen or whenever they are updated.
         * If you have stationary obstacles, this only needs to be run once :)
         * @param {string} selector - CSS class name to select.
         */
        updateObstacles: function (selector) {
            
            var i,
                elements = document.getElementsByClassName(selector),
                numElements = elements.length,
                obstacle;
            
            this.obstacles = [];
            
            for (i = 0; i < numElements; i++) {
                
                obstacle = {
                    'className': elements[i].className,
                    'rect': elements[i].getBoundingClientRect()
                };                
                this.obstacles.push(obstacle);
            }
        },
        
        /**
         * This should be run every frame in your game.
         * The compares the player position against known obstacles in your scene.
         * @return {array} collisions.
         */
        getCollisions: function () {
            
            var i,
                collision,
                collisions = [],
                horizontalEDiff,
                horizontalWDiff,
                numObstacles = this.obstacles.length,
                targetElement = document.getElementById(this.targetId).getBoundingClientRect(),
                touchingEast,
                touchingNorth,
                touchingSouth,
                touchingWest,
                obstacle,
                verticalSDiff,
                verticalNDiff;
            
            for (i = 0; i < numObstacles; i++) {

				horizontalEDiff = 0;
                horizontalWDiff = 0;
				touchingEast = false;
                touchingNorth = false;
                touchingSouth = false;
                touchingWest = false;
                verticalSDiff = 0;
                verticalNDiff = 0;
			
                obstacle = this.obstacles[i];
				
				// Is the target within the left and right area of the obstacle.
				if (targetElement.left + targetElement.width > obstacle.rect.left && targetElement.left < obstacle.rect.left + obstacle.rect.width) {
					
					verticalSDiff = obstacle.rect.top + obstacle.rect.height - targetElement.top;
					verticalNDiff = obstacle.rect.top - targetElement.top;

					if (verticalSDiff >= 0 && verticalSDiff < targetElement.height) {
						touchingSouth = true;
					} else if (verticalNDiff >= 0 && verticalNDiff < targetElement.height) {
						touchingNorth = true;
					}
					
					horizontalEDiff = obstacle.rect.left + obstacle.rect.width - targetElement.left;
					horizontalWDiff = obstacle.rect.left - targetElement.left;
				
					if (horizontalEDiff >= 0 && horizontalEDiff < targetElement.width) {
						touchingEast = true;
					} else if (horizontalWDiff >= 0 && horizontalWDiff < targetElement.width) {
						touchingWest = true;
					}
				}
				
                if (targetElement.left < obstacle.rect.left + obstacle.rect.width &&
                    targetElement.left + targetElement.width > obstacle.rect.left &&
                    targetElement.top < obstacle.rect.top + obstacle.rect.height &&
                    targetElement.height + targetElement.top > obstacle.rect.top) {

                    collision = {
                        'obstacle': obstacle,
                        'horizontalEDiff': horizontalEDiff,
                        'horizontalWDiff': horizontalWDiff,
                        'touchingEast': touchingEast,
                        'touchingNorth': touchingNorth,
                        'touchingSouth': touchingSouth,
                        'touchingWest': touchingWest,
                        'verticalSDiff': verticalSDiff,
                        'verticalNDiff': verticalNDiff
                    };
                    collisions.push(collision);
                }
            }
            return collisions;
        }
    };
}());