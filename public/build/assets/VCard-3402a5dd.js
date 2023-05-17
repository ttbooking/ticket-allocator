import{q as g,m as y,S as w,A as f,B as n,a_ as C,p as V,I as u,N as P,a$ as I,aT as k,b0 as H,b1 as O,b2 as W,b3 as X,b4 as z,b5 as G,b6 as J,b7 as K,k as Q,W as U,b8 as Y,b9 as Z,X as ee,ba as ae,bb as te,P as ne,bc as de,bd as ie,ay as se,be as le,bf as ce,bg as re,bh as ue,c as h,_ as ve,$ as oe,bi as me,aE as be,bj as ke}from"./app-a5a060bf.js";const ge=g()({name:"VCardActions",props:y(),setup(e,i){let{slots:t}=i;return w({VBtn:{variant:"text"}}),f(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),ye=C("v-card-subtitle"),fe=C("v-card-title"),Ce=V({appendAvatar:String,appendIcon:u,prependAvatar:String,prependIcon:u,subtitle:String,title:String,...y(),...P()},"v-card-item"),pe=g()({name:"VCardItem",props:Ce(),setup(e,i){let{slots:t}=i;return f(()=>{var l;const a=!!(e.prependAvatar||e.prependIcon),v=!!(a||t.prepend),s=!!(e.appendAvatar||e.appendIcon),o=!!(s||t.append),m=!!(e.title||t.title),b=!!(e.subtitle||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[v&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(k,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},t.prepend):a&&n(I,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),n("div",{class:"v-card-item__content"},[m&&n(fe,{key:"title"},{default:()=>{var d;return[((d=t.title)==null?void 0:d.call(t))??e.title]}}),b&&n(ye,{key:"subtitle"},{default:()=>{var d;return[((d=t.subtitle)==null?void 0:d.call(t))??e.subtitle]}}),(l=t.default)==null?void 0:l.call(t)]),o&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(k,{key:"append-defaults",disabled:!s,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},t.append):s&&n(I,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])}),{}}}),Ae=C("v-card-text"),Ie=V({appendAvatar:String,appendIcon:u,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:u,ripple:{type:Boolean,default:!0},subtitle:String,text:String,title:String,...H(),...y(),...P(),...O(),...W(),...X(),...z(),...G(),...J(),...K(),...Q(),...U(),...Y({variant:"elevated"})},"v-card"),Ve=g()({name:"VCard",directives:{Ripple:Z},props:Ie(),setup(e,i){let{attrs:t,slots:a}=i;const{themeClasses:v}=ee(e),{borderClasses:s}=ae(e),{colorClasses:o,colorStyles:m,variantClasses:b}=te(e),{densityClasses:l}=ne(e),{dimensionStyles:d}=de(e),{elevationClasses:S}=ie(e),{loaderClasses:x}=se(e),{locationStyles:T}=le(e),{positionClasses:_}=ce(e),{roundedClasses:B}=re(e),c=ue(e,t),D=h(()=>e.link!==!1&&c.isLink.value),r=h(()=>!e.disabled&&e.link!==!1&&(e.link||c.isClickable.value));return f(()=>{const L=D.value?"a":e.tag,R=!!(a.title||e.title),E=!!(a.subtitle||e.subtitle),$=R||E,F=!!(a.append||e.appendAvatar||e.appendIcon),M=!!(a.prepend||e.prependAvatar||e.prependIcon),N=!!(a.image||e.image),j=$||M||F,q=!!(a.text||e.text);return ve(n(L,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":r.value},v.value,s.value,o.value,l.value,S.value,x.value,_.value,B.value,b.value,e.class],style:[m.value,d.value,T.value,e.style],href:c.href.value,onClick:r.value&&c.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var p;return[N&&n("div",{key:"image",class:"v-card__image"},[a.image?n(k,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(me,{key:"image-img",cover:!0,src:e.image},null)]),n(be,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),j&&n(pe,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),q&&n(Ae,{key:"text"},{default:()=>{var A;return[((A=a.text)==null?void 0:A.call(a))??e.text]}}),(p=a.default)==null?void 0:p.call(a),a.actions&&n(ge,null,{default:a.actions}),ke(r.value,"v-card")]}}),[[oe("ripple"),r.value&&e.ripple]])}),{}}});export{Ve as V,Ae as a,fe as b,ge as c};
//# sourceMappingURL=VCard-3402a5dd.js.map