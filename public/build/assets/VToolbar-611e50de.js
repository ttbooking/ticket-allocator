import{b2 as H,p as x,C as y,D as T,t as V,x as k,y as a,b4 as I,b6 as D,ba as E,Y as w,S as F,T as U,be as Y,bh as $,bk as O,Z as W,F as Z,s as j,c as h,U as q,bm as z,aY as u,W as o,bO as A}from"./app-b32095c1.js";const Q=H("flex-grow-1","div","VSpacer");const G=x({text:String,...y(),...T()},"VToolbarTitle"),J=V()({name:"VToolbarTitle",props:G(),setup(e,n){let{slots:t}=n;return k(()=>{const s=!!(t.default||t.text||e.text);return a(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var l;return[s&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(l=t.default)==null?void 0:l.call(t)])]}})}),{}}}),K=[null,"prominent","default","comfortable","compact"],L=x({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>K.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...I(),...y(),...D(),...E(),...T({tag:"header"}),...w()},"VToolbar"),X=V()({name:"VToolbar",props:L(),setup(e,n){var c;let{slots:t}=n;const{backgroundColorClasses:s,backgroundColorStyles:l}=F(U(e,"color")),{borderClasses:C}=Y(e),{elevationClasses:S}=$(e),{roundedClasses:_}=O(e),{themeClasses:B}=W(e),{rtlClasses:P}=Z(),i=j(!!(e.extended||(c=t.extension)!=null&&c.call(t))),r=h(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),d=h(()=>i.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return q({VBtn:{variant:"text"}}),k(()=>{var b;const N=!!(e.title||t.title),R=!!(t.image||e.image),m=(b=t.extension)==null?void 0:b.call(t);return i.value=!!(e.extended||m),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},s.value,C.value,S.value,_.value,B.value,P.value,e.class],style:[l.value,e.style]},{default:()=>[R&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(u,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(z,{key:"image-img",cover:!0,src:e.image},null)]),a(u,{defaults:{VTabs:{height:o(r.value)}}},{default:()=>{var g,v,f;return[a("div",{class:"v-toolbar__content",style:{height:o(r.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(g=t.prepend)==null?void 0:g.call(t)]),N&&a(J,{key:"title",text:e.title},{text:t.title}),(v=t.default)==null?void 0:v.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(f=t.append)==null?void 0:f.call(t)])])]}}),a(u,{defaults:{VTabs:{height:o(d.value)}}},{default:()=>[a(A,null,{default:()=>[i.value&&a("div",{class:"v-toolbar__extension",style:{height:o(d.value)}},[m])]})]})]})}),{contentHeight:r,extensionHeight:d}}});export{X as V,J as a,Q as b};
//# sourceMappingURL=VToolbar-611e50de.js.map