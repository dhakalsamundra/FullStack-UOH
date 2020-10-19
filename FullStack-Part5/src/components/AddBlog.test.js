import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlog from './AddBlog';

describe('<AddBlog />', () => {
  let component;
  let addNewBlog;
  beforeEach(() => {
    addNewBlog = jest.fn();
    component = render(<AddBlog addNewBlog={addNewBlog} />);
  });

  test('all input feilds are rendered', () => {
    const form = component.container.querySelector('form');

    const authorFeild = component.container.querySelector('#author');
    const titleFeild = component.container.querySelector('#title');
    const urlFeild = component.container.querySelector('#url');

    fireEvent.change(authorFeild, {
      target: { value: 'Samundra' },
    });

    fireEvent.change(urlFeild, {
      target: { value: 'samundra.com' },
    });

    fireEvent.change(titleFeild, {
      target: { value: 'Software Testing' },
    });
    fireEvent.submit(form);

    expect(addNewBlog.mock.calls[0][0].author).toBe('Samundra');
    expect(addNewBlog.mock.calls[0][0].title).toBe('Software Testing');
    expect(addNewBlog.mock.calls[0][0].url).toBe('samundra.com');
  });

  test('updates parent state and calls onSubmit', () => {
    const input = component.container.querySelector('input');
    const form = component.container.querySelector('form');

    fireEvent.change(input, {
      target: { value: 'testing of forms could be easier' },
    });
    fireEvent.submit(form);

    expect(addNewBlog.mock.calls).toHaveLength(1);
    expect(addNewBlog.mock.calls[0][0].title).toBe(
      'testing of forms could be easier'
    );
  });
});
