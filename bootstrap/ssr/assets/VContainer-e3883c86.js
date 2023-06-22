import { createVNode } from "vue";
import "./VRow-2e46a7f0.js";
import { p as propsFactory, m as makeComponentProps, a as makeTagProps, g as genericComponent, u as useRtl, f as useRender } from "../ssr.js";
const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VContainer");
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
//# sourceMappingURL=VContainer-e3883c86.js.map
