import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    title: 'Modern Development',
    description: 'Building the future with cutting-edge technology',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    title: 'Clean Code',
    description: 'Writing maintainable and scalable solutions',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    title: 'Innovation',
    description: 'Pushing boundaries in software development',
  },
];

export default function HomeCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[500px] mt-16"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}