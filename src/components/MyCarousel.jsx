import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
const MyCarousel = () => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      <img
        src="https://images.unsplash.com/photo-1509965478903-f26fb372b4e3"
        style={{
          display: "block",
          height: "100%",
          margin: "auto",
          width: "100%",
          aspectRatio: "16/9",
        }}
      />
      <img
        src="https://images.unsplash.com/photo-1604695840046-fe1fb42422ac"
        style={{
          display: "block",
          height: "100%",
          margin: "auto",
          width: "100%",
        }}
      />
      <img
        src="https://plus.unsplash.com/premium_photo-1661714220704-711551e73799"
        style={{
          display: "block",
          height: "100%",
          margin: "auto",
          width: "100%",
        }}
      />
    </Carousel>
  )
}
export default MyCarousel
