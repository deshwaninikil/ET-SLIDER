import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const BannerSlider = () => {
  const [banner, setBanner] = useState([]);
  const [width, setWidth] = useState(global.innerWidth);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://etdev8243.indiatimes.com/dp_reactfeed_list.cms?msid=88273362&feedtype=etjson&showexturl=1&type=hierarchy`
      );
      const data = await response.json();
      const mainData = data.searchResult[0].news;
      setBanner(mainData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const filterImages = banner.filter(({ metainfo }) => {
    return width <= 760
      ? metainfo.etpersonCOName === "Mobile"
      : metainfo.etpersonCOName === "Desktop";
  });

  const PrevArrow = "https://economictimes.indiatimes.com/photo/97863150.cms";
  const NextArrow = "https://economictimes.indiatimes.com/photo/97863152.cms";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // time in milliseconds between each slide change
    prevArrow: <img src={PrevArrow} alt="Previous" />,
    nextArrow: <img src={NextArrow} alt="Next" />,
  };

  return (
    <section>
      <Slider {...settings}>
        {filterImages.map(({ msid, metainfo, title }) => (
          <div
            key={msid}
            className={`${
              metainfo.etpersonCOName === "Desktop" ? "Desktop" : "Mobile"
            }`}
          >
            <Image
              src={`https://economictimes.indiatimes.com/photo/${msid}.cms`}
              alt={title}
              fill
              cover="true"
              className="imageStyle"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};
