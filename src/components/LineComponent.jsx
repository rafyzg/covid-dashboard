import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';


const GlobalLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://api.covid19api.com/total/dayone/country/usa')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'Active',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return <Line {...config} />;
};

export default GlobalLine;