import { useEffect, useState } from "react";
import Image from "next/image";

export const About = () => {
  const [updateAbout, setUpdateAbout] = useState([]);
  const [readBtnClick, setReadBtnClick] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://etdev8243.indiatimes.com/dp_reactfeed_list.cms?msid=98183752&feedtype=etjson&showexturl=1&type=hierarchy"
      );
      const { searchResult } = await response.json();
      setUpdateAbout(searchResult[0].news);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const readMoreClickHandler = () => {
    setReadBtnClick(true);
  };
  return (
    <>
      {updateAbout.map(({ title, msid, desc }) => (
        <section key={msid}>
          <div className="dp_container pdngtb70">
            <div className="dp_rowdir_clmn aligncenter dp_row dp_flexwrap dp_justifycontentcenter">
              <div className="dp_row dp_rowdir_clmn_onlyMob">
                <div className="leftAboutBox">
                  <Image
                    src={`https://economictimes.indiatimes.com/photo/${msid}.cms`}
                    alt={title}
                    width={350}
                    height={378}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="rightAboutBox samewidth">
                  <h3 className="redheading">About</h3>
                  <h4 className="heading">{title}</h4>
                  <div className="commanpara">{desc.substring(1, 1202)}</div>
                  {!readBtnClick && (
                    <div
                      id="loadView"
                      className="viewMoreContdesign dp_row successload"
                      onClick={readMoreClickHandler}
                    >
                      Read more
                    </div>
                  )}

                  {readBtnClick && (
                    <div className="commanpara">
                      {desc.substring(1209, 5000)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
