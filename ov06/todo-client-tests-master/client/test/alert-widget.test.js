// @flow

import * as React from 'react';
import { Alert } from '../src/widgets.js';
import { shallow } from 'enzyme';

describe('Alert tests', () => {
  test('No alerts initially', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.matchesElement(<></>)).toEqual(true);
  });

  test('Open three alert messsages and close the second alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      done();
    });
  });

  test('Close alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test1');
    Alert.danger('test2');
    Alert.danger('test3');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test1<button>&times;</button>
            </div>
            <div>
              test2<button>&times;</button>
            </div>
            <div>
              test3<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      wrapper.find('button.close').at(1).simulate('click');

      expect(
        wrapper.matchesElement(
          <>
            <div>
              test1<button>&times;</button>
            </div>
            <div>
              test3<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      done();
    });
  });
});
