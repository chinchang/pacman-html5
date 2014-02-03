/**
 * Created by taraji on 1/2/14.
 */
function pxToCoord(xPx,yPx) {
    return {x:~~(xPx/tileW),y:~~(yPx/tileH)};
};

function coordToMap(x, y) {
    return (y*mapW + x);
};

var moveUp = function () {
    return {x:0, y:-1};
};
var moveDown =function() {
    return {x:0, y:1};
};
var moveLeft = function() {
    return {x:-1,y:0};
};
var moveRight = function() {
    return {x:1,y:0};
};


var canMoveRight = function(char, pos) {
    return (char.dirX != -1 || map[coordToMap(pos.x+1, pos.y)] != 1) ? true :  false;
};
var canMoveLeft = function (char, pos) {
    return (char.dirX != 1 || map[coordToMap(pos.x-1, pos.y)] != 1) ? true :  false;
};
var canMoveUp = function(char, pos) {
    return (char.dirY != 1 && map[coordToMap(pos.x, pos.y-1)] != 1) ? true : false;
};
var canMoveDown = function(char, pos) {
    return (char.dirY != -1 && map[coordToMap(pos.x, pos.y+1)] != 1) ? true : false;
};

function strategy (enemy, character) {
    var cX = enemy.x, cY = enemy.y, tX = character.x, tY = character.y;
    var pos = pxToCoord(cX,cY);

    var moveSomeWhere = function() {
        if (canMoveUp(enemy, pos)) {
            return moveUp();
        } else if(canMoveDown(enemy, pos)) {
            return moveDown();
        } else if(canMoveLeft(enemy, pos)) {
            return moveLeft();
        } else if(canMoveRight(enemy, pos)) {
            return moveRight();
        }
        debugger
    };


    if (cX > tX && canMoveLeft(enemy, pos)) {
        return moveLeft();
    } else if (cX < tX && canMoveRight(enemy, pos)) {
        return moveRight();
    } else if (cY > tY && canMoveUp(enemy, pos)) {
        return moveUp();
    } else if (cY < tY && canMoveDown(enemy, pos)) {
        return moveDown();
    } else {
        return moveSomeWhere();
    }
}



// Enemy personalities.
// Created by Pragun.
// Here be ghosts. You have been warned.

function inFrontOfPacman(pacman, steps)    {
    var mapLoc;

    if(pacman.dirY != 0) {
        if(pacman.dirY = 1)  {
            mapLoc.x = pxToCoord(pacman.x, pacman.y).x;
            mapLoc.y = pxToCoord(pacman.x, pacman.y) + steps;
        }
        else    {
            mapLoc.x = pxToCoord(pacman.x, pacman.y).x;
            mapLoc.y = pxToCoord(pacman.x, pacman.y) - steps;
        }
    }
    else    {
        if(pacman.dirX = 1)  {
            mapLoc.x = pxToCoord(pacman.x, pacman.y) + steps;
            mapLoc.y = pxToCoord(pacman.x, pacman.y);
        }
        else    {
            mapLoc.x = pxToCoord(pacman.x, pacman.y) - steps;
            mapLoc.y = pxToCoord(pacman.x, pacman.y).y;
        }
    }

    return mapLoc;
}


function getTarget(allEnemies, pacman, color) {
    switch(color) {
        case "red"  :
            target = pxToCoord(pacman.x, pacman.y);
            break;

        case "pink" :
            target = inFrontOfPacman(pacman, 4);
            break;

        case "blue" :
            target.x = 2 * ( inFrontOfPacman(pacman, 2) - pxToCoord(allEnemies("red").x, allEnemies("red").y).x );
            target.y = 2 * ( inFrontOfPacman(pacman, 2) - pxToCoord(allEnemies("red").x, allEnemies("red").y).y );
            break;

        case "orange"   :
            if( getStraightLineDistance(enemy, pacman) >= 8 )   {
                target = pxToCoord(pacman.x, pacman.y);
            }   else    {
                target = { x:1, y:1 };                      // replace (1,1) with fixed scatter target for orange
            }
    }

    return target;
}


function getStraightLineDistance(p1, p2)    {
    var dist = Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2);
    return ( Math.sqrt(dist) );
}


function whereToMove(enemy) {
    var curPos = pxToCoord(enemy.x, enemy.y);

    var nextMove;

    if( canMoveUp(enemy, curPos) )   {
        nextPos.x = curPos.x;
        nextPos.y = curPos.y - 1;
        nextMove.up = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.up = 99999;
    }

    if( canMoveDown(enemy, curPos) )   {
        nextPos.x = curPos.x;
        nextPos.y = curPos.y + 1;
        nextMove.down = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.down = 99999;
    }

    if( canMoveRight(enemy, curPos) )   {
        nextPos.x = curPos.x + 1;
        nextPos.y = curPos.y;
        nextMove.right = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.right = 99999;
    }

    if( canMoveLeft(enemy, curPos) )   {
        nextPos.x = curPos.x - 1;
        nextPos.y = curPos.y;
        nextMove.left = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.left = 99999;
    }

    if( nextMove.up < nextMove.down )   {
        if( nextMove.up <= nextMove.left )   {
            if( nextMove.up <= nextMove.right )  {
                moveUp();
            } else  {
                moveRight();
            }
        } else  {
            if( nextMove.left < nextMove.right )    {
                moveLeft();
            } else  {
                moveRight();
            }
        }
    } else {
        if( nextMove.down < nextMove.left )   {
            if( nextMove.down <= nextMove.right )  {
                moveDown();
            } else  {
                moveRight();
            }
        } else  {
            if( nextMove.left <= nextMove.right )    {
                moveLeft();
            } else  {
                moveRight();
            }
        }
    }

}