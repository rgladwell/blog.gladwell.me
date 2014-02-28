<#include "header.ftl">
	
	<#include "menu.ftl">

   <div class="row">
      <div class="col-md-9">
         <article>
	         <div class="page-header">
		         <h1><#escape x as x?xml>${content.title}</#escape></h1>
	         </div>

	          <p><em>${content.date?string("dd MMMM yyyy")}</em></p>

	          <p>${content.body}</p>

         </article>

         <#include "disqus.ftl">

	      <hr>
      </div>
   </div>
	
<#include "footer.ftl">