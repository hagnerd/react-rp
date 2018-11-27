'use strict';

function renderProps(
  fns,
  props,
  {
    fnPicker = selections =>
      Array.isArray(selections)
        ? selections.find(item => typeof item === 'function')
        : selections,
    renderFn = fnPicker(fns),
    onFailure = () => {
      console.error('Failed to use component properly');
      return null;
    },
  } = {},
) {
  return renderFn ? renderFn(props) : onFailure();
}

module.exports = renderProps;
