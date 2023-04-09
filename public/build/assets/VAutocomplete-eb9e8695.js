import{t as X,a_ as Y,a$ as Z,aM as ee,b0 as le,b1 as ae,b2 as te,r as y,as as T,h as C,b3 as ne,b4 as ue,b5 as oe,w as E,n as L,l as se,aH as N,m as u,ac as U,b6 as ie,ay as b,b7 as re,b8 as O,aO as ce,b9 as ve,x as de,an as fe,aW as me,ba as pe}from"./app-89f43717.js";function he(e,c,a){if(c==null)return e;if(Array.isArray(c))throw new Error("Multiple matches is not implemented");return typeof c=="number"&&~c?u(U,null,[u("span",{class:"v-autocomplete__unmask"},[e.substr(0,c)]),u("span",{class:"v-autocomplete__mask"},[e.substr(c,a)]),u("span",{class:"v-autocomplete__unmask"},[e.substr(c+a)])]):e}const Ve=X()({name:"VAutocomplete",props:{search:String,...Y({filterKeys:["title"]}),...Z(),...ee(le({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...ae({transition:!1})},emits:{"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,c){let{slots:a}=c;const{t:K}=te(),I=y(),m=y(!1),f=y(!0),R=y(),x=T(e,"menu"),s=C({get:()=>x.value,set:l=>{var t;x.value&&!l&&((t=R.value)!=null&&t.ΨopenChildren)||(x.value=l)}}),{items:A,transformIn:$,transformOut:z}=ne(e),i=T(e,"search",""),v=T(e,"modelValue",[],l=>$(pe(l)),l=>{const t=z(l);return e.multiple?t:t[0]??null}),p=ue(),{filteredItems:P,getMatches:B}=oe(e,A,C(()=>f.value?void 0:i.value)),V=C(()=>v.value.map(l=>A.value.find(t=>e.valueComparator(t.value,l.value))||l)),D=C(()=>e.hideSelected?P.value.filter(l=>!V.value.some(t=>t.value===l.value)):P.value),S=C(()=>V.value.map(l=>l.props.value)),M=y();function H(l){e.openOnClear&&(s.value=!0),i.value=""}function W(){e.hideNoData&&!A.value.length||e.readonly||p!=null&&p.isReadonly.value||(s.value=!0)}function j(l){var t,d;e.readonly||p!=null&&p.isReadonly.value||(["Enter","ArrowDown","ArrowUp"].includes(l.key)&&l.preventDefault(),["Enter","ArrowDown"].includes(l.key)&&(s.value=!0),["Escape"].includes(l.key)&&(s.value=!1),["Enter","Escape","Tab"].includes(l.key)&&(f.value=!0),l.key==="ArrowDown"?(t=M.value)==null||t.focus("next"):l.key==="ArrowUp"&&((d=M.value)==null||d.focus("prev")))}function q(l){i.value=l.target.value}function G(){m.value&&(f.value=!0)}function J(l){m.value=!0}function Q(l){var t;l.relatedTarget==null&&((t=I.value)==null||t.focus())}const k=y(!1);function w(l){if(e.multiple){const t=S.value.findIndex(d=>e.valueComparator(d,l.value));if(t===-1)v.value=[...v.value,l],i.value="";else{const d=[...v.value];d.splice(t,1),v.value=d}}else v.value=[l],k.value=!0,a.selection||(i.value=l.title),s.value=!1,f.value=!0,L(()=>k.value=!1)}return E(m,l=>{var t;l?(k.value=!0,i.value=e.multiple||a.selection?"":String(((t=V.value.at(-1))==null?void 0:t.props.title)??""),f.value=!0,L(()=>k.value=!1)):(s.value=!1,i.value="")}),E(i,l=>{!m.value||k.value||(l&&(s.value=!0),f.value=!l)}),se(()=>{const l=!!(e.chips||a.chip),t=!!(!e.hideNoData||D.value.length||a.prepend||a.append||a["no-data"]),[d]=N.filterProps(e);return u(N,b({ref:I},d,{modelValue:i.value,"onUpdate:modelValue":n=>{n==null&&(v.value=[])},validationValue:v.externalValue,dirty:v.value.length>0,onInput:q,class:["v-autocomplete",{"v-autocomplete--active-menu":s.value,"v-autocomplete--chips":!!e.chips,[`v-autocomplete--${e.multiple?"multiple":"single"}`]:!0,"v-autocomplete--selection-slot":!!a.selection}],appendInnerIcon:e.menuIcon,readonly:e.readonly,"onClick:clear":H,"onMousedown:control":W,onFocus:()=>m.value=!0,onBlur:()=>m.value=!1,onKeydown:j}),{...a,default:()=>u(U,null,[u(ie,b({ref:R,modelValue:s.value,"onUpdate:modelValue":n=>s.value=n,activator:"parent",contentClass:"v-autocomplete__content",eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:G},e.menuProps),{default:()=>[t&&u(re,{ref:M,selected:S.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:n=>n.preventDefault(),onFocusin:J,onFocusout:Q},{default:()=>{var n,h,_;return[!D.value.length&&!e.hideNoData&&(((n=a["no-data"])==null?void 0:n.call(a))??u(O,{title:K(e.noDataText)},null)),(h=a["prepend-item"])==null?void 0:h.call(a),D.value.map(o=>{var g;return((g=a.item)==null?void 0:g.call(a,{item:o,props:b(o.props,{onClick:()=>w(o)})}))??u(O,b({key:o.value},o.props,{onClick:()=>w(o)}),{prepend:r=>{let{isSelected:F}=r;return e.multiple&&!e.hideSelected?u(ce,{modelValue:F,ripple:!1},null):void 0},title:()=>{var r,F;return f.value?o.title:he(o.title,(r=B(o))==null?void 0:r.title,((F=i.value)==null?void 0:F.length)??0)}})}),(_=a["append-item"])==null?void 0:_.call(a)]}})]}),V.value.map((n,h)=>{var g;function _(r){r.stopPropagation(),r.preventDefault(),w(n)}const o={"onClick:close":_,modelValue:!0,"onUpdate:modelValue":void 0};return u("div",{key:n.value,class:"v-autocomplete__selection"},[l?a.chip?u(de,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:n.title}}},{default:()=>{var r;return[(r=a.chip)==null?void 0:r.call(a,{item:n,index:h,props:o})]}}):u(ve,b({key:"chip",closable:e.closableChips,size:"small",text:n.title},o),null):((g=a.selection)==null?void 0:g.call(a,{item:n,index:h}))??u("span",{class:"v-autocomplete__selection-text"},[n.title,e.multiple&&h<V.value.length-1&&u("span",{class:"v-autocomplete__selection-comma"},[fe(",")])])])})])})}),me({isFocused:m,isPristine:f,menu:s,search:i,filteredItems:P,select:w},I)}});export{Ve as V};
//# sourceMappingURL=VAutocomplete-eb9e8695.js.map