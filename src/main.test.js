const rp = require('./main');

const noop = () => {};

// TODO: refactor / cleanup tests

test('it should work with a single function as input', () => {
  const spy = jest.fn();
  rp(spy, 'hello');

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith('hello');
});

test('it should fail if the only render prop is not a function', () => {
  const spy = 'fail';

  function handleError() {
    throw new Error('test error');
  }

  expect(() => {
    rp(spy, 'ha');
  }).toThrow();

  expect(() => {
    rp(spy, 'ha', handleError);
  }).toThrow(/^test error$/);
});

test('it should work with an array of functions as input', () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();

  rp([spy1, spy2], 'hello');

  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy1).toHaveBeenCalledWith('hello');
});

test('it should select the first fn by default when an array is passed as input', () => {
  const spy1 = 'blah';
  const spy2 = jest.fn();

  rp([spy1, spy2], 'hello');

  expect(spy2).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledWith('hello');
});

test('it should pass the correct arguments', () => {
  const spy = jest.fn();
  const arg1 = 'hello';
  const arg2 = 20;
  const arg3 = ['hello', 'goodbye'];
  const arg4 = { id: 1, desc: 'fun' };

  rp(spy, arg1);
  expect(spy).toHaveBeenCalledWith(arg1);

  rp(spy, arg2);
  expect(spy).toHaveBeenCalledWith(arg2);

  rp(spy, arg3);
  expect(spy).toBeCalledWith(arg3);

  rp(spy, arg4);
  expect(spy).toBeCalledWith(arg4);

  rp(spy, noop);
  expect(spy).toBeCalledWith(noop);
});

test('it should throw an error by default when no function is passed', () => {
  const spy1 = 'string';
  const spy2 = 2;

  function wrapper() {
    rp([spy1, spy2], 'blahblahblah');
  }

  expect(wrapper).toThrow();
  expect(wrapper).toThrow(TypeError);
  expect(wrapper).toThrow(/^none of the supported render props are functions$/);
});

test('the third argument should be overrideable with your own function/component', () => {
  const spy = 'string';
  const actualSpy = jest.fn();

  function handleError() {
    throw new Error('this is an error');
  }

  function wrapper() {
    rp(spy, 'blah', handleError);
  }
  expect(wrapper).toThrow();
  expect(wrapper).toThrow(/^this is an error$/);
});
