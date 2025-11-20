import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

interface Testimonial {
  avatar: string;
  logo: string;
  name: string;
  title: string;
  quote: string;
}

interface FeedBackSwiperProps {
  testimonials: Testimonial[];
}

export default function FeedBackSwiper({ testimonials }: FeedBackSwiperProps) {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: '.swiper-custom-next',
        prevEl: '.swiper-custom-prev',
      }}
      loop={true}
      spaceBetween={30}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index} className="p-10 border rounded-xl bg-white shadow">
          <i className="fa-solid fa-quote-left text-gray-500 text-5xl"></i>
          <p className="my-4">{testimonial.quote}</p>
          <div className="border-b border-gray-200 w-full my-7"></div>

          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="flex items-center gap-2">
              <img src={testimonial.avatar} alt={testimonial.name} className="h-10 w-10 rounded-full" />
              <div>
                <h1 className="text-sm mb-1">{testimonial.name}</h1>
                <p className="text-gray-500 text-xs">{testimonial.title}</p>
              </div>
            </div>
            <div>
              <img src={testimonial.logo} alt="Company logo" className="w-24" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
