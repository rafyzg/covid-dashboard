import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Typography } from 'antd';
import GlobalLine from './LineComponent';
const { Title } = Typography;


class Content10 extends React.PureComponent {

  getBlockChildren = (block, i) => {
    const { isMobile } = this.props;
    const item = block.children;
    const textWrapper = (
      <QueueAnim
        key="text"
        leaveReverse
        delay={isMobile ? [0, 100] : 0}
        {...item.textWrapper}
      >
        <div key="time" {...item.time}>
          {item.time.children}
        </div>
        <h2 key="title" {...item.title}>
          <i {...item.icon}>
            <img src={item.icon.children} alt="img" />
          </i>
          {item.title.children}
        </h2>
        <div key="p" {...item.content}>
          {item.content.children}
        </div>
      </QueueAnim>
    );
    return (
      <OverPack key={i.toString()} {...block}>
        {isMobile && textWrapper}
        <QueueAnim
          className="image-wrapper"
          key="image"
          type={isMobile ? 'right' : 'bottom'}
          leaveReverse
          delay={isMobile ? [100, 0] : 0}
          {...item.imgWrapper}
        >
        </QueueAnim>
        {!isMobile && textWrapper}
      </OverPack>
    );
  };

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
          <Title>Global Data</Title>
          <GlobalLine />
          </div>
        </div>
      </div>
    );
  }
}

export default Content10;
