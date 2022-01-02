import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { Divider, DatePicker } from 'antd';
import { API_URL } from './utils';
import moment from 'moment';
const { RangePicker } = DatePicker;

const GlobalLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch('2020-01-01','2022-10-01');
  }, []);

  const onChange = (value) => {
    let dates = []
    if(value) {
      value.forEach((date) => {
        let newDate = moment(date._d);
        dates.push(newDate.format('YYYY-MM-DD'))
      });
    }
    if(dates.length === 2) {
      asyncFetch(dates[0], dates[1]);
    }
  }

  const getMultiLineJson = (json) => {
    let newJson = [];
    json.forEach(item => {
      newJson.push({
        date: item.date,
        value: item.confirmed,
        category: 'confirmed',
      });

      newJson.push({
        date: item.date,
        value: item.deaths,
        category: 'deaths',
      });

      newJson.push({
        date: item.date,
        value: item.recovered,
        category: 'recovered',
      });
    });
    return newJson;
  };

  const asyncFetch = (start, end) => {
    fetch(`${API_URL}/Data/World?start=${start}&end=${end}`)
      .then((response) => response.json())
      .then((json) => setData(getMultiLineJson(json.diseaseData)))
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
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <div>
      <Divider />
      <RangePicker onChange={onChange} picker="month"/>
      <Divider />
      <Line {...config} />
    </div>
  );
};

export default GlobalLine;