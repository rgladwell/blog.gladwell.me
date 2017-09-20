---
title: A Laymen Monads Explainer
date: 2016-10-01
collection: articles
layout: post.html
summary: ???
---

About 3-4 years ago, when functional programming was first taking off, it was the height of fashion to write blog posts explaining monads. I know because I read any number of these, trying to understand the concept. The problem was that most of these posts were written by pure functional programmers, who often have an academic background in mathematics. 

So, without further ado, here is my no-nonsense, accessible definition of monads:

> A monad is a **composable abstraction over uncertainty**.

This definition has two important parts. The first is most important, the "abstraction over uncertainty" part. Once I've explained this, I'll go on to discuss the "composability" part. Please bear with me.

### Abstraction over Uncertainty

As an object-orientated/imperative programmer you work with uncertainty all the time. For example, if you return a list from a method that indicates uncertainty about the number of values that are being returned. What you're actually saying is that "this method could return any number of values." Similarly, when you 

Part of the reason pure functional programmers find imperative programming so intolerable is the assumption (some might say delusion) that imperative statements are certain! A useful way to think about this is that, in Java for example, our old friend the `;` is a kind of monad. It composes lines of imperative together but hides the assumption that a imperative statement may or may not fail with an exception.

The common Scala monads can be described in regards to the *type* of uncertainty they abstract over:

 * `Option` (sometimes called `Maybe` or `Optional` in Java 8) abstract uncertainty over the existence of a particular value.
 * `Future` abstract uncertainty over *when* a value will be available.
 * `Either` and `Try` abstract uncertainty over whether calculating an error will result in an error, or not.

Its important to note that many common and useful monads actually confuse different types of uncertainty together. For example, a list expresses uncertainty about both the number of values and the existence of values as well, like an `Option`. An `Option` is really just a 0 or 1 element list. A good way to understand what an option is that it is a list.

Similarly, in Scala futures express uncertainty about both *when* a value will return **and** whether calculating that value returns an error. That is, futures not only hide the threading details, but also handle errors thrown in those threads.

You might have heard of libraries like Scalaz or Cats. These libraries provide more pure abstractions that try not to mix these types of uncertainty up. For example, Scalaz has a 'Task' monad that only represents uncertainty about when a value will return. If you want to care about errors you need to mix it with another error monad like a `Try` or `Either`.

It's worth noting that the reason these impure monads exist in the standard Scala libraries is that mixing these different categories of uncertainty *is* often useful. You would rarely only care *when* a value returns. You'll almost always *also* care if it returns with an error as well. So don't sweat it that you're not using complex libraries like Scalaz.

### Composability

The reason having an abstraction over uncertainty is useful is the same reason all abstraction is important in useful: it allows you to reason about about that abstraction. That is, monads let you reason about uncertainty in your code. As we've seen above, they also make uncertainty explicit in your code.

This is why the property of composability is important.

### But what is Category Theory?

To understand where monads come from you need to understand what Category Theory *is for*. Category Theory is a branch of mathematics that seeks to rebuild our numerical system (that is, numbers, addition, multiplication, etc.) from first principles. It uses formalised algebraic set theory to do this, which is the language of mathematics. It does this so that important properties of our mathematics can be discovered.

To model our numerical system Category Theory builds on a a series of increasingly complex abstractions. Monads are just one of these. Each abstraction builds on top of the last, adding additional properties to bring them closer to numbers. For example monads are a sub-type of another abstraction you'll often hear, called *monoids*. The two are often confused.

Here is the kicker though: you don't need to understand Category Theory to use monads. Its only important in the unlikely event you're implementing your own monads, so please don't stress. To be honest, it's almost a coincidence that these abstractions are useful to programmers.
