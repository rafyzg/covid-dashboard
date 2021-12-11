import React from 'react';
import { Carousel as AntCarousel, Row, Col, Select, Typography } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';
import CountUp from 'react-countup';

const { Title } = Typography;
const { Option } = Select;
const country_data = [
  {
      id: 1,
      name: 'Israel',
      value: 'Israel',
      numberOfDeath: 123,
      numberOfInfected: 12333,
      numberOfCurrentSick: 12,
  },
  {
      id: 2,
      name: 'US',
      value: 'US',
      numberOfDeath: 123,
      numberOfInfected: 12333,
      numberOfCurrentSick: 112,

  },
  {
      id: 3,
      name: 'Columbia',
      value: 'Columbia',
      numberOfDeath: 123,
      numberOfInfected: 12333,
      numberOfCurrentSick: 122,

  }
];

const formatDate = () => {
  const options = { year: "numeric", month: "long", weekday: 'long' }
  return new Date().toLocaleDateString(undefined, options)
}

const carouselProps = {
  className: 'feature6-content',
  dots: false,
  wrapper: { className: 'feature6-content-wrapper' },
  titleWrapper: {
    className: 'feature6-title-wrapper',
    barWrapper: {
      className: 'feature6-title-bar-wrapper',
      children: { className: 'feature6-title-bar' },
    },
    title: { className: 'feature6-title' },
  }
};

class Content5 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      country: "Israel",
      country_id: 0,
    };
  }
  
  onChangeCountry = e => {
    this.setState({ country: e});
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
                <CountUp end={country_data.filter(obj => obj.name === this.state.country )[0].numberOfCurrentSick} duration={3} />
                : index === 1 ? 
                <CountUp end={country_data.filter(obj => obj.name === this.state.country )[0].numberOfInfected} duration={3} />
                :
                <CountUp end={country_data.filter(obj => obj.name === this.state.country )[0].numberOfDeath} duration={3} /> }
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
              {dataSource.titleWrapper.children.map(getChildrenToRender)}
              <Select size="large" defaultValue="Israel" onChange = {this.onChangeCountry} style={{ width: 200}}>
              {
                  country_data.map((item, i) => {
                      return <Option value={item.name}>{item.name}</Option>
                  })
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

/*

      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
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
      */
export default Content5;
