function renderProps(
  fns,
  props,
  failure = () => {
    throw new TypeError("none of the supported render props are functions");
  },
  {
    fnPicker = selections =>
      Array.isArray(selections)
        ? selections.find(item => typeof item === "function")
        : typeof selections === "function"
          ? selections
          : undefined,
    renderFn = fnPicker(fns)
  } = {}
) {
  return renderFn ? renderFn(props) : failure();
}

module.exports = renderProps;
