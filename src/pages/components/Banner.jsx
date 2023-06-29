import { useEffect, useState } from "react";
import Image from "next/image";

export const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [width, setWidth] = useState(global.innerWidth);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://etdev8243.indiatimes.com/dp_reactfeed_list.cms?msid=98183729&feedtype=etjson&showexturl=1&type=hierarchy"
      );
      const data = await response.json();
      const mainData = data.searchResult[0].news;
      setBanner(mainData);
      // Set the imgID state with the first two image IDs in the mainData array
      //   setImgID([mainData[0].msid, mainData[1].msid]);
      //   console.log(mainData[0].imgid)
    } catch (error) {
      console.log(error);
    }
  };

  const handleWindowSizeChange = () => {
    setWidth(global.innerWidth);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const currentObject = width <= 768 ? banner[0] : banner[1];
  const { msid, metainfo, title } = currentObject || {};

  if (banner.length === 0) return <div>Loading...</div>;
  return (
    <section>
      <div
        key={msid}
        className={`${metainfo === "wap" ? "mobile-image" : "desktop-image"}`}
      >
        <Image
          src={`https://economictimes.indiatimes.com/photo/${msid}.cms`}
          alt={title}
          fill
          cover="true"
          className="imageStyle"
          // width={1400}
          // height={100}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
};
