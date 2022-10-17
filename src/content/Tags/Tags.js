import React from 'react';
import {
  Grid,
  Column,
} from '@carbon/react';

const Tags = () => {
  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <h1 className="landing-page__heading">
        Tags
        </h1>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <Grid className="tabs-group-content">
          <Column
            lg={16}
            md={8}
            sm={4}
            className="landing-page__tab-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor metus et ante luctus pretium. Vestibulum tincidunt eros ultricies orci convallis, eget egestas orci faucibus. Nam eget diam nec est varius cursus. Curabitur tempus lacinia neque, mollis sodales lectus ornare at. Nullam in magna vitae quam molestie dignissim ut nec tortor. Sed mollis nibh id dui condimentum, vel iaculis tortor dictum. Maecenas et sodales elit, vitae sollicitudin erat.</p>
            <p>Phasellus sodales ligula a pellentesque viverra. Donec rutrum felis quis egestas luctus. Sed sed ligula eros. Nulla sed dolor est. Fusce et convallis felis. Aliquam ornare felis lectus, id finibus ante finibus eu. Vestibulum at volutpat nulla, a viverra tellus. Ut accumsan diam sed nisi maximus molestie. Phasellus consequat non nunc quis dictum. Sed congue eu quam at feugiat. Maecenas ipsum nulla, eleifend at placerat sit amet, rhoncus ut lacus. In eget nisl viverra, luctus justo eget, tincidunt elit. Vivamus lacinia nunc condimentum erat elementum, in viverra est vulputate. Nunc sit amet risus mi. Sed pellentesque ullamcorper nunc non fermentum.</p>
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent sed euismod ligula. Maecenas lacinia auctor felis sed venenatis. Duis ut metus quam. Donec posuere faucibus ex, et euismod tortor bibendum nec. Aliquam semper massa faucibus tellus blandit, id efficitur quam tristique. Etiam finibus placerat consequat. Nam accumsan velit elit, volutpat mollis lacus eleifend et. Curabitur volutpat vestibulum ligula et hendrerit. In hac habitasse platea dictumst. Donec ac mattis mi. In hac habitasse platea dictumst. In finibus neque a nisi egestas ultrices. Morbi non efficitur ante, volutpat blandit tortor.</p>
          </Column>
        </Grid>
      </Column>
    </Grid>
  );
};

export default Tags;
