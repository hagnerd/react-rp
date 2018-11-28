const rp = require('./main');

/* custom error handler for tests */
function handleError(msg) {
  throw new Error(msg);
}

const argList = [
  'string',
  1,
  ['string', 1],
  { id: '1', description: 'test' },
  () => {},
];

const rndm = () => Math.floor(Math.random() * argList.length);

// TODO: refactor / cleanup tests

test('it should work with a single function as input', () => {
  // arrange
  const spy = jest.fn();
  const randomArg = arguments[rndm()];

  // act
  rp(spy, randomArg);

  // assert
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(randomArg);
});

test('it should fail if the only render prop is not a function', () => {
  // arrange
  const err = 'test error';

  // act
  const wrapper = () => rp('blah', 'ha', handleError(err));

  // assert
  expect(wrapper).toThrow();
  expect(wrapper).toThrow(err);
});

test('it should work with an array of functions as input', () => {
  // arrange
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const randomArg = argList[rndm()];

  // act
  rp([spy1, spy2], randomArg);

  // assert
  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy1).toHaveBeenCalledWith(randomArg);
});

test('it should select the first fn by default when an array is passed as input', () => {
  // arrange
  const spy = jest.fn();
  const randomArg = argList[rndm()];

  // act
  rp(['not a function', spy], randomArg);

  // assert
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(randomArg);
});

test('it should pass the correct arguments', () => {
  const spy = jest.fn();

  // string props
  rp(spy, argList[0]);
  expect(spy).toHaveBeenCalledWith(argList[0]);

  // number props
  rp(spy, argList[1]);
  expect(spy).toHaveBeenCalledWith(argList[1]);

  // array props
  rp(spy, argList[2]);
  expect(spy).toBeCalledWith(argList[2]);

  // object props
  rp(spy, argList[3]);
  expect(spy).toBeCalledWith(argList[3]);

  // function props
  rp(spy, argList[4]);
  expect(spy).toBeCalledWith(argList[4]);
});

test('it should throw an error by default when no function is passed', () => {
  // arrange
  const rndmArg = argList[rndm()];
  const wrapper = () => rp(['string', 2], rndmArg);

  // assert
  expect(wrapper).toThrow();
  expect(wrapper).toThrow(TypeError);
  expect(wrapper).toThrow(/^none of the supported render props are functions$/);
});

test('the third argument should be overrideable with your own function/component', () => {
  // arrange
  const err = 'err';
  const wrapper = () => rp('not a function', 'blah', handleError(err));

  expect(wrapper).toThrow();
  expect(wrapper).toThrow(err);
});

test('it should fail if first argument is passed in as undefined', () => {
  const wrapper = () => rp(undefined, 'hello');
  expect(wrapper).toThrow();
  expect(wrapper).toThrow(
    /^none of the supported render props are functions$/i,
  );
});
