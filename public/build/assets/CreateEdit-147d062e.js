import{an as S,aV as E,at as $,i as e,ad as o,au as l,X as k,as as u,aR as M,ax as U,ay as p,aK as R,aW as B,aB as j,av as q,V as C,aA as A}from"./app-74ce8b91.js";import{_ as D,A as f}from"./Default.vue_vue_type_script_setup_true_lang-6a75b31e.js";import{V as K}from"./VForm-62c110d7.js";import{V as L}from"./VContainer-beb2ff83.js";import{V as d,a as i}from"./VRow-39aa6869.js";import{V as O}from"./VCheckbox-d7ac73be.js";import{V as W}from"./VTextarea-cf7cab67.js";import{V as _}from"./VAutocomplete-789491f7.js";import"./_plugin-vue_export-helper-c27b6911.js";const X={class:"font-semibold text-xl text-gray-800 leading-tight"},x=S({__name:"CreateEdit",props:{team:{},operators:{},matchers:{},errors:{}},setup(T){var V,g,b,c,h,v,w;const m=T,t=E({active:!((V=m.team)!=null&&V.deleted_at),name:((g=m.team)==null?void 0:g.name)??"",description:((b=m.team)==null?void 0:b.description)??"",weight:((c=m.team)==null?void 0:c.weight)??100,operators:((h=m.team)==null?void 0:h.operators.map(a=>a.uuid))??[],matching:Array.isArray((v=m.team)==null?void 0:v.matching)?{}:((w=m.team)==null?void 0:w.matching)??{}}),F=a=>Object.entries(a).map(([s,r])=>({title:s,value:r}));function N(){m.team?t.put(f("ticket-allocator.teams.update",m.team.uuid)):t.post(f("ticket-allocator.teams.store"))}return(a,s)=>(u(),$(k,null,[e(o(M),{title:a.$t(a.team?"edit_team":"new_team")},null,8,["title"]),e(D,null,{header:l(()=>[U("h2",X,p(a.$t(a.team?"edit_team":"new_team")),1)]),default:l(()=>[U("div",null,[e(K,{onSubmit:R(N,["prevent"])},{default:l(()=>[e(L,null,{default:l(()=>[e(d,null,{default:l(()=>[e(i,{cols:"12",md:"12"},{default:l(()=>[e(O,{modelValue:o(t).active,"onUpdate:modelValue":s[0]||(s[0]=r=>o(t).active=r),label:a.$t("active")},null,8,["modelValue","label"])]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(i,{cols:"12",md:"6"},{default:l(()=>[e(B,{modelValue:o(t).name,"onUpdate:modelValue":s[1]||(s[1]=r=>o(t).name=r),required:"",maxlength:"255",label:a.$t("name"),"error-messages":a.errors.name},null,8,["modelValue","label","error-messages"])]),_:1}),e(i,{cols:"12",md:"6"},{default:l(()=>[e(B,{modelValue:o(t).weight,"onUpdate:modelValue":s[2]||(s[2]=r=>o(t).weight=r),modelModifiers:{number:!0},type:"number",min:"0",max:"1000",label:a.$t("weight"),placeholder:"100","error-messages":a.errors.weight},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(i,{cols:"12",md:"12"},{default:l(()=>[e(W,{modelValue:o(t).description,"onUpdate:modelValue":s[3]||(s[3]=r=>o(t).description=r),label:a.$t("description"),"error-messages":a.errors.description},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(i,{cols:"12",md:"12"},{default:l(()=>[e(_,{modelValue:o(t).operators,"onUpdate:modelValue":s[4]||(s[4]=r=>o(t).operators=r),multiple:"",clearable:"",chips:"","closable-chips":"",label:a.$t("operators"),items:a.operators,"item-title":"name","item-value":"uuid","error-messages":a.errors.operators},null,8,["modelValue","label","items","error-messages"])]),_:1})]),_:1}),(u(!0),$(k,null,j(a.matchers,(r,n)=>(u(),q(d,{key:n},{default:l(()=>[e(i,{cols:"12",md:"12"},{default:l(()=>[e(_,{multiple:"",clearable:"",chips:"","closable-chips":"",label:a.$t(n),items:F(r),"error-messages":a.errors[n],"model-value":o(t).matching[n],"onUpdate:modelValue":y=>o(t).matching[n]=y.length?y:void 0},null,8,["label","items","error-messages","model-value","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024))),128)),e(d,null,{default:l(()=>[e(i,{cols:"12",md:"12"},{default:l(()=>[e(C,{type:"submit",color:"primary",class:"mr-3",disabled:o(t).processing},{default:l(()=>[A(p(a.$t("save")),1)]),_:1},8,["disabled"]),e(C,{to:o(f)("ticket-allocator.teams.index"),class:"mr-3"},{default:l(()=>[A(p(a.$t("cancel")),1)]),_:1},8,["to"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])])]),_:1})],64))}});export{x as default};
//# sourceMappingURL=CreateEdit-147d062e.js.map