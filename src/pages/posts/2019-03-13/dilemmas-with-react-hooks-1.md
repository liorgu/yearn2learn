---
title: 'Dilemmas With React Hooks - Part 1: States And Reducers'
date: '2019-03-13'
slug: '/dilemmas-with-react-hooks-1'
---

The new Hooks API is fun and easy to use, but we need to change our state of mind in order to use it correctly in terms of readability and performance. Some of the hooks seem similar, and we need to choose one over another. In this article, I will compare some of the new React API, and share from my own experience.

- [useState vs useReducer](#usestate-vs-usereducer)
- [callback functions vs dispatch](#callback-functions-vs-dispatch)
- [inline reducer vs outline reducer](#inline-reducer-vs-outline-reducer)

### useState vs useReducer

Both hooks are used for managing local data in the component.
Some good articles were written about this subject by [Kent C. Dodds](https://kentcdodds.com/blog/should-i-usestate-or-usereducer) and [Matt Hamlin](https://matthamlin.me/blog/2019/february/why-you-should-useReducer/).
The main advantage of useState over useReducer is its simplicity.
You just write:
`const [color, setColor] = useState('blue')`
and you have already an initialized local state and a method for changing it.  
Things are getting more complicated when you need multiple states. For example, let's say that we make an asynchronous AJAX call for fetching a list of users. We will use two states for it, one for handling the list of the users, and the other for saving the loading state. The code will look like:

```javascript
const [usersList, setUsersList] = useState([])
const [loading, setLoading] = useState(false)
const fetchUsers = () => {
  setLoading(true)
  fetch('https://someUrl')
    .then(response => response.json())
    .then(data => {
      setLoading(false)
      setUsersList(data)
    })
}
```

The two setter methods will trigger two render calls. It shouldn't surprise you because it would happen also in the same situation on a class component with two `setState` calls. **Currently, React will only batch separate setState/useState calls when they are triggered within React event handlers. However, multiple calls to setState/useState from setTimeout, promises, and async functions won't be batched.** Look at [this issue](https://github.com/facebook/react/issues/14259#issuecomment-450167403) for a reference.  
So what is the big deal, you probably ask. Why not to wrap everything on a single state? It will look like this:

```javascript
const [state, setState] = useState({ loading: false, users: [] })
const fetchUsers = () => {
  setState(previousState => ({ ...previousState, loading: true }))
  fetch('https://someUrl')
    .then(response => response.json())
    .then(data => {
      setState({ users: data, loading: false })
    })
}
```

And the number of lines is even smaller! Unfortunately, in my opinion, the size doesn't matter in this case.  
You can see in the example above that you can send to the setter function two types of arguments: Function that its input is the current state and its output is the next state or just the value of the next state. It corresponds to the abilities of `setState` on class components.  
However, there is a noticeable difference between the setter function from `useState` to `setState`. With `setState` We could just call `this.setState({ loading: true })` and if the state object contains other attributes besides `loading`, their value will be preserved. In `useState`, we had to write `setState(previousState => ({ ...previousState, loading: true }))` and **explicitly set the previous state, otherwise it will be override.** Also, the code becomes less readable, especially if we have more "sub-states" in our single state object.  
To our luck, we have another option - the useReducer hook. Now the code will be like this:

```javascript
const [state, dispatch] = useReducer(
  (previousState, action) => {
    switch (action.type) {
      case 'loading':
        return { ...previousState, loading: true }
      case 'users_fetched':
        return { loading: false, users: action.users }
      default:
        throw new Error('unexpected action type')
    }
  },
  { loading: false, users: [] }
)
const fetchUsers = () => {
  dispatch({ type: 'loading' })
  fetch('https://someUrl')
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'users_fetched', users: data })
    })
}
```

Yes, I know what you are thinking about. We still have to destruct the previous state, and now we have a much longer code. So what are the obvious benefits of the new code?

1. The code is more readable. We give names to our actions - "loading", "users_fetched". It is a sort of documentation to our state changes.
2. The code in the reducer is reusable - we can dispatch the same action from multiple places without copying the logic of the setter.

On the other side, instead of using useReducer, we could just create a named function for each scenario of the setter of useState and achieve the same goals, but useReducer is a central place that can solve all our problems, and I will show more advantages of it on the next section. For now, I will summarize this point by expressing that I would use useState for simple components that don't contain much sub-states and logic, and useReducer for more complex ones.

### Callback functions vs dispatch

Let's imagine an app when we have a list of colors, and some buttons with actions to change the list. We will divide it into three components:

1. ColorsApp - The root component of our app.
2. ColorsList - List with all the current colors.
3. ButtonsPanel - Panel which includes action buttons to change our list.

We will manage an array with all the colors in the root component because we need to access/change it from the list component and from the buttons panel component. Now, look at an implementation of ColorsApp with useState:

```jsx
    const [colorsList, setColorsList] = useState([])
    const fetchRandomColors = () => setColorsList(...)
    const deleteDarkestColor = () => setColorsList(...)
    const addBlueColor = () => setColorsList(...)
    return (
      <>
        <ColorsList colorsList={colorList} />
        <ButtonsPanel
          fetchRandomColor={fetchRandomColors}
          deleteDarkestColor={deleteDarkestColor}
          addBlueColor={addBlueColor}
        />
      </>
    )
```

So far so good. **Whenever you write a new component, I advise you to put a console.log inside it to ensure it is rendered when you think it should render.** Now, please assume that the ButtonsPanel is a functional component that is wrapped by React.memo, and there is a console.log statement at the beginning of this function. When we click on one of the buttons, it will trigger a change in the colorList state. To our surprise, the ButtonsPanel component will be rendered again.  
 But none of the props of the ButtonsPanel has changed, right? Wrong! Every time we render the ColorsApp component, the callbacks functions are recreated, so their reference is different from the last render and the shallow equal check returns false. In order to prevent it we need to wrap each callback with useCallback which will memoize it:

```javascript
 const fetchRandomColors = useCallback(() => setColorsList(...), [])
 const deleteDarkestColor = useCallback(() => setColorsList(...), [])
 const addBlueColor = useCallback(() => setColorsList(...), [])
```

It already looks messier. Also, it sucks to pass three callbacks as three different props, and if we need to add more actions so we will have more props. No worry, useReducer comes to our rescue:

```jsx
  const [state, dispatch] = useReducer((previousState, action) => {
      switch(action.type) {
        case 'fetch_random_colors':
          return ({ ...previousState, colors: ... })
        case 'delete_darkest_color':
          return ({ ...previousState, colors: ... })
        case 'add_blue_color':
          return ({ ...previousState, colors: ... })
        default:
          throw new Error('unexpected action type')
      }
    }, { colors: [] })
  return (
    <>
      <ColorsList colorsList={colorList} />
      <ButtonsPanel dispatch={dispatch} />
    </>
  )
```

Much cleaner in my opinion. The dispatch variable is guaranteed to remain the same, so we don't need to memoize it, and we only send one prop for all our needs to change the state. Also, if we have a deep component tree where we want to call those actions, **we can use the useReducer with useContext**. [This is a recommended pattern by the React team](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down). However, a major drawback of this method is the lack of descriptiveness. When you see the dispatch function in your props, you don't know the actions that you can invoke and you need to make reverse engineering. It would have been avoided if we had passed each callback directly as a prop.

### Inline Reducer vs Outline Reducer

Assuming you have decided to use the useReducer hook in your component, where should you define the reducer? Outside or inside the functional component? When I write "reducer" I mean the first parameter of the useReducer hook, the function which gets a state and action and returns the updated state.  
An obvious advantage of putting the reducer inside the functional component is the possibility to use the props inside the reducer. If you ever used Redux and wanted to use props in the reducer without the need of passing it through the action, your dream comes true. You don't need to send the props in the dispatch function. They are already available in the reducer function because its closure contains it. This helps to make the dispatches of the actions thinner.  
So where is the catch? Sometimes the reducer is being called twice. You can see some references [here](https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice) and [here](https://stackoverflow.com/questions/55055793/react-usereducer-hook-fires-twice-how-to-pass-props-to-reducer). I didn't encounter this issue personally. I published a question about it on Twitter and [Dan Abramov answered](https://twitter.com/dan_abramov/status/1105998411671764995) that it may happen, but it won't have any implications because the reducer is a pure function.
In any case, I can advise writing an inline reducer only if needed - only if you need access to props. Also, put a console.log in the reducer to ensure it is being called when you expect it. If not, and the reducer contains a long computation, you can always wrap it with useCallback or define it outside the function and send the needed props when you dispatch the actions.

---

This is all for now. I hope you understand better the useState and useReducer hooks and the dilemmas they can possibly arise. In the next parts, I will represent more dilemmas and more hooks. Watch out!
