import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'


export const fetchData = async () => {
  try {
    const response = await fetch("https://etdev8243.indiatimes.com/dp_reactfeed_list.cms?msid=98634332&feedtype=etjson&showexturl=1&type=hierarchy");
    const data = await response.json();
    const main = data.searchResult[0].news;
    console.log("data is", main);
    return main;
  } catch (error) {
    console.log(error);
  }
};

export const FakeFetch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>News</h1>
      <ul>
        {data.map(({title, msid}) => {
          // let url = `https://economictimes.indiatimes.com/photo/${msid}.cms`;
          return  <li key={msid}>
            <img className={styles.imgTag} src={`https://economictimes.indiatimes.com/photo/${msid}.cms`} alt={title} title={title}/>
            <p>{title}</p>
            </li>;
        })}
      </ul>
    </div>
  );
};
