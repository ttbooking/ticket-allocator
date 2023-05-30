import{p as Y,aA as p,bp as ee,t as te,bq as ae,Q as ne,aD as le,c as y,r as x,s as oe,br as ue,d as ie,w as m,h as re,x as se,aF as ce,aG as T,bs as de,y as l,bt as fe,z as I,ao as R,a0 as z,a1 as ve,aS as xe,bu as me,aZ as ge,n as S,bv as he,W as we,O as Ve}from"./app-b32095c1.js";const ye=Y({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...p(),...ee()},"VTextarea"),Ce=te()({name:"VTextarea",directives:{Intersect:ae},inheritAttrs:!1,props:ye(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,G){let{attrs:F,emit:M,slots:i}=G;const o=ne(e,"modelValue"),{isFocused:f,focus:_,blur:D}=le(e),E=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),U=y(()=>{if(F.maxlength)return F.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function O(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const A=x(),g=x(),B=oe(""),h=x(),$=y(()=>e.persistentPlaceholder||f.value||e.active);function C(){var t;h.value!==document.activeElement&&((t=h.value)==null||t.focus()),f.value||_()}function j(t){C(),M("click:control",t)}function q(t){M("mousedown:control",t)}function Q(t){t.stopPropagation(),C(),S(()=>{o.value="",he(e["onClick:clear"],t)})}function W(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];S(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=x(),w=x(+e.rows),P=y(()=>["plain","underlined"].includes(e.variant));ue(()=>{e.autoGrow||(w.value=+e.rows)});function d(){e.autoGrow&&S(()=>{if(!c.value||!g.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(g.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,V=parseFloat(t.lineHeight),b=Math.max(parseFloat(e.rows)*V+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),k=parseFloat(e.maxRows)*V+a||1/0,s=Ve(u??0,b,k);w.value=Math.floor((s-a)/V),B.value=we(s)})}ie(d),m(o,d),m(()=>e.rows,d),m(()=>e.maxRows,d),m(()=>e.density,d);let r;return m(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),re(()=>{r==null||r.disconnect()}),se(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=ce(F),[{modelValue:V,...b}]=T.filterProps(e),[k]=de(e);return l(T,I({ref:A,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--plain-underlined":P.value},e.class],style:e.style},a,b,{centerAffix:w.value===1&&!P.value,focused:f.value}),{...i,default:s=>{let{isDisabled:v,isDirty:H,isReadonly:Z,isValid:J}=s;return l(fe,I({ref:g,style:{"--v-textarea-control-height":B.value},onClick:j,onMousedown:q,"onClick:clear":Q,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},k,{active:$.value||H.value,centerAffix:w.value===1&&!P.value,dirty:H.value||e.dirty,disabled:v.value,focused:f.value,error:J.value===!1}),{...i,default:K=>{let{props:{class:N,...L}}=K;return l(R,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),z(l("textarea",I({ref:h,class:N,value:o.value,onInput:W,autofocus:e.autofocus,readonly:Z.value,disabled:v.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:C,onBlur:D},L,u),null),[[ve("intersect"),{handler:O},null,{once:!0}]]),e.autoGrow&&z(l("textarea",{class:[N,"v-textarea__sizer"],"onUpdate:modelValue":X=>o.value=X,ref:c,readonly:!0,"aria-hidden":"true"},null),[[xe,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var v;return l(R,null,[(v=i.details)==null?void 0:v.call(i,s),t&&l(R,null,[l("span",null,null),l(me,{active:e.persistentCounter||f.value,value:E.value,max:U.value},i.counter)])])}:void 0})}),ge({},A,g,h)}});export{Ce as V};
//# sourceMappingURL=VTextarea-27c0d827.js.map