import{a4 as F,ay as M,f as N,aa as T,i as l,X as s,av as E,ab as a,F as S,a9 as p,ae as _,af as f,ao as A,ac as $,V as v,ag as h}from"./app-D_g1cNYY.js";import{_ as D,s as V}from"./Default.vue_vue_type_script_setup_true_lang-D6tJlrex.js";import{V as I}from"./VForm-CYsMe1UM.js";import{V as R}from"./VContainer-B5c_ltc-.js";import{V as u,a as i}from"./VRow-BAEHnn6I.js";import{b as n}from"./VTextField-DPjoBVZn.js";import{V as w}from"./VAutocomplete-DiNtlFBg.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./scopeId-CcGBhUhb.js";import"./VGrid-CJ5rW6iL.js";import"./filter-BWM3lpJ2.js";import"./VCheckboxBtn-DB7Sfg1C.js";const X={class:"font-semibold text-xl text-gray-800 leading-tight"},W=F({__name:"CreateEdit",props:{users:{},operator:{},teams:{},errors:{}},setup(B){var c,g,y,k;const m=B,t=M({user:null,name:((c=m.operator)==null?void 0:c.display_name)??"",ticket_limit:((g=m.operator)==null?void 0:g.ticket_limit)??null,complexity_limit:((y=m.operator)==null?void 0:y.complexity_limit)??null,teams:((k=m.operator)==null?void 0:k.teams.map(e=>e.uuid))??[]}),b=N(()=>{var o,d;const e=(d=(o=m.operator)==null?void 0:o.user)==null?void 0:d.name;if(e)return e;const r=m.users.findIndex(U=>U.id===t.user);return r<0?"":m.users[r].name});function C(){m.operator?t.put(V("ticket-allocator.operators.update",m.operator.uuid)):t.post(V("ticket-allocator.operators.store"))}return(e,r)=>(p(),T(S,null,[l(s(E),{title:e.$t(e.operator?"edit_operator":"new_operator")},null,8,["title"]),l(D,null,{header:a(()=>[_("h2",X,f(e.$t(e.operator?"edit_operator":"new_operator")),1)]),default:a(()=>[_("div",null,[l(I,{onSubmit:A(C,["prevent"])},{default:a(()=>[l(R,null,{default:a(()=>[l(u,null,{default:a(()=>[l(i,{cols:"12",md:"12"},{default:a(()=>{var o;return[e.operator?(p(),$(n,{key:0,"model-value":(o=e.operator.user)==null?void 0:o.name,label:e.$t("user"),readonly:""},null,8,["model-value","label"])):(p(),$(w,{key:1,modelValue:s(t).user,"onUpdate:modelValue":r[0]||(r[0]=d=>s(t).user=d),label:e.$t("user"),items:e.users,"item-title":"name","item-value":"id","error-messages":e.errors.user},null,8,["modelValue","label","items","error-messages"]))]}),_:1})]),_:1}),l(u,null,{default:a(()=>[l(i,{cols:"12",md:"12"},{default:a(()=>[l(n,{modelValue:s(t).name,"onUpdate:modelValue":r[1]||(r[1]=o=>s(t).name=o),maxlength:"255",label:e.$t("display_name"),placeholder:b.value,"persistent-placeholder":!!b.value.length,"error-messages":e.errors.name},null,8,["modelValue","label","placeholder","persistent-placeholder","error-messages"])]),_:1})]),_:1}),l(u,null,{default:a(()=>[l(i,{cols:"12",md:"6"},{default:a(()=>[l(n,{modelValue:s(t).ticket_limit,"onUpdate:modelValue":r[2]||(r[2]=o=>s(t).ticket_limit=o),modelModifiers:{number:!0},type:"number",min:"1",max:"100",label:e.$t("ticket_limit"),placeholder:"∞","persistent-placeholder":"","error-messages":e.errors.ticket_limit},null,8,["modelValue","label","error-messages"])]),_:1}),l(i,{cols:"12",md:"6"},{default:a(()=>[l(n,{modelValue:s(t).complexity_limit,"onUpdate:modelValue":r[3]||(r[3]=o=>s(t).complexity_limit=o),modelModifiers:{number:!0},type:"number",min:"1",max:"1000",label:e.$t("complexity_limit"),placeholder:"∞","persistent-placeholder":"","error-messages":e.errors.complexity_limit},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),l(u,null,{default:a(()=>[l(i,{cols:"12",md:"12"},{default:a(()=>[l(w,{modelValue:s(t).teams,"onUpdate:modelValue":r[4]||(r[4]=o=>s(t).teams=o),multiple:"",clearable:"",chips:"","closable-chips":"",label:e.$t("teams"),items:e.teams,"item-title":"name","item-value":"uuid","error-messages":e.errors.teams},null,8,["modelValue","label","items","error-messages"])]),_:1})]),_:1}),l(u,null,{default:a(()=>[l(i,{cols:"12",md:"12"},{default:a(()=>[l(v,{type:"submit",color:"primary",class:"mr-3",disabled:s(t).processing},{default:a(()=>[h(f(e.$t("save")),1)]),_:1},8,["disabled"]),l(v,{to:s(V)("ticket-allocator.operators.index"),class:"mr-3"},{default:a(()=>[h(f(e.$t("cancel")),1)]),_:1},8,["to"])]),_:1})]),_:1})]),_:1})]),_:1})])]),_:1})],64))}});export{W as default};
//# sourceMappingURL=CreateEdit-DmyujRTg.js.map