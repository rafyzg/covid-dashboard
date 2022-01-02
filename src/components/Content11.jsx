import React from 'react';
import { Divider } from 'antd';
import { API_URL } from './utils';

import { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';


const adjustJsonToGraph = (countriesData) => {
  let newData = [];
  countriesData.forEach((country) => {

    newData.push({
      continent: country.continent,
      type: "population",
      value: country.population,
    });

    newData.push({
      continent: country.continent,
      type: "Cases",
      value: country.confirmedCases,
    });

    newData.push({
      continent: country.continent,
      type: "Deaths",
      value: country.deaths,
    });

    newData.push({
      continent: country.continent,
      type: "Vaccinated",
      value: country.vaccinated,
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
    fetch(`${API_URL}/Data/ByDate/Continents?Date=2022-01-01&threshold=7`)
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
    <div>
      <Divider />
      <Column {...config} />
    </div>
  );
};

export default Content11;
