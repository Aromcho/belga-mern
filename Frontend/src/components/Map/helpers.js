import { Style, Icon } from 'ol/style';

export const normalStyle = new Style({
  image: new Icon({
    src: '/images/pin.svg'
  })
});

export const hgihStyle = new Style({
  image: new Icon({
    src: '/images/pin-high.svg'
  })
});
