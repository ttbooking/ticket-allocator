import{g as l,m as s,R as J,j as c,i as n,p as y,a as V,aD as m,N as x,F as p,G as P,E as C,aE as K,aF as Q,aG as U,aH as W,aI as q,aJ as z,aK as X,aL as Y,b as Z,aM as $,aN as ee,c as ae,aO as te,aP as ne,O as de,aQ as ie,aR as le,A as se,aS as ce,aT as re,aU as ue,aV as oe,f as S,l as ve,n as me,L as ye,aW as be}from"./app-D_g1cNYY.js";import{c as ge,b as h,d as ke}from"./scopeId-CcGBhUhb.js";const fe=l()({name:"VCardActions",props:s(),setup(e,d){let{slots:t}=d;return J({VBtn:{slim:!0,variant:"text"}}),c(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),Ce=y({opacity:[Number,String],...s(),...V()},"VCardSubtitle"),Ve=l()({name:"VCardSubtitle",props:Ce(),setup(e,d){let{slots:t}=d;return c(()=>n(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},t)),{}}}),Ie=ge("v-card-title"),Ae=y({appendAvatar:String,appendIcon:m,prependAvatar:String,prependIcon:m,subtitle:[String,Number],title:[String,Number],...s(),...x()},"VCardItem"),pe=l()({name:"VCardItem",props:Ae(),setup(e,d){let{slots:t}=d;return c(()=>{var u;const a=!!(e.prependAvatar||e.prependIcon),b=!!(a||t.prepend),r=!!(e.appendAvatar||e.appendIcon),g=!!(r||t.append),k=!!(e.title!=null||t.title),f=!!(e.subtitle!=null||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[b&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(C,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):n(p,null,[e.prependAvatar&&n(h,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&n(P,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),n("div",{class:"v-card-item__content"},[k&&n(Ie,{key:"title"},{default:()=>{var i;return[((i=t.title)==null?void 0:i.call(t))??e.title]}}),f&&n(Ve,{key:"subtitle"},{default:()=>{var i;return[((i=t.subtitle)==null?void 0:i.call(t))??e.subtitle]}}),(u=t.default)==null?void 0:u.call(t)]),g&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(C,{key:"append-defaults",disabled:!r,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):n(p,null,[e.appendIcon&&n(P,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&n(h,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),Pe=y({opacity:[Number,String],...s(),...V()},"VCardText"),Se=l()({name:"VCardText",props:Pe(),setup(e,d){let{slots:t}=d;return c(()=>n(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},t)),{}}}),he=y({appendAvatar:String,appendIcon:m,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:m,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...K(),...s(),...x(),...Q(),...U(),...W(),...q(),...z(),...X(),...Y(),...V(),...Z(),...$({variant:"elevated"})},"VCard"),Le=l()({name:"VCard",directives:{Ripple:ee},props:he(),setup(e,d){let{attrs:t,slots:a}=d;const{themeClasses:b}=ae(e),{borderClasses:r}=te(e),{colorClasses:g,colorStyles:k,variantClasses:f}=ne(e),{densityClasses:u}=de(e),{dimensionStyles:i}=ie(e),{elevationClasses:T}=le(e),{loaderClasses:L}=se(e),{locationStyles:N}=ce(e),{positionClasses:D}=re(e),{roundedClasses:B}=ue(e),o=oe(e,t),_=S(()=>e.link!==!1&&o.isLink.value),v=S(()=>!e.disabled&&e.link!==!1&&(e.link||o.isClickable.value));return c(()=>{const R=_.value?"a":e.tag,F=!!(a.title||e.title!=null),E=!!(a.subtitle||e.subtitle!=null),O=F||E,M=!!(a.append||e.appendAvatar||e.appendIcon),j=!!(a.prepend||e.prependAvatar||e.prependIcon),G=!!(a.image||e.image),H=O||j||M,w=!!(a.text||e.text!=null);return ve(n(R,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":v.value},b.value,r.value,g.value,u.value,T.value,L.value,D.value,B.value,f.value,e.class],style:[k.value,i.value,N.value,e.style],href:o.href.value,onClick:v.value&&o.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var I;return[G&&n("div",{key:"image",class:"v-card__image"},[a.image?n(C,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(ke,{key:"image-img",cover:!0,src:e.image},null)]),n(ye,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),H&&n(pe,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),w&&n(Se,{key:"text"},{default:()=>{var A;return[((A=a.text)==null?void 0:A.call(a))??e.text]}}),(I=a.default)==null?void 0:I.call(a),a.actions&&n(fe,null,{default:a.actions}),be(v.value,"v-card")]}}),[[me("ripple"),v.value&&e.ripple]])}),{}}});export{Le as V,Se as a,Ie as b,fe as c};
//# sourceMappingURL=VCard-Dh3sYQmD.js.map