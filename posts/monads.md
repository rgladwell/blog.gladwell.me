---
title: What on earth is a Monad?
date: 2017-11-01
collection: articles
layout: post.html
publish: unlisted
summary: &quot;Oh no! Not another obtuse article on monads!&quot;
---
<q>Oh no! Not another article on monads!</q> I hear you cry. There are about a hundred blog posts on monads. Monads are fundamental to modern functional programming. Yet they remain nearly impossible to explain to anyone who doesn't have an advanced degree in mathematics.

Blog post after blog post tried to explain. Until me! After years of using monads I have cracked the code without reference to obscure mathematical laws. 

And I'm sharing this knowledge with you, gentle reader. I'll start by giving you a much simpler definition of a monad. One that I'll go on to explain without

The problem with your average, monad blog post is that it tend sto focus on obscure, mathematical details. What they don't really deal with is *why* monads are important to you, the average developer without a master degree in mathematics.

Let's start with my no-nonsense definition of monads:

> A monad is a **composable abstraction over uncertainty**.

This definition has two important parts. The first past is most important, the "abstraction over uncertainty" which is explains *what* a monad is. Once I've explained this, I'll go on to discuss the "composability" part which will help you understand *why* monads are useful.

### Abstraction over Uncertainty

The key thing to understand about monads is that they represent uncertainty about a value. This definition is important because with it comes the realisation that - as an OO programmer - you've already been using monads.

As an object-orientated/imperative programmer you work with uncertainty all the time. For example, if you return a list from a method that indicates uncertainty about the number of values that are being returned. What you're actually saying is that "this method could return any number of values." Similarly, when you 

Part of the reason pure functional programmers find imperative programming so intolerable is the assumption (some might say delusion) that imperative statements are certain! A useful way to think about this is that, in Java for example, our old friend the `;` is a kind of monad. It composes lines of imperative together but hides the assumption that a imperative statement may or may not fail with an exception.

The common Scala monads can be described in regards to the *type* of uncertainty they abstract over:

 * `Option` (sometimes called `Maybe`, or `Optional` in Java 8) abstract uncertainty over the existence of a particular value.
 * `Future` abstract uncertainty over *when* a value will be available.
 * `Either` and `Try` abstract uncertainty over whether calculating an error will result in an error, or not.

Its important to note that many common and useful monads actually confuse different types of uncertainty together. For example, a list expresses uncertainty about both the number of values and the existence of values as well, like an `Option`. An `Option` is really just a 0 or 1 element list. A good way to understand what an option is that it is a list.

Similarly, in Scala futures express uncertainty about both *when* a value will return **and** whether calculating that value returns an error. That is, futures not only hide the threading details, but also handle errors thrown in those threads.

You might have heard of libraries like Scalaz or Cats. These libraries provide more pure abstractions that try not to mix these types of uncertainty up. For example, Scalaz has a 'Task' monad that only represents uncertainty about when a value will return. If you want to care about errors you need to mix it with another error monad like a `Try` or `Either`.

It's worth noting that the reason these impure monads exist in the standard Scala libraries is that mixing these different categories of uncertainty *is* often useful. You would rarely only care *when* a value returns. You'll almost always *also* care if it returns with an error as well. So don't sweat it that you're not using complex libraries like Scalaz.

### Composability

The reason having an abstraction over uncertainty is useful is the same reason all abstraction is important in useful: it allows you to reason about about that abstraction. That is, monads let you reason about uncertainty in your code. As we've seen above, they also make uncertainty explicit in your code.

This is why the property of composability is important.

### Effect Deferment

### But what is Category Theory?

To understand where monads come from you need to understand what Category Theory *is for*. Category Theory is a branch of mathematics that seeks to rebuild our numerical system (that is, numbers, addition, multiplication, etc. the stuff you learned in primary school) from first principles. It uses formalised algebraic set theory to do this, which is the language of mathematics. It does this so that important properties of numbers can be discovered.

To model our numerical system Category Theory builds on a a series of increasingly complex abstractions. Monads are just one of these. Each abstraction builds on top of the last, adding additional properties to bring them closer to numbers. For example monads are a sub-type of another abstraction you'll often hear, called *monoids*. The two are often confused.

Here is the kicker though: you don't need to understand Category Theory to use monads. Its only important in the unlikely event you're implementing your own monads, so please don't stress. To be honest, it's almost a coincidence these abstractions are useful to programmers.
