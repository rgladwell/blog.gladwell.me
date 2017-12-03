---
title: Write tests, mostly unit
date: 2016-06-25
collection: articles
layout: post.html
summary: ???...
---
The curse of modern development is that change tends to be revolutionary rather than evolutionary. That is, we prefer to tear everything up and start from scratch (revolt) rather than build on what has gone before (evolve). We favor greenfield projects over legacy ones. We prefer using new programming languages over fixing the warts in old ones. It's not to say that revolutionary change is always bad.

The most notable example of this is the current trend to favor integration over unit tests. We are lectured by varius Medium thinkpieces on the great virtues of integration tests, and the terrible sins of unit tests.

The sleigh-of-hand here is that, on extolling the virtues of integration tests, writers are largely correct. The problem is that the downsides of integration tests vastly outweigh the benefits. Indeed, this is not new information and is why we have unit tests in the first place.

The NoUnit folks take great pains to mis-characterise this: your integration tests are slow and brittle because you haven't "written them correctly." Yet, as commercial developer, I rarely get to work with these mythical "perfect" developers. And any practice that relies on perfect developers to work will not work in the real word.

### Slow

Most integration test suites I've worked on take minutes, if not tens of minutes to run.

I don't really want to wait long periods of time to validate my software, and I don't really understand how other developers can stay productive relying on tests that run in minutes, rather than seconds.

What's more, integration tests are often working with stateful systems making it difficult to execute them in parallel.

### Brittle


### Poor Coverage

Another penalty with integration tests is that its all too easy to test functionality. When you're mostly concerned about the inputs and outputs of your system, its all to easy to forget about the internal details 
