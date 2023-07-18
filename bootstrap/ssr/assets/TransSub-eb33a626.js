import { defineComponent, unref, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { T as TransitionGroup } from "./TransitionGroup-34a587b3.js";
import TransTicket from "./TransTicket-ea6b7d20.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "@vue/shared";
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
      _push(ssrRenderComponent(unref(TransitionGroup), mergeProps({
        tag: "td",
        name: "tickets",
        class: "@container pt-1"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.tickets, (ticket) => {
              _push2(ssrRenderComponent(TransTicket, {
                key: ticket.id,
                ticket,
                class: "mr-1 mb-1"
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tickets, (ticket) => {
                return openBlock(), createBlock(TransTicket, {
                  key: ticket.id,
                  ticket,
                  class: "mr-1 mb-1"
                }, null, 8, ["ticket"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const TransSub_vue_vue_type_style_index_0_scoped_251d2a82_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/TransSub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TransSub = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-251d2a82"]]);
export {
  TransSub as default
};
//# sourceMappingURL=TransSub-eb33a626.js.map
