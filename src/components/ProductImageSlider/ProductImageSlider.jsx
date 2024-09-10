import React from 'react';
import Slider from "react-slick";

export default function ProductImageSlider({ images }) {
  var settings = {
    dots: false,
    infinite: true, // جعل الـ slider يعمل بشكل لا نهائي
    speed: 500, // سرعة التبديل بين الصور
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // تشغيل تلقائي
    autoplaySpeed: 3000, // الوقت بين كل تغيير تلقائي (بالمللي ثانية)
  };

  return (
    <Slider {...settings}>
      {images?.map((img, index) => {
        return (
          <img 
            key={index} 
            className="max-w-xs  rounded object-contain" 
            src={img} 
            alt={`Product image ${index + 1}`} 
          />
        );
      })}
    </Slider>
  );
}
