import { defineComponent, resolveComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { a as _sfc_main$1, A } from "./Default-55181f12.mjs";
import { Head, Link } from "@inertiajs/vue3";
import { trans } from "laravel-vue-i18n";
import { V as VToolbar, a as VToolbarTitle, b as VSpacer } from "./VToolbar-d5d671ba.mjs";
import { a4 as VDivider, q as VBtn } from "../ssr.mjs";
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
    const headers = [
      { title: trans("name"), key: "name" },
      { title: trans("tickets"), key: "ticket_limit" },
      { title: trans("complexity"), key: "complexity_limit" },
      { title: trans("actions"), key: "actions", sortable: false }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_data_table = resolveComponent("v-data-table");
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
              headers,
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
                        _push4(ssrRenderComponent(unref(Link), {
                          as: "span",
                          href: unref(A)("ticket-allocator.operators.discover"),
                          method: "put"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                dark: ""
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(_ctx.$t("discover"))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  color: "primary",
                                  dark: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Link), {
                          href: unref(A)("ticket-allocator.operators.create")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                dark: ""
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(_ctx.$t("new_operator"))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  color: "primary",
                                  dark: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                                  ]),
                                  _: 1
                                })
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
                          createVNode(unref(Link), {
                            as: "span",
                            href: unref(A)("ticket-allocator.operators.discover"),
                            method: "put"
                          }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "primary",
                                dark: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: unref(A)("ticket-allocator.operators.create")
                          }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "primary",
                                dark: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["href"])
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
                        createVNode(unref(Link), {
                          as: "span",
                          href: unref(A)("ticket-allocator.operators.discover"),
                          method: "put"
                        }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "primary",
                              dark: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: unref(A)("ticket-allocator.operators.create")
                        }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "primary",
                              dark: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["href"])
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
                  _push3(ssrRenderComponent(unref(Link), {
                    href: unref(A)("ticket-allocator.operators.edit", item.raw.uuid)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "mdi-pencil",
                          title: _ctx.$t("edit"),
                          size: "small",
                          variant: "plain"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            icon: "mdi-pencil",
                            title: _ctx.$t("edit"),
                            size: "small",
                            variant: "plain"
                          }, null, 8, ["title"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Link), {
                    as: "span",
                    href: unref(A)("ticket-allocator.operators.destroy", item.raw.uuid),
                    method: "delete"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "mdi-delete",
                          title: _ctx.$t("remove"),
                          size: "small",
                          variant: "plain"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            icon: "mdi-delete",
                            title: _ctx.$t("remove"),
                            size: "small",
                            variant: "plain"
                          }, null, 8, ["title"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: unref(A)("ticket-allocator.operators.edit", item.raw.uuid)
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          icon: "mdi-pencil",
                          title: _ctx.$t("edit"),
                          size: "small",
                          variant: "plain"
                        }, null, 8, ["title"])
                      ]),
                      _: 2
                    }, 1032, ["href"]),
                    createVNode(unref(Link), {
                      as: "span",
                      href: unref(A)("ticket-allocator.operators.destroy", item.raw.uuid),
                      method: "delete"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          icon: "mdi-delete",
                          title: _ctx.$t("remove"),
                          size: "small",
                          variant: "plain"
                        }, null, 8, ["title"])
                      ]),
                      _: 2
                    }, 1032, ["href"])
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
                  headers,
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
                        createVNode(unref(Link), {
                          as: "span",
                          href: unref(A)("ticket-allocator.operators.discover"),
                          method: "put"
                        }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "primary",
                              dark: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("discover")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: unref(A)("ticket-allocator.operators.create")
                        }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "primary",
                              dark: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("new_operator")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["href"])
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
                    createVNode(unref(Link), {
                      href: unref(A)("ticket-allocator.operators.edit", item.raw.uuid)
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          icon: "mdi-pencil",
                          title: _ctx.$t("edit"),
                          size: "small",
                          variant: "plain"
                        }, null, 8, ["title"])
                      ]),
                      _: 2
                    }, 1032, ["href"]),
                    createVNode(unref(Link), {
                      as: "span",
                      href: unref(A)("ticket-allocator.operators.destroy", item.raw.uuid),
                      method: "delete"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          icon: "mdi-delete",
                          title: _ctx.$t("remove"),
                          size: "small",
                          variant: "plain"
                        }, null, 8, ["title"])
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ]),
                  _: 2
                }, 1032, ["items"])
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
//# sourceMappingURL=Index-2576ba7c.mjs.map