import { createVNode } from "vue";
import "./VRow-61fd8c3c.mjs";
import { p as propsFactory, m as makeComponentProps, a as makeTagProps, g as genericComponent, u as useRtl, h as useRender } from "../ssr.mjs";
const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "v-container");
const VContainer = genericComponent()({
  name: "VContainer",
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    useRender(() => createVNode(props.tag, {
      "class": ["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class],
      "style": props.style
    }, slots));
    return {};
  }
});
export {
  VContainer as V
};
//# sourceMappingURL=VContainer-5952512f.mjs.map
