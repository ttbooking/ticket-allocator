import{q as N,bg as x,H as y,t as T,l as V,m as a,z as H,B as I,F as E,y as R,bh as D,bi as F,L as w,P as U,U as $,K as j,r as q,h,p as z,Z as K,x as u,aY as o,bj as L}from"./app-b844f399.js";const M=N("flex-grow-1","div","VSpacer");const Y=x({text:String,...y()},"v-toolbar-title"),Z=T()({name:"VToolbarTitle",props:Y(),setup(e,n){let{slots:t}=n;return V(()=>{const i=!!(t.default||t.text||e.text);return a(e.tag,{class:"v-toolbar-title"},{default:()=>{var l;return[i&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(l=t.default)==null?void 0:l.call(t)])]}})}),{}}}),A=[null,"prominent","default","comfortable","compact"],G=x({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>A.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...H(),...I(),...E(),...y({tag:"header"}),...R()},"v-toolbar"),O=T()({name:"VToolbar",props:G(),setup(e,n){var c;let{slots:t}=n;const{backgroundColorClasses:i,backgroundColorStyles:l}=D(F(e,"color")),{borderClasses:k}=w(e),{elevationClasses:_}=U(e),{roundedClasses:S}=$(e),{themeClasses:B}=j(e),s=q(!!(e.extended||(c=t.extension)!=null&&c.call(t))),r=h(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),d=h(()=>s.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return z({VBtn:{variant:"text"}}),V(()=>{var g;const C=!!(e.title||t.title),P=!!(t.image||e.image),m=(g=t.extension)==null?void 0:g.call(t);return s.value=!!(e.extended||m),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},i.value,k.value,_.value,S.value,B.value],style:[l.value]},{default:()=>[P&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(u,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(K,{key:"image-img",cover:!0,src:e.image},null)]),a(u,{defaults:{VTabs:{height:o(r.value)}}},{default:()=>{var v,b,f;return[a("div",{class:"v-toolbar__content",style:{height:o(r.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(v=t.prepend)==null?void 0:v.call(t)]),C&&a(Z,{key:"title",text:e.title},{text:t.title}),(b=t.default)==null?void 0:b.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(f=t.append)==null?void 0:f.call(t)])])]}}),a(u,{defaults:{VTabs:{height:o(d.value)}}},{default:()=>[a(L,null,{default:()=>[s.value&&a("div",{class:"v-toolbar__extension",style:{height:o(d.value)}},[m])]})]})]})}),{contentHeight:r,extensionHeight:d}}});export{O as V,Z as a,M as b};
//# sourceMappingURL=VToolbar-0787f4dc.js.map