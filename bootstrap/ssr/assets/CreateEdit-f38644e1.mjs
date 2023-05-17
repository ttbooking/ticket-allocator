import { defineComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { a as _sfc_main$1, A } from "./Default-55181f12.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { V as VForm } from "./VForm-4ecc29da.mjs";
import { V as VContainer } from "./VContainer-6fc0220f.mjs";
import { V as VRow, a as VCol } from "./VRow-37e0fd4f.mjs";
import { _ as VTextField, q as VBtn } from "../ssr.mjs";
import "laravel-vue-i18n";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreateEdit",
  __ssrInlineRender: true,
  props: {
    ticketCategory: {},
    errors: {}
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    const form = useForm({
      name: ((_a = props.ticketCategory) == null ? void 0 : _a.name) ?? "",
      short: ((_b = props.ticketCategory) == null ? void 0 : _b.short) ?? "",
      initial_weight: ((_c = props.ticketCategory) == null ? void 0 : _c.initial_weight) ?? 0,
      weight_increment: ((_d = props.ticketCategory) == null ? void 0 : _d.weight_increment) ?? 0,
      complexity: ((_e = props.ticketCategory) == null ? void 0 : _e.complexity) ?? 0,
      delay: ((_f = props.ticketCategory) == null ? void 0 : _f.delay) ?? 0
    });
    function submit() {
      props.ticketCategory ? form.put(A("ticket-allocator.ticket-categories.update", props.ticketCategory.uuid)) : form.post(A("ticket-allocator.ticket-categories.store"));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t(_ctx.ticketCategory ? "edit_category" : "new_category")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t(_ctx.ticketCategory ? "edit_category" : "new_category"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t(_ctx.ticketCategory ? "edit_category" : "new_category")), 1)
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
                                md: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      required: "",
                                      maxlength: "255",
                                      label: _ctx.$t("name"),
                                      "error-messages": _ctx.errors.name
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        required: "",
                                        maxlength: "255",
                                        label: _ctx.$t("name"),
                                        "error-messages": _ctx.errors.name
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).short,
                                      "onUpdate:modelValue": ($event) => unref(form).short = $event,
                                      required: "",
                                      maxlength: "32",
                                      label: _ctx.$t("short_name"),
                                      "error-messages": _ctx.errors.short
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).short,
                                        "onUpdate:modelValue": ($event) => unref(form).short = $event,
                                        required: "",
                                        maxlength: "32",
                                        label: _ctx.$t("short_name"),
                                        "error-messages": _ctx.errors.short
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
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      required: "",
                                      maxlength: "255",
                                      label: _ctx.$t("name"),
                                      "error-messages": _ctx.errors.name
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(form).short,
                                      "onUpdate:modelValue": ($event) => unref(form).short = $event,
                                      required: "",
                                      maxlength: "32",
                                      label: _ctx.$t("short_name"),
                                      "error-messages": _ctx.errors.short
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
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).initial_weight,
                                      "onUpdate:modelValue": ($event) => unref(form).initial_weight = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "9999999",
                                      label: _ctx.$t("initial_weight"),
                                      "error-messages": _ctx.errors.initial_weight
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).initial_weight,
                                        "onUpdate:modelValue": ($event) => unref(form).initial_weight = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        required: "",
                                        min: "0",
                                        max: "9999999",
                                        label: _ctx.$t("initial_weight"),
                                        "error-messages": _ctx.errors.initial_weight
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).weight_increment,
                                      "onUpdate:modelValue": ($event) => unref(form).weight_increment = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "99999",
                                      label: _ctx.$t("weight_increment"),
                                      "error-messages": _ctx.errors.weight_increment
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).weight_increment,
                                        "onUpdate:modelValue": ($event) => unref(form).weight_increment = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        required: "",
                                        min: "0",
                                        max: "99999",
                                        label: _ctx.$t("weight_increment"),
                                        "error-messages": _ctx.errors.weight_increment
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).complexity,
                                      "onUpdate:modelValue": ($event) => unref(form).complexity = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "9999",
                                      label: _ctx.$t("complexity"),
                                      "error-messages": _ctx.errors.complexity
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).complexity,
                                        "onUpdate:modelValue": ($event) => unref(form).complexity = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        required: "",
                                        min: "0",
                                        max: "9999",
                                        label: _ctx.$t("complexity"),
                                        "error-messages": _ctx.errors.complexity
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).delay,
                                      "onUpdate:modelValue": ($event) => unref(form).delay = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "99999",
                                      label: _ctx.$t("delay"),
                                      "error-messages": _ctx.errors.delay
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).delay,
                                        "onUpdate:modelValue": ($event) => unref(form).delay = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        required: "",
                                        min: "0",
                                        max: "99999",
                                        label: _ctx.$t("delay"),
                                        "error-messages": _ctx.errors.delay
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
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(form).initial_weight,
                                      "onUpdate:modelValue": ($event) => unref(form).initial_weight = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "9999999",
                                      label: _ctx.$t("initial_weight"),
                                      "error-messages": _ctx.errors.initial_weight
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(form).weight_increment,
                                      "onUpdate:modelValue": ($event) => unref(form).weight_increment = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "99999",
                                      label: _ctx.$t("weight_increment"),
                                      "error-messages": _ctx.errors.weight_increment
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(form).complexity,
                                      "onUpdate:modelValue": ($event) => unref(form).complexity = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "9999",
                                      label: _ctx.$t("complexity"),
                                      "error-messages": _ctx.errors.complexity
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(form).delay,
                                      "onUpdate:modelValue": ($event) => unref(form).delay = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      max: "99999",
                                      label: _ctx.$t("delay"),
                                      "error-messages": _ctx.errors.delay
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
                                      href: unref(A)("ticket-allocator.ticket-categories.index"),
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
                                        href: unref(A)("ticket-allocator.ticket-categories.index"),
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
                                      href: unref(A)("ticket-allocator.ticket-categories.index"),
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
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).name,
                                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                    required: "",
                                    maxlength: "255",
                                    label: _ctx.$t("name"),
                                    "error-messages": _ctx.errors.name
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).short,
                                    "onUpdate:modelValue": ($event) => unref(form).short = $event,
                                    required: "",
                                    maxlength: "32",
                                    label: _ctx.$t("short_name"),
                                    "error-messages": _ctx.errors.short
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
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).initial_weight,
                                    "onUpdate:modelValue": ($event) => unref(form).initial_weight = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    required: "",
                                    min: "0",
                                    max: "9999999",
                                    label: _ctx.$t("initial_weight"),
                                    "error-messages": _ctx.errors.initial_weight
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).weight_increment,
                                    "onUpdate:modelValue": ($event) => unref(form).weight_increment = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    required: "",
                                    min: "0",
                                    max: "99999",
                                    label: _ctx.$t("weight_increment"),
                                    "error-messages": _ctx.errors.weight_increment
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).complexity,
                                    "onUpdate:modelValue": ($event) => unref(form).complexity = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    required: "",
                                    min: "0",
                                    max: "9999",
                                    label: _ctx.$t("complexity"),
                                    "error-messages": _ctx.errors.complexity
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).delay,
                                    "onUpdate:modelValue": ($event) => unref(form).delay = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    required: "",
                                    min: "0",
                                    max: "99999",
                                    label: _ctx.$t("delay"),
                                    "error-messages": _ctx.errors.delay
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
                                    href: unref(A)("ticket-allocator.ticket-categories.index"),
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
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  required: "",
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  "error-messages": _ctx.errors.name
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).short,
                                  "onUpdate:modelValue": ($event) => unref(form).short = $event,
                                  required: "",
                                  maxlength: "32",
                                  label: _ctx.$t("short_name"),
                                  "error-messages": _ctx.errors.short
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
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).initial_weight,
                                  "onUpdate:modelValue": ($event) => unref(form).initial_weight = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "9999999",
                                  label: _ctx.$t("initial_weight"),
                                  "error-messages": _ctx.errors.initial_weight
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).weight_increment,
                                  "onUpdate:modelValue": ($event) => unref(form).weight_increment = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "99999",
                                  label: _ctx.$t("weight_increment"),
                                  "error-messages": _ctx.errors.weight_increment
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).complexity,
                                  "onUpdate:modelValue": ($event) => unref(form).complexity = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "9999",
                                  label: _ctx.$t("complexity"),
                                  "error-messages": _ctx.errors.complexity
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).delay,
                                  "onUpdate:modelValue": ($event) => unref(form).delay = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "99999",
                                  label: _ctx.$t("delay"),
                                  "error-messages": _ctx.errors.delay
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
                                  href: unref(A)("ticket-allocator.ticket-categories.index"),
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
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  required: "",
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  "error-messages": _ctx.errors.name
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).short,
                                  "onUpdate:modelValue": ($event) => unref(form).short = $event,
                                  required: "",
                                  maxlength: "32",
                                  label: _ctx.$t("short_name"),
                                  "error-messages": _ctx.errors.short
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
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).initial_weight,
                                  "onUpdate:modelValue": ($event) => unref(form).initial_weight = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "9999999",
                                  label: _ctx.$t("initial_weight"),
                                  "error-messages": _ctx.errors.initial_weight
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).weight_increment,
                                  "onUpdate:modelValue": ($event) => unref(form).weight_increment = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "99999",
                                  label: _ctx.$t("weight_increment"),
                                  "error-messages": _ctx.errors.weight_increment
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).complexity,
                                  "onUpdate:modelValue": ($event) => unref(form).complexity = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "9999",
                                  label: _ctx.$t("complexity"),
                                  "error-messages": _ctx.errors.complexity
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).delay,
                                  "onUpdate:modelValue": ($event) => unref(form).delay = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  required: "",
                                  min: "0",
                                  max: "99999",
                                  label: _ctx.$t("delay"),
                                  "error-messages": _ctx.errors.delay
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
                                  href: unref(A)("ticket-allocator.ticket-categories.index"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/TicketCategory/CreateEdit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=CreateEdit-f38644e1.mjs.map
