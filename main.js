const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;

let level = 0;

const audio = new Audio(`sounds/Pixelland.mp3`);
let isPlaying = false;

// toogle button on click
$(".button-wrapper").click(function (e) {
  //   alert("heloo");
  if (isPlaying) {
    audio.pause();
    $("#disable").toggleClass("disable-audio");
  } else {
    audio.play();
    $("#disable").toggleClass("disable-audio");
  }

  isPlaying = !isPlaying;
});

// ketika layar di klik
$(`#overlay`).click(function (e) {
  if (!started) {
    $("#overlay").hide();
    nextSequence();
    started = true;
  }
});

// ketika tombol di klik
$(".btn").click(function (e) {
  e.preventDefault();
  const userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playAudio(userChosenColor);

  // console.log(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $(".big-title").text(`level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  // console.log(Array.isArray(gamePattern));

  animatePattern(Array.from(gamePattern));
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("betool");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("wrong");
    playAudio(`wrong`);
    console.log("salah");
    setTimeout(() => {
      $("body").removeClass("wrong");
    }, 200);

    $(".big-title").text("Kamu kalah, tekan untuk memulai ulang.");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $(`#overlay`).show();
}

function playAudio(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass(`${currentColor}-glow`);
  setTimeout(() => {
    $(`#${currentColor}`).removeClass(`${currentColor}-glow`);
  }, 500);
}

function animatePattern(gamePattern) {
  let delay = 0;
  const glowDuration = 500;

  $("#overlay").show();

  gamePattern.forEach((color, index) => {
    console.log(color);
    setTimeout(() => {
      $(`#${color}`).addClass(`${color}-glow`);
      playAudio(color);
      setTimeout(() => {
        $(`#${color}`).removeClass(`${color}-glow`);
        // jika indeks sudah mencapai elemen terakhir
        if (index == gamePattern.length - 1) {
          $("#overlay").hide();
        }
      }, glowDuration);
    }, delay);
    delay += glowDuration + 500;
  });
}
