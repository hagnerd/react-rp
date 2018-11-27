const rp = require('./main');

const noop = () => {};

test('it should work with a single function as input', () => {
  const spy = jest.fn();
  rp(spy, 'hello');

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith('hello');
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
