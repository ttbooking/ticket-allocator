import{m as Q,ao as Y,bf as me,ar as Z,as as fe,d as R,j as ee,at as te,au as ae,bg as ve,k as t,b5 as ge,ax as S,az as le,bh as xe,bi as Ve,aq as be,r as B,b as he,w as I,bj as ke,bk as pe,bl as Ce,a9 as U,U as q,W as ye,bm as we,bn as Fe,b7 as Pe,n as J,bo as _e,aJ as Be,bp as Ie,_ as Re,aR as Se,a2 as Ne,u,a3 as o,a1 as Ae,aA as Ue,a5 as W,a6 as He,aj as Te,aS as De,ac as X,al as K,aO as ze}from"./app-45ad0fab.js";import{a as Me,P as $}from"./index.m-0d82df39.js";import{V as Ee,a as L}from"./VForm-30e43ca3.js";import{V as Ge,a as y,b as w}from"./VRow-e7ec5928.js";const $e=Q()({name:"VCheckbox",inheritAttrs:!1,props:{...Y(),...me()},emits:{"update:focused":e=>!0},setup(e,c){let{attrs:l,slots:g}=c;const{isFocused:r,focus:n,blur:d}=Z(e),x=fe(),V=R(()=>e.id||`checkbox-${x}`);return ee(()=>{const[f,s]=te(l),[i,H]=ae(e),[b,T]=ve(e);return t(le,S({class:"v-checkbox"},f,i,{id:V.value,focused:r.value}),{...g,default:h=>{let{id:N,messagesId:D,isDisabled:F,isReadonly:z}=h;return t(ge,S(b,{id:N.value,"aria-describedby":D.value,disabled:F.value,readonly:z.value},s,{onFocus:n,onBlur:d}),g)}})}),{}}});const je=Q()({name:"VTextarea",directives:{Intersect:xe},inheritAttrs:!1,props:{autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,hint:String,persistentHint:Boolean,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,...Y(),...Ve()},emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,c){let{attrs:l,emit:g,slots:r}=c;const n=be(e,"modelValue"),{isFocused:d,focus:x,blur:V}=Z(e),f=R(()=>typeof e.counterValue=="function"?e.counterValue(n.value):(n.value||"").toString().length),s=R(()=>{if(l.maxlength)return l.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function i(a,P){var m,C;!e.autofocus||!a||(C=(m=P[0].target)==null?void 0:m.focus)==null||C.call(m)}const H=B(),b=B(),T=B(""),h=B(),N=R(()=>d.value||e.persistentPlaceholder),D=R(()=>e.messages.length?e.messages:N.value||e.persistentHint?e.hint:"");function F(){var a;h.value!==document.activeElement&&((a=h.value)==null||a.focus()),d.value||x()}function z(a){F(),g("click:control",a)}function oe(a){g("mousedown:control",a)}function ne(a){a.stopPropagation(),F(),J(()=>{n.value="",_e(e["onClick:clear"],a)})}function se(a){n.value=a.target.value}const k=B();function p(){e.autoGrow&&J(()=>{if(!k.value||!b.value)return;const a=getComputedStyle(k.value),P=getComputedStyle(b.value.$el),m=parseFloat(a.getPropertyValue("--v-field-padding-top"))+parseFloat(a.getPropertyValue("--v-input-padding-top"))+parseFloat(a.getPropertyValue("--v-field-padding-bottom")),C=k.value.scrollHeight,M=parseFloat(a.lineHeight),E=Math.max(parseFloat(e.rows)*M+m,parseFloat(P.getPropertyValue("--v-input-control-height"))),G=parseFloat(e.maxRows)*M+m||1/0;T.value=Be(Ie(C??0,E,G))})}he(p),I(n,p),I(()=>e.rows,p),I(()=>e.maxRows,p),I(()=>e.density,p);let v;return I(k,a=>{a?(v=new ResizeObserver(p),v.observe(k.value)):v==null||v.disconnect()}),ke(()=>{v==null||v.disconnect()}),ee(()=>{const a=!!(r.counter||e.counter||e.counterValue),P=!!(a||r.details),[m,C]=te(l),[{modelValue:M,...E}]=ae(e),[G]=pe(e);return t(le,S({ref:H,modelValue:n.value,"onUpdate:modelValue":_=>n.value=_,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)}],"onClick:prepend":e["onClick:prepend"],"onClick:append":e["onClick:append"]},m,E,{focused:d.value,messages:D.value}),{...r,default:_=>{let{isDisabled:A,isDirty:j,isReadonly:ue,isValid:re}=_;return t(Ce,S({ref:b,style:{"--v-textarea-control-height":T.value},onClick:z,onMousedown:oe,"onClick:clear":ne,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},G,{active:N.value||j.value,dirty:j.value||e.dirty,focused:d.value,error:re.value===!1}),{...r,default:ie=>{let{props:{class:O,...ce}}=ie;return t(U,null,[e.prefix&&t("span",{class:"v-text-field__prefix"},[e.prefix]),q(t("textarea",S({ref:h,class:O,value:n.value,onInput:se,autofocus:e.autofocus,readonly:ue.value,disabled:A.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:F,onBlur:V},ce,C),null),[[ye("intersect"),{handler:i},null,{once:!0}]]),e.autoGrow&&q(t("textarea",{class:[O,"v-textarea__sizer"],"onUpdate:modelValue":de=>n.value=de,ref:k,readonly:!0,"aria-hidden":"true"},null),[[we,n.value]]),e.suffix&&t("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:P?_=>{var A;return t(U,null,[(A=r.details)==null?void 0:A.call(r,_),a&&t(U,null,[t("span",null,null),t(Fe,{active:e.persistentCounter||d.value,value:f.value,max:s.value},r.counter)])])}:void 0})}),Pe({},H,b,h)}}),Oe={class:"font-semibold text-xl text-gray-800 leading-tight"},Ke=Re({__name:"CreateEdit",props:{team:null,operators:null,ticketCategories:null,errors:null},setup(e){var r,n,d,x,V;const c=e,l=Se({active:!((r=c.team)!=null&&r.deleted_at),name:((n=c.team)==null?void 0:n.name)??"",description:((d=c.team)==null?void 0:d.description)??"",operators:((x=c.team)==null?void 0:x.operators.map(f=>f.uuid))??[],ticket_categories:((V=c.team)==null?void 0:V.ticket_categories.map(f=>f.uuid))??[]});function g(){c.team?l.put($("ticket-allocator.teams.update",c.team.uuid)):l.post($("ticket-allocator.teams.store"))}return(f,s)=>(Ae(),Ne(U,null,[t(u(Ue),{title:e.team?"Edit team":"New team"},null,8,["title"]),t(Me,null,{header:o(()=>[W("h2",Oe,He(e.team?"Edit team":"New team"),1)]),default:o(()=>[W("div",null,[t(Ee,{onSubmit:Te(g,["prevent"])},{default:o(()=>[t(Ge,null,{default:o(()=>[t(y,null,{default:o(()=>[t(w,{cols:"12",md:"12"},{default:o(()=>[t($e,{modelValue:u(l).active,"onUpdate:modelValue":s[0]||(s[0]=i=>u(l).active=i),label:"Active"},null,8,["modelValue"])]),_:1})]),_:1}),t(y,null,{default:o(()=>[t(w,{cols:"12",md:"12"},{default:o(()=>[t(De,{modelValue:u(l).name,"onUpdate:modelValue":s[1]||(s[1]=i=>u(l).name=i),label:"Name","error-messages":e.errors.name},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),t(y,null,{default:o(()=>[t(w,{cols:"12",md:"12"},{default:o(()=>[t(je,{modelValue:u(l).description,"onUpdate:modelValue":s[2]||(s[2]=i=>u(l).description=i),label:"Description","error-messages":e.errors.description},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),t(y,null,{default:o(()=>[t(w,{cols:"12",md:"12"},{default:o(()=>[t(L,{modelValue:u(l).operators,"onUpdate:modelValue":s[3]||(s[3]=i=>u(l).operators=i),multiple:"",clearable:"",chips:"","closable-chips":"",label:"Operators",items:e.operators,"item-title":"name","item-value":"uuid","error-messages":e.errors.operators},null,8,["modelValue","items","error-messages"])]),_:1})]),_:1}),t(y,null,{default:o(()=>[t(w,{cols:"12",md:"12"},{default:o(()=>[t(L,{modelValue:u(l).ticket_categories,"onUpdate:modelValue":s[4]||(s[4]=i=>u(l).ticket_categories=i),multiple:"",clearable:"",chips:"","closable-chips":"",label:"Ticket categories",items:e.ticketCategories,"item-title":"name","item-value":"uuid","error-messages":e.errors.ticket_categories},null,8,["modelValue","items","error-messages"])]),_:1})]),_:1}),t(y,null,{default:o(()=>[t(w,{cols:"12",md:"12"},{default:o(()=>[t(X,{type:"submit",color:"primary",class:"mr-3",disabled:u(l).processing},{default:o(()=>[K("Save")]),_:1},8,["disabled"]),t(u(ze),{href:u($)("ticket-allocator.teams.index"),class:"mr-3"},{default:o(()=>[t(X,null,{default:o(()=>[K("Cancel")]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])])]),_:1})],64))}});export{Ke as default};
//# sourceMappingURL=CreateEdit-391c9633.js.map