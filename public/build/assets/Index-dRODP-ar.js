import{O as _,Q as f,f as k,ar as y,U as v,i as t,a1 as r,ag as h,W as e,al as V,F as $,T as b,_ as c,$ as i,a0 as l,as as x,a8 as n,V as d}from"./app-9F_l98Gd.js";import{V as g,a as T,b as B,c as C}from"./VSpacer-Bzax28o5.js";import"./filter-D3qOwDtQ.js";import"./VTextField-DjotwDm7.js";import"./VInput-oAey8Zi4.js";import"./VCheckboxBtn-BbRBoctq.js";import"./VSelectionControl-CVKUbszx.js";import"./VTable-DP_EuNQy.js";/* empty css              */const D={class:"font-semibold text-xl text-gray-800 leading-tight"},j=_({__name:"Index",props:{operators:{}},setup(N){const{t:s}=f(),u=k(()=>[{title:s("name"),key:"name"},{title:s("tickets"),key:"ticket_limit"},{title:s("complexity"),key:"complexity_limit"},{title:s("actions"),key:"actions",sortable:!1}]);return(o,w)=>{const m=y("v-btn-ex");return b(),v($,null,[t(r(h),{title:o.$t("operators")},null,8,["title"]),t(V,null,{header:e(()=>[c("h2",D,i(o.$t("operators")),1)]),default:e(()=>[c("div",null,[t(g,{headers:u.value,items:o.operators},{top:e(()=>[t(T,{flat:""},{default:e(()=>[t(B,null,{default:e(()=>[l(i(o.$t("operators")),1)]),_:1}),t(x,{class:"mx-4",inset:"",vertical:""}),t(C),t(m,{to:r(n)("ticket-allocator.operators.discover"),method:"put",color:"primary",dark:""},{default:e(()=>[l(i(o.$t("discover")),1)]),_:1},8,["to"]),t(d,{to:r(n)("ticket-allocator.operators.create"),color:"primary",dark:""},{default:e(()=>[l(i(o.$t("new_operator")),1)]),_:1},8,["to"])]),_:1})]),"item.name":e(({item:a})=>{var p;return[l(i(a.name??((p=a.user)==null?void 0:p.name)??""),1)]}),"item.ticket_limit":e(({item:a})=>[l(i(a.ticket_limit??"∞"),1)]),"item.complexity_limit":e(({item:a})=>[l(i(a.complexity_limit??"∞"),1)]),"item.actions":e(({item:a})=>[t(d,{to:r(n)("ticket-allocator.operators.edit",a.uuid),icon:"mdi-pencil",title:o.$t("edit"),size:"small",variant:"plain"},null,8,["to","title"]),t(m,{to:r(n)("ticket-allocator.operators.destroy",a.uuid),method:"delete",icon:"mdi-delete",title:o.$t("remove"),size:"small",variant:"plain"},null,8,["to","title"])]),_:2},1032,["headers","items"])])]),_:1})],64)}}});export{j as default};
//# sourceMappingURL=Index-dRODP-ar.js.map