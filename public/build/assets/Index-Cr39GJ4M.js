import{O as u,Q as _,f,ar as h,U as v,i as e,a1 as l,ag as k,W as t,al as V,F as b,T as y,_ as n,$ as r,a0 as m,as as g,V as d,a8 as i,at as $}from"./app-9F_l98Gd.js";import{V as T,a as x,b as B,c as w}from"./VSpacer-Bzax28o5.js";import{V as C}from"./VCheckboxBtn-BbRBoctq.js";import"./filter-D3qOwDtQ.js";import"./VTextField-DjotwDm7.js";import"./VInput-oAey8Zi4.js";import"./VTable-DP_EuNQy.js";/* empty css              */import"./VSelectionControl-CVKUbszx.js";const D={class:"font-semibold text-xl text-gray-800 leading-tight"},j=u({__name:"Index",props:{teams:{}},setup(N){const{t:s}=_(),c=f(()=>[{title:s("active"),key:"active",sortable:!1},{title:s("name"),key:"name"},{title:s("description"),key:"description"},{title:s("weight"),key:"weight"},{title:s("actions"),key:"actions",sortable:!1}]);return(a,z)=>{const p=h("v-btn-ex");return y(),v(b,null,[e(l(k),{title:a.$t("operator_teams")},null,8,["title"]),e(V,null,{header:t(()=>[n("h2",D,r(a.$t("operator_teams")),1)]),default:t(()=>[n("div",null,[e(T,{headers:c.value,items:a.teams},{top:t(()=>[e(x,{flat:""},{default:t(()=>[e(B,null,{default:t(()=>[m(r(a.$t("operator_teams")),1)]),_:1}),e(g,{class:"mx-4",inset:"",vertical:""}),e(w),e(d,{to:l(i)("ticket-allocator.teams.create"),color:"primary",dark:""},{default:t(()=>[m(r(a.$t("new_team")),1)]),_:1},8,["to"])]),_:1})]),"item.active":t(({item:o})=>[e(l($),{as:"span",href:l(i)("ticket-allocator.teams.update",o.uuid),method:"patch",data:{active:!!o.deleted_at}},{default:t(()=>[e(C,{"model-value":!o.deleted_at},null,8,["model-value"])]),_:2},1032,["href","data"])]),"item.actions":t(({item:o})=>[e(d,{to:l(i)("ticket-allocator.teams.edit",o.uuid),icon:"mdi-pencil",title:a.$t("edit"),size:"small",variant:"plain"},null,8,["to","title"]),e(p,{to:l(i)("ticket-allocator.teams.destroy",o.uuid),method:"delete",icon:"mdi-delete",title:a.$t("remove"),size:"small",variant:"plain"},null,8,["to","title"])]),_:2},1032,["headers","items"])])]),_:1})],64)}}});export{j as default};
//# sourceMappingURL=Index-Cr39GJ4M.js.map