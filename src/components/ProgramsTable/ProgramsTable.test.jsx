import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import ProgramsTable from './ProgramsTable';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  authentication: {
    username: 'edx',
  },
  userAccount: {
    profileImage: {
      imageUrlMedium: 'someImageData',
    },
  },
});

describe('ProgramsTable', () => {

  let props = {};
  let programQueryData = [
    {
      node: {
        context: {
          programUUID: '6eefc008-db50-46f0-8746-667f55533a5d',
          programSlug: 'Example Program',
          programName: 'exampleprogram',
        },
      },
    },
    {
      node: {
        context: {
          programUUID: null,
          programSlug: null,
          programName: null,
        },
      },
    },
  ];


  it('renders table when there are valid programs', () => {
    const tree = renderer
      .create((
        <Provider store={store}>
          <ProgramsTable programQueryData={programQueryData} />
        </Provider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders error page when there are not valid programs', () => {
    programQueryData[0].uuid = "totes doesn't exist";
    const tree = renderer
      .create((
        <Provider store={store}>
          <ProgramsTable programQueryData={programQueryData} />
        </Provider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
