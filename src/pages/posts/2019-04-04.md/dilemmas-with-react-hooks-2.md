---
title: 'Dilemmas With React Hooks - Part 2: Persistence And Memoization'
date: '2019-04-04'
slug: '/dilemmas-with-react-hooks-2'
---

In this part, we will discuss persistence and memoization with React hooks. First, we will explain these terms. Then, we will see some hooks and other APIs in React that are related to it and go through some use cases and optional pitfalls.

- [Persistence vs Memoization](#persistence-vs-memoization)
- [useState vs useRef vs createRef](#usestate-vs-useref-vs-createref)
- [useMemo vs useCallback vs memo](#usememo-vs-usecallback-vs-memo)

### Persistence vs Memoization

Persistence and memoization are two big words that have a simple meaning. Let's get over them one by one.  
Persistence is a piece of data, which still exists even after the process who created it "dies". 
We can connect this term to two hooks that we already encountered in the previous part - [useState and useReducer](https://yearn2learn.netlify.com/dilemmas-with-react-hooks-1). 
We have a value that we want to keep after the functional component rendered, so we will be able to use it or change it on the next renders of this component. We will see additional React APIs that enable persistence in the next section.
Memoization is persistence with a twist: we calculate a function, and we want to remember its result so we will be able to avoid repeating the calculation of the same function for the same inputs.
In React, we have two types of memoization:
1. Memoization of internal functions within the functional component.
2. Memoization of the entire functional component.  

There are different APIs for implementing those kinds of memoization. We will compare them and analyze how we can decide whether to use them or not in the last section of this article. 

### useState vs useRef vs createRef

We will start with the most basic example: we have a span whose initial value is 0 and a button. When we click on the button, the number is increased by one.

```jsx
  const [counter, setCounter] = useState(0);
  const increaseCounter = () => setCounter(counter + 1);

  return (
    <>
      <span>{counter}</span>
      <button onClick={increaseCounter} />
    </>
  );
```

The use of `useState` hook is trivial: on click, we want to update the value of the span. A call to `setCounter` updates the new value of the counter, **persists the new value and triggers a new render**, where the span gets the updated value.
Let's make it a little bit more complicated. We now don't want to increase the counter by 1. We want to increase the counter according to the value of another variable. We have one more button. The number of clicks on this button defines the increase step of the counter. We can save another state for it:

```jsx
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(0);
  const increaseCounter = () => setCounter(counter + step);
  const increaseStep = () => setStep(step + 1);

  return (
    <>
      <span>{counter}</span>
      <button onClick={increaseCounter} />
      <button onClick={increaseStep} />
    </>
  );
```

This approach does its job but has one major flaw. When we click for increasing the step, we just want to update the value of the step without any visual changes. However, `setStep` triggers a new render, for nothing. I wish we would have a hook that persists the step value but doesn't trigger an additional render. Apparently, this is my lucky day. The `useRef` hook works in this manner:

```jsx
  const [counter, setCounter] = useState(0);
  const step = useRef(0);
  const increaseCounter = () => setCounter(counter + step);
  const increaseStep = () => (step.current = step.current + 1);
  return (
    <>
      <span>{counter}</span>
      <button onClick={increaseCounter} />
      <button onClick={increaseStep} />
    </>
  );
```

So `useRef` is not only for saving references to DOM elements. Basically, it gives you an object, that you can mutate its `current` attribute, and **it will be persisted between renders, without triggering a new render**. It is very similar to saving data on `this` in class components. You can read more about it on the [great React documentation](https://reactjs.org/docs/hooks-reference.html#useref).  
In React 16.3, a new `createRef` API was introduced. What is the difference between it and `useRef`? Can we use it instead of `useRef`? We will check the behavior of the following code: 

```jsx
const [counter, setCounter] = useState(0);
  const step = createRef();
  step.current = 0;
  const increaseCounter = () => setCounter(counter + step);
  const increaseStep = () => (step.current = step.current + 1);
  return (
    <>
      <span>{counter}</span>
      <button onClick={increaseCounter} />
      <button onClick={increaseStep} />
    </>
  );
```

This is the same code as before, with changing `useRef` with `createRef`. `createRef` method doesn't have any arguments. Its initial value is null, so we set it to 0 in the next line. This code has different behavior from the code with `useRef`. Like before, the step value will be updated and will be no render following clicking on the step button. However, after each render which is triggered by the counter button, the step value is being reset. The reason behind it is simple - `createRef` is called on each render and it initializes the step variable to null. In `useRef`, the initial value is determined on the first render, and it is persisted during the next renders.  
Dan Abramov [described](https://www.reddit.com/r/reactjs/comments/a2pt15/when_would_you_use_reactcreateref_vs_reactuseref/eb17vz5) `useRef` mental model as:

```jsx
function useRef(value) {
  const [ref] = useState(createRef(value));
  return ref;
}
```

To summarize this section:

1. Use `useState` when you want to persist and trigger a new render on functional components.
2. Use `useRef` when you want to persist but not to trigger a new render on functional components.
3. Use `this` and `createRef` to achieve persistence on class components.

### useMemo vs useCallback vs memo

Now we are talking about memoization.  
A quick reminder: We use memoization to gain performance. We save the result of a function that was invoked with specific parameters, so when this function is called again with the same parameters, we wouldn't need to calculate it again, just retrieve the cached result. It is important to remember that memoization also has a cost of memory, where the results are being saved. React has 3 APIs which are related to memoization.
The first and classic one is `useMemo`. It gets two parameters - the memoized function and an array of dependencies. The result of the function from the previous render will be used in the next render only if the values of all the dependencies were not changed:

```jsx
const a = (() => b + c, [b, c]);
```

Some important points about `useMemo`:
1. **Only the result from the last render of the component is saved**, not results of other previous renders, and not results of other instances of the same component.
2. If you forget to pass a second argument to `useMemo`, the memoization will never occur. If you pass an empty array as the second argument, the function will be executed only once and that result will be memoized for the rest of the component life.
3. You don't have to put all the variables that are being used at the memoized function on the dependencies array, but you should. Otherwise, you may have bugs that you don't anticipate. In order to prevent those mistakes, I **recommend using the [ESLint plugin of React hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)** which has a rule named "exhaustive-deps" which will warn you if a dependency was missed.
4. React team warns that in the future, the memoization won't be guaranteed. From React docs: "You may rely on useMemo as a performance optimization, not as a semantic guarantee. React may choose to “forget” some previously memoized values and recalculate them on next render".  

That is all about `useMemo` and now it is the time for `useCallback`. This method is just syntactic sugar for memoization of functions which return a function.

```jsx
const onChange = useMemo(() => () => console.log('Hello, World'), []);
```

is equal to:

```jsx
const onChange = useCallback(() => console.log('Hello, World'), []);
```

We can use `useMemo` or `useCallback` to prevent redundant renders. Let's refer to the following example: 

```jsx
const MyFunctionalComponent = () => {
  const onChange = () => alert('I am not memoized');
  // ...
  // Some more logic
  // ...
  return (
    <SuperComponent onChange={onChange} />
  )
```

We are inside a functional component, and we have a function variable that is created within this component. We didn't use `useMemo` or `useCallback` for memoizing it. This function is created on each render, so we send a new reference of it to SuperComponent every time. It will probably cause SuperComponent to be rendered again even it is useless. In those cases, when we have an array/object/function that its value remains the same but the reference changes, it is a good practice to use `useMemo`/`useCallback`.  

```jsx
const MyFunctionalComponent = () => {
  const onChange = useCallback(() => alert('I am memoized'), []);
  // ...
  // Some more logic
  // ...
  return (
    <SuperComponent onChange={onChange} />
  )
```

Now for the last API - the `memo` function.   
Wait a minute, I'm confused... We already talked about `useMemo`.   
No mistake this time. `memo` is not a hook like `useMemo`(all hooks start with "use"), and it was introduced officially before hooks API, in React 16.6. It enables us to memoize the entire component.  
In class components, we can use `PureComponent` or `shouldComponentUpdate`, for preventing re-render of a component if all of its props didn't change or according to custom logic.  
The `memo` function gets two parameters - the first is the functional component to memoize, and the second is a function that should return a boolean. This boolean symbolizes if we want to memoize the component or not. 
We can omit the second parameter, and then the memoization will occur only if the current values of all the props are shallow equal to their values on the previous render. This is similar to `PureComponent` on class components.
If you want to specify another logic for this memoization, you can send a function as the second parameter. It will behave like `shouldComponentUpdate` on class components, just the opposite: This function should return true if we want to memoize. If we would return true on `shouldComponentUpdate` to mean that the component should re-render, the second argument of `memo` should return false and vice-versa.  

Some additional points:
1. As `useMemo`, and `useCallback`, React doesn't guarantee the memoization: from React docs: "This method only exists as a performance optimization. Do not rely on it to “prevent” a render, as this can lead to bugs".
2. Don't overuse this method. If the component gets a prop that will always be different like `children`, the memoization may never occur and the performance will be only worse. In this case, We will run the shallow equal for all props or a custom comparison function although it will always return false. I advise to **check if your component being unexpected re-rendered** by a `console.log` at the beginning of the functional component, or by other means, and **only use `memo` if it is necessary and helps to prevent redundant renders.**  

---

This is the end of the current part. I hope that persistence and memoization stopped threatening you, and you know to use the right hook for the job when needed. Additional parts of this series are being typed right now. Take care.
