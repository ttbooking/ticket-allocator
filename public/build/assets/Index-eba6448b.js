import{ak as k,f,ao as s,a_ as n,aq as g,i as e,ab as o,ar as a,ay as v,ap as h,aN as y,au as c,av as i,ax as d,a$ as b,V as m,aD as V}from"./app-c4343a94.js";import{D as x,A as r}from"./Default-9bc7d915.js";import{V as C,a as $,b as D}from"./VSpacer-aabea57b.js";const T={class:"font-semibold text-xl text-gray-800 leading-tight"},w=k({__name:"Index",props:{ticketCategories:{type:Array,required:!0}},setup(B){const u=f(()=>[{title:s("name"),key:"name"},{title:s("short_name"),key:"short"},{title:s("actions"),key:"actions",sortable:!1}]);return(t,N)=>{const p=n("v-btn-ex"),_=n("v-data-table");return h(),g(v,null,[e(o(y),{title:t.$t("ticket_categories")},null,8,["title"]),e(x,null,{header:a(()=>[c("h2",T,i(t.$t("ticket_categories")),1)]),default:a(()=>[c("div",null,[e(_,{headers:u.value,items:t.ticketCategories},{top:a(()=>[e(C,{flat:""},{default:a(()=>[e($,null,{default:a(()=>[d(i(t.$t("ticket_categories")),1)]),_:1}),e(b,{class:"mx-4",inset:"",vertical:""}),e(D),e(m,{to:o(r)("ticket-allocator.ticket-categories.create"),color:"primary",dark:""},{default:a(()=>[d(i(t.$t("new_category")),1)]),_:1},8,["to"])]),_:1})]),["item.actions"]:a(({item:l})=>[e(m,{to:o(r)("ticket-allocator.ticket-categories.edit",l.raw.uuid),icon:"mdi-pencil",title:t.$t("edit"),size:"small",variant:"plain"},null,8,["to","title"]),e(p,{to:o(r)("ticket-allocator.ticket-categories.destroy",l.raw.uuid),method:"delete",icon:"mdi-delete",title:t.$t("remove"),size:"small",variant:"plain"},null,8,["to","title"])]),_:2},1032,["headers","items"])])]),_:1})],64)}}}),z=V(w,[["__file","C:/PhpstormProjects/ticket-allocator/resources/js/pages/TicketCategory/Index.vue"]]);export{z as default};
//# sourceMappingURL=Index-eba6448b.js.map