import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { Divider } from 'antd';
import { API_URL } from './utils';

const GlobalLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const getMultiLineJson = (json) => {
    let newJson = [];
    for (const [key, value] of Object.entries(json.cases)) {
      newJson.push({
        date: key,
        value,
        category: 'confirmed',
      });
    }
    for (const [key, value] of Object.entries(json.deaths)) {
      newJson.push({
        date: key,
        value,
        category: 'deaths',
      });
    }
    for (const [key, value] of Object.entries(json.recovered)) {
      newJson.push({
        date: key,
        value,
        category: 'recovered',
      });
    }
    return newJson;
  };

  const asyncFetch = () => {
    fetch(`${API_URL}/historical/all?lastdays=all`)
      .then((response) => response.json())
      .then((json) => setData(getMultiLineJson(json)))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
    slider: {
      start: 0.1,
      end: 1.0,
    },
  };

  return (
    <div>
      <Divider />
      <Line {...config} />
    </div>
  );
};

export default GlobalLine;