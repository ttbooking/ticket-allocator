import{g as v,bU as S,bn as m,bJ as g,p,bQ as x,M as T,bR as w}from"./app-7uE_ZyWH.js";const $=p({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function r(s,o,i){return v()({name:s,props:$({mode:i,origin:o}),setup(n,a){let{slots:l}=a;const t={onBeforeEnter(e){n.origin&&(e.style.transformOrigin=n.origin)},onLeave(e){if(n.leaveAbsolute){const{offsetTop:f,offsetLeft:d,offsetWidth:c,offsetHeight:u}=e;e._transitionInitialStyles={position:e.style.position,top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},e.style.position="absolute",e.style.top=`${f}px`,e.style.left=`${d}px`,e.style.width=`${c}px`,e.style.height=`${u}px`}n.hideOnLeave&&e.style.setProperty("display","none","important")},onAfterLeave(e){if(n.leaveAbsolute&&(e!=null&&e._transitionInitialStyles)){const{position:f,top:d,left:c,width:u,height:y}=e._transitionInitialStyles;delete e._transitionInitialStyles,e.style.position=f||"",e.style.top=d||"",e.style.left=c||"",e.style.width=u||"",e.style.height=y||""}}};return()=>{const e=n.group?S:m;return g(e,{name:n.disabled?"":s,css:!n.disabled,...n.group?void 0:{mode:n.mode},...n.disabled?{}:t},l.default)}}})}function b(s,o){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return v()({name:s,props:{mode:{type:String,default:i},disabled:Boolean},setup(n,a){let{slots:l}=a;return()=>g(m,{name:n.disabled?"":s,css:!n.disabled,...n.disabled?{}:o},l.default)}})}function h(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const i=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",n=x(`offset-${i}`);return{onBeforeEnter(t){t._parent=t.parentNode,t._initialStyle={transition:t.style.transition,overflow:t.style.overflow,[i]:t.style[i]}},onEnter(t){const e=t._initialStyle;t.style.setProperty("transition","none","important"),t.style.overflow="hidden";const f=`${t[n]}px`;t.style[i]="0",t.offsetHeight,t.style.transition=e.transition,s&&t._parent&&t._parent.classList.add(s),requestAnimationFrame(()=>{t.style[i]=f})},onAfterEnter:l,onEnterCancelled:l,onLeave(t){t._initialStyle={transition:"",overflow:t.style.overflow,[i]:t.style[i]},t.style.overflow="hidden",t.style[i]=`${t[n]}px`,t.offsetHeight,requestAnimationFrame(()=>t.style[i]="0")},onAfterLeave:a,onLeaveCancelled:a};function a(t){s&&t._parent&&t._parent.classList.remove(s),l(t)}function l(t){const e=t._initialStyle[i];t.style.overflow=t._initialStyle.overflow,e!=null&&(t.style[i]=e),delete t._initialStyle}}r("fab-transition","center center","out-in");r("dialog-bottom-transition");r("dialog-top-transition");const L=r("fade-transition"),A=r("scale-transition");r("scroll-x-transition");r("scroll-x-reverse-transition");r("scroll-y-transition");r("scroll-y-reverse-transition");r("slide-x-transition");r("slide-x-reverse-transition");const B=r("slide-y-transition");r("slide-y-reverse-transition");const O=b("expand-transition",h()),C=b("expand-x-transition",h("",!0)),V=p({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:s=>s!==!0}},"transition"),j=(s,o)=>{let{slots:i}=o;const{transition:n,disabled:a,...l}=s,{component:t=m,...e}=typeof n=="object"?n:{};return g(t,T(typeof n=="string"?{name:a?"":n}:e,l,{disabled:a}),i)};function I(s,o){if(!w)return;const i=o.modifiers||{},n=o.value,{handler:a,options:l}=typeof n=="object"?n:{handler:n,options:{}},t=new IntersectionObserver(function(){var u;let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],f=arguments.length>1?arguments[1]:void 0;const d=(u=s._observe)==null?void 0:u[o.instance.$.uid];if(!d)return;const c=e.some(y=>y.isIntersecting);a&&(!i.quiet||d.init)&&(!i.once||c||d.init)&&a(c,e,f),c&&i.once?_(s,o):d.init=!0},l);s._observe=Object(s._observe),s._observe[o.instance.$.uid]={init:!1,observer:t},t.observe(s)}function _(s,o){var n;const i=(n=s._observe)==null?void 0:n[o.instance.$.uid];i&&(i.observer.unobserve(s),delete s._observe[o.instance.$.uid])}const P={mounted:I,unmounted:_},F=P;export{F as I,j as M,L as V,A as a,O as b,C as c,B as d,V as m};
//# sourceMappingURL=VGrid-P-fm9w4X.js.map