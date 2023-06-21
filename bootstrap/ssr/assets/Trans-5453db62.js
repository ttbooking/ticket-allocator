import { defineComponent, ref, unref, withCtx, createVNode, TransitionGroup, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { a as _sfc_main$1, _ as _export_sfc } from "./Default-3c8b7f90.js";
import { Head } from "@inertiajs/vue3";
import { shuffle } from "lodash";
import "laravel-vue-i18n";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Trans",
  __ssrInlineRender: true,
  setup(__props) {
    const items = ref(["a", "b", "c", "d", "e", "f"]);
    function doit() {
      items.value = shuffle(items.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Trans" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-1c54e736${_scopeId}>Trans</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, "Trans")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-1c54e736${_scopeId}><ul${ssrRenderAttrs({ name: "list" })}>`);
            ssrRenderList(items.value, (item) => {
              _push2(`<li data-v-1c54e736${_scopeId}>${ssrInterpolate(item)}</li>`);
            });
            _push2(`</ul><button data-v-1c54e736${_scopeId}>Shuffle</button></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(TransitionGroup, {
                  name: "list",
                  tag: "ul"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                      return openBlock(), createBlock("li", { key: item }, toDisplayString(item), 1);
                    }), 128))
                  ]),
                  _: 1
                }),
                createVNode("button", { onClick: doit }, "Shuffle")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const Trans_vue_vue_type_style_index_0_scoped_1c54e736_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Trans.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Trans = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c54e736"]]);
export {
  Trans as default
};
//# sourceMappingURL=Trans-5453db62.js.map
