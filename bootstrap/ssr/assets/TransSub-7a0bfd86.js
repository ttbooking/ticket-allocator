import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import TransTicket from "./TransTicket-9cb203ea.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "@inertiajs/vue3";
import "../ssr.js";
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
  __name: "TransSub",
  __ssrInlineRender: true,
  props: {
    tickets: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<td${ssrRenderAttrs(mergeProps({ name: "tickets" }, _attrs))}>`);
      ssrRenderList(_ctx.tickets, (ticket) => {
        _push(ssrRenderComponent(TransTicket, {
          key: ticket.id,
          ticket
        }, null, _parent));
      });
      _push(`</td>`);
    };
  }
});
const TransSub_vue_vue_type_style_index_0_scoped_6ae2e2b5_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/TransSub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TransSub = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6ae2e2b5"]]);
export {
  TransSub as default
};
//# sourceMappingURL=TransSub-7a0bfd86.js.map
