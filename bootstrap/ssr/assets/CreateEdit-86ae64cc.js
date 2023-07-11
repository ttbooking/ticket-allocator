import { defineComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, A } from "./Default-480a3e0a.js";
import { useForm, Head } from "@inertiajs/vue3";
import { V as VForm } from "./VForm-f39342a2.js";
import { V as VContainer } from "./VContainer-1fde1c56.js";
import { V as VRow, a as VCol } from "./VRow-3c4fefb5.js";
import { V as VCheckbox } from "./VCheckbox-9a86bade.js";
import { _ as VTextField, V as VBtn } from "../ssr.js";
import { V as VTextarea } from "./VTextarea-623587c5.js";
import { V as VAutocomplete } from "./VAutocomplete-0cae9278.js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
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
  __name: "CreateEdit",
  __ssrInlineRender: true,
  props: {
    team: {},
    operators: {},
    matchers: {},
    errors: {}
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    const form = useForm({
      active: !((_a = props.team) == null ? void 0 : _a.deleted_at),
      name: ((_b = props.team) == null ? void 0 : _b.name) ?? "",
      description: ((_c = props.team) == null ? void 0 : _c.description) ?? "",
      operators: ((_d = props.team) == null ? void 0 : _d.operators.map((operator) => operator.uuid)) ?? [],
      matching: Array.isArray((_e = props.team) == null ? void 0 : _e.matching) ? {} : ((_f = props.team) == null ? void 0 : _f.matching) ?? {}
    });
    const itemify = (items) => Object.entries(items).map(([title, value]) => ({ title, value }));
    function submit() {
      props.team ? form.put(A("ticket-allocator.teams.update", props.team.uuid)) : form.post(A("ticket-allocator.teams.store"));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t(_ctx.team ? "edit_team" : "new_team")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t(_ctx.team ? "edit_team" : "new_team"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t(_ctx.team ? "edit_team" : "new_team")), 1)
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
                                      "error-messages": _ctx.errors.name
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
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VAutocomplete, {
                                      modelValue: unref(form).operators,
                                      "onUpdate:modelValue": ($event) => unref(form).operators = $event,
                                      multiple: "",
                                      clearable: "",
                                      chips: "",
                                      "closable-chips": "",
                                      label: _ctx.$t("operators"),
                                      items: _ctx.operators,
                                      "item-title": "name",
                                      "item-value": "uuid",
                                      "error-messages": _ctx.errors.operators
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(form).operators,
                                        "onUpdate:modelValue": ($event) => unref(form).operators = $event,
                                        multiple: "",
                                        clearable: "",
                                        chips: "",
                                        "closable-chips": "",
                                        label: _ctx.$t("operators"),
                                        items: _ctx.operators,
                                        "item-title": "name",
                                        "item-value": "uuid",
                                        "error-messages": _ctx.errors.operators
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
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
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(form).operators,
                                      "onUpdate:modelValue": ($event) => unref(form).operators = $event,
                                      multiple: "",
                                      clearable: "",
                                      chips: "",
                                      "closable-chips": "",
                                      label: _ctx.$t("operators"),
                                      items: _ctx.operators,
                                      "item-title": "name",
                                      "item-value": "uuid",
                                      "error-messages": _ctx.errors.operators
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(_ctx.matchers, (items, matcher) => {
                          _push4(ssrRenderComponent(VRow, { key: matcher }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "12"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VAutocomplete, {
                                        multiple: "",
                                        clearable: "",
                                        chips: "",
                                        "closable-chips": "",
                                        label: _ctx.$t(matcher),
                                        items: itemify(items),
                                        "error-messages": _ctx.errors[matcher],
                                        "model-value": unref(form).matching[matcher],
                                        "onUpdate:modelValue": ($event) => unref(form).matching[matcher] = $event.length ? $event : void 0
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VAutocomplete, {
                                          multiple: "",
                                          clearable: "",
                                          chips: "",
                                          "closable-chips": "",
                                          label: _ctx.$t(matcher),
                                          items: itemify(items),
                                          "error-messages": _ctx.errors[matcher],
                                          "model-value": unref(form).matching[matcher],
                                          "onUpdate:modelValue": ($event) => unref(form).matching[matcher] = $event.length ? $event : void 0
                                        }, null, 8, ["label", "items", "error-messages", "model-value", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "12"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        multiple: "",
                                        clearable: "",
                                        chips: "",
                                        "closable-chips": "",
                                        label: _ctx.$t(matcher),
                                        items: itemify(items),
                                        "error-messages": _ctx.errors[matcher],
                                        "model-value": unref(form).matching[matcher],
                                        "onUpdate:modelValue": ($event) => unref(form).matching[matcher] = $event.length ? $event : void 0
                                      }, null, 8, ["label", "items", "error-messages", "model-value", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                                      to: unref(A)("ticket-allocator.teams.index"),
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
                                        to: unref(A)("ticket-allocator.teams.index"),
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
                                      to: unref(A)("ticket-allocator.teams.index"),
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
                                    modelValue: unref(form).name,
                                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                    required: "",
                                    maxlength: "255",
                                    label: _ctx.$t("name"),
                                    "error-messages": _ctx.errors.name
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
                                    "error-messages": _ctx.errors.description
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
                                  createVNode(VAutocomplete, {
                                    modelValue: unref(form).operators,
                                    "onUpdate:modelValue": ($event) => unref(form).operators = $event,
                                    multiple: "",
                                    clearable: "",
                                    chips: "",
                                    "closable-chips": "",
                                    label: _ctx.$t("operators"),
                                    items: _ctx.operators,
                                    "item-title": "name",
                                    "item-value": "uuid",
                                    "error-messages": _ctx.errors.operators
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.matchers, (items, matcher) => {
                            return openBlock(), createBlock(VRow, { key: matcher }, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      multiple: "",
                                      clearable: "",
                                      chips: "",
                                      "closable-chips": "",
                                      label: _ctx.$t(matcher),
                                      items: itemify(items),
                                      "error-messages": _ctx.errors[matcher],
                                      "model-value": unref(form).matching[matcher],
                                      "onUpdate:modelValue": ($event) => unref(form).matching[matcher] = $event.length ? $event : void 0
                                    }, null, 8, ["label", "items", "error-messages", "model-value", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128)),
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
                                    to: unref(A)("ticket-allocator.teams.index"),
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
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  required: "",
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  "error-messages": _ctx.errors.name
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
                                  "error-messages": _ctx.errors.description
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
                                createVNode(VAutocomplete, {
                                  modelValue: unref(form).operators,
                                  "onUpdate:modelValue": ($event) => unref(form).operators = $event,
                                  multiple: "",
                                  clearable: "",
                                  chips: "",
                                  "closable-chips": "",
                                  label: _ctx.$t("operators"),
                                  items: _ctx.operators,
                                  "item-title": "name",
                                  "item-value": "uuid",
                                  "error-messages": _ctx.errors.operators
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.matchers, (items, matcher) => {
                          return openBlock(), createBlock(VRow, { key: matcher }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    multiple: "",
                                    clearable: "",
                                    chips: "",
                                    "closable-chips": "",
                                    label: _ctx.$t(matcher),
                                    items: itemify(items),
                                    "error-messages": _ctx.errors[matcher],
                                    "model-value": unref(form).matching[matcher],
                                    "onUpdate:modelValue": ($event) => unref(form).matching[matcher] = $event.length ? $event : void 0
                                  }, null, 8, ["label", "items", "error-messages", "model-value", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128)),
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
                                  to: unref(A)("ticket-allocator.teams.index"),
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
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  required: "",
                                  maxlength: "255",
                                  label: _ctx.$t("name"),
                                  "error-messages": _ctx.errors.name
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
                                  "error-messages": _ctx.errors.description
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
                                createVNode(VAutocomplete, {
                                  modelValue: unref(form).operators,
                                  "onUpdate:modelValue": ($event) => unref(form).operators = $event,
                                  multiple: "",
                                  clearable: "",
                                  chips: "",
                                  "closable-chips": "",
                                  label: _ctx.$t("operators"),
                                  items: _ctx.operators,
                                  "item-title": "name",
                                  "item-value": "uuid",
                                  "error-messages": _ctx.errors.operators
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.matchers, (items, matcher) => {
                          return openBlock(), createBlock(VRow, { key: matcher }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    multiple: "",
                                    clearable: "",
                                    chips: "",
                                    "closable-chips": "",
                                    label: _ctx.$t(matcher),
                                    items: itemify(items),
                                    "error-messages": _ctx.errors[matcher],
                                    "model-value": unref(form).matching[matcher],
                                    "onUpdate:modelValue": ($event) => unref(form).matching[matcher] = $event.length ? $event : void 0
                                  }, null, 8, ["label", "items", "error-messages", "model-value", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128)),
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
                                  to: unref(A)("ticket-allocator.teams.index"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/OperatorTeam/CreateEdit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=CreateEdit-86ae64cc.js.map
