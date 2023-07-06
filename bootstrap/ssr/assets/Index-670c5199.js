import { defineComponent, computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, A } from "./Default-480a3e0a.js";
import { Head } from "@inertiajs/vue3";
import { trans } from "laravel-vue-i18n";
import { V as VToolbar, a as VToolbarTitle, b as VSpacer } from "./VSpacer-1008763e.js";
import { a4 as VDivider, V as VBtn } from "../ssr.js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
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
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    operators: {}
  },
  setup(__props) {
    const headers = computed(() => [
      { title: trans("name"), key: "name" },
      { title: trans("tickets"), key: "ticket_limit" },
      { title: trans("complexity"), key: "complexity_limit" },
      { title: trans("actions"), key: "actions", sortable: false }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_data_table = resolveComponent("v-data-table");
      const _component_v_btn_ex = resolveComponent("v-btn-ex");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("operators")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("operators"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t("operators")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_data_table, {
              headers: headers.value,
              items: _ctx.operators
            }, {
              top: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VToolbar, { flat: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VToolbarTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("operators"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("operators")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, {
                          class: "mx-4",
                          inset: "",
                          vertical: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_btn_ex, {
                          to: unref(A)("ticket-allocator.operators.discover"),
                          method: "put",
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("discover"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          to: unref(A)("ticket-allocator.operators.create"),
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("new_operator"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VToolbarTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("operators")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VDivider, {
                            class: "mx-4",
                            inset: "",
                            vertical: ""
                          }),
                          createVNode(VSpacer),
                          createVNode(_component_v_btn_ex, {
                            to: unref(A)("ticket-allocator.operators.discover"),
                            method: "put",
                            color: "primary",
                            dark: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"]),
                          createVNode(VBtn, {
                            to: unref(A)("ticket-allocator.operators.create"),
                            color: "primary",
                            dark: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VToolbar, { flat: "" }, {
                      default: withCtx(() => [
                        createVNode(VToolbarTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("operators")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, {
                          class: "mx-4",
                          inset: "",
                          vertical: ""
                        }),
                        createVNode(VSpacer),
                        createVNode(_component_v_btn_ex, {
                          to: unref(A)("ticket-allocator.operators.discover"),
                          method: "put",
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        createVNode(VBtn, {
                          to: unref(A)("ticket-allocator.operators.create"),
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              [`item.name`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(item.raw.name ?? item.raw.user.name ?? "")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.raw.name ?? item.raw.user.name ?? ""), 1)
                  ];
                }
              }),
              [`item.ticket_limit`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(item.raw.ticket_limit ?? "∞")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.raw.ticket_limit ?? "∞"), 1)
                  ];
                }
              }),
              [`item.complexity_limit`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(item.raw.complexity_limit ?? "∞")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.raw.complexity_limit ?? "∞"), 1)
                  ];
                }
              }),
              [`item.actions`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    to: unref(A)("ticket-allocator.operators.edit", item.raw.uuid),
                    icon: "mdi-pencil",
                    title: _ctx.$t("edit"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn_ex, {
                    to: unref(A)("ticket-allocator.operators.destroy", item.raw.uuid),
                    method: "delete",
                    icon: "mdi-delete",
                    title: _ctx.$t("remove"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      to: unref(A)("ticket-allocator.operators.edit", item.raw.uuid),
                      icon: "mdi-pencil",
                      title: _ctx.$t("edit"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.operators.destroy", item.raw.uuid),
                      method: "delete",
                      icon: "mdi-delete",
                      title: _ctx.$t("remove"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_v_data_table, {
                  headers: headers.value,
                  items: _ctx.operators
                }, {
                  top: withCtx(() => [
                    createVNode(VToolbar, { flat: "" }, {
                      default: withCtx(() => [
                        createVNode(VToolbarTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("operators")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, {
                          class: "mx-4",
                          inset: "",
                          vertical: ""
                        }),
                        createVNode(VSpacer),
                        createVNode(_component_v_btn_ex, {
                          to: unref(A)("ticket-allocator.operators.discover"),
                          method: "put",
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        createVNode(VBtn, {
                          to: unref(A)("ticket-allocator.operators.create"),
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    })
                  ]),
                  [`item.name`]: withCtx(({ item }) => [
                    createTextVNode(toDisplayString(item.raw.name ?? item.raw.user.name ?? ""), 1)
                  ]),
                  [`item.ticket_limit`]: withCtx(({ item }) => [
                    createTextVNode(toDisplayString(item.raw.ticket_limit ?? "∞"), 1)
                  ]),
                  [`item.complexity_limit`]: withCtx(({ item }) => [
                    createTextVNode(toDisplayString(item.raw.complexity_limit ?? "∞"), 1)
                  ]),
                  [`item.actions`]: withCtx(({ item }) => [
                    createVNode(VBtn, {
                      to: unref(A)("ticket-allocator.operators.edit", item.raw.uuid),
                      icon: "mdi-pencil",
                      title: _ctx.$t("edit"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.operators.destroy", item.raw.uuid),
                      method: "delete",
                      icon: "mdi-delete",
                      title: _ctx.$t("remove"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"])
                  ]),
                  _: 2
                }, 1032, ["headers", "items"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Operator/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-670c5199.js.map
