import React from 'react';
import { Typography, Statistic, Row, Col, Button, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { TweenOneGroup } from 'rc-tween-one';
import { getChildrenToRender } from './utils';
import { isImg } from './utils';
const { Title } = Typography;
const { Meta } = Card;

class Banner extends React.PureComponent {

  getChildrenToRender = (data) =>
    data.map((item) => {
      return (
        <Col key={item.name} {...item}>
          <a {...item.children.wrapper}>
            <span {...item.children.img}>
              <img src={item.children.img.children} height="90%" alt="img" />
            </span>
            <p {...item.children.content}>
              {item.children.content.children}
            </p>
            <Statistic value={112893} >157,431</Statistic>
            <Title level={5} type="secondary" code>Sat Dec 04 2021</Title>
            <Title level={5}>
            Number of active cases of COVID-19
            </Title>
          </a>
        </Col>
      );
    });
  
  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const childrenToRender = this.getChildrenToRender(
      dataSource.block.children
    );
    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <QueueAnim
          key="QueueAnim"
          type={['bottom', 'top']}
          delay={200}
          {...dataSource.textWrapper}
        >
          <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === 'string' &&
            dataSource.title.children.match(isImg) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : (
              dataSource.title.children
            )}
          </div>
          <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div>
          <Button ghost key="button" {...dataSource.button}>
            {dataSource.button.children}
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className="banner0-icon"
          key="icon"
        >
          <DownOutlined />
        </TweenOne>
      </div>
    );
  }
}
export default Banner;
