//====================================================================================================
//----- Video player -----
const progressBarCnt_PFS = document.querySelector(
    ".first-screen .player__progress-bar-container"
  ),
  progressBar_PFS = progressBarCnt_PFS.querySelector(".player__progress-bar"),
  slider_PFS = progressBarCnt_PFS.querySelector("input"),
  video_PFS = document.querySelector("video");
let outputCurrentTime_PFS = document.querySelector(
    ".first-screen .player__current-time"
  ),
  outputDuration_PFS = document.querySelector(
    ".first-screen .player__duration"
  );

function videoPlayer() {
  function changeIcon_PFS() {
    let playBtnIcon_PFS = document.querySelector(
      ".first-screen .player__btn i"
    );
    playBtnIcon_PFS.classList.toggle("fa-play");
    playBtnIcon_PFS.classList.toggle("fa-pause");
  }

  // Sound control button
  document
    .querySelector(".first-screen .player__btn")
    .addEventListener("click", (e) => {
      console.log("111111111111");
      changeIcon_PFS();
      video_PFS.paused ? playSong() : video_PFS.pause();
    });

  function playSong() {
    if (!document.documentElement.classList.contains("_player-active_PFS")) {
      document.documentElement.classList.add("_player-active_PFS");
    }
    video_PFS.play();
  }

  // Update progress bar
  progressBarCnt_PFS.addEventListener("click", (e) => {
    let progressPercent =
      (video_PFS.duration / e.target.clientWidth) * e.offsetX;

    // Переключаем трек на нужный момент
    video_PFS.currentTime = progressPercent;
    // Задаем значение для прогресс бара
    const maxValue = slider_PFS.getAttribute("max");
    progressBar_PFS.style.width = (slider_PFS.value / maxValue) * 100 + "%";
    // Задаем значение для слайдера для движения ползунка и текущее время песни
    updateValues_PFS(slider_PFS, progressPercent);
  });

  // Update values with time
  video_PFS.addEventListener("timeupdate", (e) => {
    let progressPercent = Math.round(
      (video_PFS.currentTime / video_PFS.duration) * 100
    );

    // Задаем значение для прогресс бара
    progressBar_PFS.style.width = `${progressPercent}%`;
    // Задаем значение для слайдера для движения ползунка и текущее время песни
    updateValues_PFS(slider_PFS, progressPercent);
  });

  function updateValues_PFS(slider_PFS, progressPercent) {
    // Задаем значение для слайдера для движения ползунка
    slider_PFS.value = progressPercent;

    // Update current time
    let currentTime = Math.round(video_PFS.currentTime);
    let seconds = currentTime < 60 ? currentTime : currentTime % 60;
    let minutes = Math.floor(currentTime / 60);
    outputCurrentTime_PFS.innerHTML =
      seconds < 10 ? `0${minutes}:0${seconds}` : `0${minutes}:${seconds}`;
  }
}

//====================================================================================================

//----- Music player - 6 song -----
const progressBarCnt = document.querySelector(
    ".tracks .player__progress-bar-container"
  ),
  progressBar = document.querySelector(".tracks .player__progress-bar"),
  slider = progressBarCnt.querySelector("input"),
  audio = document.querySelector(".tracks audio");
let outputCurrentTime = document.querySelector(".tracks .player__current-time"),
  outputDuration = document.querySelector(".tracks .player__duration");

function audioPlayer() {
  // List of songs
  const songs = [
    "Eluveitie - Exile Of The Gods",
    "Eluveitie - The Call Of The Mountains",
    "In Extremo - Feuertaufe",
    "In Extremo - Sternhagelvoll",
    "In Extremo - Vollmond",
    "In Extremo Marta Jandov - Horizont",
  ];
  // Default song
  // let songIndex = 0;
  // loadSong(songs[songIndex]);

  // Init/change song
  function loadSong(song) {
    audio.src = `files/playlist/${song}.mp3`;

    // Init duration
    setTimeout(() => {
      let durationSec = Math.floor(audio.duration % 60);
      let durationMin = Math.round(audio.duration / 60);

      outputDuration.innerHTML =
        durationSec < 10
          ? "0" + durationMin + ":" + "0" + durationSec
          : "0" + durationMin + ":" + durationSec;
    }, 100);
  }

  function changeIcon() {
    let playBtnIcon = document.querySelector(".tracks .player__btn i");
    playBtnIcon.classList.toggle("fa-play");
    playBtnIcon.classList.toggle("fa-pause");
  }

  // Sound control button
  document
    .querySelector(".tracks .player__btn")
    .addEventListener("click", (e) => {
      changeIcon();
      audio.paused ? playSong() : audio.pause();
    });

  // Switch songs
  document.querySelectorAll(".playlist__item").forEach((playlistSong) => {
    playlistSong.addEventListener("click", (e) => {
      if (!playlistSong.classList.contains("_active")) {
        document
          .querySelector(".playlist__item._active")
          .classList.remove("_active");
        playlistSong.classList.add("_active");

        audio.paused ? changeIcon() : "";

        loadSong(songs[Number(playlistSong.firstElementChild.innerHTML) - 1]);
        playSong();
      }
    });
  });

  function playSong() {
    if (!document.documentElement.classList.contains("_player-active")) {
      document.documentElement.classList.add("_player-active");
    }
    audio.play();
  }

  // Update progress bar
  progressBarCnt.addEventListener("click", (e) => {
    let progressPercent = (audio.duration / e.target.clientWidth) * e.offsetX;

    // Переключаем трек на нужный момент
    audio.currentTime = progressPercent;
    // Задаем значение для прогресс бара
    const maxValue = slider.getAttribute("max");
    progressBar.style.width = (slider.value / maxValue) * 100 + "%";
    // Задаем значение для слайдера для движения ползунка и текущее время песни
    updateValues(slider, progressPercent);
  });

  // Update values with time
  audio.addEventListener("timeupdate", (e) => {
    let progressPercent = Math.round(
      (audio.currentTime / audio.duration) * 100
    );

    // Задаем значение для прогресс бара
    progressBar.style.width = `${progressPercent}%`;
    // Задаем значение для слайдера для движения ползунка и текущее время песни
    updateValues(slider, progressPercent);
  });

  function updateValues(slider, progressPercent) {
    // Задаем значение для слайдера для движения ползунка
    slider.value = progressPercent;

    // Update current time
    let currentTime = Math.round(audio.currentTime);
    let seconds = currentTime < 60 ? currentTime : currentTime % 60;
    let minutes = Math.floor(currentTime / 60);
    outputCurrentTime.innerHTML =
      seconds < 10 ? `0${minutes}:0${seconds}` : `0${minutes}:${seconds}`;
  }
}
//====================================================================================================
window.onload = () => {
  videoPlayer();
  audioPlayer();
};
//====================================================================================================
//----- Menu -----
const headerBtn = document.querySelector(".header__button");
if (headerBtn) {
  headerBtn.addEventListener("click", (e) => {
    document.documentElement.classList.toggle("_menu-show");
    document.body.classList.toggle("_lock");
  });
}
//====================================================================================================
//----- Прокрутка страницы по клику в меню с JS -----

/*
Прокрутка страницы по клику в меню с JS:
Задаем пунктам меню атрибут "data-goto", равный классу блока к кот. необходима прокрутка.
На каждый пункт прослушка нажатия: получаем элемент к кот. нужна прокрутка, высчитываем сколько до него px,
и используем метод window.scrollTo().
При нажатии в меню-бургере перед действиями, закрываем его.
*/
const menuLinks = document.querySelectorAll("[data-goto]");
if (menuLinks) {
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      //Проверка заполнен ли атрибут и есть ли на странице данный элемент
      if (link.dataset.goto) {
        //Проверка заполнен ли атрибут и есть ли на странице данный элемент
        const goToBlock = document.querySelector(link.dataset.goto);
        if (goToBlock) {
          //Если клик в меню-бургере - закрываем
          if (document.documentElement.classList.contains("_menu-show")) {
            document.documentElement.classList.remove("_menu-show");
            document.body.classList.remove("_lock");
          }

          window.scrollTo({
            top: goToBlock.offsetTop,
            behavior: "smooth",
          });

          //Для отключения срабатывания ссылки
          e.preventDefault();
        }
      }
    });
  });
}
//====================================================================================================
//----- Кнопка "Наверх" -----
const backTopBtn = document.querySelector(".page__btn-back-to-top");
if (backTopBtn) {
  window.addEventListener("scroll", trackScroll);
  backTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
//Ф-я для отображения/скрытия кнопки
function trackScroll() {
  //Переменная для вычисления кол-ва прокрученных px
  let scrolled = window.scrollY;
  //Переменная для вычисления высоты одного экрана у пользователя
  let coords = document.documentElement.clientHeight;

  //Когда мы прокручиваем документ на «один экран», кнопка появляется, и наоборот
  if (scrolled > coords) {
    backTopBtn.classList.add("_show");
  }
  if (scrolled < coords) {
    backTopBtn.classList.remove("_show");
  }
}
//====================================================================================================
