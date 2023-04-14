import{t as ee,aq as te,aM as ge,aN as xe,at as ae,au as Ve,c as N,l as le,av as ne,aw as oe,aO as Q,m as t,ay as U,aA as se,aP as he,aQ as be,as as ke,r as S,d as pe,w as R,aR as Ce,aS as ye,aT as we,ac as A,X as W,Y as Fe,aU as Pe,aV as _e,aW as Be,n as O,aX as Ie,aY as Se,aZ as Re,a0 as Ne,aG as Ue,a4 as Ae,u as l,a5 as o,a3 as He,aB as g,aC as Me,a9 as Z,aa as q,al as Te,aH as De,af as J,an as K,aI as Ge}from"./app-80a079ec.js";import{a as ze,P as X}from"./Default.vue_vue_type_script_setup_true_lang-813f53b6.js";import{V as Ee}from"./VForm-9b364eec.js";import{V as $e,a as F,b as P}from"./VRow-c88c0be1.js";import{V as L}from"./VAutocomplete-5f91eaad.js";const Oe=ee()({name:"VCheckbox",inheritAttrs:!1,props:{...te(),...ge(xe(),["inline"])},emits:{"update:focused":e=>!0},setup(e,d){let{attrs:n,slots:h}=d;const{isFocused:r,focus:s,blur:m}=ae(e),b=Ve(),k=N(()=>e.id||`checkbox-${b}`);return le(()=>{const[x,i]=ne(n),[u,H]=oe(e),[p,M]=Q.filterProps(e);return t(se,U({class:"v-checkbox"},x,u,{id:k.value,focused:r.value}),{...h,default:C=>{let{id:T,messagesId:D,isDisabled:_,isReadonly:G}=C;return t(Q,U(p,{id:T.value,"aria-describedby":D.value,disabled:_.value,readonly:G.value},i,{onFocus:s,onBlur:m}),h)}})}),{}}});const qe=ee()({name:"VTextarea",directives:{Intersect:he},inheritAttrs:!1,props:{autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,hint:String,persistentHint:Boolean,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...te(),...be()},emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,d){let{attrs:n,emit:h,slots:r}=d;const s=ke(e,"modelValue"),{isFocused:m,focus:b,blur:k}=ae(e),x=N(()=>typeof e.counterValue=="function"?e.counterValue(s.value):(s.value||"").toString().length),i=N(()=>{if(n.maxlength)return n.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function u(a,f){var c,v;!e.autofocus||!a||(v=(c=f[0].target)==null?void 0:c.focus)==null||v.call(c)}const H=S(),p=S(),M=S(""),C=S(),T=N(()=>m.value||e.persistentPlaceholder),D=N(()=>e.messages.length?e.messages:m.value||e.persistentHint?e.hint:"");function _(){var a;C.value!==document.activeElement&&((a=C.value)==null||a.focus()),m.value||b()}function G(a){_(),h("click:control",a)}function ie(a){h("mousedown:control",a)}function re(a){a.stopPropagation(),_(),O(()=>{s.value="",Ie(e["onClick:clear"],a)})}function ue(a){var c;const f=a.target;if(s.value=f.value,(c=e.modelModifiers)!=null&&c.trim){const v=[f.selectionStart,f.selectionEnd];O(()=>{f.selectionStart=v[0],f.selectionEnd=v[1]})}}const y=S();function w(){e.autoGrow&&O(()=>{if(!y.value||!p.value)return;const a=getComputedStyle(y.value),f=getComputedStyle(p.value.$el),c=parseFloat(a.getPropertyValue("--v-field-padding-top"))+parseFloat(a.getPropertyValue("--v-input-padding-top"))+parseFloat(a.getPropertyValue("--v-field-padding-bottom")),v=y.value.scrollHeight,z=parseFloat(a.lineHeight),E=Math.max(parseFloat(e.rows)*z+c,parseFloat(f.getPropertyValue("--v-input-control-height"))),$=parseFloat(e.maxRows)*z+c||1/0;M.value=Se(Re(v??0,E,$))})}pe(w),R(s,w),R(()=>e.rows,w),R(()=>e.maxRows,w),R(()=>e.density,w);let V;return R(y,a=>{a?(V=new ResizeObserver(w),V.observe(y.value)):V==null||V.disconnect()}),Ce(()=>{V==null||V.disconnect()}),le(()=>{const a=!!(r.counter||e.counter||e.counterValue),f=!!(a||r.details),[c,v]=ne(n),[{modelValue:z,...E}]=oe(e),[$]=ye(e);return t(se,U({ref:H,modelValue:s.value,"onUpdate:modelValue":B=>s.value=B,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)}],"onClick:prepend":e["onClick:prepend"],"onClick:append":e["onClick:append"]},c,E,{focused:m.value,messages:D.value}),{...r,default:B=>{let{isDisabled:I,isDirty:Y,isReadonly:ce,isValid:de}=B;return t(we,U({ref:p,style:{"--v-textarea-control-height":M.value},onClick:G,onMousedown:ie,"onClick:clear":re,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},$,{active:T.value||Y.value,dirty:Y.value||e.dirty,disabled:I.value,focused:m.value,error:de.value===!1}),{...r,default:me=>{let{props:{class:j,...fe}}=me;return t(A,null,[e.prefix&&t("span",{class:"v-text-field__prefix"},[e.prefix]),W(t("textarea",U({ref:C,class:j,value:s.value,onInput:ue,autofocus:e.autofocus,readonly:ce.value,disabled:I.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:_,onBlur:k},fe,v),null),[[Fe("intersect"),{handler:u},null,{once:!0}]]),e.autoGrow&&W(t("textarea",{class:[j,"v-textarea__sizer"],"onUpdate:modelValue":ve=>s.value=ve,ref:y,readonly:!0,"aria-hidden":"true"},null),[[Pe,s.value]]),e.suffix&&t("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:f?B=>{var I;return t(A,null,[(I=r.details)==null?void 0:I.call(r,B),a&&t(A,null,[t("span",null,null),t(_e,{active:e.persistentCounter||m.value,value:x.value,max:i.value},r.counter)])])}:void 0})}),Be({},H,p,C)}}),Xe={class:"font-semibold text-xl text-gray-800 leading-tight"},Je=Ne({__name:"CreateEdit",props:{team:null,operators:null,ticketCategories:null,errors:null},setup(e){var r,s,m,b,k;const d=e,n=Ue({active:!((r=d.team)!=null&&r.deleted_at),name:((s=d.team)==null?void 0:s.name)??"",description:((m=d.team)==null?void 0:m.description)??"",operators:((b=d.team)==null?void 0:b.operators.map(x=>x.uuid))??[],ticket_categories:((k=d.team)==null?void 0:k.ticket_categories.map(x=>x.uuid))??[]});function h(){d.team?n.put(X("ticket-allocator.teams.update",d.team.uuid)):n.post(X("ticket-allocator.teams.store"))}return(x,i)=>(He(),Ae(A,null,[t(l(Me),{title:l(g)(e.team?"edit_team":"new_team")},null,8,["title"]),t(ze,null,{header:o(()=>[Z("h2",Xe,q(l(g)(e.team?"edit_team":"new_team")),1)]),default:o(()=>[Z("div",null,[t(Ee,{onSubmit:Te(h,["prevent"])},{default:o(()=>[t($e,null,{default:o(()=>[t(F,null,{default:o(()=>[t(P,{cols:"12",md:"12"},{default:o(()=>[t(Oe,{modelValue:l(n).active,"onUpdate:modelValue":i[0]||(i[0]=u=>l(n).active=u),label:l(g)("active")},null,8,["modelValue","label"])]),_:1})]),_:1}),t(F,null,{default:o(()=>[t(P,{cols:"12",md:"12"},{default:o(()=>[t(De,{modelValue:l(n).name,"onUpdate:modelValue":i[1]||(i[1]=u=>l(n).name=u),required:"",maxlength:"255",label:l(g)("name"),"error-messages":e.errors.name},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),t(F,null,{default:o(()=>[t(P,{cols:"12",md:"12"},{default:o(()=>[t(qe,{modelValue:l(n).description,"onUpdate:modelValue":i[2]||(i[2]=u=>l(n).description=u),label:l(g)("description"),"error-messages":e.errors.description},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),t(F,null,{default:o(()=>[t(P,{cols:"12",md:"12"},{default:o(()=>[t(L,{modelValue:l(n).operators,"onUpdate:modelValue":i[3]||(i[3]=u=>l(n).operators=u),multiple:"",clearable:"",chips:"","closable-chips":"",label:l(g)("operators"),items:e.operators,"item-title":"name","item-value":"uuid","error-messages":e.errors.operators},null,8,["modelValue","label","items","error-messages"])]),_:1})]),_:1}),t(F,null,{default:o(()=>[t(P,{cols:"12",md:"12"},{default:o(()=>[t(L,{modelValue:l(n).ticket_categories,"onUpdate:modelValue":i[4]||(i[4]=u=>l(n).ticket_categories=u),multiple:"",clearable:"",chips:"","closable-chips":"",label:l(g)("ticket_categories"),items:e.ticketCategories,"item-title":"name","item-value":"uuid","error-messages":e.errors.ticket_categories},null,8,["modelValue","label","items","error-messages"])]),_:1})]),_:1}),t(F,null,{default:o(()=>[t(P,{cols:"12",md:"12"},{default:o(()=>[t(J,{type:"submit",color:"primary",class:"mr-3",disabled:l(n).processing},{default:o(()=>[K(q(l(g)("save")),1)]),_:1},8,["disabled"]),t(l(Ge),{href:l(X)("ticket-allocator.teams.index"),class:"mr-3"},{default:o(()=>[t(J,null,{default:o(()=>[K(q(l(g)("cancel")),1)]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])])]),_:1})],64))}});export{Je as default};
//# sourceMappingURL=CreateEdit-877b5a84.js.map