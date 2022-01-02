import React from 'react';
import { Row, Col, Select, Typography } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import CountUp from 'react-countup';
import { API_URL } from './utils';

const { Title } = Typography;
const { Option } = Select;

const formatDate = () => {
  const options = { year: "numeric", month: "long", weekday: 'long' }
  return new Date().toLocaleDateString(undefined, options)
}

class Content5 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      all_countries: [],
      country: 'Israel',
      data: [],
    };
  }
  componentDidMount() {
    this.CountriesList();
  }

  CountriesList = () => {
    Promise.all([
      fetch(`${API_URL}/historical/${this.state.country}?lastdays=1`),
      fetch(`${API_URL}/apple/countries`),
      fetch(`${API_URL}/vaccine/coverage/countries/${this.state.country}?lastdays=1`),
    ])
    .then(([res1, res2, res3]) => {
      return Promise.all([res1.json(), res2.json(), res3.json()])
    })
    .then(([res1, res2, res3]) => {
      this.setState({
        ...this.state,
        data: {
          cases: Object.values(res1.timeline.cases)[0],
          deaths: Object.values(res1.timeline.deaths)[0],
          recovered: Object.values(res1.timeline.recovered)[0],
          vaccinated: Object.values(res3.timeline)[0],
        },
        all_countries: res2,
      })
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    });
  }

  fetchCountryData = (e) => {
    Promise.all([
      fetch(`${API_URL}/historical/${e}?lastdays=1`),
      fetch(`${API_URL}/vaccine/coverage/countries/${e}?lastdays=1`),
    ])
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    })
    .then(([res1, res2]) => {
      this.setState({
        ...this.state,
        data: {
          cases: Object.values(res1.timeline.cases)[0],
          deaths: Object.values(res1.timeline.deaths)[0],
          recovered: Object.values(res1.timeline.recovered)[0],
          vaccinated: Object.values(res2.timeline)[0],
          bla:1,
        },
      })
      console.log(this.state);
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    });
  }

  
  onChangeCountry = e => {
    this.setState({ country: e });
    this.fetchCountryData(e);
  }
  getChildrenToRender = (data) =>
  
    data.map((item, index) => {
      return (
        <Col key={item.name} {...item}>
          <a {...item.children.wrapper}>
            <span {...item.children.img}>
              <img src={item.children.img.children} height="90%" alt="img" />
            </span>
            <p {...item.children.content}>
              {item.children.content.children}
            </p>
            <Title>
              {index === 0 ?
                <CountUp end={this.state.data.cases} duration={3} separator="," />
                : index === 1 ? 
                <CountUp end={this.state.data.recovered} duration={3} separator="," />
                : index === 2 ? 
                <CountUp separator="," end={this.state.data.deaths} duration={3} /> 
                :
                <CountUp separator="," end={this.state.data.vaccinated} duration={3} /> }
            </Title>
            <Title level={5} type="secondary" code>{formatDate()}</Title>
            <Title level={5}>
             {item.desc}
            </Title>
          </a>
        </Col>
      );
    });

    render() {
      console.log(this.state);
      const { ...props } = this.props;
      const { dataSource } = props;
      delete props.dataSource;
      delete props.isMobile;
      const childrenToRender = this.getChildrenToRender(
        dataSource.block.children
      );
      return (
        <div {...props} {...dataSource.wrapper}>
          <div {...dataSource.page}>
            <div key="title" {...dataSource.titleWrapper}>
              <Title>Country Information</Title>
              <Select size="large" defaultValue="Israel" onChange = {this.onChangeCountry} style={{ width: 200}}>
              {
                //['Israel','Mexico'].forEach(item =>  <Option>{item}</Option>)
                this.state.all_countries.map((item,i) =>
                  <Option value={item}>{item}</Option>
                )
              }
              </Select>
            </div>
            <OverPack
              className={`content-template ${props.className}`}
              {...dataSource.OverPack}
            >
              <TweenOneGroup
                component={Row}
                key="ul"
                enter={{
                  y: '+=30',
                  opacity: 0,
                  type: 'from',
                  ease: 'easeInOutQuad',
                }}
                leave={{ y: '+=30', opacity: 0, ease: 'easeInOutQuad' }}
                {...dataSource.block}
              >
                {childrenToRender}
              </TweenOneGroup>
            </OverPack>
          </div>
        </div>
      );
    }
}

export default Content5;
