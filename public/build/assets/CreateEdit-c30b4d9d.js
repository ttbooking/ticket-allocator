import{aa as C,aN as _,ad as b,ae as $,D as e,u as r,af as t,am as w,aJ as B,ai as f,aj as n,aw as N,aO as g,L as p,al as V,aR as v}from"./app-1d35809e.js";import{a as F,A as m}from"./Default.vue_vue_type_script_setup_true_lang-684133ca.js";import{V as S}from"./VForm-c0f7e4f2.js";import{V as T}from"./VContainer-18dc340b.js";import{V as k,a as d}from"./VRow-1bf06cd4.js";const q={class:"font-semibold text-xl text-gray-800 leading-tight"},x=C({__name:"CreateEdit",props:{ticketCategory:{},errors:{}},setup(y){var u,c;const l=y,o=_({name:((u=l.ticketCategory)==null?void 0:u.name)??"",short:((c=l.ticketCategory)==null?void 0:c.short)??""});function h(){l.ticketCategory?o.put(m("ticket-allocator.ticket-categories.update",l.ticketCategory.uuid)):o.post(m("ticket-allocator.ticket-categories.store"))}return(a,s)=>(b(),$(w,null,[e(r(B),{title:a.$t(a.ticketCategory?"edit_category":"new_category")},null,8,["title"]),e(F,null,{header:t(()=>[f("h2",q,n(a.$t(a.ticketCategory?"edit_category":"new_category")),1)]),default:t(()=>[f("div",null,[e(S,{onSubmit:N(h,["prevent"])},{default:t(()=>[e(T,null,{default:t(()=>[e(k,null,{default:t(()=>[e(d,{cols:"12",md:"6"},{default:t(()=>[e(g,{modelValue:r(o).name,"onUpdate:modelValue":s[0]||(s[0]=i=>r(o).name=i),required:"",maxlength:"255",label:a.$t("name"),"error-messages":a.errors.name},null,8,["modelValue","label","error-messages"])]),_:1}),e(d,{cols:"12",md:"6"},{default:t(()=>[e(g,{modelValue:r(o).short,"onUpdate:modelValue":s[1]||(s[1]=i=>r(o).short=i),required:"",maxlength:"32",label:a.$t("short_name"),"error-messages":a.errors.short},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(d,{cols:"12",md:"12"},{default:t(()=>[e(p,{type:"submit",color:"primary",class:"mr-3",disabled:r(o).processing},{default:t(()=>[V(n(a.$t("save")),1)]),_:1},8,["disabled"]),e(r(v),{href:r(m)("ticket-allocator.ticket-categories.index"),class:"mr-3"},{default:t(()=>[e(p,null,{default:t(()=>[V(n(a.$t("cancel")),1)]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])])]),_:1})],64))}});export{x as default};
//# sourceMappingURL=CreateEdit-c30b4d9d.js.map