// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

describe('Example tests', () => {
  test('Example test', () => {
    const wrapper = shallow(
      <div>
        <b>Hello</b>
      </div>
    );

    expect(
      wrapper.matchesElement(
        <div>
          <b>Hello</b>
        </div>
      )
    ).toEqual(true);
  });
});
