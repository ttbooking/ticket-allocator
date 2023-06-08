import { ref, inject, onBeforeMount, defineComponent, computed, unref, withCtx, createVNode, toDisplayString, withDirectives, vModelText, resolveDynamicComponent, createTextVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderVNode } from "vue/server-renderer";
import { a as _sfc_main$1, A } from "./Default-07435a5a.mjs";
import { useForm, Head } from "@inertiajs/vue3";
import { V as VForm } from "./VForm-da653cae.mjs";
import { V as VContainer } from "./VContainer-1fb41549.mjs";
import { V as VRow, a as VCol } from "./VRow-4effdd9b.mjs";
import { V as VCheckbox } from "./VCheckbox-e84db20b.mjs";
import { _ as VTextField, V as VBtn } from "../ssr.mjs";
import { V as VTextarea } from "./VTextarea-9814dc75.mjs";
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
function useDynamicComponent(name) {
  const component = ref(null);
  const resolveComponent = inject("resolveComponent");
  onBeforeMount(async () => {
    if (name && resolveComponent) {
      component.value = await resolveComponent(name);
    }
  });
  return component;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreateEdit",
  __ssrInlineRender: true,
  props: {
    factor: {},
    factorType: {},
    entries: {},
    errors: {}
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const props = __props;
    const form = useForm({
      active: !((_a = props.factor) == null ? void 0 : _a.deleted_at),
      type: ((_b = props.factor) == null ? void 0 : _b.type.alias) ?? ((_c = props.factorType) == null ? void 0 : _c.alias) ?? "",
      name: ((_d = props.factor) == null ? void 0 : _d.display_name) ?? "",
      description: ((_e = props.factor) == null ? void 0 : _e.description) ?? "",
      config: ((_f = props.factor) == null ? void 0 : _f.config) ?? []
    });
    const factorTypeName = computed(() => {
      var _a2, _b2;
      return ((_a2 = props.factor) == null ? void 0 : _a2.type.name) ?? ((_b2 = props.factorType) == null ? void 0 : _b2.name) ?? "";
    });
    const formComponent = useDynamicComponent(((_g = props.factor) == null ? void 0 : _g.type.component) ?? ((_h = props.factorType) == null ? void 0 : _h.component) ?? null);
    function submit() {
      props.factor ? form.put(A("ticket-allocator.factors.update", props.factor.uuid)) : form.post(A("ticket-allocator.factors.store"));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t(_ctx.factor ? "edit_factor" : "new_factor")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t(_ctx.factor ? "edit_factor" : "new_factor"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t(_ctx.factor ? "edit_factor" : "new_factor")), 1)
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
                                      "model-value": factorTypeName.value,
                                      label: _ctx.$t("factor_type"),
                                      "error-messages": _ctx.errors.type,
                                      readonly: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<input${ssrRenderAttr("value", unref(form).type)} type="hidden"${_scopeId5}>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        "model-value": factorTypeName.value,
                                        label: _ctx.$t("factor_type"),
                                        "error-messages": _ctx.errors.type,
                                        readonly: ""
                                      }, null, 8, ["model-value", "label", "error-messages"]),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                        type: "hidden"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(form).type]
                                      ])
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
                                      "model-value": factorTypeName.value,
                                      label: _ctx.$t("factor_type"),
                                      "error-messages": _ctx.errors.type,
                                      readonly: ""
                                    }, null, 8, ["model-value", "label", "error-messages"]),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                      type: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(form).type]
                                    ])
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
                                      maxlength: "255",
                                      label: _ctx.$t("name"),
                                      placeholder: factorTypeName.value,
                                      "persistent-placeholder": !!factorTypeName.value.length,
                                      "error-messages": _ctx.errors.name
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        maxlength: "255",
                                        label: _ctx.$t("name"),
                                        placeholder: factorTypeName.value,
                                        "persistent-placeholder": !!factorTypeName.value.length,
                                        "error-messages": _ctx.errors.name
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "placeholder", "persistent-placeholder", "error-messages"])
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
                                      maxlength: "255",
                                      label: _ctx.$t("name"),
                                      placeholder: factorTypeName.value,
                                      "persistent-placeholder": !!factorTypeName.value.length,
                                      "error-messages": _ctx.errors.name
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "placeholder", "persistent-placeholder", "error-messages"])
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
                                      "error-messages": _ctx.errors.description
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextarea, {
                                        modelValue: unref(form).description,
                                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                        label: _ctx.$t("description"),
                                        "error-messages": _ctx.errors.description
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
                                      "error-messages": _ctx.errors.description
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (!!unref(formComponent)) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(unref(formComponent)), {
                            modelValue: unref(form).config,
                            "onUpdate:modelValue": ($event) => unref(form).config = $event,
                            entries: _ctx.entries
                          }, null), _parent4, _scopeId3);
                        } else {
                          _push4(`<!---->`);
                        }
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
                                    _push6(ssrRenderComponent(VBtn, {
                                      to: unref(A)("ticket-allocator.factors.index"),
                                      class: "mr-3"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(_ctx.$t("cancel"))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
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
                                      createVNode(VBtn, {
                                        to: unref(A)("ticket-allocator.factors.index"),
                                        class: "mr-3"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
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
                                    createVNode(VBtn, {
                                      to: unref(A)("ticket-allocator.factors.index"),
                                      class: "mr-3"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
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
                                    "model-value": factorTypeName.value,
                                    label: _ctx.$t("factor_type"),
                                    "error-messages": _ctx.errors.type,
                                    readonly: ""
                                  }, null, 8, ["model-value", "label", "error-messages"]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                    type: "hidden"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).type]
                                  ])
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
                                    maxlength: "255",
                                    label: _ctx.$t("name"),
                                    placeholder: factorTypeName.value,
                                    "persistent-placeholder": !!factorTypeName.value.length,
                                    "error-messages": _ctx.errors.name
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "placeholder", "persistent-placeholder", "error-messages"])
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
                                    "error-messages": _ctx.errors.description
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          !!unref(formComponent) ? (openBlock(), createBlock(resolveDynamicComponent(unref(formComponent)), {
                            key: 0,
                            modelValue: unref(form).config,
                            "onUpdate:modelValue": ($event) => unref(form).config = $event,
                            entries: _ctx.entries
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "entries"])) : createCommentVNode("", true),
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
                                  createVNode(VBtn, {
                                    to: unref(A)("ticket-allocator.factors.index"),
                                    class: "mr-3"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
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
                                  "model-value": factorTypeName.value,
                                  label: _ctx.$t("factor_type"),
                                  "error-messages": _ctx.errors.type,
                                  readonly: ""
                                }, null, 8, ["model-value", "label", "error-messages"]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                  type: "hidden"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).type]
                                ])
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
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  placeholder: factorTypeName.value,
                                  "persistent-placeholder": !!factorTypeName.value.length,
                                  "error-messages": _ctx.errors.name
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "placeholder", "persistent-placeholder", "error-messages"])
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
                                  "error-messages": _ctx.errors.description
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        !!unref(formComponent) ? (openBlock(), createBlock(resolveDynamicComponent(unref(formComponent)), {
                          key: 0,
                          modelValue: unref(form).config,
                          "onUpdate:modelValue": ($event) => unref(form).config = $event,
                          entries: _ctx.entries
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "entries"])) : createCommentVNode("", true),
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
                                createVNode(VBtn, {
                                  to: unref(A)("ticket-allocator.factors.index"),
                                  class: "mr-3"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["to"])
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
                                  "model-value": factorTypeName.value,
                                  label: _ctx.$t("factor_type"),
                                  "error-messages": _ctx.errors.type,
                                  readonly: ""
                                }, null, 8, ["model-value", "label", "error-messages"]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                  type: "hidden"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).type]
                                ])
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
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  placeholder: factorTypeName.value,
                                  "persistent-placeholder": !!factorTypeName.value.length,
                                  "error-messages": _ctx.errors.name
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "placeholder", "persistent-placeholder", "error-messages"])
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
                                  "error-messages": _ctx.errors.description
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        !!unref(formComponent) ? (openBlock(), createBlock(resolveDynamicComponent(unref(formComponent)), {
                          key: 0,
                          modelValue: unref(form).config,
                          "onUpdate:modelValue": ($event) => unref(form).config = $event,
                          entries: _ctx.entries
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "entries"])) : createCommentVNode("", true),
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
                                createVNode(VBtn, {
                                  to: unref(A)("ticket-allocator.factors.index"),
                                  class: "mr-3"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["to"])
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
//# sourceMappingURL=CreateEdit-f85d47cb.mjs.map
