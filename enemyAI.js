/**
 * Created by taraji on 1/2/14.
 */
function pxToCoord(xPx,yPx) {
    return {x:~~(xPx/tileW),y:~~(yPx/tileH)};
};

function coordToMap(x, y) {
    return (y*mapW + x);
};

function strategy (enemy, character) {
    var cX = enemy.x, cY = enemy.y, tX = character.x, tY = character.y;
    var pos = pxToCoord(cX,cY);


    var canMoveRight = function() {
        return (enemy.dirX != -1 || map[coordToMap(pos.x+1, pos.y)] != 1) ? true :  false;
    };
    var canMoveLeft = function () {
        return (enemy.dirX != 1 || map[coordToMap(pos.x-1, pos.y)] != 1) ? true :  false;
    };
    var canMoveUp = function() {
        return (enemy.dirY != 1 && map[coordToMap(pos.x, pos.y-1)] != 1) ? true : false;
    };
    var canMoveDown = function() {
        return (enemy.dirY != -1 && map[coordToMap(pos.x, pos.y+1)] != 1) ? true : false;
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
    var moveSomeWhere = function() {
        if (canMoveUp()) {
            return moveUp();
        } else if(canMoveDown()) {
            return moveDown();
        } else if(canMoveLeft()) {
            return moveLeft();
        } else if(canMoveRight()) {
            return moveRight();
        }
        debugger
    };


    if (cX > tX && canMoveLeft()) {
        return moveLeft();
    } else if (cX < tX && canMoveRight()) {
        return moveRight();
    } else if (cY > tY && canMoveUp()) {
        return moveUp();
    } else if (cY < tY && canMoveDown()) {
        return moveDown();
    } else {
        return moveSomeWhere();
    }
}



// Enemy personalities.
//
// Here be ghosts.

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
    }

    return target;
}


function getStraightLineDistance(p1, p2)    {
    var dist = Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2);
    return dist;
}


function whereToMove(enemy) {
    var curPos = pxToCoord(enemy.x, enemy.y);

    var nextMove;

    if( canMoveUp() )   {
        nextPos.x = curPos.x;
        nextPos.y = curPos.y - 1;
        nextMove.up = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.up = 99999;
    }

    if( canMoveDown() )   {
        nextPos.x = curPos.x;
        nextPos.y = curPos.y + 1;
        nextMove.down = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.down = 99997;
    }

    if( canMoveRight() )   {
        nextPos.x = curPos.x + 1;
        nextPos.y = curPos.y;
        nextMove.right = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.right = 99999;
    }

    if( canMoveLeft() )   {
        nextPos.x = curPos.x - 1;
        nextPos.y = curPos.y;
        nextMove.left = getStraightLineDistance(getTarget(allEnemies, pacman, enemy.color), nextPos);
    } else  {
        nextMove.left = 99998;
    }

    if( nextMove)

}