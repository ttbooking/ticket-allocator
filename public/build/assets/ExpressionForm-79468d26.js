import{V as n,a as i}from"./VRow-1bf06cd4.js";import{V as p}from"./VTextarea-87a0635e.js";import{aa as V,c as g,ad as f,ae as x,D as e,af as r,am as b,aO as t}from"./app-1d35809e.js";const y=V({__name:"ExpressionForm",props:{modelValue:{},errors:{}},emits:["update:modelValue"],setup(u,{emit:m}){const d=u,s=g({get(){return d.modelValue},set(l){m("update:modelValue",l)}});return(l,a)=>(f(),x(b,null,[e(n,null,{default:r(()=>[e(i,{cols:"12",md:"12"},{default:r(()=>[e(p,{modelValue:s.value.variables,"onUpdate:modelValue":a[0]||(a[0]=o=>s.value.variables=o),label:l.$t("variables"),"error-messages":l.errors.variables},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:r(()=>[e(i,{cols:"12",md:"12"},{default:r(()=>[e(t,{modelValue:s.value.expressions.initial_weight,"onUpdate:modelValue":a[1]||(a[1]=o=>s.value.expressions.initial_weight=o),label:l.$t("initial_weight_expression"),"error-messages":l.errors.initial_weight_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:r(()=>[e(i,{cols:"12",md:"12"},{default:r(()=>[e(t,{modelValue:s.value.expressions.weight_increment,"onUpdate:modelValue":a[2]||(a[2]=o=>s.value.expressions.weight_increment=o),label:l.$t("weight_increment_expression"),"error-messages":l.errors.weight_increment_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:r(()=>[e(i,{cols:"12",md:"12"},{default:r(()=>[e(t,{modelValue:s.value.expressions.complexity,"onUpdate:modelValue":a[3]||(a[3]=o=>s.value.expressions.complexity=o),label:l.$t("complexity_expression"),"error-messages":l.errors.complexity_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:r(()=>[e(i,{cols:"12",md:"12"},{default:r(()=>[e(t,{modelValue:s.value.expressions.delay,"onUpdate:modelValue":a[4]||(a[4]=o=>s.value.expressions.delay=o),label:l.$t("delay_expression"),"error-messages":l.errors.delay_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1})],64))}});export{y as default};
//# sourceMappingURL=ExpressionForm-79468d26.js.map