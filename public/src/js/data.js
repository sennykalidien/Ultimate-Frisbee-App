/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.data = (() => {

    function socket() {
        // Connect with socket
        var socket = io.connect("http://localhost:3010"),
            submit = document.querySelector("#submit"),
            btns = document.getElementsByTagName("button"),
            inputs = document.getElementsByClassName("team-input"),
            gameID = window.location.pathname.split('/')[2],
            team1_score_span = document.getElementById("team__home__info__score__span"),
            team2_score_span = document.getElementById("team__away__info__score__span");


        socket.on("dbupdate", function(json) {
          var data = JSON.parse(json);
          console.log(data);

            var updateScore1 = data.team_1_score,
                updateScore2 = data.team_2_score;

            replaceScores(updateScore1, updateScore2);
        });

        if ((document.querySelectorAll || document.querySelector) && ('forEach' in Array.prototype)) {
          hideInputs();
          showScores();
          scoreButtonListeners();
        }

        function replaceScores(score1, score2) {
          console.log(score1, score2);
          team1_score_span.innerHTML = score1;
          team2_score_span.innerHTML = score2;
        };

        function scoreButtonListeners() {
            [].forEach.call(btns, function(button) {
                button.classList.remove("hidden");
                button.classList.add("is-visible");
                button.addEventListener('click', function(index) {
                    return function() {
                        changeScore(index);
                    };
                }(button), false);
            });
        }

        function showScores() {
          team1_score_span.classList.remove("hidden");
          team2_score_span.classList.remove("hidden");
          team1_score_span.classList.add("is-visible");
          team2_score_span.classList.add("is-visible");
        }

        // Testing
        // function hideScores() {
        //   team1_score_span.classList.remove("is-visible");
        //   team2_score_span.classList.remove("is-visible");
        //   team1_score_span.classList.add("hidden");
        //   team2_score_span.classList.add("hidden");
        // }

        function hideInputs() {
            [].forEach.call(inputs, function(input) {
                input.classList.add("hidden");
            });
        }

        function changeScore(item) {
            var buttonId = item.id,
                score1 = document.querySelector('.team__home__info__score'),
                score2 = document.querySelector('.team__away__info__score'),
                gameID = window.location.pathname.split('/')[2],
                isFinal = false;

            if (buttonId === "team__home__minus") {
                var score1HTML = score1.innerHTML;
                var score2 = Number(score2.innerHTML);
                var newScore = Number(score1HTML) - 1;
                score1.innerHTML = newScore;

                console.log(newScore + " " + score2);

                addScore(newScore, score2, gameID, isFinal, false);

            } else if (buttonId === "team__away__minus") {
              var score2HTML = score2.innerHTML;
              var score1 = Number(score1.innerHTML);
              var newScore = Number(score2HTML) - 1;
              score2.innerHTML = newScore;

              console.log(score1 + " " + newScore);

              addScore(score1, newScore, gameID, isFinal, false);

            } else if (buttonId === "team__home__plus") {
              var score1HTML = score1.innerHTML;
              var score2 = Number(score2.innerHTML);
              var newScore = Number(score1HTML) + 1;
              score1.innerHTML = newScore;

              console.log(newScore + " " + score2);

              addScore(newScore, score2, gameID, isFinal, false);

            } else if (buttonId === "team__away__plus") {
              var score2HTML = score2.innerHTML;
              var score1 = Number(score1.innerHTML);
              var newScore = Number(score2HTML) + 1;
              score2.innerHTML = newScore;

              console.log(score1 + " " + newScore);

              addScore(score1, newScore, gameID, isFinal, false);
            }
        }

        // If submitted
        if (submit != null) {
            submit.addEventListener("click", function(e) {
                e.preventDefault();
                var score1 = document.querySelector(".team__home__info__score").innerHTML,
                    score2 = document.querySelector(".team__away__info__score").innerHTML,
                    userID = document.querySelector("#user_id").value;
                    isFinal = true;
                addScore(score1, score2, gameID, isFinal, userID);
                UFA.ux.showLoader();
            });
        }

        // Add score (min or plus for teams)
        function addScore(score1, score2, gameID, isFinal, userID) {
            // Send score to socket
            socket.emit('addScore', {
                score1: score1,
                score2: score2,
                gameID: gameID,
                isFinal: isFinal,
                userID: userID,
                time: Date.now()
            });
        }
    }

    return {
        socket: socket
    };

})();
