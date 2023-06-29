import { useEffect, useState } from "react";
import Image from "next/image";

export const Speakers = () => {
  const [speakerData, setSpeakerData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://etdev8243.indiatimes.com/dp_reactfeed_list.cms?msid=98183957&feedtype=etjson&showexturl=1&type=hierarchy"
      );

      const { searchResult } = await response.json();
      setSpeakerData(searchResult[0].news);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div class="dp_row aligncenter dp_justifycontentcenter">
        <h3 class="heading">Speakers</h3>
      </div>
      <div class="speakerSession">
        <div class="dp_container">
          <div class="dp_row aligncenter dp_justifycontentcenter dp_flexwrap aligncenter">
            <div class="dp_row dp_rowdir_clmn">
              <div class="bottomSpeakerBox">
                <div class="speakerDetails">
                  {speakerData.map(({ title, msid, seopath, metainfo }) => (
                    <div class="item ">
                      <div class="spkrBox">
                        <div class="imgbox">
                          {/* <img
                            class="speaker_image lazy"
                            src={`https://img.etimg.com/photo/${msid}.cms`}
                            data-original={`${metainfo.etpersonCOName}`}
                          /> */}
                          <Image
                            className="speaker_image lazy"
                            src={`https://economictimes.indiatimes.com/photo/${msid}.cms`}
                            alt={`${metainfo.etpersonCOName}`}
                            width={300}
                            height={300}
                          />
                        </div>
                        <div class="speaker_item popcntMain">
                          <h3 class="speaker_item1" dataName={seopath}>
                            {metainfo.etpersonName}
                          </h3>
                          <p
                            class="speaker_item2 popdeg"
                            dataDesg={metainfo.etpersonDesignation}
                          >
                            {metainfo.etpersonDesignation}
                          </p>
                          <p class="speaker_item2 popdeg">
                            {metainfo.etpersonCOName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
