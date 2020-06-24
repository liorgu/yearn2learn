---
title: 'Do It Better - Refactoring Code In a Web Application'
date: '2020-06-24'
slug: '/do-it-better-refactoring'
---

You have just got a new refactoring task. I am not talking about a rename of a method, but on an architecture change that might take a considerable amount of time. Then, what is next?

You are going to change a code that works. The risk is high and the gain may be invisible in the short term. Therefore, this task should be carefully organized. In this article, I will discuss some phases in the refactoring process and suggest a few methods to increase the probability that the task will be done successfully. Many of the suggestions below fit also regular programming tasks.

- [Why Is It Needed? ](#why-is-it-needed)
- [Learning Existing State](#learning-existing-state)
- [What Tests Do You Have?](#what-tests-do-you-have)
- [Building Architecture](#building-architecture)
- [Sharing Is Caring](#sharing-is-caring)
- [Dividing To Pieces](#dividing-to-pieces)
- [Checking The Results](#checking-the-results)

### Why Is It Needed?

Like every task that you get, **you should know the motivation behind it**. There might be a lot of reasons for making this change, here are some popular ones:

- Changing technology
- The current architecture cannot scale
- Performance issues

If one of the reasons is an issue with the existing code, you should identify it and keep it in mind. This will help you to make sure that you are not doing the same mistake twice.  
**Even if you are not a leader in your job role, you are the leader of this task**. So if you think that the task is not needed or that its scope needs to change, you have to speak up.

### Learning Existing State

There are two types of learning that you should do before you start refactoring.  
One thing that you need to learn is about the product/feature. If you change a specific module, **you should be aware of all the interactions** that the user can do with it. This is a crucial step to do. Before planning and writing the new code, you must know what do you need to support.  
The second thing to learn is the existing code. **When you are going to change a code, you need to know it well**. There is a good chance that you need to change only a part of it and keep the other. When you are getting familiar with the code you should focus on the big picture, the current architecture:

- What database tables or data files does it touch?
- Which API does it use and what is the role of each one?
- How the execution of major user interactions is translated into code?

When you learn about an existing feature/code, **you should write your findings somewhere**. I recommend [Notion](https://www.notion.so/) application very much. The process of writing it down in your own words, helps you to understand it more deeply and makes it available for further use.

### What Tests Do You Have?

You are making big changes to a code that is in-use, so if you are human, most likely that you will cause some bugs. Tests have a huge role in minimizing the amount and importance of the bugs.

The old code already exists so there is a chance that there are already written tests. If so, you can review them and **check that they fit your knowledge of the feature**. On one hand, you can learn from the tests about some aspects of the feature that you were not aware of. On the other hand, there may be some known aspects of the feature that are not covered by tests. You should write tests to the missing parts, or ask other group members which it is their job, to do so.

There are a lot of kinds of tests. **You should be more focused on tests that check the product from a user point of view** since files are going to heavily change, but the behavior should remain the same.

**As more tests that you have, the more trust you can have in your code**. The tests can be executed automatically or by hand. Automatic tests will enable you to run it more quickly, but writing them will take longer. So **if there are enough time and resources, automatic tests are better**.

### Building Architecture

So right now you are familiar with the task and covered by tests. This is just the time to make some fun and plan the architecture of the feature. Here are some tips for this phase:

- KISS(keep it simple stupid) - this is a cliche, but it is one of the most valuable points that you can take from this article. **Please avoid sophisticated code at all costs**. It will be hard to understand and in the future, will cause a chain reaction with more sophisticated code during maintenance mode. You should be tight with the principles of the language/framework/paradigm that you work on.
- Try a small POC(proof of concept) - take a small piece from the task and try to implement it. This is just a POC. It doesn't have to be a complete solution for the task. For example, instead of getting data from the client, you can use some hard-coded inputs. You don't have to be careful about syntax and edge-cases. **Just make sure that the idea that you have in your mind can be transformed into a reality.**
- Document it - **Keep your planning written down**. It doesn't have to be a long story. You can summarize the main parts of the feature as user stories, and fill some details for them. This is just a draft. These parts can be changed, use it as a reminder for you as the work that needs to be done.

### Sharing Is Caring

Don't be a lone wolf during this task. You have a lot of interest to talk with others about what do you do or plan to do.

First, you should be coordinated with the people who are going to review your code. **You don't want to invest a lot of time and effort and in the code review, to be told to start it over**. It is a bad feeling - for you and them. They should be involved periodically when you just starting the task, so you won't waste your time for nothing.

Second, you should consult with the experts. You are probably a smart person, but if you need to change/create tables in the database, you should talk with the DBA. If you are using a framework/library that someone else already experimented with it, you may get some insights that you couldn't know otherwise. **Consulting with others is not a shame, it is a privilege**. Of course, you should first make your research and do the talking after you have some ideas on mind.

At last, you may talk with your closest friends at work, even if they are not related to the task. **Even people that are not aware of all of the aspects of the tasks can have sudden enlightenment**. They can jump with some out-of-the-box ideas when you are tied with your original thoughts.

### Dividing To Pieces

On the part of [building architecture](#building-architecture), I recommended writing some user stories as documentation for your planning. Now it is money time. Look on the user stories that you wrote and ask yourself:

- Are the user stories small enough? **You don't want to submit or read a long code review**. It makes it though for the reviewer and you will most likely have more bugs. If the code review is small and focused, the reviewer will have the attention to read it carefully and understand the meaning of each piece of code.
- What is the order of the user stories? Which ones are dependent on each other and which ones can be done in parallel? **This will help you to calculate the estimated time of the task**, and if needed, to split the sub-tasks between a group of people.
- Is the written code can be deployed to production after a successful review? You don't want to work on a feature branch and wait until the whole feature is done. In this case, you are exposed to possible giant merge conflicts and bugs. So how can you deploy a code that is still not completed? **Use [feature flags](https://www.martinfowler.com/articles/feature-toggles.html)**. Only if a boolean variable is on, your code will be executed. Make this feature flag to be configured by account or user, so you will be able to play with it on production.

### Checking The Results

Wow, everything worked as planned (or not) and the feature is done. Is it over? If you have tests, they can check the correctness of the new code. But correctness is just one piece of the puzzle. **The complexity of the code should be analyzed during planning and code review** and there are also automatic tools that do just that.

Another important aspect to measure is the performance of your feature/product. If you used a feature flag as I suggested in the previous section, you can take performance measurements on several common use-cases with and without the feature flag. But what do you do if you find a performance decrease? It depends. If it is a significant change that your users will suffer from, you will have to find the bottleneck. And what if it is no so big? And how big is defined? **[Performance budgets](https://web.dev/performance-budgets-101/) are very common in web applications**. You define some limits for performance metrics, and check if you pass them or not.

---

That's all. The whole process that I described above may look exhaustive, but I think that following it is key to success. I am a firm believer in good planning and not rushing to write the code. Even if you took just one piece of advice from my suggestions, this article achieved its purpose.

Do you agree with the points above? Have more suggestions of your own? I would like to hear from you. In the meantime, I wish you the best in your upcoming refactoring task.
