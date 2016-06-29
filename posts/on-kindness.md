---
title: On Kindness
date: 2016-06-25
collection: articles
layout: post.html
summary: One of my tweets went viral. Interestingly, while I got a few new followers it didn't really 'move the needle'. But what's even more interesting is the 70 or so replies. Most were supportive. The rest questioned some of the assumptions in the tweet. I felt a lot of these though misunderstood what I was trying to saying. 140 characters doesn't really allow you to explore nuance so I wanted to use this blog post to drill into each point and expand on it...
---
This was just a throw-away tweet I wrote after a particularly frustrating day at the office:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Being a good, senior dev is easy:<br><br>1. Don&#39;t tell; ask<br>2. Don&#39;t rewrite; pair and refactor<br>3. Don&#39;t sneer; encourage<br>4. Be kind.</p>&mdash; Ricardo Gladwell (@rgladwell) <a href="https://twitter.com/rgladwell/status/657995795891900416">October 24, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

It's probably the most popular thing I've ever done. Six months later and activity is only just dying down. According to Twitter.com it's now been seen by over half-a-million people!

Interestingly, while I got some followers it didn't really 'move the needle'. Subsequent tweets get about as many 'interactions' as any of my old ones did. Ah well.

But what's even more interesting is the 70 or so replies. Most were supportive. A lot of people pointed out that my points applied more generally, though it's telling they need to be said about developers. A small number were extremely hostile. Predictably, all of these were from straight, white, male developers, ages 25 years-or-older. These seemed oblivious to the fact they were confirming my premise.

The rest questioned some of the assumptions in the tweet. I felt a lot of these misunderstood what I was trying to say. 140 characters doesn't really allow you to explore nuance so I wanted to use this blog post to drill into each point and expand on it:

### 1. Don't tell; ask

Telling here implies authority. And authority lies about a fundamental truth: development practices are still largely immature, subjective and contextual. 

Instead of saying "this is how you do it", try asking someone "how do you think this should work?" It's a humbling practice that often leads to productive discussion and better technical solutions. Asking points people in the right direction without discouraging them from exploring their own solutions.

### 2. Don't rewrite; pair and refactor

Basically, if someone is writing code you don't like don't just route around them and do a full rewrite.

Firstly, this approach is dangerous: what looks like "bad code" may actually be useful and necessary workarounds for problems that aren't immediately obvious. In other words, you may not be as aware of the domain as you think you are.

Instead of rewriting problem code make a couple of incremental re-factorings to *show* how you think things could be improved. Then *discuss* them in code review with the original author.

Standard stuff these days.

Secondly, you're losing a valuable teaching opportunity. If the code quality of a particular individual continues to be a problem its better to sit down and pair with them so that you can work out style differences collaboratively.

*Addendum I:* The [Egoless Programming](http://blog.codinghorror.com/the-ten-commandments-of-egoless-programming/) manifesto (which I largely agree with) tells us "You are not your code" and that you shouldn't take criticism personally. I think this particular point is naive: good developers take pride in their code. So we should cautiously and constructively criticise others work, while remembering to also focus on what we like about it (something we often forget).

*Addendum II:* A lot of people thought this was an argument in favour of extreme programming and pairing. It's not specifically about those techniques so much as about building code collaboratively.

### 3. Don't sneer; encourage

It seems to me our industry is full of contempt and intolerance for different practices. This goes from code review microaggressions to viral blog posts like 'X is Considered Harmful' and 'Y is Broken'. Again, these tell a lie about the maturity and objectivity of our practices.

But this is just a reiteration of the last point...

### 4. Be kind

This one seemed to evoke the harshest reaction but is, in my mind, the least controversial. Responses ranged from the hostile ("shut up") to the most common complaint: it's too hard! I don't know what else to add. If basic respect for your fellow humans is too "hard" for you then you're part of the problem.
