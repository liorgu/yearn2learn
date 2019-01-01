---
title: Hello Yearn 2 Learn
date: '2019-01-01'
slug: '/hello-yearn-2-learn'
---

Hi all and welcome to my new blog, Yearn 2 Learn.  
The blog is divided to the following parts:

- [About](/about) : More information about the objectives of the blog and about myself.
- [Posts](/posts) : Includes all the posts I write(this post for example).
- [Weekly Links](/weekly-links) : On each week I will publish a new list of interesting articles that were written during the week.
- [Resources](/resources) : Collections of useful resources, divided by subjects.

### Why I built this site

- **Lack of options in my old blog**  
   My previous blog, [Links 4 Developers](https://links4developers.wordpress.com/), is built on WordPress platform, which I use as a CMS system and for web hosting.  
  I design, write, and manage everything on that blog through WordPress.  
  WordPress gives a rich variety of features and customization options, and it is really nice to get everything without bothering.  
  However, I don't have a full control of my site, and because I use the hosting service of WordPress, I cannot install WordPress plugins, so my options are limited.
- **A desire to get bigger**  
  In [Links 4 Developers](https://links4developers.wordpress.com/), I mostly publish links in a weekly basis.  
  I wanted also to publish my own articles and useful resources, and to organize all in a way it can be found easily.
- **Share my knowledge with others**  
  This is the reason why I started blogging in the first place.  
  Also, when you write about subjects that you already know, you get deeper in them and enrich your own knowledge.
- **I am a web developer. Let's use my skills**  
  I found out about the Gatsby framework and fell in love with it.  
  It enables to build sites easily with React, which is my favorite, and contains tons of plugins.  
  Also, the Gatsby's community is evolving rapidly, and [Gatsby's Site](https://www.gatsbyjs.org/) contains comprehensive documentation and tutorials to get started quickly.

### Technology Stack

- **Gatsby**  
  As I wrote on the last paragraph, Gatsby is a framework for generating sites.  
  Gatsby is proud about the performance and the security of the generated site.  
  There is a misconception that Gatsby can only be used for building static sites, but it can also help in building dynamic sites.  
  The Gatsby's team considers it as Create React App ++.
- **React**  
  React is built-in inside Gatsby.  
  It is mostly used for writing common components of the blog like its layout, a template for blog posts, navigation bar and more.

- **SCSS and CSS Modules** for writing design rules for the React components.

- **Typography.js with Parnassus theme** as a design system for the blog, with some overrides.

- **GraphQL**  
  GraphQL is a query language for APIs, which is used by Gatsby.  
  It is mostly used for fetching data of resources like pages and images.

- **Markdown** for writing content for the blog.
- **Git and GitHub** for managing versions of the blog.
- **Netlify**  
  Netlify is used for hosting the blog.  
  It has integration with GitHub and Gatsby, so when a new code is push into master branch, Netlify runs "gatsby build" command for creating a production build of the site, and also deploys it.
- **Mailchimp**  
  Mailchimp is used for managing subscribers on the blog.  
  It adds a new record when a new user is subscribed to the blog and sends emails to the subscribers when they join the list and when a new post is published.  
  The integration of Mailchimp with Gatsby is done by "gatsby-plugin-mailchimp" plugin.
- **Disqus**  
  Disqus is a platform for adding comments and reactions to web pages.  
  The library "disqus-react" is used to integrate Disqus with the React application.
