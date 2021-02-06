import React from 'react';
import Spinner from '.';

const SpinnerStory = {
  title: 'Spinner',
  component: Spinner,
};

const Template = (args) => (
  <div className="spinner-story-wrapper">
    <Spinner {...args} />
  </div>
);

export const Overview = Template.bind({});
Overview.args = {};

export default SpinnerStory;
