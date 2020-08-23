import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import carousel1 from './carousel1.jpg'
import carousel2 from './carousel2.jpg'
import carousel3 from './carousel3.jpg'
const items = [
  {
    src: carousel1,
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: carousel2,
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: carousel3,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;