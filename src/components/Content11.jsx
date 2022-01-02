import React, { useState, useEffect } from 'react';
import { Divider, Typography } from 'antd';
import { API_URL } from './utils';
import { Column } from '@ant-design/charts';
const { Title } = Typography;

const adjustJsonToGraph = (continentData) => {
  let newData = [];
  continentData.forEach((continent) => {

    newData.push({
      continent: continent.continent,
      type: "population",
      value: continent.population,
    });

    newData.push({
      continent: continent.continent,
      type: "Cases",
      value: continent.cases,
    });

    newData.push({
      continent: continent.continent,
      type: "Deaths",
      value: continent.deaths,
    });

    newData.push({
      continent: continent.continent,
      type: "Tests",
      value: continent.tests,
    });

    newData.push({
      continent: continent.continent,
      type: "Recovered",
      value: continent.recovered,
    });
    
  });
  return newData;
};


const Content11 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`${API_URL}/continents`)
      .then((response) => response.json())
      .then((json) => setData(adjustJsonToGraph(json)))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'continent',
    yField: 'value',
    seriesField: 'type',
    isGroup: 'true',
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return (
    <div style={{backgroundColor: '#fafafa', textAlign: 'center'}}>
      <Title>Continents Data</Title>
      <Divider />
      <Column {...config} />
    </div>
  );
};

export default Content11;
