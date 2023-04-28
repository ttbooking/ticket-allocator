import { defineComponent, resolveComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { a as _sfc_main$1, P } from "./Default-b1f68e08.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { wTrans } from "laravel-vue-i18n";
import { V as VForm } from "./VForm-98f10952.mjs";
import { V as VContainer, a as VRow, b as VCol } from "./VRow-6f9486a5.mjs";
import { V as VCheckbox, a as VTextarea } from "./VTextarea-210422ba.mjs";
import { al as VTextField, am as VDivider, X as VBtn } from "../ssr.mjs";
import { V as VToolbar, a as VToolbarTitle, b as VSpacer } from "./VToolbar-5392ad8f.mjs";
import { V as VAutocomplete } from "./VAutocomplete-fdbd2902.mjs";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreateEdit",
  __ssrInlineRender: true,
  props: {
    factor: null,
    ticketCategories: null,
    errors: null
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const headers = [
      { title: wTrans("value"), key: "value" },
      { title: wTrans("initial_weight"), key: "initial_weight" },
      { title: wTrans("weight_increment"), key: "weight_increment" },
      { title: wTrans("complexity"), key: "complexity" },
      { title: wTrans("delay"), key: "delay" },
      { title: wTrans("actions"), key: "actions", sortable: false }
    ];
    const form = useForm({
      active: !((_a = props.factor) == null ? void 0 : _a.deleted_at),
      name: ((_b = props.factor) == null ? void 0 : _b.name) ?? "",
      description: ((_c = props.factor) == null ? void 0 : _c.description) ?? "",
      config: ((_d = props.factor) == null ? void 0 : _d.config) ?? []
    });
    function getTicketCategories(uuid) {
      return props.ticketCategories.filter(
        (ticketCategory) => ticketCategory.uuid === uuid || !form.config.map((item) => item.value).includes(ticketCategory.uuid)
      );
    }
    function addEntry() {
      var _a2;
      form.config.push({
        value: ((_a2 = getTicketCategories()[0]) == null ? void 0 : _a2.uuid) ?? "",
        initial_weight: null,
        weight_increment: null,
        complexity: null,
        delay: null
      });
    }
    function removeEntry(id) {
      form.config = form.config.filter((entry) => entry.value !== id);
    }
    function submit() {
      props.factor ? form.put(P("ticket-allocator.factors.update", props.factor.uuid)) : form.post(P("ticket-allocator.factors.store"));
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_data_table = resolveComponent("v-data-table");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t(__props.factor ? "edit_factor" : "new_factor")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t(__props.factor ? "edit_factor" : "new_factor"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t(__props.factor ? "edit_factor" : "new_factor")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(VForm, { onSubmit: submit }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCheckbox, {
                                      modelValue: unref(form).active,
                                      "onUpdate:modelValue": ($event) => unref(form).active = $event,
                                      label: _ctx.$t("active")
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCheckbox, {
                                        modelValue: unref(form).active,
                                        "onUpdate:modelValue": ($event) => unref(form).active = $event,
                                        label: _ctx.$t("active")
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCheckbox, {
                                      modelValue: unref(form).active,
                                      "onUpdate:modelValue": ($event) => unref(form).active = $event,
                                      label: _ctx.$t("active")
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      required: "",
                                      maxlength: "255",
                                      label: _ctx.$t("name"),
                                      "error-messages": __props.errors.name
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        required: "",
                                        maxlength: "255",
                                        label: _ctx.$t("name"),
                                        "error-messages": __props.errors.name
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      required: "",
                                      maxlength: "255",
                                      label: _ctx.$t("name"),
                                      "error-messages": __props.errors.name
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextarea, {
                                      modelValue: unref(form).description,
                                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                      label: _ctx.$t("description"),
                                      "error-messages": __props.errors.description
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextarea, {
                                        modelValue: unref(form).description,
                                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                        label: _ctx.$t("description"),
                                        "error-messages": __props.errors.description
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextarea, {
                                      modelValue: unref(form).description,
                                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                      label: _ctx.$t("description"),
                                      "error-messages": __props.errors.description
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_data_table, {
                                      headers,
                                      items: unref(form).config,
                                      density: "compact"
                                    }, {
                                      top: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VToolbar, { flat: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VToolbarTitle, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`${ssrInterpolate(_ctx.$t("entries"))}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(_ctx.$t("entries")), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(VDivider, {
                                                  class: "mx-4",
                                                  inset: "",
                                                  vertical: ""
                                                }, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(VSpacer, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(VBtn, {
                                                  color: "primary",
                                                  dark: "",
                                                  disabled: getTicketCategories().length === 0,
                                                  onClick: addEntry
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`${ssrInterpolate(_ctx.$t("new_entry"))}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(_ctx.$t("new_entry")), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
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
                                                    disabled: getTicketCategories().length === 0,
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
                                          }, _parent7, _scopeId6));
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
                                                  disabled: getTicketCategories().length === 0,
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
                                      [`item.value`]: withCtx(({ item }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            modelValue: item.raw.value,
                                            "onUpdate:modelValue": ($event) => item.raw.value = $event,
                                            items: getTicketCategories(item.raw.value),
                                            "item-title": "name",
                                            "item-value": "uuid",
                                            variant: "plain",
                                            density: "compact",
                                            "hide-details": "auto"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              modelValue: item.raw.value,
                                              "onUpdate:modelValue": ($event) => item.raw.value = $event,
                                              items: getTicketCategories(item.raw.value),
                                              "item-title": "name",
                                              "item-value": "uuid",
                                              variant: "plain",
                                              density: "compact",
                                              "hide-details": "auto"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      [`item.initial_weight`]: withCtx(({ item }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
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
                                          }, null, _parent7, _scopeId6));
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
                                      [`item.weight_increment`]: withCtx(({ item }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
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
                                          }, null, _parent7, _scopeId6));
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
                                      [`item.complexity`]: withCtx(({ item }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
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
                                          }, null, _parent7, _scopeId6));
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
                                      [`item.delay`]: withCtx(({ item }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
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
                                          }, null, _parent7, _scopeId6));
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
                                      [`item.actions`]: withCtx(({ item }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VBtn, {
                                            icon: "mdi-delete",
                                            title: _ctx.$t("remove"),
                                            size: "small",
                                            variant: "plain",
                                            onClick: ($event) => removeEntry(item.raw.value)
                                          }, null, _parent7, _scopeId6));
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_data_table, {
                                        headers,
                                        items: unref(form).config,
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
                                                disabled: getTicketCategories().length === 0,
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
                                            items: getTicketCategories(item.raw.value),
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_data_table, {
                                      headers,
                                      items: unref(form).config,
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
                                              disabled: getTicketCategories().length === 0,
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
                                          items: getTicketCategories(item.raw.value),
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "submit",
                                      color: "primary",
                                      class: "mr-3",
                                      disabled: unref(form).processing
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(_ctx.$t("save"))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(_ctx.$t("save")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Link), {
                                      href: unref(P)("ticket-allocator.factors.index"),
                                      class: "mr-3"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VBtn, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`${ssrInterpolate(_ctx.$t("cancel"))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VBtn, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        type: "submit",
                                        color: "primary",
                                        class: "mr-3",
                                        disabled: unref(form).processing
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("save")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["disabled"]),
                                      createVNode(unref(Link), {
                                        href: unref(P)("ticket-allocator.factors.index"),
                                        class: "mr-3"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      type: "submit",
                                      color: "primary",
                                      class: "mr-3",
                                      disabled: unref(form).processing
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("save")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["disabled"]),
                                    createVNode(unref(Link), {
                                      href: unref(P)("ticket-allocator.factors.index"),
                                      class: "mr-3"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
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
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCheckbox, {
                                    modelValue: unref(form).active,
                                    "onUpdate:modelValue": ($event) => unref(form).active = $event,
                                    label: _ctx.$t("active")
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).name,
                                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                    required: "",
                                    maxlength: "255",
                                    label: _ctx.$t("name"),
                                    "error-messages": __props.errors.name
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextarea, {
                                    modelValue: unref(form).description,
                                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                    label: _ctx.$t("description"),
                                    "error-messages": __props.errors.description
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_data_table, {
                                    headers,
                                    items: unref(form).config,
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
                                            disabled: getTicketCategories().length === 0,
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
                                        items: getTicketCategories(item.raw.value),
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
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    type: "submit",
                                    color: "primary",
                                    class: "mr-3",
                                    disabled: unref(form).processing
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(_ctx.$t("save")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"]),
                                  createVNode(unref(Link), {
                                    href: unref(P)("ticket-allocator.factors.index"),
                                    class: "mr-3"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
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
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCheckbox, {
                                  modelValue: unref(form).active,
                                  "onUpdate:modelValue": ($event) => unref(form).active = $event,
                                  label: _ctx.$t("active")
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  required: "",
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  "error-messages": __props.errors.name
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextarea, {
                                  modelValue: unref(form).description,
                                  "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                  label: _ctx.$t("description"),
                                  "error-messages": __props.errors.description
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_data_table, {
                                  headers,
                                  items: unref(form).config,
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
                                          disabled: getTicketCategories().length === 0,
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
                                      items: getTicketCategories(item.raw.value),
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
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  type: "submit",
                                  color: "primary",
                                  class: "mr-3",
                                  disabled: unref(form).processing
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("save")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(unref(Link), {
                                  href: unref(P)("ticket-allocator.factors.index"),
                                  class: "mr-3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
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
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(VForm, {
                  onSubmit: withModifiers(submit, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCheckbox, {
                                  modelValue: unref(form).active,
                                  "onUpdate:modelValue": ($event) => unref(form).active = $event,
                                  label: _ctx.$t("active")
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  required: "",
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  "error-messages": __props.errors.name
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextarea, {
                                  modelValue: unref(form).description,
                                  "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                  label: _ctx.$t("description"),
                                  "error-messages": __props.errors.description
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_data_table, {
                                  headers,
                                  items: unref(form).config,
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
                                          disabled: getTicketCategories().length === 0,
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
                                      items: getTicketCategories(item.raw.value),
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
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  type: "submit",
                                  color: "primary",
                                  class: "mr-3",
                                  disabled: unref(form).processing
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("save")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(unref(Link), {
                                  href: unref(P)("ticket-allocator.factors.index"),
                                  class: "mr-3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
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
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Factor/CreateEdit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=CreateEdit-c516d1d2.mjs.map
