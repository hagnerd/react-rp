## What is react-rp?

A single function that makes the logic around supporting multiple props for rendering in React easier. This is based on a utility that I end up writing in pretty much every react project I create (in a utils file/folder). I decided to finally publish it to NPM and put it up on Github because of a stream that Kent C Dodds did about refactoring a Render Props component to use a Custom Hook with the Render Props pattern.

I realized that even though it is a small function, and fairly easy to wrap your head around, it is also flexible and therefore may be usable by people other than myself.

## What problems does it solve?

If you're designing a component that uses the Render Props pattern but want it to remain flexible for the consumers of your component, then you know that duplicating the logic of checking `typeof children === 'function'` or `typeof render === 'function'` or both, can be tedious, and also makes your return look absolutely gnarly.

A typical render function in a render prop might look like this:

```jsx
render() {
  const { count } = this.state;
  const { children, render } = this.props;
  const { increment, decrement, reset } = this;

  return typeof children === 'function'
    ? children({ count, increment, decrement })
    : typeof render === 'function'
      ? render({ count, increment, decrement })
      : null;
}
```

You not only have to manually check each of the potential props that the consumer can render from, but you also have to re-declare all of the state/functionality that you want to pass along.

You can make this slightly better:

```jsx
render() {
  const { count } = this.state;
  const { children, render } = this.props;
  const { increment, decrement, reset } = this;
  const renderProps = { count, increment, decrement }

  return typeof children === 'function'
    ? children({ renderProps })
    : typeof render === 'function'
      ? render({ renderProps })
      : null;
}
```

You still have to make a single object with the properties you want to pass along, and then pass it into each potential function.

What if instead of either of those, you could instead do:

```jsx
// import rp from '@hagnerd/react-rp'

render() {
  return rp([ this.props.children, this.props.render ], { count: this.state.count, increment: this.increment, decrement: this.decrement, reset: this.reset})
}
```

Now you don't have to handle the logic for resolving which function to pass the props along to and render from. You don't have to declare the state/functions you want to pass along multiple times. There is a third optional argument, that is an object with a `fnPicker` property, which is responsible for resolving how to handle choosing which function to render from if passed an array, as well as the `renderFn` property which is the function that is chosen to render from.

## Why not `utility-x` or `utility-y`

There are other small utilities published on NPM that help with this problem. However, I have yet to find one that has ergonomic support for handling both a single render prop, as well as multiple render props.

## What about the death of the Render Props Pattern?

I have confidence that the Render Props patten will be around for a while, even once Hooks are released. In fact, making a Render Props component with a Function Component + Custom Hook is an even easier way to design Render Props components. The great thing about react-rp is that it is just straight up JavaScript. You could use it outside of react entirely and it will still work.

All the utility does is take either a function or an array of potential functions, and then resolves from left to right to find the first function, and then applies the second argument (which is the input for the function). The second argument can be anything, a primitive, an array, an object, a function, it doesn't matter.

```jsx
render() {
  return [this.props.children, this.props.render].find(fn => typeof fn === 'function')({ count: this.state.count, increment: this.increment, decrement: this.decrement, reset: this.reset })
}
```
