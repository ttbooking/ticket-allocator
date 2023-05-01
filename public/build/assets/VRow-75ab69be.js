import{k as u,m as f,G as d,l as G,q as O,by as c,bz as g,c as N,bA as j}from"./app-5fee423d.js";const x=u()({name:"VContainer",props:{fluid:{type:Boolean,default:!1},...f(),...d()},setup(e,a){let{slots:t}=a;return G(()=>O(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},e.class],style:e.style},t)),{}}}),k=(()=>c.reduce((e,a)=>(e[a]={type:[Boolean,String,Number],default:!1},e),{}))(),v=(()=>c.reduce((e,a)=>{const t="offset"+g(a);return e[t]={type:[String,Number],default:null},e},{}))(),V=(()=>c.reduce((e,a)=>{const t="order"+g(a);return e[t]={type:[String,Number],default:null},e},{}))(),C={col:Object.keys(k),offset:Object.keys(v),order:Object.keys(V)};function _(e,a,t){let l=e;if(!(t==null||t===!1)){if(a){const n=a.replace(e,"");l+=`-${n}`}return e==="col"&&(l="v-"+l),e==="col"&&(t===""||t===!0)||(l+=`-${t}`),l.toLowerCase()}}const B=["auto","start","end","center","baseline","stretch"],z=u()({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...k,offset:{type:[String,Number],default:null},...v,order:{type:[String,Number],default:null},...V,alignSelf:{type:String,default:null,validator:e=>B.includes(e)},...f(),...d()},setup(e,a){let{slots:t}=a;const l=N(()=>{const n=[];let s;for(s in C)C[s].forEach(o=>{const i=e[o],m=_(s,o,i);m&&n.push(m)});const r=n.some(o=>o.startsWith("v-col-"));return n.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),n});return()=>{var n;return j(e.tag,{class:[l.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}}),y=["start","end","center"],L=["space-between","space-around","space-evenly"];function b(e,a){return c.reduce((t,l)=>{const n=e+g(l);return t[n]=a(),t},{})}const I=[...y,"baseline","stretch"],$=e=>I.includes(e),h=b("align",()=>({type:String,default:null,validator:$})),T=[...y,...L],w=e=>T.includes(e),A=b("justify",()=>({type:String,default:null,validator:w})),U=[...y,...L,"stretch"],E=e=>U.includes(e),P=b("alignContent",()=>({type:String,default:null,validator:E})),S={align:Object.keys(h),justify:Object.keys(A),alignContent:Object.keys(P)},M={align:"align",justify:"justify",alignContent:"align-content"};function R(e,a,t){let l=M[e];if(t!=null){if(a){const n=a.replace(e,"");l+=`-${n}`}return l+=`-${t}`,l.toLowerCase()}}const F=u()({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:$},...h,justify:{type:String,default:null,validator:w},...A,alignContent:{type:String,default:null,validator:E},...P,...f(),...d()},setup(e,a){let{slots:t}=a;const l=N(()=>{const n=[];let s;for(s in S)S[s].forEach(r=>{const o=e[r],i=R(s,r,o);i&&n.push(i)});return n.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),n});return()=>{var n;return j(e.tag,{class:["v-row",l.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}});export{x as V,F as a,z as b};
//# sourceMappingURL=VRow-75ab69be.js.map