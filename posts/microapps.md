---
title: Microapps
date: 2016-10-01
layout: post.html
summary: This post argues for HTML instead of JSON as the exchange format for RESTful APIs. While HTML is seen as verbose, I explore modern techniques to reduce boilerplate. I also explore the advantages of user-accessible, HTML microservices. Or "microapps"....
publish: unlisted
---
**TL;DR:** This post argues for HTML instead of JSON as the exchange format for RESTful APIs. While HTML is seen as verbose, I explore modern techniques to reduce boilerplate. I also explore the advantages of user-accessible, HTML microservices. Or "microapps".

Let me start by noting a couple of frustrations with JSON RESTful APIs:

 1. **Requires tooling.** You might be able to read JSON APIs with a browser, but state changes requires special tools or complicated shell commands. This gets annoying when you want to do something quick like testing your API.

 2. **Not hypermedia-ready.** There are many hypermedia formats for JSON, but lack of built-in support appears to discourage adoption.

Conversely, HTML is hypermedia-ready and comes with sophisticated, user friendly, ubiquitous tooling to handle complex state changes: the humble web browser!

**Note:** This article doesn't discuss the benefits of Hypermedia APIs. Many, many others argue in favour of hypermedia more eloquently than I could.

### Microapps

I want to argue for a completely new category of software: **microapps**.

Microapps are small, focussed micro-sites or webapps. Like microservices they "do one thing and do it well". Unlike JSON microservices, endpoints are human-readable *and* machine-readable.

In a microapp, human-readable content is layered and mixed with structured, machine-readable data using simple HTML with [microdata syntax](https://html.spec.whatwg.org/multipage/microdata.html). Thanks to Google, Bing and others there are already [rich, microdata grammars](http://schema.org/) for almost every possible use case.

Familiar HTML elements like `FORM` and `BUTTON` are used as hypermedia controls. This means API consumers can easily make state changes through the browser, like they would posting a tweet or making a purchase.

Microapps have all the other benefits of microservices, plus:

 1. **User-Friendly.** The main argument for microapps is to reduce the friction to use and test you APIs by making them accessible through a browser. This has several, obvious benefits, such as for exploratory testing. And probably quite a few non-obvious ones too.

 2. **No JSON to HTML conversion.** Most front-end API calls just pull JSON and convert it to HTML. Why not avoid this step, improve page performance and reduce code complexity? A microapp returns simple, structured HTML that you can write straight to the DOM. No conversion required.

 3. **Hypermedia comes as free.** It might actually be harder to write a microapp without hypermedia.

 4. **Encourages semantic practices.** Mixing structured into HTML encourages your teams to think more semantically. There are several benefits here for accessibility, testing and re-use. I've also found writing it leads to greater decoupling, graceful degrading and simpler code.

Of course, the traditional argument against using HTML for APIs is verbosity. I'll discuss some modern techniques to reduce boilerplate and make HTML a viable option:

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

Information written for humans often contains duplicated content like headers and footers. For example:

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

Using web components you can refactor out duplicate content like so:

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

This way your main payload just contains information relevant to the requested resource. API clients can ignore HTML import directives, instead just focussing on microdata. Brower users continue to get a rich, front-end experience.

Components can be hosted on completely separate servers, like images or stylesheets. For example, the various stylesheets, HTML imports and script declarations in this HTML:

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

Can be refactored into a single import that sits on a dedicated, assets server:

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

Having a dedicated assets server has other benefits, such as for traffic/caching shaping. You can also share assets across microapps to create a consistent look and reduce development.

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

I developed some of these practices while working on my small, hobby microapp: [is-hosted-by.com](http://is-hosted-by.com/). This microapp allows you to search common cloud providers for an Internet address, domain name or URI to see who hosts it.

Please take a look at the code and have a play!

In the course of developing is-hosted-by.com, I uncovered some possible issues with these techniques:

 * **Web components aren't supported in all browser.**  While we wait for full, cross-browser support, the Web Components polyfill import is a source of verbosity.

 * **No `PUT/DELETE/PATCH` support for HTML forms.** HTML forms do not support `PUT/DELETE/PATCH`/etc. requests for state changes. Given the security holes this may open, future HTML specifications may never support this. However, it would be trivial to write a polyfill to patch HTML forms to support all HTTP methods without opening security holes.

 * **Front-end design overhead.** Microapps require front-end expertise in what is a traditionally more back-end domain. Additional front-end training or staff could be required. That said, front-end technology is becoming increasingly advanced in areas of simplicity, accessibility and reusability which may mitigate this.

 * **Additional Responsibility.** Microservices are supposed to follow an architectural version of the [Single Responsibility Principle](https://8thlight.com/blog/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html). Microapps add an additional responsibility: front-end display. That said, most microservices are already responsible for their own monitoring, transaction handling, etc. so an additional responsibility here doesn't seem onerous, given the benefits.

 * **CSRF Vulnerability.** JSON APIs are safe from many security attacks that webapps are vulnerable to, like CSRF. Switching to HTML for microapps opens APIs up to these attacks. Fallback to webapp security measures like CSRF tokens would be required.

 * **Additional Dependency.** Asset servers add a dependency to your microservices. There are mitigations for this mentioned above though and, if you design your front-ends to degrade gracefully, this doesn't need to be a “hard” dependency.

 * **Lack of Client Libraries.** Client development maybe harder due to lack of software libraries for hypermedia controls and microdata parsing. I've done some work filling in the gaps here [myself](http://rgladwell.github.io/microtesia/latest/api/#microtesia.package) but more work is needed.

These offer exciting areas for future investigation and development.

### Summary

With modern HTML5 you can reduce your markup so its just contain structured data, plus a bit extra for a couple of import statement or two and some human-readable labels. Of course, HTML will never completely match the brevity of JSON.

The author is left cold by arguments for choosing technologies based on small, technical efficiencies. Benefits like marginal reductions in payloads are probably negated by HTTP gzip compression. Trivial improvements like CPU efficiencies always seem taken from the perspective of large scale organisations like Google or Facebook.

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

