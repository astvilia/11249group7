import { render, screen } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import { BarCodeScanner } from 'expo-barcode-scanner';
import App from './App';

it('renders without issue', () => {
  shallow(<App/>);
});

it('renders camera component', () => {
  const wrapper = shallow(<App/>);
  const camera = shallow(<BarCodeScanner/>);

  expect(wrapper.contains(camera)).toBeInTheDocument;

})

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('user login', () => {
  render(<App/>);
  
  
});
