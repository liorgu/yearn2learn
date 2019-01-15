---
title: 'Simple Redux: Part 1 - Introduction'
date: '2019-01-15'
slug: '/simple-redux/1-introduction'
---

1. [Introduction](/simple-redux/1-introduction) - You are here
2. What is Redux
3. Why to use Redux
4. Redux Store
5. Redux Actions
6. Redux Reducers
7. The Dispatch Function
8. Create Store
9. Subscribe to store
10. Change store data

### What is Simple Redux Series about?

Obviously, it is a series about Redux.
This series is intended for both developers which are getting started with Redux, and developers who already know Redux who want to strengthen their basics.  
When we get used to a library, we may forget some important details about it:

- Which problems does it try to solve?
- What are the alternatives to the library?
- Why and when to use the library?

Redux is not just a library, it is a concept. When you get familiar with Redux, you are exposed to a bunch of terms like: store, actions, reducers and more. Also there are a lot of utility libraries for Redux.  
I believe that in order to know Redux well, you should master the basics of Redux and its state of mind, without all the decorations around.  
This series is written for these 2 main reasons:

- On the high level, to understand what is Redux, what are its use cases and how to decide if to use it or not.
- On the low level, getting deeper to the internals of Redux and to connect its puzzle pieces.

### What is Simple Redux Series not about?

This series is only about the very basics of Redux.
The following content won't be included in this series:

- How to use React-Redux library.
- Using Redux Dev Tools - it is a basic topic, but it is not a part of the internals of Redux.
- Patterns for improving performance when using Redux.
- Patterns for fetch data from an API When using Redux.
- Redux Middlewares - They are integral part of Redux, but it is an advanced topic.
- Additional Libraries to use with Redux.

### The structure of the series

1. Introduction - This part, which explains what is the motivation behind this series, and what it includes.
2. What is Redux - What is this library about, and what is its purpose.
3. Why to use Redux - Use cases when we need to use Redux, what are the alternatives and how we decide if to use it or not.
4. Redux Store - Its purpose, structure and what it should contain.
5. Redux Actions - Their purpose, structure and how to create them.
6. Redux Reducers - Their purpose and structure.
7. The Dispatch Function - Its purpose, argument, and how it works under the hood.
8. Create Store - How to create a store in the beginning of the application.
9. Subscribe to store - How to get changes when the data of the store changes.
10. Change store data - The final part which summarizes the whole process, from dispatching an action until the data arrives to the store.

I hope you find it useful.