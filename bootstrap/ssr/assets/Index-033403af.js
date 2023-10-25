import { defineComponent, computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, A } from "./Default-ce9e1837.js";
import { Head, Link } from "@inertiajs/vue3";
import { trans } from "laravel-vue-i18n";
import { V as VToolbar, a as VToolbarTitle, b as VSpacer } from "./VSpacer-feb422e7.js";
import { a6 as VDivider, V as VBtn, a8 as VCheckboxBtn } from "../ssr.js";
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
    teams: {}
  },
  setup(__props) {
    const headers = computed(() => [
      { title: trans("active"), key: "active", sortable: false },
      { title: trans("name"), key: "name" },
      { title: trans("description"), key: "description" },
      { title: trans("weight"), key: "weight" },
      { title: trans("actions"), key: "actions", sortable: false }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_data_table = resolveComponent("v-data-table");
      const _component_v_btn_ex = resolveComponent("v-btn-ex");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("operator_teams")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("operator_teams"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t("operator_teams")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_data_table, {
              headers: headers.value,
              items: _ctx.teams
            }, {
              top: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VToolbar, { flat: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VToolbarTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("operator_teams"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("operator_teams")), 1)
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
                        _push4(ssrRenderComponent(VBtn, {
                          to: unref(A)("ticket-allocator.teams.create"),
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("new_team"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("new_team")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VToolbarTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("operator_teams")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VDivider, {
                            class: "mx-4",
                            inset: "",
                            vertical: ""
                          }),
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            to: unref(A)("ticket-allocator.teams.create"),
                            color: "primary",
                            dark: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("new_team")), 1)
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
                            createTextVNode(toDisplayString(_ctx.$t("operator_teams")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, {
                          class: "mx-4",
                          inset: "",
                          vertical: ""
                        }),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          to: unref(A)("ticket-allocator.teams.create"),
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("new_team")), 1)
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              [`item.active`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    as: "span",
                    href: unref(A)("ticket-allocator.teams.update", item.uuid),
                    method: "patch",
                    data: { active: !!item.deleted_at }
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCheckboxBtn, {
                          "model-value": !item.deleted_at
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCheckboxBtn, {
                            "model-value": !item.deleted_at
                          }, null, 8, ["model-value"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      as: "span",
                      href: unref(A)("ticket-allocator.teams.update", item.uuid),
                      method: "patch",
                      data: { active: !!item.deleted_at }
                    }, {
                      default: withCtx(() => [
                        createVNode(VCheckboxBtn, {
                          "model-value": !item.deleted_at
                        }, null, 8, ["model-value"])
                      ]),
                      _: 2
                    }, 1032, ["href", "data"])
                  ];
                }
              }),
              [`item.actions`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    to: unref(A)("ticket-allocator.teams.edit", item.uuid),
                    icon: "mdi-pencil",
                    title: _ctx.$t("edit"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn_ex, {
                    to: unref(A)("ticket-allocator.teams.destroy", item.uuid),
                    method: "delete",
                    icon: "mdi-delete",
                    title: _ctx.$t("remove"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      to: unref(A)("ticket-allocator.teams.edit", item.uuid),
                      icon: "mdi-pencil",
                      title: _ctx.$t("edit"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.teams.destroy", item.uuid),
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
                  items: _ctx.teams
                }, {
                  top: withCtx(() => [
                    createVNode(VToolbar, { flat: "" }, {
                      default: withCtx(() => [
                        createVNode(VToolbarTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("operator_teams")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, {
                          class: "mx-4",
                          inset: "",
                          vertical: ""
                        }),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          to: unref(A)("ticket-allocator.teams.create"),
                          color: "primary",
                          dark: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("new_team")), 1)
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    })
                  ]),
                  [`item.active`]: withCtx(({ item }) => [
                    createVNode(unref(Link), {
                      as: "span",
                      href: unref(A)("ticket-allocator.teams.update", item.uuid),
                      method: "patch",
                      data: { active: !!item.deleted_at }
                    }, {
                      default: withCtx(() => [
                        createVNode(VCheckboxBtn, {
                          "model-value": !item.deleted_at
                        }, null, 8, ["model-value"])
                      ]),
                      _: 2
                    }, 1032, ["href", "data"])
                  ]),
                  [`item.actions`]: withCtx(({ item }) => [
                    createVNode(VBtn, {
                      to: unref(A)("ticket-allocator.teams.edit", item.uuid),
                      icon: "mdi-pencil",
                      title: _ctx.$t("edit"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.teams.destroy", item.uuid),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/OperatorTeam/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-033403af.js.map
