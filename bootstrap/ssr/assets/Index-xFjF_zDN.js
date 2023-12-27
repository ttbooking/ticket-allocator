import { ref, watch, nextTick, computed, mergeProps, createVNode, defineComponent, resolveComponent, unref, withCtx, toDisplayString, createTextVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1, A } from "./Default-IcHhSEd7.js";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js";
import { V as VDataTable, a as VToolbar, b as VToolbarTitle, c as VSpacer } from "./VSpacer-3SahqzCE.js";
import { a as useScopeId, V as VDivider } from "./scopeId-opZpvYsW.js";
import { a as makeVOverlayProps, b as VDialogTransition, V as VOverlay, c as VSelect } from "./filter-Ws5XenR3.js";
import { f as forwardRefs } from "./VTextField-6mlFi4OF.js";
import { p as propsFactory, g as genericComponent, w as useProxiedModel, r as IN_BROWSER, f as useRender, N as VDefaultsProvider, t as focusableChildren, V as VBtn } from "../ssr.js";
import { V as VCard, b as VCardTitle, a as VCardText, c as VCardActions } from "./VCard-lWDpAMmK.js";
import { V as VContainer } from "./VContainer-8KUyFu_f.js";
import { V as VRow, a as VCol } from "./VRow-eusitl6E.js";
import { a as VCheckboxBtn } from "./VCheckboxBtn-nA-10Xel.js";
import "./_plugin-vue_export-helper-yVxbj29m.js";
import "./VGrid-B5jBLpHf.js";
import "./VTable-cFodkvJx.js";
import "dayjs";
import "dayjs/locale/ru.js";
import "dayjs/plugin/duration.js";
import "dayjs/plugin/localizedFormat.js";
import "dayjs/plugin/relativeTime.js";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true
  },
  scrollable: Boolean,
  ...makeVOverlayProps({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: VDialogTransition
    },
    zIndex: 2400
  })
}, "VDialog");
const VDialog = genericComponent()({
  name: "VDialog",
  props: makeVDialogProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onFocusin(e) {
      var _a, _b;
      const before = e.relatedTarget;
      const after = e.target;
      if (before !== after && ((_a = overlay.value) == null ? void 0 : _a.contentEl) && // We're the topmost dialog
      ((_b = overlay.value) == null ? void 0 : _b.globalTop) && // It isn't the document or the dialog body
      ![document, overlay.value.contentEl].includes(after) && // It isn't inside the dialog body
      !overlay.value.contentEl.contains(after)) {
        const focusable = focusableChildren(overlay.value.contentEl);
        if (!focusable.length)
          return;
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];
        if (before === firstElement) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }
      }
    }
    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, (val) => {
        val ? document.addEventListener("focusin", onFocusin) : document.removeEventListener("focusin", onFocusin);
      }, {
        immediate: true
      });
    }
    watch(isActive, async (val) => {
      var _a, _b;
      await nextTick();
      if (val) {
        (_a = overlay.value.contentEl) == null ? void 0 : _a.focus({
          preventScroll: true
        });
      } else {
        (_b = overlay.value.activatorEl) == null ? void 0 : _b.focus({
          preventScroll: true
        });
      }
    });
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "dialog",
      "aria-expanded": String(isActive.value)
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }, props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps.value,
        "role": "dialog"
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VDialog"
          }, {
            default: () => {
              var _a;
              return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    factors: {},
    factorDictionary: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const headers = computed(() => [
      { title: t("active"), key: "active", sortable: false },
      { title: t("type"), key: "type.name", sortable: false },
      { title: t("name"), key: "name", sortable: false },
      { title: t("description"), key: "description", sortable: false },
      { title: t("actions"), key: "actions", sortable: false }
    ]);
    const dialog = ref();
    const factorType = ref();
    function close() {
      dialog.value = null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn_ex = resolveComponent("v-btn-ex");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("factors")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("factors"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t("factors")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(VDataTable, {
              headers: headers.value,
              items: _ctx.factors
            }, {
              top: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VToolbar, { flat: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VToolbarTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("factors"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("factors")), 1)
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
                        _push4(ssrRenderComponent(VDialog, {
                          modelValue: dialog.value,
                          "onUpdate:modelValue": ($event) => dialog.value = $event,
                          "max-width": "500px"
                        }, {
                          activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, mergeProps({
                                color: "primary",
                                dark: ""
                              }, props), {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(_ctx.$t("new_factor"))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(_ctx.$t("new_factor")), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, mergeProps({
                                  color: "primary",
                                  dark: ""
                                }, props), {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("new_factor")), 1)
                                  ]),
                                  _: 2
                                }, 1040)
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCard, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardTitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span class="text-h5"${_scopeId6}>${ssrInterpolate(_ctx.$t("choose_factor_type"))}</span>`);
                                        } else {
                                          return [
                                            createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("choose_factor_type")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VContainer, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VRow, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VCol, {
                                                        cols: "12",
                                                        md: "12"
                                                      }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VSelect, {
                                                              modelValue: factorType.value,
                                                              "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                              label: _ctx.$t("factor_type"),
                                                              items: _ctx.factorDictionary,
                                                              "item-title": "name",
                                                              "item-value": "alias"
                                                            }, null, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VSelect, {
                                                                modelValue: factorType.value,
                                                                "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                                label: _ctx.$t("factor_type"),
                                                                items: _ctx.factorDictionary,
                                                                "item-title": "name",
                                                                "item-value": "alias"
                                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VCol, {
                                                          cols: "12",
                                                          md: "12"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(VSelect, {
                                                              modelValue: factorType.value,
                                                              "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                              label: _ctx.$t("factor_type"),
                                                              items: _ctx.factorDictionary,
                                                              "item-title": "name",
                                                              "item-value": "alias"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
                                                          ]),
                                                          _: 1
                                                        })
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VRow, null, {
                                                    default: withCtx(() => [
                                                      createVNode(VCol, {
                                                        cols: "12",
                                                        md: "12"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VSelect, {
                                                            modelValue: factorType.value,
                                                            "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                            label: _ctx.$t("factor_type"),
                                                            items: _ctx.factorDictionary,
                                                            "item-title": "name",
                                                            "item-value": "alias"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
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
                                          }, _parent7, _scopeId6));
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
                                                        createVNode(VSelect, {
                                                          modelValue: factorType.value,
                                                          "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                          label: _ctx.$t("factor_type"),
                                                          items: _ctx.factorDictionary,
                                                          "item-title": "name",
                                                          "item-value": "alias"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
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
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardActions, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSpacer, null, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VBtn, {
                                            color: "primary",
                                            dark: "",
                                            onClick: close
                                          }, {
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
                                          _push7(ssrRenderComponent(VBtn, {
                                            key: factorType.value,
                                            to: unref(A)("ticket-allocator.factors.create", { type: factorType.value }),
                                            disabled: !factorType.value,
                                            color: "primary",
                                            dark: "",
                                            onClick: close
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`${ssrInterpolate(_ctx.$t("create"))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(_ctx.$t("create")), 1)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSpacer),
                                            createVNode(VBtn, {
                                              color: "primary",
                                              dark: "",
                                              onClick: close
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                              ]),
                                              _: 1
                                            }),
                                            (openBlock(), createBlock(VBtn, {
                                              key: factorType.value,
                                              to: unref(A)("ticket-allocator.factors.create", { type: factorType.value }),
                                              disabled: !factorType.value,
                                              color: "primary",
                                              dark: "",
                                              onClick: close
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(_ctx.$t("create")), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["to", "disabled"]))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardTitle, null, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("choose_factor_type")), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
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
                                                      createVNode(VSelect, {
                                                        modelValue: factorType.value,
                                                        "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                        label: _ctx.$t("factor_type"),
                                                        items: _ctx.factorDictionary,
                                                        "item-title": "name",
                                                        "item-value": "alias"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
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
                                      }),
                                      createVNode(VCardActions, null, {
                                        default: withCtx(() => [
                                          createVNode(VSpacer),
                                          createVNode(VBtn, {
                                            color: "primary",
                                            dark: "",
                                            onClick: close
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                            ]),
                                            _: 1
                                          }),
                                          (openBlock(), createBlock(VBtn, {
                                            key: factorType.value,
                                            to: unref(A)("ticket-allocator.factors.create", { type: factorType.value }),
                                            disabled: !factorType.value,
                                            color: "primary",
                                            dark: "",
                                            onClick: close
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(_ctx.$t("create")), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["to", "disabled"]))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCard, null, {
                                  default: withCtx(() => [
                                    createVNode(VCardTitle, null, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("choose_factor_type")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
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
                                                    createVNode(VSelect, {
                                                      modelValue: factorType.value,
                                                      "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                      label: _ctx.$t("factor_type"),
                                                      items: _ctx.factorDictionary,
                                                      "item-title": "name",
                                                      "item-value": "alias"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
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
                                    }),
                                    createVNode(VCardActions, null, {
                                      default: withCtx(() => [
                                        createVNode(VSpacer),
                                        createVNode(VBtn, {
                                          color: "primary",
                                          dark: "",
                                          onClick: close
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        (openBlock(), createBlock(VBtn, {
                                          key: factorType.value,
                                          to: unref(A)("ticket-allocator.factors.create", { type: factorType.value }),
                                          disabled: !factorType.value,
                                          color: "primary",
                                          dark: "",
                                          onClick: close
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$t("create")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to", "disabled"]))
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VToolbarTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("factors")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VDivider, {
                            class: "mx-4",
                            inset: "",
                            vertical: ""
                          }),
                          createVNode(VSpacer),
                          createVNode(VDialog, {
                            modelValue: dialog.value,
                            "onUpdate:modelValue": ($event) => dialog.value = $event,
                            "max-width": "500px"
                          }, {
                            activator: withCtx(({ props }) => [
                              createVNode(VBtn, mergeProps({
                                color: "primary",
                                dark: ""
                              }, props), {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("new_factor")), 1)
                                ]),
                                _: 2
                              }, 1040)
                            ]),
                            default: withCtx(() => [
                              createVNode(VCard, null, {
                                default: withCtx(() => [
                                  createVNode(VCardTitle, null, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("choose_factor_type")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
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
                                                  createVNode(VSelect, {
                                                    modelValue: factorType.value,
                                                    "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                    label: _ctx.$t("factor_type"),
                                                    items: _ctx.factorDictionary,
                                                    "item-title": "name",
                                                    "item-value": "alias"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
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
                                  }),
                                  createVNode(VCardActions, null, {
                                    default: withCtx(() => [
                                      createVNode(VSpacer),
                                      createVNode(VBtn, {
                                        color: "primary",
                                        dark: "",
                                        onClick: close
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(), createBlock(VBtn, {
                                        key: factorType.value,
                                        to: unref(A)("ticket-allocator.factors.create", { type: factorType.value }),
                                        disabled: !factorType.value,
                                        color: "primary",
                                        dark: "",
                                        onClick: close
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("create")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to", "disabled"]))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
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
                            createTextVNode(toDisplayString(_ctx.$t("factors")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, {
                          class: "mx-4",
                          inset: "",
                          vertical: ""
                        }),
                        createVNode(VSpacer),
                        createVNode(VDialog, {
                          modelValue: dialog.value,
                          "onUpdate:modelValue": ($event) => dialog.value = $event,
                          "max-width": "500px"
                        }, {
                          activator: withCtx(({ props }) => [
                            createVNode(VBtn, mergeProps({
                              color: "primary",
                              dark: ""
                            }, props), {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("new_factor")), 1)
                              ]),
                              _: 2
                            }, 1040)
                          ]),
                          default: withCtx(() => [
                            createVNode(VCard, null, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("choose_factor_type")), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
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
                                                createVNode(VSelect, {
                                                  modelValue: factorType.value,
                                                  "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                  label: _ctx.$t("factor_type"),
                                                  items: _ctx.factorDictionary,
                                                  "item-title": "name",
                                                  "item-value": "alias"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
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
                                }),
                                createVNode(VCardActions, null, {
                                  default: withCtx(() => [
                                    createVNode(VSpacer),
                                    createVNode(VBtn, {
                                      color: "primary",
                                      dark: "",
                                      onClick: close
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(), createBlock(VBtn, {
                                      key: factorType.value,
                                      to: unref(A)("ticket-allocator.factors.create", { type: factorType.value }),
                                      disabled: !factorType.value,
                                      color: "primary",
                                      dark: "",
                                      onClick: close
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("create")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to", "disabled"]))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
                    href: unref(A)("ticket-allocator.factors.update", item.uuid),
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
                      href: unref(A)("ticket-allocator.factors.update", item.uuid),
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
              [`item.type.name`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass({ italic: item.type.excluded })}"${_scopeId2}>${ssrInterpolate(item.type.name)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: { italic: item.type.excluded }
                    }, toDisplayString(item.type.name), 3)
                  ];
                }
              }),
              [`item.name`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass({ italic: item.type.excluded && !item.display_name })}"${_scopeId2}>${ssrInterpolate(item.name)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: { italic: item.type.excluded && !item.display_name }
                    }, toDisplayString(item.name), 3)
                  ];
                }
              }),
              [`item.actions`]: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    to: unref(A)("ticket-allocator.factors.edit", item.uuid),
                    icon: "mdi-pencil",
                    title: _ctx.$t("edit"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn_ex, {
                    to: unref(A)("ticket-allocator.factors.raise-priority", item.uuid),
                    method: "put",
                    icon: "mdi-arrow-up-thick",
                    title: _ctx.$t("raise_priority"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn_ex, {
                    to: unref(A)("ticket-allocator.factors.lower-priority", item.uuid),
                    method: "put",
                    icon: "mdi-arrow-down-thick",
                    title: _ctx.$t("lower_priority"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn_ex, {
                    to: unref(A)("ticket-allocator.factors.destroy", item.uuid),
                    method: "delete",
                    icon: "mdi-delete",
                    title: _ctx.$t("remove"),
                    size: "small",
                    variant: "plain"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      to: unref(A)("ticket-allocator.factors.edit", item.uuid),
                      icon: "mdi-pencil",
                      title: _ctx.$t("edit"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.factors.raise-priority", item.uuid),
                      method: "put",
                      icon: "mdi-arrow-up-thick",
                      title: _ctx.$t("raise_priority"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.factors.lower-priority", item.uuid),
                      method: "put",
                      icon: "mdi-arrow-down-thick",
                      title: _ctx.$t("lower_priority"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.factors.destroy", item.uuid),
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
                createVNode(VDataTable, {
                  headers: headers.value,
                  items: _ctx.factors
                }, {
                  top: withCtx(() => [
                    createVNode(VToolbar, { flat: "" }, {
                      default: withCtx(() => [
                        createVNode(VToolbarTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("factors")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, {
                          class: "mx-4",
                          inset: "",
                          vertical: ""
                        }),
                        createVNode(VSpacer),
                        createVNode(VDialog, {
                          modelValue: dialog.value,
                          "onUpdate:modelValue": ($event) => dialog.value = $event,
                          "max-width": "500px"
                        }, {
                          activator: withCtx(({ props }) => [
                            createVNode(VBtn, mergeProps({
                              color: "primary",
                              dark: ""
                            }, props), {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("new_factor")), 1)
                              ]),
                              _: 2
                            }, 1040)
                          ]),
                          default: withCtx(() => [
                            createVNode(VCard, null, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("choose_factor_type")), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
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
                                                createVNode(VSelect, {
                                                  modelValue: factorType.value,
                                                  "onUpdate:modelValue": ($event) => factorType.value = $event,
                                                  label: _ctx.$t("factor_type"),
                                                  items: _ctx.factorDictionary,
                                                  "item-title": "name",
                                                  "item-value": "alias"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "items"])
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
                                }),
                                createVNode(VCardActions, null, {
                                  default: withCtx(() => [
                                    createVNode(VSpacer),
                                    createVNode(VBtn, {
                                      color: "primary",
                                      dark: "",
                                      onClick: close
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("cancel")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(), createBlock(VBtn, {
                                      key: factorType.value,
                                      to: unref(A)("ticket-allocator.factors.create", { type: factorType.value }),
                                      disabled: !factorType.value,
                                      color: "primary",
                                      dark: "",
                                      onClick: close
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("create")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to", "disabled"]))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  [`item.active`]: withCtx(({ item }) => [
                    createVNode(unref(Link), {
                      as: "span",
                      href: unref(A)("ticket-allocator.factors.update", item.uuid),
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
                  [`item.type.name`]: withCtx(({ item }) => [
                    createVNode("span", {
                      class: { italic: item.type.excluded }
                    }, toDisplayString(item.type.name), 3)
                  ]),
                  [`item.name`]: withCtx(({ item }) => [
                    createVNode("span", {
                      class: { italic: item.type.excluded && !item.display_name }
                    }, toDisplayString(item.name), 3)
                  ]),
                  [`item.actions`]: withCtx(({ item }) => [
                    createVNode(VBtn, {
                      to: unref(A)("ticket-allocator.factors.edit", item.uuid),
                      icon: "mdi-pencil",
                      title: _ctx.$t("edit"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.factors.raise-priority", item.uuid),
                      method: "put",
                      icon: "mdi-arrow-up-thick",
                      title: _ctx.$t("raise_priority"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.factors.lower-priority", item.uuid),
                      method: "put",
                      icon: "mdi-arrow-down-thick",
                      title: _ctx.$t("lower_priority"),
                      size: "small",
                      variant: "plain"
                    }, null, 8, ["to", "title"]),
                    createVNode(_component_v_btn_ex, {
                      to: unref(A)("ticket-allocator.factors.destroy", item.uuid),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Factor/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-xFjF_zDN.js.map