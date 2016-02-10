---
title: Anatomy of a Rebase
date: 2014-04-03
collection: articles
layout: post.html
summary: One of the most useful features of git is rebasing and I've become a big fan of the rebase workflow. But it's still an immature area without a lot of guidance. Typically, developers fall into revision history anti-patterns leading to unreadable, messy histories. This article describes a set of rebase rules that I hope helps improve this situation...
---

*Note: This article assumes you already know about rebasing and how to perform an [interactive rebase](http://git-scm.com/book/en/Git-Tools-Rewriting-History).*

One of the most useful features of git is **rebasing** and I've become a big fan of the rebase workflow. But it's still an immature area without a lot of guidance. Typically, developers fall into [revision history anti-patterns](http://who-t.blogspot.de/2009/12/on-commit-messages.html) leading to unreadable, messy histories.

This article describes a set of **rebase rules** that I hope helps improve this situation:

## Interactive Rebase Rules

Group your commits into logical units according to these rules before you publish your feature branch:

1. <span id="rebase-rule-1">[Split](http://git-scm.com/book/en/Git-Tools-Rewriting-History#Splitting-a-Commit) commits that have more than one reason for change.</span>
2. <span id="rebase-rule-2">[Pick](https://help.github.com/articles/interactive-rebase#pick) commits that introduce a new reason for changing published code.</span>
3. <span id="rebase-rule-3">[Reorder](http://git-scm.com/book/en/Git-Tools-Rewriting-History#Reordering-Commits) related commits that share a reason for change so they are adjacent and then:</span>
  1. <span id="rebase-rule-3a">[Squash](http://git-scm.com/book/en/Git-Tools-Rewriting-History#Squashing-Commits) related commits that add new functionality to unpublished code.</span>
  2. <span id="rebase-rule-3b">[Fixup](https://help.github.com/articles/interactive-rebase#fixup) related commits that fix errors, warnings or style problems in unpublished code.</span>

Following these rules makes the revision history clearer and easier to manage so that even non-techies can read it. It also ensures you don't break your revision history by rebasing commits that have been published.

## The Single Commit Principal

The rules are driven by a  sort of [Single Responsibility Principle](http://c2.com/cgi/wiki?SingleResponsibilityPrinciple) for commits:

> There should only be one logical change per commit.

That is, a commit should contain differences related to a single reason for change. Such as adding new feature, a refactoring or tidying the code.

**See Also:** [Openstack's Git Commit Good Practice](https://wiki.openstack.org/wiki/GitCommitMessages#Structural_split_of_changes)

## Example

I'll demonstrate the rules using this example of a typical, messy feature branch:

```
* 848289d Added header and navbar
| * c46707b Cleaned up formatting in footer
| * eaeefce Cleaned unused imports in shopping class
| * a828f54 Fix: shopping basket was incorrectly summing total
| * b9e8c83 Fix: HTML error in footer
| * fc88cd5 Added full shopping basket implementation
| * e8c9e72 Implemented hand-over to check-out (partially done)
| * 589b2ec Refactored presentation logic
| * 525abc1 Implemented stick shopping basket (partially done)
| * 743b94f Added unit-tests (failing)
| * b056f3e Added acceptance tests to verify shopping basket (failing)
|/  
* f754527 Added footer
```

You can see in the example above `525abc1` and `e8c9e72` are **"partial commits"**. Here, the developer started work on the shopping basket but switched tasks or was interrupted. Following the rules we pick the initial commit ([rule 2](#rebase-rule-2)). When then apply [rule 3a](#rebase-rule-3a) to reorder and squash the second, related commit. This creates a single, **"feature commit"** (`81a1dcf`):

```
* 41162a7 Cleaned up formatting in footer
* 429e311 Cleaned unused imports in shopping class
* 255171b Fix: shopping basket was incorrectly summing total
* 5758ada Fix: HTML error in footer
* 81a1dcf Added shopping basket implementation
* db1d08d Refactored presentation logic
* 743b94f Added unit-tests (failing)
* b056f3e Added acceptance tests to verify shopping basket (failing)
```

We can see there are also two **"test commits"** (commits `743b94f` and `b056f3e`). In good TDD fashion, failing tests have been written first. The developer then saved his work and committed the tests before he began on the implementation.

I think it makes sense to squash test commits together with the feature commit because:

1. Tests don't make much sense without their implementations.
2. It ensures every commit in your revision history will pass its tests which makes forensic analysis of bugs easier.

If we reorder and squash the tests into the feature commit we get `9496bb2`:

```
* f604b84 Cleaned up formatting in footer
* c2133d3 Cleaned unused imports in shopping class
* 37793c9 Fix: shopping basket was incorrectly summing total
* 4ba6157 Fix: HTML error in footer
* 7bd00a3 Refactored presentation logic
* 9496bb2 Added shopping basket
```

Already much clearer but we're not finished yet.

A decision needs to be made when we look at **"refactor commit"** `7bd00a3`. This refactoring simplifies the HTML in our new shopping basket but also touches published code in the footer. So we leave it where it is as per [rule 2](#rebase-rule-2).

This just leaves us with a few **"fix commits"** (`4ba6157`, `37793c9`, `c2133d3` and `f604b84`). We apply [rule 3b](#rebase-rule-3b) above: only `4ba6157` and `f604b84` apply to code outside of the private, feature branch so we leave them. We just fixup the other commits:

```
* 7cd853a Cleaned up formatting in footer
* 899dcd3 Fix: HTML error in footer
* 79ad9f6 Refactored presentation logic
```

Finally, we're finished and ready to publish our readable, clean feature branch.
