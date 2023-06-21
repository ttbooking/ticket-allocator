import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, TransitionGroup, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { a as _sfc_main$1, _ as _export_sfc } from "./Default-3c8b7f90.js";
import { Head } from "@inertiajs/vue3";
import { shuffle } from "lodash";
import { Z as VTable, V as VBtn } from "../ssr.js";
import "laravel-vue-i18n";
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
    const items = ref(["Lorem", "ipsum", "dolor", "sit", "amet", "bitch"]);
    function doit() {
      items.value = shuffle(items.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Trans" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-585f58dc${_scopeId}>Trans</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, "Trans")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-585f58dc${_scopeId}>`);
            _push2(ssrRenderComponent(VTable, { density: "compact" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tbody data-v-585f58dc${_scopeId2}><!--[-->`);
                  ssrRenderList(items.value, (item) => {
                    _push3(`<tr data-v-585f58dc${_scopeId2}><td data-v-585f58dc${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      size: "small",
                      width: "100"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(item)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(item), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("tbody", null, [
                      createVNode(TransitionGroup, { name: "list" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                            return openBlock(), createBlock("tr", { key: item }, [
                              createVNode("td", null, [
                                createVNode(VBtn, {
                                  size: "small",
                                  width: "100"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              color: "primary",
              onClick: doit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Shuffle`);
                } else {
                  return [
                    createTextVNode("Shuffle")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(VTable, { density: "compact" }, {
                  default: withCtx(() => [
                    createVNode("tbody", null, [
                      createVNode(TransitionGroup, { name: "list" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                            return openBlock(), createBlock("tr", { key: item }, [
                              createVNode("td", null, [
                                createVNode(VBtn, {
                                  size: "small",
                                  width: "100"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VBtn, {
                  color: "primary",
                  onClick: doit
                }, {
                  default: withCtx(() => [
                    createTextVNode("Shuffle")
                  ]),
                  _: 1
                })
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
const Trans_vue_vue_type_style_index_0_scoped_585f58dc_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Trans.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Trans = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-585f58dc"]]);
export {
  Trans as default
};
//# sourceMappingURL=Trans-d5fb3f02.js.map
