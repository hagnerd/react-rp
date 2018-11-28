function noFunctionError() {
  throw new TypeError('none of the supported render props are functions');
}

const isFunction = a => typeof a === 'function';

const renderProps = (
  functionOrFunctions = noFunctionError,
  props,
  failure = noFunctionError,
  {
    fnPicker = fnOrFns =>
      Array.isArray(fnOrFns)
        ? fnOrFns.find(isFunction)
        : isFunction(fnOrFns)
        ? fnOrFns
        : undefined,
    renderFn = fnPicker(functionOrFunctions),
  } = {},
) => (renderFn ? renderFn(props) : failure());

module.exports = renderProps;
