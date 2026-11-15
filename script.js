alert("Javascript is working!");

//Game variables
let score = 0; //tracks current points
let isJumping = false; //prevents double jumps
let gameOver = false; //stops movement after collision
let gameInterval;

//Game elements
let player = document.getElementById("player");
let hunter = document.getElementById("hunter");
let gameArea = document.getElementById("gameArea");

//Hunter variables
let hunterX = 0;
let hunterSpeed = 5;

//User presses Space to jump
function jump()
{
    if(isJumping == false && gameOver == false)
    {
        isJumping = true;

        player.style.bottom = "130px"; //changes the player's position

        setTimeout(function()
        {

            player.style.bottom = "10px";

            isJumping = false;

        }, 600);
    }
}

//Spawns the hunter to the right, moves left, disappears and then respawns
function moveHunter()
{
    hunterX = hunterX - hunterSpeed;

    hunter.style.left = hunterX + "px"; //the hunter moves 5 pixels to the left

    if(hunterX < -hunter.offsetWidth)
    {
        hunterX = gameArea.clientWidth;

        score++;

        updateScore();
    }

}

//If the hunter touches the Werecheetah or the cheetah collides with anything then the game is over
function checkCollision()
{
    let playerPosition = player.getBoundingClientRect();

    let hunterPosition = hunter.getBoundingClientRect();

    if(playerPosition.right > hunterPosition.left &&
       playerPosition.left < hunterPosition.right &&
       playerPosition.bottom > hunterPosition.top &&
       playerPosition.top < hunterPosition.bottom)
       {

            gameOver = true;

            clearInterval(gameInterval);

            document.getElementById("gameStatus").innerHTML = "GAME OVER!";
       }
    
}

//Points are added every time the hunter is avoided
function updateScore()
{
    document.getElementById("score").innerHTML = score;
}

//Main game loop
function gameLoop()
{
    if(gameOver == false)
    {
        moveHunter();

        checkCollision();
    }

}

//Keyboard controls

document.addEventListener("keydown", function(event)
{
    if(event.code == "Space")
    {
        event.preventDefault();

        jump();
    }
});

//Start game

hunterX = gameArea.clientWidth;
hunter.style.left = hunterX + "px";
gameInterval = setInterval(gameLoop, 20);

