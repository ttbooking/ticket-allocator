import{p as v,aA as y,m as A,bo as F,t as g,aD as I,aE as B,c as D,x as R,aF as _,aG as t,b1 as o,y as a,z as c}from"./app-b32095c1.js";const $=v({...y(),...A(F(),["inline"])},"VCheckbox"),N=g()({name:"VCheckbox",inheritAttrs:!1,props:$(),emits:{"update:focused":e=>!0},setup(e,r){let{attrs:n,slots:s}=r;const{isFocused:u,focus:i,blur:l}=I(e),d=B(),b=D(()=>e.id||`checkbox-${d}`);return R(()=>{const[p,k]=_(n),[m,z]=t.filterProps(e),[x,E]=o.filterProps(e);return a(t,c({class:["v-checkbox",e.class]},p,m,{id:b.value,focused:u.value,style:e.style}),{...s,default:h=>{let{id:V,messagesId:f,isDisabled:C,isReadonly:P}=h;return a(o,c(x,{id:V.value,"aria-describedby":f.value,disabled:C.value,readonly:P.value},k,{onFocus:i,onBlur:l}),s)}})}),{}}});export{N as V};
//# sourceMappingURL=VCheckbox-f0b1d3e0.js.map