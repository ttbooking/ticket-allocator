import{V as n,a as u}from"./VRow-39aa6869.js";import{V as p}from"./VTextarea-cf7cab67.js";import{an as V,f as g,at as f,i as e,au as a,X as v,as as x,aW as i}from"./app-74ce8b91.js";const y=V({__name:"ExpressionForm",props:{modelValue:{},errors:{}},emits:["update:modelValue"],setup(t,{emit:m}){const d=t,s=g({get(){return d.modelValue},set(l){m("update:modelValue",l)}});return(l,r)=>(x(),f(v,null,[e(n,null,{default:a(()=>[e(u,{cols:"12",md:"12"},{default:a(()=>[e(p,{modelValue:s.value.variables,"onUpdate:modelValue":r[0]||(r[0]=o=>s.value.variables=o),label:l.$t("variables"),"error-messages":l.errors.variables},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:a(()=>[e(u,{cols:"12",md:"12"},{default:a(()=>[e(i,{modelValue:s.value.expressions.initial_weight,"onUpdate:modelValue":r[1]||(r[1]=o=>s.value.expressions.initial_weight=o),label:l.$t("initial_weight_expression"),"error-messages":l.errors.initial_weight_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:a(()=>[e(u,{cols:"12",md:"12"},{default:a(()=>[e(i,{modelValue:s.value.expressions.weight_increment,"onUpdate:modelValue":r[2]||(r[2]=o=>s.value.expressions.weight_increment=o),label:l.$t("weight_increment_expression"),"error-messages":l.errors.weight_increment_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:a(()=>[e(u,{cols:"12",md:"12"},{default:a(()=>[e(i,{modelValue:s.value.expressions.complexity,"onUpdate:modelValue":r[3]||(r[3]=o=>s.value.expressions.complexity=o),label:l.$t("complexity_expression"),"error-messages":l.errors.complexity_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:a(()=>[e(u,{cols:"12",md:"12"},{default:a(()=>[e(i,{modelValue:s.value.expressions.delay,"onUpdate:modelValue":r[4]||(r[4]=o=>s.value.expressions.delay=o),label:l.$t("delay_expression"),"error-messages":l.errors.delay_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1}),e(n,null,{default:a(()=>[e(u,{cols:"12",md:"12"},{default:a(()=>[e(i,{modelValue:s.value.expressions.reservation,"onUpdate:modelValue":r[5]||(r[5]=o=>s.value.expressions.reservation=o),label:l.$t("reservation_expression"),"error-messages":l.errors.reservation_expression},null,8,["modelValue","label","error-messages"])]),_:1})]),_:1})],64))}});export{y as default};
//# sourceMappingURL=ExpressionForm-5219db31.js.map