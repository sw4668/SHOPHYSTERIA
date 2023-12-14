let totalPoints = 0; 




window.onload = function() {
    
    updateTrend();
      // Call updateTrend every 1000 milliseconds (1 second)
  setInterval(updateTrend, 1000);

  
  initSpinWheel();
  initOverlay();
  initAccessDenied();
  initTikTokFlashing();
  initQuiz();
}

function initSpinWheel (){
// Spinning wheel setup
const wheel = document.getElementById('spin-wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spin-button');
let angle = 0;
const segments = ["50", "50", "100", "100", "250", "250", "500", "1500"];
const colors = ["#FF10F0", "green", "blue", "#FFDB58", "purple", "orange", "pink", "cyan"];

function drawWheel() {
    const segAngle = 360 / segments.length;

    segments.forEach((seg, index) => {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, (segAngle * index) * Math.PI / 180, (segAngle * (index + 1)) * Math.PI / 180);
        ctx.lineTo(150, 150);
        ctx.fillStyle = colors[index];
        ctx.fill();

        // Add text
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate((segAngle * index + segAngle / 2) * Math.PI / 180);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText(seg + " points", 130, 10);
        ctx.restore();
    });
}

drawWheel();


function spin() {
    angle += 10; // Increase the angle for each spin
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-150, -150);
    drawWheel();
    ctx.restore();

    if (angle < 3600) { // Spin for 10 rotations
      requestAnimationFrame(spin);
    } else {
      angle = 0;
      const winningSegment = segments[Math.floor(Math.random() * segments.length)];
      alert("You won " + winningSegment + " influence points! Use points to browse and buy! Earn influence by tagging us on social media*!!!                                 *must have over 5k followers.");

       // Update total points and display
       totalPoints += parseInt(winningSegment); // Ensure winningSegment is parsed as an integer
        document.getElementById('total-points').textContent = totalPoints;
 
       enableSpinButton(); // Enable the button after spinning
     }
   }

// spinButton.addEventListener('click', function() {
//     spin();
// });

function handleSpin() {
  const now = new Date().getTime();
  const lastSpin = localStorage.getItem('lastSpin');
  const oneHour = 600000; // 10 min in milliseconds

  if (!lastSpin || now - lastSpin >= oneHour) {
    spin(); // Your existing spin function
    localStorage.setItem('lastSpin', now.toString());
    disableSpinButton();
    startCountdown(oneHour);
  } else {
    alert("You can spin again in " + Math.round((oneHour - (now - lastSpin)) / 60000) + " minutes");
  }
}

function disableSpinButton() {
  document.getElementById('spin-button').disabled = true;
  document.getElementById('spin-button').innerText = 'Next Spin in 60:00';
}

function enableSpinButton() {
  spinButton.disabled = false;
  spinButton.innerText = 'Spin to Win Influence Points!';
}


function startCountdown(duration) {
  var timer = duration, minutes, seconds;
  var countdown = setInterval(function () {
    minutes = parseInt(timer / 60000, 10);
    seconds = parseInt((timer % 60000) / 1000, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById('spin-button').innerText = "Next Spin in " + minutes + ":" + seconds;

    if ((timer -= 1000) < 0) {
      clearInterval(countdown);
      document.getElementById('spin-button').disabled = false;
      document.getElementById('spin-button').innerText = 'Spin to Win Influence Points!';
    }
  }, 1000);
}

spinButton.addEventListener('click', handleSpin);


}

function initOverlay() {
    // Set a timeout for showing the overlay
    setTimeout(function() {
      document.getElementById('overlay').style.visibility = 'visible';
      document.getElementById('overlay').style.opacity = 1;
    }, 10000); // 10 seconds
  
    // Close button for the overlay
    document.getElementById('close-btn').onclick = function() {
      document.getElementById('overlay').style.visibility = 'hidden';
      document.getElementById('overlay').style.opacity = 0;
    };
  
    // Click outside the modal to close it
    var modal = document.getElementById('overlay');
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  
  function initAccessDenied() {
    // acess denied
    var menuLinks = document.querySelectorAll('.menu a[href="#accessdenied"]');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor behavior
            alert("Not enough influence points to access, earn more by tagging us on social media or interacting with the site.");
        });
    });

     // Add event listeners to photo items
     var photoItems = document.querySelectorAll('.photo-gallery .photo-item a[href="#accessdenied"]');
     photoItems.forEach(function(item) {
         item.addEventListener('click', function(event) {
             event.preventDefault(); // Prevent the default anchor behavior
             alert("Not enough influence points to access, earn more by tagging us on social media or interacting with the site.");
         });
     });
  }

  function initTikTokFlashing() {
    // Tiktok image flashing
    var tiktokImage = document.getElementById('tiktokImage');
    setInterval(function() {
      tiktokImage.style.display = tiktokImage.style.display === 'none' ? 'block' : 'none';
    }, 500); // 500 milliseconds
  }
  
  function updateTrend() {
    const trendElement = document.getElementById('trend-text');
    const randomTrend = trends[Math.floor(Math.random() * trends.length)];
    trendElement.textContent = randomTrend;
  }

  // Array of trends
const trends = [

    "Eco-Friendly Materials",
    "Arm Warmers",
    "Vintage Denim Comeback",
    "Bold Geometric Patterns",
    "80's Inspired Shoulder Pads",
    "Dad Sneakers",
    "Digital Prints",
    "Sustainable Fashion",
    "Athleisure Wear",
    "Animal Print",
    "Hair Ribbons",
    "Matching Sets",
    "Cottagecore",
    "Y2k Fashion",
    "Normcore",
    "Witchcore",
    "Kawaii Grunge",
    "Cyberpunk Style",
    "Indie Sleeze",
    "Fairycore",
    "Douyin Look",
    "Lobotomy Chic",
    "Kidcore",
    "Queer Academia",
    "Weird Girl Aesthetic",
    "90's Whimsigoth",
    "Coastal Cowgirl",
    "Miu Miu Girl",
    "Femcel",
    "Bella Hadid Style",
    "Clean Girl Aesthetic",
    "Harajuku",
    "Skater Style",
    "Korean Fashion",
    "Nerdy Chic",
    "Coquette",
    "Equstrian Style",
    "Grunge",
    "Copenhagen Style",
    "Soft Girl Aesthetic",
    "Gyaru",
    "Dadcore",
    "70's Disco Glam",
    "Gorpcore",
    "Goblincore",
    "ABG Style",
    "Visco Preppy",
    "Barbiecore",
    "Dark Academia",
    "Minimalist Style",
    "Old Money Aesthetic",
    "Gothic Lolita",
    "Clowncore",
    "Vaporwave Aesthetic",
    "Balletcore",
    "Sandy Liang",
    "Angelcore",
    "Blokecore",
    "Pastel Punk",
    "Coastal Grandma",
    "Plazacore",
    "Regencycore",
    "Vacationcore",
    "Corporate Grunge",
    "Techwear",
    "Whimsigoth",
    // ... Your trends ...
    // Add all your trend strings here
  ];

  


// TERMS AND CONDITIONS
document.addEventListener('DOMContentLoaded', (event) => {
    const termsModal = document.getElementById('termsModal');
    const agreeButton = document.getElementById('agreeButton');
    const checkboxes = document.querySelectorAll('.term-checkbox');
  
    // Show the modal
    termsModal.style.display = 'block';
  
    // Function to check if all checkboxes are checked
    function areAllChecked() {
        return Array.from(checkboxes).every(checkbox => checkbox.checked);
    }
  
    // Event listener for the "I Agree" button
    agreeButton.addEventListener('click', () => {
        if (areAllChecked()) {
            termsModal.style.display = 'none';
        } else {
            alert('Please agree to all terms to continue.');
        }
    });
  
    // Event listener for closing the modal (disabled if not all checked)
    termsModal.querySelector('.close').addEventListener('click', () => {
        if (areAllChecked()) {
            termsModal.style.display = 'none';
        }
    });
  
    // Prevent closing modal by clicking outside of it RE ENABLE LATER!!!!!!!
    window.onclick = function(event) {
        if (event.target === termsModal && areAllChecked()) {
            termsModal.style.display = 'none';
        }
    };
  });
// End terms and conditions  

function initQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  const quizSubmit = document.getElementById('quiz-submit');
  const quizResponse = document.getElementById('quiz-response');

  const questions = [
      {
          question: 'What is your favorite color?',
          responses: {
              a: 'Basic much?',
              b: 'Really?',
              c: 'Great taste!',
          },
      },
      {
          question: 'Pick one.',
          responses: {
              d: 'Clean girl pink pilates princess!!!!',
              e: 'BOOOO! That is so last season. -5 points for you.',
              f: 'As long as it is not the yellow ones',
          },
      },

    {
      question: 'What is your favorite way to accessorize?',
      responses: {
          g: 'rings are cool...just like the speed of trend turnover that is detroying the environment :)',
          h: 'Chic. Thanks for the data!',
          i: 'The coolest ever. +1000000 points to you.',
          s: '...why? dive into this virtual trove of trendiness.'
      },
  },

  {
    question: 'Captialism will be the end of our society and social media is ruining lives... Whats your favorite animal?',
    responses: {
        j: 'Dogs are awesome!',
        k: 'Cats are cool!',
        // l: 'Birds are lovely!',
    },
},

{
  question: 'Go to lazy day outfit?',
  responses: {
      m: 'good choice. are you dead inside yet? if not, capitalism will drain every last bit of your soul.',
      n: 'very cute. did you buy that from a highly target ad that comes from an algorithm that can predict your every move?',
      o: 'love it! are you aware that we are selling all your personal data as you read this? haha!',
  },
},

{
  question: 'Choose one.',
  responses: {
      p: 'My deeply advanced algorithmic calculations have found that you are a miu miu vsco preppy balletcore y2k copenhagen style coquette rat girl ugg defender it girl',
      q: 'According to my calculations and extensive research, I deem you gothic lolita manic pixie dream girl femcel pastel punk bloke core indie sleeze corporate grunge with a touch of 90s whimsigoth gyaru.',
      r: 'I now know everything about you... you most definately are a cottagecore lobotomy angelcore weird girl aesthetic goblincore coastal cowgirl. I bet you like mushroom paraphernalia you clowncore sandy liang lover.',
  },
},
      // Add more questions and responses as needed
  ];

  quizSubmit.addEventListener('click', () => {
      const selectedAnswer = document.querySelector('input[name="quiz"]:checked');

      if (selectedAnswer) {
          const answer = selectedAnswer.value;
          let response = '';

          questions.forEach((question, index) => {
              if (answer in question.responses) {
                  response = question.responses[answer];
                  quizResponse.textContent = 'Question ' + (index + 1) + ': ' + response;
              }
          });

      } else {
          quizResponse.textContent = 'Please select an answer.';
      }
  });
}

