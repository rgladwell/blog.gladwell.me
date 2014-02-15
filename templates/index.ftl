<#include "header.ftl">
	
	<#include "menu.ftl">

	<div class="jumbotron" id="title-header">
		<h1>Grey Area</h1>
	</div>

   <div class="row">
      <div class="col-md-9">
	      <#list posts as post>
  		      <#if (post.status == "published")>
  			      <a href="${post.uri}"><h1><#escape x as x?xml>${post.title}</#escape></h1></a>
  			      <p>${post.date?string("dd MMMM yyyy")}</p>
  			      <p>${post.body}</p>
  	         </#if>
  	      </#list>
      </div>
      <div class="col-md-3">
         <#include "twitter.ftl">
      </div>
   </div>
	
	<hr />
	
	<p>Older posts are available in the <a href="/${config.archive_file}">archive</a>.</p>

<#include "footer.ftl">