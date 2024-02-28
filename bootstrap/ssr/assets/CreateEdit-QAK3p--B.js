import { defineComponent, computed, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Default-C_EDuwmX.js";
import { useForm, Head } from "@inertiajs/vue3";
import { V as VBtn, T } from "../ssr.js";
import { V as VForm } from "./VForm-Esa30fG9.js";
import { V as VContainer } from "./VContainer-D8lVayWw.js";
import { V as VRow, a as VCol } from "./VRow-C4LXnSgv.js";
import { b as VTextField } from "./VTextField-uOnLlm4x.js";
import { V as VAutocomplete } from "./VAutocomplete-DLk-8Mcr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js";
import "./scopeId-Cj_I4Lyt.js";
import "./VGrid-BrK3U4-N.js";
import "dayjs";
import "dayjs/locale/ru.js";
import "dayjs/plugin/duration.js";
import "dayjs/plugin/localizedFormat.js";
import "dayjs/plugin/relativeTime.js";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "./filter-C2_4DFDv.js";
import "./VCheckboxBtn-C19WC2gs.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreateEdit",
  __ssrInlineRender: true,
  props: {
    users: {},
    operator: {},
    teams: {},
    errors: {}
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const form = useForm({
      user: null,
      name: ((_a = props.operator) == null ? void 0 : _a.display_name) ?? "",
      ticket_limit: ((_b = props.operator) == null ? void 0 : _b.ticket_limit) ?? null,
      complexity_limit: ((_c = props.operator) == null ? void 0 : _c.complexity_limit) ?? null,
      teams: ((_d = props.operator) == null ? void 0 : _d.teams.map((team) => team.uuid)) ?? []
    });
    const name = computed(() => {
      var _a2, _b2;
      const name2 = (_b2 = (_a2 = props.operator) == null ? void 0 : _a2.user) == null ? void 0 : _b2.name;
      if (name2)
        return name2;
      const index = props.users.findIndex((user) => user.id === form.user);
      return index < 0 ? "" : props.users[index].name;
    });
    function submit() {
      props.operator ? form.put(T("ticket-allocator.operators.update", props.operator.uuid)) : form.post(T("ticket-allocator.operators.store"));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t(_ctx.operator ? "edit_operator" : "new_operator")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t(_ctx.operator ? "edit_operator" : "new_operator"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t(_ctx.operator ? "edit_operator" : "new_operator")), 1)
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
                                  var _a2, _b2;
                                  if (_push6) {
                                    if (_ctx.operator) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        "model-value": (_a2 = _ctx.operator.user) == null ? void 0 : _a2.name,
                                        label: _ctx.$t("user"),
                                        readonly: ""
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(VAutocomplete, {
                                        modelValue: unref(form).user,
                                        "onUpdate:modelValue": ($event) => unref(form).user = $event,
                                        label: _ctx.$t("user"),
                                        items: _ctx.users,
                                        "item-title": "name",
                                        "item-value": "id",
                                        "error-messages": _ctx.errors.user
                                      }, null, _parent6, _scopeId5));
                                    }
                                  } else {
                                    return [
                                      _ctx.operator ? (openBlock(), createBlock(VTextField, {
                                        key: 0,
                                        "model-value": (_b2 = _ctx.operator.user) == null ? void 0 : _b2.name,
                                        label: _ctx.$t("user"),
                                        readonly: ""
                                      }, null, 8, ["model-value", "label"])) : (openBlock(), createBlock(VAutocomplete, {
                                        key: 1,
                                        modelValue: unref(form).user,
                                        "onUpdate:modelValue": ($event) => unref(form).user = $event,
                                        label: _ctx.$t("user"),
                                        items: _ctx.users,
                                        "item-title": "name",
                                        "item-value": "id",
                                        "error-messages": _ctx.errors.user
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"]))
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
                                  default: withCtx(() => {
                                    var _a2;
                                    return [
                                      _ctx.operator ? (openBlock(), createBlock(VTextField, {
                                        key: 0,
                                        "model-value": (_a2 = _ctx.operator.user) == null ? void 0 : _a2.name,
                                        label: _ctx.$t("user"),
                                        readonly: ""
                                      }, null, 8, ["model-value", "label"])) : (openBlock(), createBlock(VAutocomplete, {
                                        key: 1,
                                        modelValue: unref(form).user,
                                        "onUpdate:modelValue": ($event) => unref(form).user = $event,
                                        label: _ctx.$t("user"),
                                        items: _ctx.users,
                                        "item-title": "name",
                                        "item-value": "id",
                                        "error-messages": _ctx.errors.user
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"]))
                                    ];
                                  }),
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
                                      label: _ctx.$t("display_name"),
                                      placeholder: name.value,
                                      "persistent-placeholder": !!name.value.length,
                                      "error-messages": _ctx.errors.name
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        maxlength: "255",
                                        label: _ctx.$t("display_name"),
                                        placeholder: name.value,
                                        "persistent-placeholder": !!name.value.length,
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
                                      label: _ctx.$t("display_name"),
                                      placeholder: name.value,
                                      "persistent-placeholder": !!name.value.length,
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
                                md: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).ticket_limit,
                                      "onUpdate:modelValue": ($event) => unref(form).ticket_limit = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      min: "1",
                                      max: "100",
                                      label: _ctx.$t("ticket_limit"),
                                      placeholder: "∞",
                                      "persistent-placeholder": "",
                                      "error-messages": _ctx.errors.ticket_limit
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).ticket_limit,
                                        "onUpdate:modelValue": ($event) => unref(form).ticket_limit = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        min: "1",
                                        max: "100",
                                        label: _ctx.$t("ticket_limit"),
                                        placeholder: "∞",
                                        "persistent-placeholder": "",
                                        "error-messages": _ctx.errors.ticket_limit
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
                                      modelValue: unref(form).complexity_limit,
                                      "onUpdate:modelValue": ($event) => unref(form).complexity_limit = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      min: "1",
                                      max: "1000",
                                      label: _ctx.$t("complexity_limit"),
                                      placeholder: "∞",
                                      "persistent-placeholder": "",
                                      "error-messages": _ctx.errors.complexity_limit
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(form).complexity_limit,
                                        "onUpdate:modelValue": ($event) => unref(form).complexity_limit = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        min: "1",
                                        max: "1000",
                                        label: _ctx.$t("complexity_limit"),
                                        placeholder: "∞",
                                        "persistent-placeholder": "",
                                        "error-messages": _ctx.errors.complexity_limit
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
                                      modelValue: unref(form).ticket_limit,
                                      "onUpdate:modelValue": ($event) => unref(form).ticket_limit = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      min: "1",
                                      max: "100",
                                      label: _ctx.$t("ticket_limit"),
                                      placeholder: "∞",
                                      "persistent-placeholder": "",
                                      "error-messages": _ctx.errors.ticket_limit
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
                                      modelValue: unref(form).complexity_limit,
                                      "onUpdate:modelValue": ($event) => unref(form).complexity_limit = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      min: "1",
                                      max: "1000",
                                      label: _ctx.$t("complexity_limit"),
                                      placeholder: "∞",
                                      "persistent-placeholder": "",
                                      "error-messages": _ctx.errors.complexity_limit
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
                                      modelValue: unref(form).teams,
                                      "onUpdate:modelValue": ($event) => unref(form).teams = $event,
                                      multiple: "",
                                      clearable: "",
                                      chips: "",
                                      "closable-chips": "",
                                      label: _ctx.$t("teams"),
                                      items: _ctx.teams,
                                      "item-title": "name",
                                      "item-value": "uuid",
                                      "error-messages": _ctx.errors.teams
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(form).teams,
                                        "onUpdate:modelValue": ($event) => unref(form).teams = $event,
                                        multiple: "",
                                        clearable: "",
                                        chips: "",
                                        "closable-chips": "",
                                        label: _ctx.$t("teams"),
                                        items: _ctx.teams,
                                        "item-title": "name",
                                        "item-value": "uuid",
                                        "error-messages": _ctx.errors.teams
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
                                      modelValue: unref(form).teams,
                                      "onUpdate:modelValue": ($event) => unref(form).teams = $event,
                                      multiple: "",
                                      clearable: "",
                                      chips: "",
                                      "closable-chips": "",
                                      label: _ctx.$t("teams"),
                                      items: _ctx.teams,
                                      "item-title": "name",
                                      "item-value": "uuid",
                                      "error-messages": _ctx.errors.teams
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
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
                                    _push6(ssrRenderComponent(VBtn, {
                                      to: unref(T)("ticket-allocator.operators.index"),
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
                                        to: unref(T)("ticket-allocator.operators.index"),
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
                                      to: unref(T)("ticket-allocator.operators.index"),
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
                                default: withCtx(() => {
                                  var _a2;
                                  return [
                                    _ctx.operator ? (openBlock(), createBlock(VTextField, {
                                      key: 0,
                                      "model-value": (_a2 = _ctx.operator.user) == null ? void 0 : _a2.name,
                                      label: _ctx.$t("user"),
                                      readonly: ""
                                    }, null, 8, ["model-value", "label"])) : (openBlock(), createBlock(VAutocomplete, {
                                      key: 1,
                                      modelValue: unref(form).user,
                                      "onUpdate:modelValue": ($event) => unref(form).user = $event,
                                      label: _ctx.$t("user"),
                                      items: _ctx.users,
                                      "item-title": "name",
                                      "item-value": "id",
                                      "error-messages": _ctx.errors.user
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"]))
                                  ];
                                }),
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
                                    label: _ctx.$t("display_name"),
                                    placeholder: name.value,
                                    "persistent-placeholder": !!name.value.length,
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
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(form).ticket_limit,
                                    "onUpdate:modelValue": ($event) => unref(form).ticket_limit = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    min: "1",
                                    max: "100",
                                    label: _ctx.$t("ticket_limit"),
                                    placeholder: "∞",
                                    "persistent-placeholder": "",
                                    "error-messages": _ctx.errors.ticket_limit
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
                                    modelValue: unref(form).complexity_limit,
                                    "onUpdate:modelValue": ($event) => unref(form).complexity_limit = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    min: "1",
                                    max: "1000",
                                    label: _ctx.$t("complexity_limit"),
                                    placeholder: "∞",
                                    "persistent-placeholder": "",
                                    "error-messages": _ctx.errors.complexity_limit
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
                                    modelValue: unref(form).teams,
                                    "onUpdate:modelValue": ($event) => unref(form).teams = $event,
                                    multiple: "",
                                    clearable: "",
                                    chips: "",
                                    "closable-chips": "",
                                    label: _ctx.$t("teams"),
                                    items: _ctx.teams,
                                    "item-title": "name",
                                    "item-value": "uuid",
                                    "error-messages": _ctx.errors.teams
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
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
                                  createVNode(VBtn, {
                                    to: unref(T)("ticket-allocator.operators.index"),
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
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  _ctx.operator ? (openBlock(), createBlock(VTextField, {
                                    key: 0,
                                    "model-value": (_a2 = _ctx.operator.user) == null ? void 0 : _a2.name,
                                    label: _ctx.$t("user"),
                                    readonly: ""
                                  }, null, 8, ["model-value", "label"])) : (openBlock(), createBlock(VAutocomplete, {
                                    key: 1,
                                    modelValue: unref(form).user,
                                    "onUpdate:modelValue": ($event) => unref(form).user = $event,
                                    label: _ctx.$t("user"),
                                    items: _ctx.users,
                                    "item-title": "name",
                                    "item-value": "id",
                                    "error-messages": _ctx.errors.user
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"]))
                                ];
                              }),
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
                                  label: _ctx.$t("display_name"),
                                  placeholder: name.value,
                                  "persistent-placeholder": !!name.value.length,
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
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).ticket_limit,
                                  "onUpdate:modelValue": ($event) => unref(form).ticket_limit = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  min: "1",
                                  max: "100",
                                  label: _ctx.$t("ticket_limit"),
                                  placeholder: "∞",
                                  "persistent-placeholder": "",
                                  "error-messages": _ctx.errors.ticket_limit
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
                                  modelValue: unref(form).complexity_limit,
                                  "onUpdate:modelValue": ($event) => unref(form).complexity_limit = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  min: "1",
                                  max: "1000",
                                  label: _ctx.$t("complexity_limit"),
                                  placeholder: "∞",
                                  "persistent-placeholder": "",
                                  "error-messages": _ctx.errors.complexity_limit
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
                                  modelValue: unref(form).teams,
                                  "onUpdate:modelValue": ($event) => unref(form).teams = $event,
                                  multiple: "",
                                  clearable: "",
                                  chips: "",
                                  "closable-chips": "",
                                  label: _ctx.$t("teams"),
                                  items: _ctx.teams,
                                  "item-title": "name",
                                  "item-value": "uuid",
                                  "error-messages": _ctx.errors.teams
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
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
                                createVNode(VBtn, {
                                  to: unref(T)("ticket-allocator.operators.index"),
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
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  _ctx.operator ? (openBlock(), createBlock(VTextField, {
                                    key: 0,
                                    "model-value": (_a2 = _ctx.operator.user) == null ? void 0 : _a2.name,
                                    label: _ctx.$t("user"),
                                    readonly: ""
                                  }, null, 8, ["model-value", "label"])) : (openBlock(), createBlock(VAutocomplete, {
                                    key: 1,
                                    modelValue: unref(form).user,
                                    "onUpdate:modelValue": ($event) => unref(form).user = $event,
                                    label: _ctx.$t("user"),
                                    items: _ctx.users,
                                    "item-title": "name",
                                    "item-value": "id",
                                    "error-messages": _ctx.errors.user
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"]))
                                ];
                              }),
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
                                  label: _ctx.$t("display_name"),
                                  placeholder: name.value,
                                  "persistent-placeholder": !!name.value.length,
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
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(form).ticket_limit,
                                  "onUpdate:modelValue": ($event) => unref(form).ticket_limit = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  min: "1",
                                  max: "100",
                                  label: _ctx.$t("ticket_limit"),
                                  placeholder: "∞",
                                  "persistent-placeholder": "",
                                  "error-messages": _ctx.errors.ticket_limit
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
                                  modelValue: unref(form).complexity_limit,
                                  "onUpdate:modelValue": ($event) => unref(form).complexity_limit = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  min: "1",
                                  max: "1000",
                                  label: _ctx.$t("complexity_limit"),
                                  placeholder: "∞",
                                  "persistent-placeholder": "",
                                  "error-messages": _ctx.errors.complexity_limit
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
                                  modelValue: unref(form).teams,
                                  "onUpdate:modelValue": ($event) => unref(form).teams = $event,
                                  multiple: "",
                                  clearable: "",
                                  chips: "",
                                  "closable-chips": "",
                                  label: _ctx.$t("teams"),
                                  items: _ctx.teams,
                                  "item-title": "name",
                                  "item-value": "uuid",
                                  "error-messages": _ctx.errors.teams
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items", "error-messages"])
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
                                createVNode(VBtn, {
                                  to: unref(T)("ticket-allocator.operators.index"),
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Operator/CreateEdit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=CreateEdit-QAK3p--B.js.map
