<#include "header.ftl">

	<#include "menu.ftl">

   <article>
	   <div class="page-header">
		   <h1><#escape x as x?xml>${content.title}</#escape></h1>
	   </div>

	   <p><em>${content.date?string("dd MMMM yyyy")}</em></p>

	   <p>${content.body}</p>

   </article>

	<hr>

<#include "footer.ftl">