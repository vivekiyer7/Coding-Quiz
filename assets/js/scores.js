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
        let highScores = JSON.parse(localStorage.getItem('highscoresstorage')) || [];
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
      localStorage.removeItem('highscoresstorage');
  
      // Clear the displayed high scores on the page
      let highScoreList = document.getElementById('highscores');
      highScoreList.innerHTML = '';
    }
  });
  
