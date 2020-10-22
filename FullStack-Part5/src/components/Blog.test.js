import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import EachBlog from './EachBlog'

describe('<Blog />', () => {
  let component;
  let addLikes;

  beforeEach(() => {
    addLikes = jest.fn();
    const blog = {
      author: 'Samundra',
      title: 'Software Testing',
      url: 'test.com',
      likes: 120
    };

    component = render(<Blog blog={blog} handleChange={addLikes} />);
  });

  test('render blogs', () => {
    expect(component.container).toHaveTextContent('Samundra');
  });

  test('only title and author feild will be visible', () => {
    const data = component.container.querySelector('.blog');
    expect(data).toBeDefined();

    const detail = component.container.querySelector('.showDetails');
    expect(detail).toBeNull();
  });

  test('details will be shown when show button is clicked', () => {
    const showButton = component.getByText('Show');
    fireEvent.click(showButton);

    const detail = component.container.querySelector('.showDetails');
    expect(detail).toBeDefined();
  });

  test('like button calls addLikes', () => {
    const showButton = component.getByText('Show');
    fireEvent.click(showButton);

    const likeButton = component.getByText('Like');
    //clicking two times like button
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(addLikes.mock.calls).toHaveLength(2);
  });
});