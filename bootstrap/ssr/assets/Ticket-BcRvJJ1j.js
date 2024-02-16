import { defineComponent, computed, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { V as VBtn } from "../ssr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
  __name: "Ticket",
  __ssrInlineRender: true,
  props: {
    ticket: {}
  },
  setup(__props) {
    const props = __props;
    const config = computed(() => usePage().props.options);
    const animation = computed(() => ({
      delay: -props.ticket.weight + "s",
      duration: config.value.weight_threshold + "s"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--7fb58917": _ctx.ticket.weight,
        "--453e1654": animation.value.delay,
        "--6e8bed61": animation.value.duration
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ticket-wrapper relative d-inline-block" }, _attrs, _cssVars))} data-v-08e17c6c>`);
      _push(ssrRenderComponent(VBtn, {
        size: "small",
        width: "100",
        class: "ticket text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.ticket.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.ticket.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Trans/Ticket.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TransTicket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08e17c6c"]]);
export {
  TransTicket as default
};
//# sourceMappingURL=Ticket-BcRvJJ1j.js.map
