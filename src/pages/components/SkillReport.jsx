import { useEffect, useState } from "react";
import Image from "next/image";

export const SkillReport = () => {
  const [report, setReport] = useState([]);
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://etdev8243.indiatimes.com/dp_reactfeed_list.cms?msid=97724699&feedtype=etjson&showexturl=1&type=hierarchy"
      );
      const { searchResult } = await data.json();
      setReport(searchResult[0].news);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {report.map(({ title, msid, desc, url }) => (
        <section key={msid}>
          <div className="dp_container">
            <div className="bannerMainBox">
              <div className="dp_row dp_rowdir_clmn_onlyMob">
                <div className="leftdownBox samewidth">
                  <Image
                    src={`https://economictimes.indiatimes.com/photo/${msid}.cms`}
                    alt={title}
                    width={400}
                    height={473}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="rightdownBox samewidth">
                  <h3 className="heading">{title}</h3>
                  <p
                    className="commanpara"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                  <div className="reg_btnMain">
                    <a
                      className="down_button"
                      download="download"
                      target="_blank"
                      href={url}
                    >
                      <span>Download Report</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
