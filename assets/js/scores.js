document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the high scores from local storage on page load
    // Store the scores in an array
    // Display the scores on the page
    displayhighScore();
  
    // Clear High Scores button
    var clearBtn = document.querySelector('#clear');
    clearBtn.addEventListener('click', function () {
      clearhighScore();
    });
  
    function displayhighScore() {
        console.log('displayHighScore');
        
        // Retrieve high scores from local storage
        let highScores = JSON.parse(localStorage.getItem('highscoresstorage')) || [];
        
        console.log(highScores);
        
        // Display the scores on the page
        let highScoreList = document.getElementById('highscores');
        
        // Clear existing content
        highScoreList.innerHTML = '';
    
        // Sort scores by score property in descending order
        highScores.sort((a, b) => b.score - a.score);

        // Loop through highScores and create list items
        highScores.forEach((score, index) => {
            let listItem = document.createElement('li');
            listItem.textContent = `${score.initials} : ${score.score}`;
            highScoreList.appendChild(listItem);
        });
    }
    
  
    function clearhighScore() {
      // Clear high scores in local storage
      localStorage.removeItem('highScores');
  
      // Clear the displayed high scores on the page
      let highScoreList = document.getElementById('highScoreList');
      highScoreList.innerHTML = '';
    }
  });
  
