import { defineComponent, computed, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { trans } from "laravel-vue-i18n";
import { V as VRow, a as VCol } from "./VRow-37e0fd4f.mjs";
import { V as VToolbar, a as VToolbarTitle, b as VSpacer } from "./VToolbar-d5d671ba.mjs";
import { a4 as VDivider, q as VBtn, _ as VTextField } from "../ssr.mjs";
import { V as VAutocomplete } from "./VAutocomplete-3f5ad946.mjs";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AssociationForm",
  __ssrInlineRender: true,
  props: {
    entries: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const config = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const headers = [
      { title: trans("value"), key: "value" },
      { title: trans("initial_weight"), key: "initial_weight" },
      { title: trans("weight_increment"), key: "weight_increment" },
      { title: trans("complexity"), key: "complexity" },
      { title: trans("delay"), key: "delay" },
      { title: trans("actions"), key: "actions", sortable: false }
    ];
    function getEntries(uuid) {
      return props.entries.filter(
        (entry) => entry.uuid === uuid || !config.value.map((item) => item.value).includes(entry.uuid)
      );
    }
    function addEntry() {
      var _a;
      config.value.push({
        value: ((_a = getEntries()[0]) == null ? void 0 : _a.uuid) ?? "",
        initial_weight: null,
        weight_increment: null,
        complexity: null,
        delay: null
      });
    }
    function removeEntry(id) {
      config.value = config.value.filter((entry) => entry.value !== id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_data_table = resolveComponent("v-data-table");
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_data_table, {
                    headers,
                    items: config.value,
                    density: "compact"
                  }, {
                    top: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VToolbar, { flat: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VToolbarTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(_ctx.$t("entries"))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(_ctx.$t("entries")), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VDivider, {
                                class: "mx-4",
                                inset: "",
                                vertical: ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                dark: "",
                                disabled: getEntries().length === 0,
                                onClick: addEntry
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(_ctx.$t("new_entry"))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(_ctx.$t("new_entry")), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VToolbarTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("entries")), 1)
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
                                  color: "primary",
                                  dark: "",
                                  disabled: getEntries().length === 0,
                                  onClick: addEntry
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("new_entry")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VToolbar, { flat: "" }, {
                            default: withCtx(() => [
                              createVNode(VToolbarTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("entries")), 1)
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
                                color: "primary",
                                dark: "",
                                disabled: getEntries().length === 0,
                                onClick: addEntry
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("new_entry")), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    [`item.value`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: item.raw.value,
                          "onUpdate:modelValue": ($event) => item.raw.value = $event,
                          items: getEntries(item.raw.value),
                          "item-title": "name",
                          "item-value": "uuid",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: item.raw.value,
                            "onUpdate:modelValue": ($event) => item.raw.value = $event,
                            items: getEntries(item.raw.value),
                            "item-title": "name",
                            "item-value": "uuid",
                            variant: "plain",
                            density: "compact",
                            "hide-details": "auto"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    [`item.initial_weight`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: item.raw.initial_weight,
                          "onUpdate:modelValue": ($event) => item.raw.initial_weight = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "9999999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: item.raw.initial_weight,
                            "onUpdate:modelValue": ($event) => item.raw.initial_weight = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            max: "9999999",
                            placeholder: "0",
                            variant: "plain",
                            density: "compact",
                            "hide-details": "auto"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    [`item.weight_increment`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: item.raw.weight_increment,
                          "onUpdate:modelValue": ($event) => item.raw.weight_increment = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "99999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: item.raw.weight_increment,
                            "onUpdate:modelValue": ($event) => item.raw.weight_increment = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            max: "99999",
                            placeholder: "0",
                            variant: "plain",
                            density: "compact",
                            "hide-details": "auto"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    [`item.complexity`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: item.raw.complexity,
                          "onUpdate:modelValue": ($event) => item.raw.complexity = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "9999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: item.raw.complexity,
                            "onUpdate:modelValue": ($event) => item.raw.complexity = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            max: "9999",
                            placeholder: "0",
                            variant: "plain",
                            density: "compact",
                            "hide-details": "auto"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    [`item.delay`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: item.raw.delay,
                          "onUpdate:modelValue": ($event) => item.raw.delay = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "99999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: item.raw.delay,
                            "onUpdate:modelValue": ($event) => item.raw.delay = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            max: "99999",
                            placeholder: "0",
                            variant: "plain",
                            density: "compact",
                            "hide-details": "auto"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    [`item.actions`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "mdi-delete",
                          title: _ctx.$t("remove"),
                          size: "small",
                          variant: "plain",
                          onClick: ($event) => removeEntry(item.raw.value)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            icon: "mdi-delete",
                            title: _ctx.$t("remove"),
                            size: "small",
                            variant: "plain",
                            onClick: ($event) => removeEntry(item.raw.value)
                          }, null, 8, ["title", "onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_data_table, {
                      headers,
                      items: config.value,
                      density: "compact"
                    }, {
                      top: withCtx(() => [
                        createVNode(VToolbar, { flat: "" }, {
                          default: withCtx(() => [
                            createVNode(VToolbarTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("entries")), 1)
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
                              color: "primary",
                              dark: "",
                              disabled: getEntries().length === 0,
                              onClick: addEntry
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("new_entry")), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      [`item.value`]: withCtx(({ item }) => [
                        createVNode(VAutocomplete, {
                          modelValue: item.raw.value,
                          "onUpdate:modelValue": ($event) => item.raw.value = $event,
                          items: getEntries(item.raw.value),
                          "item-title": "name",
                          "item-value": "uuid",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      [`item.initial_weight`]: withCtx(({ item }) => [
                        createVNode(VTextField, {
                          modelValue: item.raw.initial_weight,
                          "onUpdate:modelValue": ($event) => item.raw.initial_weight = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "9999999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      [`item.weight_increment`]: withCtx(({ item }) => [
                        createVNode(VTextField, {
                          modelValue: item.raw.weight_increment,
                          "onUpdate:modelValue": ($event) => item.raw.weight_increment = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "99999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      [`item.complexity`]: withCtx(({ item }) => [
                        createVNode(VTextField, {
                          modelValue: item.raw.complexity,
                          "onUpdate:modelValue": ($event) => item.raw.complexity = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "9999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      [`item.delay`]: withCtx(({ item }) => [
                        createVNode(VTextField, {
                          modelValue: item.raw.delay,
                          "onUpdate:modelValue": ($event) => item.raw.delay = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "99999",
                          placeholder: "0",
                          variant: "plain",
                          density: "compact",
                          "hide-details": "auto"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      [`item.actions`]: withCtx(({ item }) => [
                        createVNode(VBtn, {
                          icon: "mdi-delete",
                          title: _ctx.$t("remove"),
                          size: "small",
                          variant: "plain",
                          onClick: ($event) => removeEntry(item.raw.value)
                        }, null, 8, ["title", "onClick"])
                      ]),
                      _: 2
                    }, 1032, ["items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, {
                cols: "12",
                md: "12"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_data_table, {
                    headers,
                    items: config.value,
                    density: "compact"
                  }, {
                    top: withCtx(() => [
                      createVNode(VToolbar, { flat: "" }, {
                        default: withCtx(() => [
                          createVNode(VToolbarTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("entries")), 1)
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
                            color: "primary",
                            dark: "",
                            disabled: getEntries().length === 0,
                            onClick: addEntry
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("new_entry")), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    [`item.value`]: withCtx(({ item }) => [
                      createVNode(VAutocomplete, {
                        modelValue: item.raw.value,
                        "onUpdate:modelValue": ($event) => item.raw.value = $event,
                        items: getEntries(item.raw.value),
                        "item-title": "name",
                        "item-value": "uuid",
                        variant: "plain",
                        density: "compact",
                        "hide-details": "auto"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    [`item.initial_weight`]: withCtx(({ item }) => [
                      createVNode(VTextField, {
                        modelValue: item.raw.initial_weight,
                        "onUpdate:modelValue": ($event) => item.raw.initial_weight = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        max: "9999999",
                        placeholder: "0",
                        variant: "plain",
                        density: "compact",
                        "hide-details": "auto"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    [`item.weight_increment`]: withCtx(({ item }) => [
                      createVNode(VTextField, {
                        modelValue: item.raw.weight_increment,
                        "onUpdate:modelValue": ($event) => item.raw.weight_increment = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        max: "99999",
                        placeholder: "0",
                        variant: "plain",
                        density: "compact",
                        "hide-details": "auto"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    [`item.complexity`]: withCtx(({ item }) => [
                      createVNode(VTextField, {
                        modelValue: item.raw.complexity,
                        "onUpdate:modelValue": ($event) => item.raw.complexity = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        max: "9999",
                        placeholder: "0",
                        variant: "plain",
                        density: "compact",
                        "hide-details": "auto"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    [`item.delay`]: withCtx(({ item }) => [
                      createVNode(VTextField, {
                        modelValue: item.raw.delay,
                        "onUpdate:modelValue": ($event) => item.raw.delay = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        max: "99999",
                        placeholder: "0",
                        variant: "plain",
                        density: "compact",
                        "hide-details": "auto"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    [`item.actions`]: withCtx(({ item }) => [
                      createVNode(VBtn, {
                        icon: "mdi-delete",
                        title: _ctx.$t("remove"),
                        size: "small",
                        variant: "plain",
                        onClick: ($event) => removeEntry(item.raw.value)
                      }, null, 8, ["title", "onClick"])
                    ]),
                    _: 2
                  }, 1032, ["items"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Factor/Partials/AssociationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=AssociationForm-2508df34.mjs.map
