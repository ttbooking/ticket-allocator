import{a8 as h,aL as w,ab as B,ac as U,B as e,u as l,ad as t,ak as y,aG as T,ag as b,ah as u,au as F,aM as N,J as k,aj as _,aP as S}from"./app-a5a060bf.js";import{a as A,A as n}from"./Default.vue_vue_type_script_setup_true_lang-68507a01.js";import{V as E}from"./VForm-1a048a2d.js";import{V as M}from"./VContainer-0a9ecff8.js";import{V as i,a as d}from"./VRow-502a562f.js";import{V as j}from"./VCheckbox-f5465e3b.js";import{V as q}from"./VTextarea-4b6d98a5.js";import{V as $}from"./VAutocomplete-f8ca6ee9.js";const D={class:"font-semibold text-xl text-gray-800 leading-tight"},I=h({__name:"CreateEdit",props:{team:{},operators:{},ticketCategories:{},errors:{}},setup(v){var p,f,c,V,g;const m=v,o=w({active:!((p=m.team)!=null&&p.deleted_at),name:((f=m.team)==null?void 0:f.name)??"",description:((c=m.team)==null?void 0:c.description)??"",operators:((V=m.team)==null?void 0:V.operators.map(a=>a.uuid))??[],ticket_categories:((g=m.team)==null?void 0:g.ticket_categories.map(a=>a.uuid))??[]});function C(){m.team?o.put(n("ticket-allocator.teams.update",m.team.uuid)):o.post(n("ticket-allocator.teams.store"))}return(a,r)=>(B(),U(y,null,[e(l(T),{title:a.$t(a.team?"edit_team":"new_team")},null,8,["title"]),e(A,null,{header:t(()=>[b("h2",D,u(a.$t(a.team?"edit_team":"new_team")),1)]),default:t(()=>[b("div",null,[e(E,{onSubmit:F(C,["prevent"])},{default:t(()=>[e(M,null,{default:t(()=>[e(i,null,{default:t(()=>[e(d,{cols:"12",md:"12"},{default:t(()=>[e(j,{modelValue:l(o).active,"onUpdate:modelValue":r[0]||(r[0]=s=>l(o).active=s),label:a.$t("active")},null,8,["modelValue","label"])]),_:1})]),_:1}),e(i,null,{default:t(()=>[e(d,{cols:"12",md:"12"},{default:t(()=>[e(N,{modelValue:l(o).name,"onUpdate:modelValue":r[1]||(r[1]=s=>l(o).name=s),required:"",maxlength:"255",label:a.$t("name"),"error-messages":a.errors.name},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(i,null,{default:t(()=>[e(d,{cols:"12",md:"12"},{default:t(()=>[e(q,{modelValue:l(o).description,"onUpdate:modelValue":r[2]||(r[2]=s=>l(o).description=s),label:a.$t("description"),"error-messages":a.errors.description},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(i,null,{default:t(()=>[e(d,{cols:"12",md:"12"},{default:t(()=>[e($,{modelValue:l(o).operators,"onUpdate:modelValue":r[3]||(r[3]=s=>l(o).operators=s),multiple:"",clearable:"",chips:"","closable-chips":"",label:a.$t("operators"),items:a.operators,"item-title":"name","item-value":"uuid","error-messages":a.errors.operators},null,8,["modelValue","label","items","error-messages"])]),_:1})]),_:1}),e(i,null,{default:t(()=>[e(d,{cols:"12",md:"12"},{default:t(()=>[e($,{modelValue:l(o).ticket_categories,"onUpdate:modelValue":r[4]||(r[4]=s=>l(o).ticket_categories=s),multiple:"",clearable:"",chips:"","closable-chips":"",label:a.$t("ticket_categories"),items:a.ticketCategories,"item-title":"name","item-value":"uuid","error-messages":a.errors.ticket_categories},null,8,["modelValue","label","items","error-messages"])]),_:1})]),_:1}),e(i,null,{default:t(()=>[e(d,{cols:"12",md:"12"},{default:t(()=>[e(k,{type:"submit",color:"primary",class:"mr-3",disabled:l(o).processing},{default:t(()=>[_(u(a.$t("save")),1)]),_:1},8,["disabled"]),e(l(S),{href:l(n)("ticket-allocator.teams.index"),class:"mr-3"},{default:t(()=>[e(k,null,{default:t(()=>[_(u(a.$t("cancel")),1)]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])])]),_:1})],64))}});export{I as default};
//# sourceMappingURL=CreateEdit-662c0d2d.js.map