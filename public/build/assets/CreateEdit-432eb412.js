import{_,aE as q,a2 as U,k as t,u as e,a3 as a,ab as B,a1 as M,aA as i,aB as v,a7 as p,a8 as u,ak as F,aF as d,ae as h,am as w,aG as E}from"./app-6f2e9ad6.js";import{a as N,P as g}from"./Default.vue_vue_type_script_setup_true_lang-166b287d.js";import{V as S}from"./VForm-79a3d12d.js";import{V as T,a as c,b as n}from"./VRow-6393d387.js";const A={class:"font-semibold text-xl text-gray-800 leading-tight"},$=_({__name:"CreateEdit",props:{ticketCategory:null,errors:null},setup(s){var f,y,b,V,k,x;const m=s,l=q({name:((f=m.ticketCategory)==null?void 0:f.name)??"",short:((y=m.ticketCategory)==null?void 0:y.short)??"",initial_weight:((b=m.ticketCategory)==null?void 0:b.initial_weight)??0,weight_increment:((V=m.ticketCategory)==null?void 0:V.weight_increment)??0,complexity:((k=m.ticketCategory)==null?void 0:k.complexity)??0,delay:((x=m.ticketCategory)==null?void 0:x.delay)??0});function C(){m.ticketCategory?l.put(g("ticket-allocator.ticket-categories.update",m.ticketCategory.uuid)):l.post(g("ticket-allocator.ticket-categories.store"))}return(D,r)=>(M(),U(B,null,[t(e(v),{title:e(i)(s.ticketCategory?"edit_category":"new_category")},null,8,["title"]),t(N,null,{header:a(()=>[p("h2",A,u(e(i)(s.ticketCategory?"edit_category":"new_category")),1)]),default:a(()=>[p("div",null,[t(S,{onSubmit:F(C,["prevent"])},{default:a(()=>[t(T,null,{default:a(()=>[t(c,null,{default:a(()=>[t(n,{cols:"12",md:"6"},{default:a(()=>[t(d,{modelValue:e(l).name,"onUpdate:modelValue":r[0]||(r[0]=o=>e(l).name=o),required:"",maxlength:"255",label:e(i)("name"),"error-messages":s.errors.name},null,8,["modelValue","label","error-messages"])]),_:1}),t(n,{cols:"12",md:"6"},{default:a(()=>[t(d,{modelValue:e(l).short,"onUpdate:modelValue":r[1]||(r[1]=o=>e(l).short=o),required:"",maxlength:"32",label:e(i)("short_name"),"error-messages":s.errors.short},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),t(c,null,{default:a(()=>[t(n,{cols:"12",md:"3"},{default:a(()=>[t(d,{modelValue:e(l).initial_weight,"onUpdate:modelValue":r[2]||(r[2]=o=>e(l).initial_weight=o),modelModifiers:{number:!0},type:"number",required:"",min:"0",max:"9999999",label:e(i)("initial_weight"),"error-messages":s.errors.initial_weight},null,8,["modelValue","label","error-messages"])]),_:1}),t(n,{cols:"12",md:"3"},{default:a(()=>[t(d,{modelValue:e(l).weight_increment,"onUpdate:modelValue":r[3]||(r[3]=o=>e(l).weight_increment=o),modelModifiers:{number:!0},type:"number",required:"",min:"0",max:"99999",label:e(i)("weight_increment"),"error-messages":s.errors.weight_increment},null,8,["modelValue","label","error-messages"])]),_:1}),t(n,{cols:"12",md:"3"},{default:a(()=>[t(d,{modelValue:e(l).complexity,"onUpdate:modelValue":r[4]||(r[4]=o=>e(l).complexity=o),modelModifiers:{number:!0},type:"number",required:"",min:"0",max:"9999",label:e(i)("complexity"),"error-messages":s.errors.complexity},null,8,["modelValue","label","error-messages"])]),_:1}),t(n,{cols:"12",md:"3"},{default:a(()=>[t(d,{modelValue:e(l).delay,"onUpdate:modelValue":r[5]||(r[5]=o=>e(l).delay=o),modelModifiers:{number:!0},type:"number",required:"",min:"0",max:"99999",label:e(i)("delay"),"error-messages":s.errors.delay},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),t(c,null,{default:a(()=>[t(n,{cols:"12",md:"12"},{default:a(()=>[t(h,{type:"submit",color:"primary",class:"mr-3",disabled:e(l).processing},{default:a(()=>[w(u(e(i)("save")),1)]),_:1},8,["disabled"]),t(e(E),{href:e(g)("ticket-allocator.ticket-categories.index"),class:"mr-3"},{default:a(()=>[t(h,null,{default:a(()=>[w(u(e(i)("cancel")),1)]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])])]),_:1})],64))}});export{$ as default};
//# sourceMappingURL=CreateEdit-432eb412.js.map