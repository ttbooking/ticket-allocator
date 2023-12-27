import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import TransPool from "./Pool-rb4j_n-2.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-yVxbj29m.js";
import "./TransitionGroup-cXlS0d3y.js";
import "@vue/shared";
import "./Ticket-eNN20L4D.js";
import "@inertiajs/vue3";
import "../ssr.js";
import "dayjs";
import "dayjs/locale/ru.js";
import "dayjs/plugin/duration.js";
import "dayjs/plugin/localizedFormat.js";
import "dayjs/plugin/relativeTime.js";
import "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Operator",
  __ssrInlineRender: true,
  props: {
    operator: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--bc734de2": _ctx.operator.priority
      } };
      _push(`<tr${ssrRenderAttrs(mergeProps({
        key: _ctx.operator.id,
        class: "operator relative"
      }, _attrs, _cssVars))} data-v-bfa4e535><th data-v-bfa4e535>${ssrInterpolate(_ctx.operator.name)}</th>`);
      _push(ssrRenderComponent(TransPool, {
        tickets: _ctx.operator.tickets
      }, null, _parent));
      _push(`</tr>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Trans/Operator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TransOperator = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bfa4e535"]]);
export {
  TransOperator as default
};
//# sourceMappingURL=Operator-xlusJRXq.js.map