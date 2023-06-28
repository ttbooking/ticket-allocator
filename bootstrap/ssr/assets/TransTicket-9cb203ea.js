import { defineComponent, computed, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { V as VBtn } from "../ssr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "dayjs";
import "dayjs/locale/ru.js";
import "dayjs/plugin/duration.js";
import "dayjs/plugin/localizedFormat.js";
import "dayjs/plugin/relativeTime.js";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "laravel-vue-i18n";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TransTicket",
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
        "--16f90713": _ctx.ticket.weight,
        "--9c86385c": animation.value.delay,
        "--36186636": animation.value.duration
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ticket-wrapper relative d-inline-block" }, _attrs, _cssVars))} data-v-86e4e5b6>`);
      _push(ssrRenderComponent(VBtn, {
        size: "small",
        width: "100",
        class: "ticket text-white mr-1 mb-1"
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
const TransTicket_vue_vue_type_style_index_0_scoped_86e4e5b6_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/TransTicket.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TransTicket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86e4e5b6"]]);
export {
  TransTicket as default
};
//# sourceMappingURL=TransTicket-9cb203ea.js.map
