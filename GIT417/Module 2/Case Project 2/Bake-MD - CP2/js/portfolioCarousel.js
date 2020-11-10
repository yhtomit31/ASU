var slider = $(".slick-slider");
// DOM Ready
$(function () {
  // Initialize
  slider.on("init", function (slick) {
    slick = $(slick.currentTarget);
  });
});

slider.slick({
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  lazyLoad: "progressive",
  pauseOnFocus: false,
  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
});

$(".fas").on("click", (event) => {
  let className = event.target.className;
  className.includes("left")
    ? slider.slick("slickPrev")
    : slider.slick("slickNext");
});

$(".carousel-control").on("click", (event) => {
  let imgElement = $(".carousel-control");
  let isPause = false;

  if (imgElement.hasClass("pause")) {
    imgElement.removeClass("pause");
    imgElement.addClass("play");
    imgElement.css('background-image', 'url(./images/toque.svg)');
    slider.slick("slickPlay");
    isPause = false
  }
  else {
    imgElement.removeClass("play");
    imgElement.addClass("pause");
    imgElement.css('background-image', 'url(./images/pause-solid.svg)');
    slider.slick("slickPause");
    isPause = true
  }
})

// var images = {
//   webp: [
//     "7P1B0130.webp",
//     "7P1B0126.png",
//     "7P1B0130.png",
//     "7P1B0131.png",
//     "7P1B0408.png",
//     "7P1B9263.png",
//   ],
//   1: [
//     "7P1B0126.png",
//     "7P1B0130.png",
//     "7P1B0131.png",
//     "7P1B0408.png",
//     "7P1B9263.png",
//     "EMT-Heart---1.png",
//     "EMT-Heart---1.png",
//     "IMG_0211.png",
//     "IMG_0213.png",
//     "IMG_0215.png",
//     "IMG_0217.png",
//     "IMG_0267.png",
//     "IMG_0282.png",
//     "IMG_3639.png",
//     "IMG_3649.png",
//     "IMG_3673.png",
//     "IMG_3675.png",
//     "IMG_3964.png",
//     "IMG_4171.png",
//     "IMG_4187.png",
//     "IMG_9362.png",
//     "IMG_9380.png",
//     "IMG_9382.png",
//     "IMG_9409.png",
//     "IMG_9426.png",
//     "IMG_9437.png",
//     "IMG_9501.png",
//     "IMG_9796.png",
//     "IMG_9800.png",
//     "IMG_9830.png",
//     "Star-of-Life.png",
//     "Star-of-Life-Group-Closeup.png"
//   ],
//   .5: [
//     "7P1B0126@0.5x.png",
//     "7P1B0130@0.5x.png",
//   ],
//   .75: [
//     "7P1B0126@0.75x.png",
//     "7P1B0130@0.75x.png",
//   ]
// };