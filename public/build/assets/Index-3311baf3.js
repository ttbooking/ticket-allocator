import{a as f,A as s}from"./Default.vue_vue_type_script_setup_true_lang-03e10b50.js";import{ak as k,f as v,ao as n,aZ as c,aq as y,i as t,ab as l,ar as e,ay as h,ap as b,aM as V,au as p,av as i,ax as r,a_ as w,V as d}from"./app-b4ac227c.js";import{V as x,a as $,b as g}from"./VSpacer-e8068a9b.js";const B={class:"font-semibold text-xl text-gray-800 leading-tight"},S=k({__name:"Index",props:{operators:{}},setup(T){const u=v(()=>[{title:n("name"),key:"name"},{title:n("tickets"),key:"ticket_limit"},{title:n("complexity"),key:"complexity_limit"},{title:n("actions"),key:"actions",sortable:!1}]);return(o,C)=>{const m=c("v-btn-ex"),_=c("v-data-table");return b(),y(h,null,[t(l(V),{title:o.$t("operators")},null,8,["title"]),t(f,null,{header:e(()=>[p("h2",B,i(o.$t("operators")),1)]),default:e(()=>[p("div",null,[t(_,{headers:u.value,items:o.operators},{top:e(()=>[t(x,{flat:""},{default:e(()=>[t($,null,{default:e(()=>[r(i(o.$t("operators")),1)]),_:1}),t(w,{class:"mx-4",inset:"",vertical:""}),t(g),t(m,{to:l(s)("ticket-allocator.operators.discover"),method:"put",color:"primary",dark:""},{default:e(()=>[r(i(o.$t("discover")),1)]),_:1},8,["to"]),t(d,{to:l(s)("ticket-allocator.operators.create"),color:"primary",dark:""},{default:e(()=>[r(i(o.$t("new_operator")),1)]),_:1},8,["to"])]),_:1})]),["item.name"]:e(({item:a})=>[r(i(a.raw.name??a.raw.user.name??""),1)]),["item.ticket_limit"]:e(({item:a})=>[r(i(a.raw.ticket_limit??"∞"),1)]),["item.complexity_limit"]:e(({item:a})=>[r(i(a.raw.complexity_limit??"∞"),1)]),["item.actions"]:e(({item:a})=>[t(d,{to:l(s)("ticket-allocator.operators.edit",a.raw.uuid),icon:"mdi-pencil",title:o.$t("edit"),size:"small",variant:"plain"},null,8,["to","title"]),t(m,{to:l(s)("ticket-allocator.operators.destroy",a.raw.uuid),method:"delete",icon:"mdi-delete",title:o.$t("remove"),size:"small",variant:"plain"},null,8,["to","title"])]),_:2},1032,["headers","items"])])]),_:1})],64)}}});export{S as default};
//# sourceMappingURL=Index-3311baf3.js.map