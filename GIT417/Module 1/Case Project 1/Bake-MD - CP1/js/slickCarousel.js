var slider = $(".slick-slider");  
// DOM Ready
$(function () {
  // Initialize
  slider.on("init", function (slick) {
    slick = $(slick.currentTarget);
  })
})

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
  className.includes("left") ?
      slider.slick("slickPrev")
    :
      slider.slick("slickNext")
})