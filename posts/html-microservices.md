---
title: HTML for Microservices
date: 2016-11-29
collection: articles
layout: post.html
summary: Frustrated with JSON microservices I explore HTML5 as a viable, alternative exchange format. This can encourage good practises, reduce code complexity and turn inaccessible APIs into general-purpose tools anyone in your organisation can use. While HTML is seen as verbose compared with JSON, I also explore modern techniques to reduce markup...
publish: unlisted
---

**TL;DR:** Frustrated with JSON microservices I explore HTML5 as a viable, alternative exchange format. This can encourage good practises, reduce code complexity and turn inaccessible APIs into general-purpose tools anyone in your organisation can use. While HTML is seen as verbose compared with JSON, I also explore modern techniques to reduce markup.

Let me start by noting a couple of frustrations with JSON RESTful APIs:

 1. **Requires tooling.** You might be able to read JSON APIs with a browser, but state changes requires special tools or complicated shell commands. This gets annoying when you want to do something quick like testing your API.

 2. **Not hypermedia-ready.** There are many hypermedia formats for JSON, but lack of built-in support appears to discourage adoption.

On the other hand, HTML is hypermedia-ready and comes with sophisticated, user friendly, ubiquitous, free tooling that handles complex state changes: the humble web browser!

**Note:** This article doesn't discuss the benefits of Hypermedia APIs. Many, many others argue in favour of hypermedia more eloquently than I could. See the [Further Reading](#further-reading) section for more info.

### HTML Microservices
 
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Learn HTML. Everything else is an enhancement.</p>&mdash; Ian Devlin (@iandevlin) <a href="https://twitter.com/iandevlin/status/783406424999227392">October 4, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Unlike JSON microservices, HTML microservices are machine-readable *and* human-readable. They layer human-readable content with structured, machine-readable data using standards like [microdata](https://html.spec.whatwg.org/multipage/microdata.html).

Familiar HTML elements like `FORM` and `BUTTON` are used as hypermedia controls. This means users can easily make state changes through the browser, just as they might posting a tweet or making a purchase. With no need for complex command line arguments.

HTML microservices also have the following benefits:

 1. **User-Friendly.** The main benefit is that anyone (not just developers) can consume your HTML microservices, reducing the friction to use and test you APIs by making them accessible through a browser. This has several, obvious benefits in areas like exploratory testing. And probably some non-obvious benefits too.

 2. **No JSON to HTML conversion.** Most front-end API calls just pull JSON and convert it to HTML. Why not avoid this step, improve page performance and reduce code complexity? HTML microservices returns simple, structured HTML that you can write straight to the DOM. No conversion required.

 3. **Hypermedia comes as free.** It might actually be harder to write HTML without hypermedia.

 4. **Encourages semantic practices.** Mixing structured data into HTML encourages your teams to think more semantically. There are several benefits here for accessibility, testing and re-use. I've also found this leads to greater decoupling, better graceful degradation and simpler code.

Of course, the traditional argument against using HTML for APIs is verbosity. However, modern HTML5 isn't like your dad's XML and I'll discuss some modern techniques to reduce boilerplate and make HTML a more viable option:

### HTML5 Optional Elements

Many of the boilerplate tags in HTML pages are now [optional with HTML5](https://google.github.io/styleguide/htmlcssguide.xml#Optional_Tags). Simply remove these optional elements:

```html
<!-- Not recommended -->
<!DOCTYPE html>
<html>
  <head>
    <title>Spending money, spending bytes</title>
  </head>
  <body>
    <p>Sic.</p>
  </body>
</html>
```

Becomes:

```html
<!-- Recommended -->
<!DOCTYPE html>
<title>Saving money, saving bytes</title>
<p>Qed.
```

### Web Components

[Web component frameworks](http://webcomponents.org/) like [Polymer](https://www.polymer-project.org/1.0/) are powerful tools for simplifying front-ends. The technology also offers ways to simplify and reduce HTML.

Information written for humans often contains content like headers and footers that isn't directly relevant to the main information and gets replicated on other pages.

For example:

```html
<!DOCTYPE html>
<head>
  <title>Example</title>
</head>
<body>
  <header id=title>
    <h1>Example</h1>
    <p class=subtitle>by <a href=http://gladwell.me>Ricardo Gladwell</a></p>
  </header>

  <p>Sic.</p>

  <footer>
    <ul class=contact>
      <li><a href=https://twitter.com/rgladwell class="icon icon-twitter"><span>Twitter</span></a></li>
    </ul>
    <p>
      &copy; <a href=https://gladwell.me>Ricardo Gladwell</a>. All rights reserved.
    </p>
  </footer>
```

Using web components you can refactor out this ancillary content like so:

```html
<!DOCTYPE html>
<head>
  <title>Example</title>
  <link href=content-wrapper.html rel=import>
</head>
<body>
  <content-wrapper>
    <p>Qed.</p>
  </content-wrapper>
```

API clients can ignore HTML import directives, instead just focussing on microdata. Browser users get a rich, front-end experience.

The web components standard can also be used to combine all your asset imports into a single import statement. For example, this:

```html
<!DOCTYPE html>
<head>
  <title>Example</title>
  <link href=content-wrapper.html rel=import>
  <link href=style.min.css rel=stylesheet>
  <script src=vendor/script.js></script>
</head>
<body>
  <content-wrapper>
    <p>Sic.</p>
  </content-wrapper>
```

Becomes this::

```html
<!DOCTYPE html>
<head>
  <title>Example</title>
  <link href=http://assets.example.com/assets.html rel=import>
</head>
<body>
  <content-wrapper>
    <p>Qed.</p>
  </content-wrapper>
```

Having a dedicated assets server has other benefits, such as for traffic/caching shaping. You can also share assets across microservices to create a consistent look and reduce development time.

### Semantic CSS

A lot of modern CSS frameworks, like [Bootstrap](http://getbootstrap.com/), require you to add a bunch of "hieroglyphs" to your HTML: extraneous `div` elements everywhere, mysterious and obscure class attributes like `col-md-4` and `btn-default`. These are only meaningful to front-end developers, are confusing to users and can be a big source of verbosity in your HTML.

Fortunately, this source of verbosity can be easily mitigated using CSS pre-compilers like SASS or LESS.

Take the following example of "Bootstrapped" HTML:

```html
<body>
  <div class="container">
    <div class="page-header">
      <h1>Company Title</h1>
      <p class="lead">Slogan</p>
    </div>

    <div class="row">
      <div class="col-lg-3">
        <ul class="list-group">
          <li class="list-group-item"><a href="/">Home</a></li>
          <li class="list-group-item"><a href="/about">About</a></li>
          <li class="list-group-item"><a href="/twitter">Contact</a></li>
        </ul>
      </div>

      <div class="col-lg-9">
        <p>Qed.</p>
      </div>

  </div>
</body>
```

For example, the [`@extend` SASS directive](http://sass-lang.com/guide#topic-7) can be used to fold the extraneous `div.container` element into the `body` tag:

```css
body { @extend .container; }
```

This can completely hide the hieroglyphs in existing HTML elements, vastly simplifying the syntax.

Similarly, When no existing HTML elements seems relevant, obscure CSS classes can be aliased to more semantic names. Additionally, you can write CSS selectors to match microdata, reducing even the need for semantic aliases.

Put together, this turns the complex HTML example above into the simpler form as follows:

```html
<body>

  <header>
    <h1>Company Title</h1>
    <p>Slogan</p>
  </header>

  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>

  <main>
    <p>Qed.</p>
  </main>

</body>
```

*Note:* this technique may not scale for CSS across a complex web sites. But, if you're staying true to the “small and simple” microservice maxim, your stylesheets shouldn't get complex enough for this to be a problem.

### In Action

I developed some of these practices while working on my small, hobby webapp/API: [is-hosted-by.com](http://is-hosted-by.com/). This service allows you to search common cloud providers for an Internet address, domain name or URI to see who hosts it. Please be aware this is a work in progress, and currently only supports AWS, Cloudflare and Digital Ocean hosting providers.

Please take a look at the code and have a play!

In the course of developing is-hosted-by.com, I uncovered some possible issues with these techniques:

 * **Web components aren't supported in all browser.**  While we wait for full, cross-browser support, the Web Components polyfill import is a source of verbosity.

 * **No `PUT/DELETE/PATCH` support for HTML forms.** HTML forms do not support `PUT/DELETE/PATCH`/etc. requests for state changes. Given the security holes this may open, future HTML specifications may never support this. However, it would be trivial to write a polyfill to patch HTML forms to support all HTTP methods without opening security holes.

 * **Front-end design overhead.** The techniques outlined here require front-end expertise in what is a traditionally more back-end domain. Additional front-end training or staff could be required. That said, front-end technology is becoming increasingly advanced in areas of simplicity, accessibility and reusability which may mitigate this.

 * **Additional Responsibility.** Microservices are supposed to follow an architectural version of the [Single Responsibility Principle](https://8thlight.com/blog/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html). HTML microservices add an additional responsibility: front-end display. That said, most microservices are already responsible for their own monitoring, transaction handling, etc. so this doesn't seem onerous, given the benefits.

 * **CSRF Vulnerability.** JSON APIs are safe from many security attacks that webapps are vulnerable to, like CSRF. Switching from JSON to HTML opens your APIs up to these attacks. Fallback to webapp security measures like CSRF tokens would be required.

 * **Additional Dependency.** Asset servers add a dependency to your microservices. There are mitigations for this, as mentioned above. And, if you design your front-ends to degrade gracefully, this doesn't need to be a “hard” dependency.

 * **Lack of Client Libraries.** Client development maybe harder due to lack of software libraries for hypermedia controls and microdata parsing. I've done some work filling in the gaps here [myself](http://rgladwell.github.io/microtesia/latest/api/#microtesia.package) but more work is needed.

These offer exciting areas for future investigation and development.

### Summary

With modern HTML5 you can reduce your markup so its just contain structured data, plus a few extra bytes for a couple of import statement or two and some human-readable labels. Of course, HTML will never completely match the brevity of JSON.

However, I'm left cold by arguments for choosing technologies based on small, technical efficiencies. Benefits like marginal reductions in payloads are probably negated by HTTP gzip compression. Trivial improvements like CPU efficiencies always seem taken from the perspective of large scale organisations like Google or Facebook.

At the smaller scale, human-focused benefits like familiarity, accessibility, maintainability and simplicity (as described above) seem infinitely more valuable.

I hope you see this too.

#### Further Reading

 * [Haters gonna HATEOAS](http://timelessrepo.com/haters-gonna-hateoas)
 * [Hypermedia API Reading List](http://blog.steveklabnik.com/posts/2012-02-27-hypermedia-api-reading-list)
 * [Microdata HTML Standard](https://html.spec.whatwg.org/multipage/microdata.html)
 * [Directory of Microdata Schemas](http://schema.org/)
 * [Web Components](http://webcomponents.org/)
 * [Polymer](https://www.polymer-project.org/1.0/)
 * [Bootstrap](http://getbootstrap.com/)
 * [Using Sass To Semantically @extend Bootstrap](https://www.sitepoint.com/sass-semantically-extend-bootstrap/)
 * [Bootstrap without all the debt](https://coderwall.com/p/wixovg/bootstrap-without-all-the-debt)
 * [HTML Minifier](https://kangax.github.io/html-minifier/)
 * [Single Responsibility Principle](https://8thlight.com/blog/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)

