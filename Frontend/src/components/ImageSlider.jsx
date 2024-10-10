import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Parallax, Pagination, Navigation } from "swiper/modules";

export default function ImageSlider({ images, style }) {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        {images?.map((image, i) => (
          <SwiperSlide key={i} className={style}>
            <img
              className="block  object-cover  w-full h-full rounded-xl"
              src={image}
              alt="image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
