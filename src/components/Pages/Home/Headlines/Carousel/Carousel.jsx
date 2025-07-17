import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import CarouselSkeleton from './CarouselSkeleton.jsx';
import styles from './Carousel.css.js';

import 'swiper/css';
import 'swiper/css/navigation';

function Headline({ headlineData }) {
    const handleClick = () => {
        window.open(headlineData.url, '_blank');
    };
    return(
        <div onClick={handleClick} style={styles.headlineCard}>
            <p style={styles.headlineText}>{headlineData.text}</p>
        </div>
    )
};

const Carousel = ({ headlines }) => {
    return ( 
        !!headlines ?
        <div style={styles.carouselContainer} >
            <>
                <Swiper
                    rewind={true}
                    freeMode={true}
                    grabCursor={true}
                    loop={true}
                    navigation={false}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                    550: { slidesPerView: 2, spaceBetween: 10, centeredSlides: false },
                    840: { slidesPerView: 3, spaceBetween: 10, centeredSlides: false },
                    1024: { slidesPerView: 4, spaceBetween: 10, centeredSlides: false },
                    }}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper p-10 h-36"
                    style={styles.swiper}
                >
                    {headlines.map((data, idx) => {
                        return(
                            <SwiperSlide key={`headline-card${idx}`}>
                                <Headline headlineData={data} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </>
        </div> :
        <CarouselSkeleton />
    )
};

export default Carousel;