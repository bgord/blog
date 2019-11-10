---
title: How do I identify my knowledge gaps and learn?
date: "2019-01-26T09:24:29.169Z"
description: Keeping track of my learning progress.
---

> You can read that post on [dev.to](https://dev.to/bgord/how-do-i-identify-my-knowledge-gaps-and-learn-4mlc).

In this article, I'm going to present you my workflow for gathering topics and a way to efficiently learn them.

No one knows everything, that's certain. Every day, I find myself not knowing something, be it a syntax, concept or a pattern. Some missing answers are one google (or duckduckgo) search away, so it would probably be a waste of memory and effort to learn by heart anything I'm able to find under one minute.
But what about concepts? Yeah, most of them are impossible to be "found" in a very short time and require a significant amount of learning effort.

Disclaimer: it's a documentation of my processes — they work for me, but not necessarily must suit you.

# Identifying knowledge gaps.

If I want to become better in some field, I need to know what I don't know. I answered the following questions and tried not to be overly specific. It's still early stage of the entire process, and I wanted to see a big picture only.

1. What **new** technology/concept would be certainly profitable in my day to day job in the next 3-6 months?

2. What field do I want to **deepen** my knowledge in?

3. What piece of technology/concept **excites** me and makes me want to try it?

After writing the answers down, I gave myself a couple of days to digest it and to remove some unnecessary/outdated points. After tidying up, I progressed to the next point.

# Refinement

At first, my list looked like this:

```
1. What new technology/concept would be certainly profitable in my day to day job in the next 3-6 months?

* TypeScript
* Docker
* Observables
* state charts/finite automata

2. What field do I want to **deepen** my knowledge in?

* maintainable CSS and accessibility
* new React patterns (hooks, Suspense)
- better testing (JS/React)
* Git
* more of an advanced vanilla JS and functional concepts/patterns
* Bash scripting
* Vim/Tmux workflow
* UNIX command line programs (sed, grep, awk, etc.)
* RegExps
* Vue
* Nginx

3. What piece of technology/concept **excites** me and makes me want to try it?

* GraphQL
* Rust/Go/Elixir
* basic machine learning algorithms
* designing and prototyping with Figma
* D3.js

```

The next thing I did was prioritization. I sorted each of the three lists by the importance of a topic.

When I start learning about a new thing, there is so much going on in my head. I wanted to find a technique to help me feel less overwhelmed and to be able to tackle a few smaller problems instead of one big one.

What is probably obvious, a point sounding like "Docker" at first doesn't seem approachable, but a question "How to set up a Docker container for a Node.js app printing "Hello world" to the console?" seems like a good starting point.

To track my journey, I created a git repository and the README file became my "Roadmap for 2019". I extracted every point from the list to a separate section, so I can add questions to each of them.

That's the important part: as fast as I identify a question, I add it to the list under the matching section to keep it up to date.

An example of how a basic section could look like:

```
# TypeScript (0/5)

* How to set up React app with TypeScript?
* How to add types for primitive values like string/number/boolean to a single variable?
* How to type objects?
* How to type functions? What about optional and default parameters?
* What's the difference between type/interface?
* How to type React classes and function components?
* What is a type inference?
* What are generic types and how to use them?

and so on...
```

I tried to get out of my head as many points as possible. It was very freshening to see those questions in one place. I realized that after I answer them, I can be kind of fluent in TypeScript. Awesome!

I refine my Roadmap (almost) every day, it includes rephrasing and breaking down the questions to make them more approachable and specific.

# Learning

It gives me the most value when I apply the knowledge to some real-life project or create some sort of snippet with it (a way of avoiding "dry" learning).

In order to retain my Q&As, I create a separate markdown file for each section from the Roadmap. Every time I learn something, I write it to the corresponding file. It gives me easy access every time later. Keep it practical.

An example of the answer looks like the following one.

```
**What is a difference between arguments and parameters?**

Parameters are variables in funcion definition.

function add(x, y) { // x and y are parameters
  return x + y;
}

Arguments are variables passed down to a function in place of parameters.

add(2, 3); // arguments
```

---

I schedule one major item from the Roadmap for each day. It's great if I manage to learn more than that, but the world is not perfect and neither am I. That's definitely enough, still making progress anyways. Imagine learning 365 concepts/techniques in one year, apart from the job or university!

It's important to make it clear when and where I'm going to spend my time studying. Make it as easy as possible to establish this routine as your habit. The last thing before closing my laptop in the evening is turning on a text editor and a browser. Then in the morning after I wake up and have my morning routine, I sit at the desk and learn for at least 20 minutes.

After 2-3 weeks, I'm able to set up a Docker container for Node.js & MongoDB projects, I can type intermediate React/Redux & Redux/Hooks apps, and got better at my Vim/Tmux workflow (it includes in bash scripting).
I was also able to clearly (it was the feedback I got) explain some non-trivial git and HTML&CSS concepts to a beginner (and learnt more of an accessibility myself). All of this apart from the things I learnt in my day to day job.

Small pieces compound.

Regarding the topic of habits, I recommend the "Atomic Habits" book by James Clear, it helped me a ton in coming up with my workflow.

BONUS: you can try to create ANKI card decks for remembering concepts that you learn. You can learn more about spaced repetition [here](https://medium.freecodecamp.org/use-spaced-repetition-with-anki-to-learn-to-code-faster-7c334d448c3c).
