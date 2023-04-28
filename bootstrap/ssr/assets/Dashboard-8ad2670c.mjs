var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b;
import { ref, computed, reactive, defineComponent, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext, watch, onMounted, isRef, TransitionGroup } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc, P, a as _sfc_main$5 } from "./Default-7bdd96cf.mjs";
import { useEventListener, isClient, createSharedComposable, useLocalStorage, useTimestamp, usePointerLock, useMouse, refThrottled } from "@vueuse/core";
import MarkdownIt from "markdown-it";
import { usePage, Head } from "@inertiajs/vue3";
import { VBtn } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard, VCardText } from "vuetify/lib/components/VCard/index.mjs";
import { VIcon } from "vuetify/lib/components/VIcon/index.mjs";
import { VOverlay } from "vuetify/lib/components/VOverlay/index.mjs";
import { VTabs, VTab } from "vuetify/lib/components/VTabs/index.mjs";
import { VWindow, VWindowItem } from "vuetify/lib/components/VWindow/index.mjs";
import { Repository as Repository$1, Query as Query$1, Model, useRepo } from "pinia-orm";
import { Uid, Attr, Str, Bool, Num, BelongsToMany, HasMany, OnDelete, BelongsTo } from "pinia-orm/dist/decorators";
import { useCollect } from "pinia-orm/dist/helpers";
import { VBtnGroup } from "vuetify/lib/components/VBtnGroup/index.mjs";
import { VBtnToggle } from "vuetify/lib/components/VBtnToggle/index.mjs";
import { VContainer, VRow, VCol } from "vuetify/lib/components/VGrid/index.mjs";
import { VSwitch } from "vuetify/lib/components/VSwitch/index.mjs";
import { VTable } from "vuetify/lib/components/VTable/index.mjs";
import "laravel-vue-i18n";
import "vuetify";
import "vuetify/lib/components/VApp/index.mjs";
import "vuetify/lib/components/VList/index.mjs";
import "vuetify/lib/components/VMain/index.mjs";
import "vuetify/lib/components/VNavigationDrawer/index.mjs";
function useDragAndDrop(target, onDragStart) {
  const element = ref();
  useEventListener(target, "dragstart", (event) => {
    element.value = event.target;
    if (typeof onDragStart === "string") {
      const entry = onDragStart;
      onDragStart = (element2, dataTransfer) => {
        dataTransfer == null ? void 0 : dataTransfer.setData("text/plain", element2.dataset[entry] ?? "");
      };
    }
    onDragStart == null ? void 0 : onDragStart(element.value, event.dataTransfer);
  });
  useEventListener(target, "dragend", () => {
    element.value = null;
  });
  return {
    element
  };
}
function useDropZone(target, onDrop, filesOnly = true) {
  const isOverDropZone = ref(false);
  let counter = 0;
  if (isClient) {
    useEventListener(target, "dragenter", (event) => {
      event.preventDefault();
      counter++;
      isOverDropZone.value = true;
    });
    useEventListener(target, "dragover", (event) => {
      event.preventDefault();
    });
    useEventListener(target, "dragleave", (event) => {
      event.preventDefault();
      counter--;
      if (counter === 0)
        isOverDropZone.value = false;
    });
    useEventListener(target, "drop", (event) => {
      var _a2;
      event.preventDefault();
      counter = 0;
      isOverDropZone.value = false;
      if (onDrop) {
        if (filesOnly) {
          const files = Array.from(((_a2 = event.dataTransfer) == null ? void 0 : _a2.files) ?? []);
          const onFileDrop = onDrop;
          onFileDrop(files.length === 0 ? null : files);
        } else {
          const onDataDrop = onDrop;
          onDataDrop(event.dataTransfer);
        }
      }
    });
  }
  return {
    isOverDropZone
  };
}
const useSharedOptions = createSharedComposable(() => {
  const options = useLocalStorage("ticket-allocator.options", []);
  const hideEmpty = computed(() => options.value.includes("hide-empty"));
  const altInfo = computed(() => options.value.includes("alt-info"));
  const unlocked = computed(() => options.value.includes("unlocked"));
  return reactive({
    all: options,
    hideEmpty,
    altInfo,
    unlocked
  });
});
const useSharedDisplayMode = createSharedComposable(
  () => useLocalStorage("ticket-allocator.display-mode", "weight")
);
const useSharedOperatorSorting = createSharedComposable(
  () => useLocalStorage("ticket-allocator.operator-sorting", "asc")
);
const useSharedTimestamp = createSharedComposable(() => useTimestamp({ interval: 1e3 }));
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Ticket",
  __ssrInlineRender: true,
  props: {
    ticket: null
  },
  setup(__props) {
    const props = __props;
    const tab = ref(null);
    const md = new MarkdownIt({ linkify: true });
    const options = useSharedOptions();
    const mode = useSharedDisplayMode();
    const config = computed(() => usePage().props.options);
    const threshold = computed(() => config.value[`${mode.value}_threshold`]);
    const position = computed(() => props.ticket[mode.value]);
    computed(() => position.value < 1e5 ? position.value : position.value.toExponential(1));
    const categoryName = () => {
      var _a2, _b2;
      return ((_a2 = props.ticket.meta) == null ? void 0 : _a2.category_name) ?? ((_b2 = props.ticket.category) == null ? void 0 : _b2.name) ?? "";
    };
    const categoryShort = () => {
      var _a2, _b2;
      return ((_a2 = props.ticket.meta) == null ? void 0 : _a2.category_short) ?? ((_b2 = props.ticket.category) == null ? void 0 : _b2.short) ?? "";
    };
    const title = () => {
      var _a2;
      return options.altInfo ? ((_a2 = props.ticket.meta) == null ? void 0 : _a2.title) ?? categoryShort() : categoryShort();
    };
    const cardTitle = computed(() => {
      var _a2;
      return ((_a2 = props.ticket.meta) == null ? void 0 : _a2.card_title) ?? "Title";
    });
    const cardSubtitle = computed(() => {
      var _a2;
      return ((_a2 = props.ticket.meta) == null ? void 0 : _a2.card_subtitle) ?? categoryName();
    });
    const cardContent = computed(() => {
      var _a2;
      return ((_a2 = props.ticket.meta) == null ? void 0 : _a2.card_content) ?? [];
    });
    const overflow = computed(() => position.value > threshold.value);
    const animation = computed(() => ({
      delay: -position.value + "s",
      duration: threshold.value + "s"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--1646e96c": unref(animation).delay,
        "--2595526d": unref(animation).duration
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-inline-block" }, _attrs, _cssVars))} data-v-6913c5ac>`);
      _push(ssrRenderComponent(VBtn, {
        size: "small",
        class: ["ticket justify-start px-2", { overflow: unref(overflow) }],
        ripple: false,
        flat: "",
        width: "100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            if ((_a2 = __props.ticket.meta) == null ? void 0 : _a2.icon) {
              _push2(ssrRenderComponent(VIcon, {
                icon: (_b2 = __props.ticket.meta) == null ? void 0 : _b2.icon,
                color: "white"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="text-white overflow-hidden" data-v-6913c5ac${_scopeId}><span class="title inline-block relative" data-v-6913c5ac${_scopeId}>${ssrInterpolate(title())}</span></span>`);
            _push2(ssrRenderComponent(VOverlay, {
              "open-on-click": "",
              activator: "parent",
              "location-strategy": "connected",
              location: "bottom center",
              origin: "auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a3, _b3;
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, {
                    width: "400",
                    "prepend-icon": (_a3 = __props.ticket.meta) == null ? void 0 : _a3.icon,
                    title: unref(cardTitle),
                    subtitle: unref(cardSubtitle)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: tab.value,
                          "onUpdate:modelValue": ($event) => tab.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: "properties" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(_ctx.$t("properties"))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(_ctx.$t("properties")), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTab, { value: "metrics" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(_ctx.$t("metrics"))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(_ctx.$t("metrics")), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTab, { value: "properties" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("properties")), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTab, { value: "metrics" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("metrics")), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VWindow, {
                                modelValue: tab.value,
                                "onUpdate:modelValue": ($event) => tab.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VWindowItem, {
                                      value: "properties",
                                      class: "prose"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (typeof unref(cardContent) === "string") {
                                            _push7(`<div data-v-6913c5ac${_scopeId6}>${unref(md).render(unref(cardContent))}</div>`);
                                          } else {
                                            _push7(`<table data-v-6913c5ac${_scopeId6}><tbody data-v-6913c5ac${_scopeId6}><!--[-->`);
                                            ssrRenderList(unref(cardContent), (value, key) => {
                                              _push7(`<tr data-v-6913c5ac${_scopeId6}><th data-v-6913c5ac${_scopeId6}>${ssrInterpolate(key)}</th><td data-v-6913c5ac${_scopeId6}>${unref(md).renderInline(value)}</td></tr>`);
                                            });
                                            _push7(`<!--]--></tbody></table>`);
                                          }
                                        } else {
                                          return [
                                            typeof unref(cardContent) === "string" ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              innerHTML: unref(md).render(unref(cardContent))
                                            }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("table", { key: 1 }, [
                                              createVNode("tbody", null, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(cardContent), (value, key) => {
                                                  return openBlock(), createBlock("tr", { key }, [
                                                    createVNode("th", null, toDisplayString(key), 1),
                                                    createVNode("td", {
                                                      innerHTML: unref(md).renderInline(value)
                                                    }, null, 8, ["innerHTML"])
                                                  ]);
                                                }), 128))
                                              ])
                                            ]))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VWindowItem, { value: "metrics" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Window Two`);
                                        } else {
                                          return [
                                            createTextVNode("Window Two")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VWindowItem, {
                                        value: "properties",
                                        class: "prose"
                                      }, {
                                        default: withCtx(() => [
                                          typeof unref(cardContent) === "string" ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            innerHTML: unref(md).render(unref(cardContent))
                                          }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("table", { key: 1 }, [
                                            createVNode("tbody", null, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(cardContent), (value, key) => {
                                                return openBlock(), createBlock("tr", { key }, [
                                                  createVNode("th", null, toDisplayString(key), 1),
                                                  createVNode("td", {
                                                    innerHTML: unref(md).renderInline(value)
                                                  }, null, 8, ["innerHTML"])
                                                ]);
                                              }), 128))
                                            ])
                                          ]))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VWindowItem, { value: "metrics" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Window Two")
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
                                createVNode(VWindow, {
                                  modelValue: tab.value,
                                  "onUpdate:modelValue": ($event) => tab.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VWindowItem, {
                                      value: "properties",
                                      class: "prose"
                                    }, {
                                      default: withCtx(() => [
                                        typeof unref(cardContent) === "string" ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          innerHTML: unref(md).render(unref(cardContent))
                                        }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("table", { key: 1 }, [
                                          createVNode("tbody", null, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(cardContent), (value, key) => {
                                              return openBlock(), createBlock("tr", { key }, [
                                                createVNode("th", null, toDisplayString(key), 1),
                                                createVNode("td", {
                                                  innerHTML: unref(md).renderInline(value)
                                                }, null, 8, ["innerHTML"])
                                              ]);
                                            }), 128))
                                          ])
                                        ]))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VWindowItem, { value: "metrics" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Window Two")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTabs, {
                            modelValue: tab.value,
                            "onUpdate:modelValue": ($event) => tab.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(VTab, { value: "properties" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("properties")), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(VTab, { value: "metrics" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("metrics")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VWindow, {
                                modelValue: tab.value,
                                "onUpdate:modelValue": ($event) => tab.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(VWindowItem, {
                                    value: "properties",
                                    class: "prose"
                                  }, {
                                    default: withCtx(() => [
                                      typeof unref(cardContent) === "string" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        innerHTML: unref(md).render(unref(cardContent))
                                      }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("table", { key: 1 }, [
                                        createVNode("tbody", null, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(cardContent), (value, key) => {
                                            return openBlock(), createBlock("tr", { key }, [
                                              createVNode("th", null, toDisplayString(key), 1),
                                              createVNode("td", {
                                                innerHTML: unref(md).renderInline(value)
                                              }, null, 8, ["innerHTML"])
                                            ]);
                                          }), 128))
                                        ])
                                      ]))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VWindowItem, { value: "metrics" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Window Two")
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
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, {
                      width: "400",
                      "prepend-icon": (_b3 = __props.ticket.meta) == null ? void 0 : _b3.icon,
                      title: unref(cardTitle),
                      subtitle: unref(cardSubtitle)
                    }, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: tab.value,
                          "onUpdate:modelValue": ($event) => tab.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(VTab, { value: "properties" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("properties")), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VTab, { value: "metrics" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("metrics")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VWindow, {
                              modelValue: tab.value,
                              "onUpdate:modelValue": ($event) => tab.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(VWindowItem, {
                                  value: "properties",
                                  class: "prose"
                                }, {
                                  default: withCtx(() => [
                                    typeof unref(cardContent) === "string" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      innerHTML: unref(md).render(unref(cardContent))
                                    }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("table", { key: 1 }, [
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(cardContent), (value, key) => {
                                          return openBlock(), createBlock("tr", { key }, [
                                            createVNode("th", null, toDisplayString(key), 1),
                                            createVNode("td", {
                                              innerHTML: unref(md).renderInline(value)
                                            }, null, 8, ["innerHTML"])
                                          ]);
                                        }), 128))
                                      ])
                                    ]))
                                  ]),
                                  _: 1
                                }),
                                createVNode(VWindowItem, { value: "metrics" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Window Two")
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
                      _: 1
                    }, 8, ["prepend-icon", "title", "subtitle"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              ((_c = __props.ticket.meta) == null ? void 0 : _c.icon) ? (openBlock(), createBlock(VIcon, {
                key: 0,
                icon: (_d = __props.ticket.meta) == null ? void 0 : _d.icon,
                color: "white"
              }, null, 8, ["icon"])) : createCommentVNode("", true),
              createVNode("span", { class: "text-white overflow-hidden" }, [
                createVNode("span", { class: "title inline-block relative" }, toDisplayString(title()), 1)
              ]),
              createVNode(VOverlay, {
                "open-on-click": "",
                activator: "parent",
                "location-strategy": "connected",
                location: "bottom center",
                origin: "auto"
              }, {
                default: withCtx(() => {
                  var _a3;
                  return [
                    createVNode(VCard, {
                      width: "400",
                      "prepend-icon": (_a3 = __props.ticket.meta) == null ? void 0 : _a3.icon,
                      title: unref(cardTitle),
                      subtitle: unref(cardSubtitle)
                    }, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: tab.value,
                          "onUpdate:modelValue": ($event) => tab.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(VTab, { value: "properties" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("properties")), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VTab, { value: "metrics" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("metrics")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VWindow, {
                              modelValue: tab.value,
                              "onUpdate:modelValue": ($event) => tab.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(VWindowItem, {
                                  value: "properties",
                                  class: "prose"
                                }, {
                                  default: withCtx(() => [
                                    typeof unref(cardContent) === "string" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      innerHTML: unref(md).render(unref(cardContent))
                                    }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("table", { key: 1 }, [
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(cardContent), (value, key) => {
                                          return openBlock(), createBlock("tr", { key }, [
                                            createVNode("th", null, toDisplayString(key), 1),
                                            createVNode("td", {
                                              innerHTML: unref(md).renderInline(value)
                                            }, null, 8, ["innerHTML"])
                                          ]);
                                        }), 128))
                                      ])
                                    ]))
                                  ]),
                                  _: 1
                                }),
                                createVNode(VWindowItem, { value: "metrics" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Window Two")
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
                      _: 1
                    }, 8, ["prepend-icon", "title", "subtitle"])
                  ];
                }),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const Ticket_vue_vue_type_style_index_0_scoped_6913c5ac_lang = "";
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Ticket.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TicketComponent = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6913c5ac"]]);
class Query extends Query$1 {
  increment(record) {
    return this.incrementOrDecrement(record, true);
  }
  decrement(record) {
    return this.incrementOrDecrement(record, false);
  }
  incrementOrDecrement(record, increment) {
    const models = this.get(false);
    if (models.length === 0)
      return [];
    const newModels = models.map((model) => {
      const newRecord = model.$getAttributes();
      for (const key in record) {
        if (Object.prototype.hasOwnProperty.call(newRecord, key) && typeof newRecord[key] === "number") {
          increment ? newRecord[key] += record[key] : newRecord[key] -= record[key];
        }
      }
      const newModel = this.hydrate(newRecord, { action: "update", operation: "set" });
      if (model.$self().updating(model, record) === false)
        return model;
      newModel.$self().updated(newModel);
      return newModel;
    });
    this.commit("update", this.compile(newModels));
    return newModels;
  }
}
class Repository extends Repository$1 {
  query() {
    return new Query(this.database, this.getModel(), this.queryCache, this.hydratedDataCache, this.pinia);
  }
}
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
class TeamOperator extends Model {
}
__publicField(TeamOperator, "entity", "teamOperator");
__publicField(TeamOperator, "primaryKey", ["team_uuid", "operator_uuid"]);
__decorateClass$5([
  Uid()
], TeamOperator.prototype, "team_uuid", 2);
__decorateClass$5([
  Uid()
], TeamOperator.prototype, "operator_uuid", 2);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
let Operator$1 = (_a = class extends Model {
  get ticket_count() {
    return this.tickets.length;
  }
  get free_slots() {
    return this.ticket_limit !== null ? Math.max(0, this.ticket_limit - this.ticket_count) : null;
  }
  get total_complexity() {
    return this.tickets.reduce((n, { complexity }) => n + complexity, 0);
  }
  get free_complexity() {
    return this.complexity_limit !== null ? Math.max(0, this.complexity_limit - this.total_complexity) : null;
  }
}, __publicField(_a, "entity", "operators"), __publicField(_a, "primaryKey", "uuid"), _a);
__decorateClass$4([
  Uid()
], Operator$1.prototype, "uuid", 2);
__decorateClass$4([
  Attr()
], Operator$1.prototype, "user_id", 2);
__decorateClass$4([
  Str("")
], Operator$1.prototype, "name", 2);
__decorateClass$4([
  Bool(false)
], Operator$1.prototype, "online", 2);
__decorateClass$4([
  Bool(false)
], Operator$1.prototype, "ready", 2);
__decorateClass$4([
  Num(null)
], Operator$1.prototype, "ticket_limit", 2);
__decorateClass$4([
  Num(null)
], Operator$1.prototype, "complexity_limit", 2);
__decorateClass$4([
  BelongsToMany(() => OperatorTeam, () => TeamOperator, "operator_uuid", "team_uuid")
], Operator$1.prototype, "teams", 2);
__decorateClass$4([
  HasMany(() => Ticket$1, "handler_uuid"),
  OnDelete("set null")
], Operator$1.prototype, "tickets", 2);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
class TeamCategory extends Model {
}
__publicField(TeamCategory, "entity", "teamCategory");
__publicField(TeamCategory, "primaryKey", ["team_uuid", "category_uuid"]);
__decorateClass$3([
  Uid()
], TeamCategory.prototype, "team_uuid", 2);
__decorateClass$3([
  Uid()
], TeamCategory.prototype, "category_uuid", 2);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
class OperatorTeam extends Model {
}
__publicField(OperatorTeam, "entity", "operatorTeams");
__publicField(OperatorTeam, "primaryKey", "uuid");
__decorateClass$2([
  Uid()
], OperatorTeam.prototype, "uuid", 2);
__decorateClass$2([
  Str("")
], OperatorTeam.prototype, "name", 2);
__decorateClass$2([
  Str("")
], OperatorTeam.prototype, "description", 2);
__decorateClass$2([
  Attr()
], OperatorTeam.prototype, "created_at", 2);
__decorateClass$2([
  Attr()
], OperatorTeam.prototype, "updated_at", 2);
__decorateClass$2([
  Attr()
], OperatorTeam.prototype, "deleted_at", 2);
__decorateClass$2([
  BelongsToMany(() => Operator$1, () => TeamOperator, "team_uuid", "operator_uuid")
], OperatorTeam.prototype, "operators", 2);
__decorateClass$2([
  BelongsToMany(() => TicketCategory, () => TeamCategory, "team_uuid", "category_uuid")
], OperatorTeam.prototype, "ticketCategories", 2);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
class TicketCategory extends Model {
}
__publicField(TicketCategory, "entity", "ticketCategories");
__publicField(TicketCategory, "primaryKey", "uuid");
__decorateClass$1([
  Uid()
], TicketCategory.prototype, "uuid", 2);
__decorateClass$1([
  Str("")
], TicketCategory.prototype, "name", 2);
__decorateClass$1([
  Str("")
], TicketCategory.prototype, "short", 2);
__decorateClass$1([
  Num(0)
], TicketCategory.prototype, "initial_weight", 2);
__decorateClass$1([
  Num(0)
], TicketCategory.prototype, "weight_increment", 2);
__decorateClass$1([
  Num(0)
], TicketCategory.prototype, "complexity", 2);
__decorateClass$1([
  Num(0)
], TicketCategory.prototype, "delay", 2);
__decorateClass$1([
  Attr()
], TicketCategory.prototype, "created_at", 2);
__decorateClass$1([
  Attr()
], TicketCategory.prototype, "updated_at", 2);
__decorateClass$1([
  BelongsToMany(() => OperatorTeam, () => TeamCategory, "category_uuid", "team_uuid")
], TicketCategory.prototype, "teams", 2);
__decorateClass$1([
  HasMany(() => Ticket$1, "category_uuid")
], TicketCategory.prototype, "tickets", 2);
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
let Ticket$1 = (_b = class extends Model {
  get duration() {
    return Math.round((useSharedTimestamp().value - new Date(this.created_at).getTime()) / 1e3);
  }
  get weight() {
    return this.initial_weight + this.weight_increment * this.duration;
  }
}, __publicField(_b, "entity", "tickets"), __publicField(_b, "primaryKey", "uuid"), _b);
__decorateClass([
  Uid()
], Ticket$1.prototype, "uuid", 2);
__decorateClass([
  Str("")
], Ticket$1.prototype, "category_uuid", 2);
__decorateClass([
  Str(null)
], Ticket$1.prototype, "handler_uuid", 2);
__decorateClass([
  Attr()
], Ticket$1.prototype, "meta", 2);
__decorateClass([
  Attr()
], Ticket$1.prototype, "metrics", 2);
__decorateClass([
  Num(0)
], Ticket$1.prototype, "initial_weight", 2);
__decorateClass([
  Num(0)
], Ticket$1.prototype, "weight_increment", 2);
__decorateClass([
  Num(0)
], Ticket$1.prototype, "complexity", 2);
__decorateClass([
  Num(0)
], Ticket$1.prototype, "delay", 2);
__decorateClass([
  Attr()
], Ticket$1.prototype, "created_at", 2);
__decorateClass([
  BelongsTo(() => TicketCategory, "category_uuid")
], Ticket$1.prototype, "category", 2);
__decorateClass([
  BelongsTo(() => Operator$1, "handler_uuid")
], Ticket$1.prototype, "handler", 2);
class TicketRepository extends Repository {
  constructor() {
    super(...arguments);
    __publicField(this, "use", Ticket$1);
    __publicField(this, "create", (payload) => {
      this.save({
        uuid: payload.uuid,
        category_uuid: payload.categoryUuid,
        handler_uuid: payload.operatorUuid,
        initial_weight: payload.initialWeight,
        weight_increment: payload.weightIncrement,
        complexity: payload.complexity,
        delay: payload.delay,
        meta: payload.meta,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
    });
    __publicField(this, "close", ({ uuid }) => {
      this.destroy(uuid);
    });
    __publicField(this, "bind", ({ uuid, operatorUuid, meta }) => {
      var _a2;
      const ticketMeta = ((_a2 = this.find(uuid)) == null ? void 0 : _a2.meta) ?? {};
      meta = { ...ticketMeta, ...meta };
      this.where("uuid", uuid).update({ handler_uuid: operatorUuid, meta });
    });
    __publicField(this, "unbind", ({ uuid }) => {
      this.where("uuid", uuid).update({ handler_uuid: null });
    });
    __publicField(this, "changeCategory", ({ uuid, categoryUuid, meta }) => {
      var _a2;
      const ticketMeta = ((_a2 = this.find(uuid)) == null ? void 0 : _a2.meta) ?? {};
      meta = { ...ticketMeta, ...meta };
      this.where("uuid", uuid).update({ category_uuid: categoryUuid, meta });
    });
    __publicField(this, "setMetaValue", ({ uuid, key, value }) => {
      var _a2;
      const meta = ((_a2 = this.find(uuid)) == null ? void 0 : _a2.meta) ?? {};
      meta[key] = value;
      this.where("uuid", uuid).update({ meta });
    });
    __publicField(this, "mergeMetaValues", ({ uuid, meta }) => {
      var _a2;
      const ticketMeta = ((_a2 = this.find(uuid)) == null ? void 0 : _a2.meta) ?? {};
      meta = { ...ticketMeta, ...meta };
      this.where("uuid", uuid).update({ meta });
    });
    __publicField(this, "adjustMetrics", ({ uuid, factorUuid, adjustments }) => {
      var _a2;
      let metrics = ((_a2 = this.find(uuid)) == null ? void 0 : _a2.metrics) ?? {};
      metrics = { ...metrics, ...adjustments };
      this.where("uuid", uuid).update({ metrics });
    });
  }
  unbound() {
    return this.where("handler_uuid", null);
  }
  bound(handlerUuid) {
    return this.where("handler_uuid", handlerUuid);
  }
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TicketPool",
  __ssrInlineRender: true,
  props: {
    tickets: null
  },
  setup(__props) {
    const ticketPool = ref(null);
    useDragAndDrop(ticketPool, "uuid");
    const { lock, unlock, element, triggerElement } = usePointerLock(ticketPool);
    const { x } = useMouse({ type: "movement" });
    computed(() => useRepo(TicketRepository));
    watch([element, x], ([element2, x2]) => {
      if (!element2 || !triggerElement.value)
        return;
      triggerElement.value.dataset.uuid;
    });
    const animationEnabled = ref(false);
    onMounted(() => {
      setTimeout(() => animationEnabled.value = true, 500);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "ticketPool",
        ref: ticketPool
      }, _attrs))} data-v-bf79fb3f><!--[-->`);
      ssrRenderList(__props.tickets, (ticket) => {
        _push(ssrRenderComponent(TicketComponent, {
          key: ticket.uuid,
          "data-uuid": ticket.uuid,
          ticket,
          draggable: "true",
          class: "mr-1 mb-1",
          onMousedown: unref(lock)
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const TicketPool_vue_vue_type_style_index_0_scoped_bf79fb3f_lang = "";
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/TicketPool.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const TicketPool = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-bf79fb3f"]]);
function useSupervisorApi() {
  async function ready(operatorUuid, ready2) {
    return await window.axios.patch(P("ticket-allocator.operators.ready", operatorUuid), { ready: ready2 });
  }
  async function weight(ticketUuid, weightPoints) {
    return await window.axios.patch(P("ticket-allocator.tickets.weight", ticketUuid), {
      weight_points: weightPoints
    });
  }
  async function handler(ticketUuid, operatorUuid) {
    return await window.axios.patch(P("ticket-allocator.tickets.handler", ticketUuid), {
      operator_uuid: operatorUuid ?? null
    });
  }
  async function close(ticketUuid) {
    return await window.axios.delete(P("ticket-allocator.tickets.close", ticketUuid));
  }
  return { ready, weight, handler, close };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TicketRow",
  __ssrInlineRender: true,
  props: {
    tickets: null
  },
  setup(__props) {
    const props = __props;
    let collapsed = ref(false);
    const complexity = computed(() => props.tickets.reduce((n, { complexity: complexity2 }) => n + complexity2, 0));
    const moreIcon = computed(() => collapsed.value ? "mdi-chevron-down" : "mdi-chevron-up");
    const api = useSupervisorApi();
    const ticketRow = ref(null);
    const { isOverDropZone } = useDropZone(
      ticketRow,
      async (dataTransfer) => {
        var _a2;
        const uuid = dataTransfer == null ? void 0 : dataTransfer.getData("text/plain");
        if (!uuid)
          throw new Error("Ticket UUID undefined.");
        const operatorUuid = (_a2 = ticketRow.value) == null ? void 0 : _a2.dataset.uuid;
        return await api.handler(uuid, operatorUuid);
      },
      false
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(mergeProps({
        ref_key: "ticketRow",
        ref: ticketRow,
        class: ["ticket-row", { dragover: unref(isOverDropZone) }]
      }, _attrs))} data-v-00a5e317><td class="status" data-v-00a5e317>`);
      ssrRenderSlot(_ctx.$slots, "status", {}, null, _push, _parent);
      _push(`</td><td class="name font-weight-bold" data-v-00a5e317>`);
      ssrRenderSlot(_ctx.$slots, "name", {}, null, _push, _parent);
      _push(`</td><td class="load text-center" data-v-00a5e317>`);
      ssrRenderSlot(_ctx.$slots, "load", {}, () => {
        _push(`${ssrInterpolate(__props.tickets.length)}`);
      }, _push, _parent);
      _push(`/`);
      ssrRenderSlot(_ctx.$slots, "load-max", {}, () => {
        _push(`∞`);
      }, _push, _parent);
      _push(`</td><td class="complexity text-center" data-v-00a5e317>`);
      ssrRenderSlot(_ctx.$slots, "complexity", {}, () => {
        _push(`${ssrInterpolate(unref(complexity))}`);
      }, _push, _parent);
      _push(`/`);
      ssrRenderSlot(_ctx.$slots, "complexity-max", {}, () => {
        _push(`∞`);
      }, _push, _parent);
      _push(`</td><td class="${ssrRenderClass([{ collapsed: unref(collapsed) }, "tickets pt-1"])}" data-v-00a5e317>`);
      _push(ssrRenderComponent(TicketPool, { tickets: __props.tickets }, null, _parent));
      _push(`</td><td class="more text-center" data-v-00a5e317>`);
      _push(ssrRenderComponent(VBtn, {
        size: "x-small",
        variant: "tonal",
        icon: unref(moreIcon),
        onClick: ($event) => isRef(collapsed) ? collapsed.value = !unref(collapsed) : collapsed = !unref(collapsed)
      }, null, _parent));
      _push(`</td></tr>`);
    };
  }
});
const TicketRow_vue_vue_type_style_index_0_scoped_00a5e317_lang = "";
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/TicketRow.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TicketRow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-00a5e317"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OperatorRow",
  __ssrInlineRender: true,
  props: {
    operator: null
  },
  setup(__props) {
    const props = __props;
    const status = computed(() => {
      var _a2, _b2;
      return {
        online: props.operator.online,
        ready: props.operator.ready,
        busy: !!((_a2 = props.operator.tickets) == null ? void 0 : _a2.length),
        full: props.operator.ticket_limit !== null && ((_b2 = props.operator.tickets) == null ? void 0 : _b2.length) >= props.operator.ticket_limit
      };
    });
    const api = useSupervisorApi();
    const toggleReadiness = async () => await api.ready(props.operator.uuid, !props.operator.ready);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(TicketRow, mergeProps({
        tickets: __props.operator.tickets,
        "data-uuid": __props.operator.uuid,
        class: ["operator", unref(status)]
      }, _attrs), {
        status: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-account",
              onClick: toggleReadiness
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-account",
                onClick: toggleReadiness
              })
            ];
          }
        }),
        "load-max": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.operator.ticket_limit ?? "∞")}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.operator.ticket_limit ?? "∞"), 1)
            ];
          }
        }),
        "complexity-max": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.operator.complexity_limit ?? "∞")}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.operator.complexity_limit ?? "∞"), 1)
            ];
          }
        }),
        name: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.operator.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.operator.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const OperatorRow_vue_vue_type_style_index_0_scoped_a776c74a_lang = "";
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/OperatorRow.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const OperatorRow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a776c74a"]]);
const Channel = "ticket-allocator";
var Operator = /* @__PURE__ */ ((Operator2) => {
  Operator2["Commented"] = ".operator.commented";
  Operator2["ComplexityLimitAdjusted"] = ".operator.complexity-limit-adjusted";
  Operator2["Enrolled"] = ".operator.enrolled";
  Operator2["JoinedTeam"] = ".operator.joined-team";
  Operator2["LeftTeam"] = ".operator.left-team";
  Operator2["SetTeams"] = ".operator.set-teams";
  Operator2["NameChanged"] = ".operator.name-changed";
  Operator2["NotReady"] = ".operator.not-ready";
  Operator2["Offline"] = ".operator.offline";
  Operator2["Online"] = ".operator.online";
  Operator2["Ready"] = ".operator.ready";
  Operator2["Resigned"] = ".operator.resigned";
  Operator2["TicketCategoryAttached"] = ".operator.ticket-category-attached";
  Operator2["TicketCategoryDetached"] = ".operator.ticket-category-detached";
  Operator2["TicketLimitAdjusted"] = ".operator.ticket-limit-adjusted";
  return Operator2;
})(Operator || {});
var Ticket = /* @__PURE__ */ ((Ticket2) => {
  Ticket2["Bound"] = ".ticket.bound";
  Ticket2["CategoryChanged"] = ".ticket.category-changed";
  Ticket2["MetaValueSet"] = ".ticket.meta-value-set";
  Ticket2["MetaValuesMerged"] = ".ticket.meta-values-merged";
  Ticket2["MetricsAdjusted"] = ".ticket.metrics-adjusted";
  Ticket2["Closed"] = ".ticket.closed";
  Ticket2["Created"] = ".ticket.created";
  Ticket2["Unbound"] = ".ticket.unbound";
  return Ticket2;
})(Ticket || {});
class OperatorRepository extends Repository$1 {
  constructor() {
    super(...arguments);
    __publicField(this, "use", Operator$1);
    __publicField(this, "enroll", (payload) => {
      this.save({
        uuid: payload.uuid,
        user_id: payload.userId,
        name: payload.name,
        online: payload.online,
        ready: payload.ready,
        ticket_limit: payload.ticketLimit,
        complexity_limit: payload.complexityLimit
      });
    });
    __publicField(this, "resign", ({ uuid }) => {
      this.destroy(uuid);
    });
    __publicField(this, "changeName", ({ uuid, name }) => {
      this.where("uuid", uuid).update({ name });
    });
    __publicField(this, "setOnline", ({ uuid }) => {
      this.where("uuid", uuid).update({ online: true });
    });
    __publicField(this, "setOffline", ({ uuid }) => {
      this.where("uuid", uuid).update({ online: false });
    });
    __publicField(this, "setReady", ({ uuid }) => {
      this.where("uuid", uuid).update({ ready: true });
    });
    __publicField(this, "setNotReady", ({ uuid }) => {
      this.where("uuid", uuid).update({ ready: false });
    });
    __publicField(this, "adjustTicketLimit", ({ uuid, ticketLimit }) => {
      this.where("uuid", uuid).update({ ticket_limit: ticketLimit });
    });
    __publicField(this, "adjustComplexityLimit", ({ uuid, complexityLimit }) => {
      this.where("uuid", uuid).update({ complexity_limit: complexityLimit });
    });
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    operators: null,
    tickets: null,
    ticketCategories: null
  },
  setup(__props) {
    const props = __props;
    const options = useSharedOptions();
    const mode = useSharedDisplayMode();
    const oprSort = useSharedOperatorSorting();
    const operatorRepo = computed(() => useRepo(OperatorRepository));
    const ticketRepo = computed(() => useRepo(TicketRepository));
    const ticketCategoryRepo = computed(() => useRepo(TicketCategory));
    const sortedOperators = refThrottled(
      computed(
        () => useCollect(
          operatorRepo.value.with("tickets", (query) => {
            query.with("category").orderBy(mode.value, "desc");
          }).get()
        ).sortBy([
          ["online", "desc"],
          ["ready", "desc"],
          ["free_slots", "desc"],
          ["ticket_count", "asc"],
          ["name", "asc"]
        ])
      ),
      750
    );
    const sortedTickets = refThrottled(
      computed(() => ticketRepo.value.unbound().with("category").orderBy(mode.value, "desc").get()),
      750
    );
    const api = useSupervisorApi();
    const closeTicket = ref(null);
    const { isOverDropZone } = useDropZone(
      closeTicket,
      async (dataTransfer) => {
        const uuid = dataTransfer == null ? void 0 : dataTransfer.getData("text/plain");
        if (!uuid)
          throw new Error("Ticket UUID undefined.");
        return await api.close(uuid);
      },
      false
    );
    onMounted(() => {
      operatorRepo.value.fresh(props.operators);
      ticketRepo.value.fresh(props.tickets);
      ticketCategoryRepo.value.fresh(props.ticketCategories);
      window.ticketAllocatorChannel = window.Echo.channel(Channel);
      window.ticketAllocatorChannel.listenToAll((event, data) => {
        console.log(event, data);
      });
      window.ticketAllocatorChannel.listen(Operator.Enrolled, operatorRepo.value.enroll).listen(Operator.Resigned, operatorRepo.value.resign).listen(Operator.NameChanged, operatorRepo.value.changeName).listen(Operator.Online, operatorRepo.value.setOnline).listen(Operator.Offline, operatorRepo.value.setOffline).listen(Operator.Ready, operatorRepo.value.setReady).listen(Operator.NotReady, operatorRepo.value.setNotReady).listen(Operator.TicketLimitAdjusted, operatorRepo.value.adjustTicketLimit).listen(Operator.ComplexityLimitAdjusted, operatorRepo.value.adjustComplexityLimit).listen(Ticket.Created, ticketRepo.value.create).listen(Ticket.Closed, ticketRepo.value.close).listen(Ticket.Bound, ticketRepo.value.bind).listen(Ticket.Unbound, ticketRepo.value.unbind).listen(Ticket.CategoryChanged, ticketRepo.value.changeCategory).listen(Ticket.MetaValueSet, ticketRepo.value.setMetaValue).listen(Ticket.MetaValuesMerged, ticketRepo.value.mergeMetaValues).listen(Ticket.MetricsAdjusted, ticketRepo.value.adjustMetrics);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("dashboard")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-29a9bdd4${_scopeId}>${ssrInterpolate(_ctx.$t("dashboard"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t("dashboard")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-29a9bdd4${_scopeId}>`);
            _push2(ssrRenderComponent(VContainer, { fluid: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtnToggle, {
                                modelValue: unref(options).all,
                                "onUpdate:modelValue": ($event) => unref(options).all = $event,
                                variant: "plain",
                                multiple: ""
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      value: "hide-empty",
                                      icon: unref(options).hideEmpty ? "mdi-eye-off-outline" : "mdi-eye-outline"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      value: "alt-info",
                                      icon: unref(options).altInfo ? "mdi-magnify-plus-outline" : "mdi-magnify"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      value: "unlocked",
                                      icon: unref(options).unlocked ? "mdi-lock-open-variant" : "mdi-lock",
                                      color: "red",
                                      variant: unref(options).unlocked ? "text" : "plain"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        value: "hide-empty",
                                        icon: unref(options).hideEmpty ? "mdi-eye-off-outline" : "mdi-eye-outline"
                                      }, null, 8, ["icon"]),
                                      createVNode(VBtn, {
                                        value: "alt-info",
                                        icon: unref(options).altInfo ? "mdi-magnify-plus-outline" : "mdi-magnify"
                                      }, null, 8, ["icon"]),
                                      createVNode(VBtn, {
                                        value: "unlocked",
                                        icon: unref(options).unlocked ? "mdi-lock-open-variant" : "mdi-lock",
                                        color: "red",
                                        variant: unref(options).unlocked ? "text" : "plain"
                                      }, null, 8, ["icon", "variant"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(options).unlocked) {
                                _push5(ssrRenderComponent(VBtnGroup, { variant: "plain" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        ref_key: "closeTicket",
                                        ref: closeTicket,
                                        icon: unref(isOverDropZone) ? "mdi-delete-empty" : "mdi-delete"
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, { icon: "mdi-refresh" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          ref_key: "closeTicket",
                                          ref: closeTicket,
                                          icon: unref(isOverDropZone) ? "mdi-delete-empty" : "mdi-delete"
                                        }, null, 8, ["icon"]),
                                        createVNode(VBtn, { icon: "mdi-refresh" })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(VBtnToggle, {
                                  modelValue: unref(options).all,
                                  "onUpdate:modelValue": ($event) => unref(options).all = $event,
                                  variant: "plain",
                                  multiple: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      value: "hide-empty",
                                      icon: unref(options).hideEmpty ? "mdi-eye-off-outline" : "mdi-eye-outline"
                                    }, null, 8, ["icon"]),
                                    createVNode(VBtn, {
                                      value: "alt-info",
                                      icon: unref(options).altInfo ? "mdi-magnify-plus-outline" : "mdi-magnify"
                                    }, null, 8, ["icon"]),
                                    createVNode(VBtn, {
                                      value: "unlocked",
                                      icon: unref(options).unlocked ? "mdi-lock-open-variant" : "mdi-lock",
                                      color: "red",
                                      variant: unref(options).unlocked ? "text" : "plain"
                                    }, null, 8, ["icon", "variant"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                unref(options).unlocked ? (openBlock(), createBlock(VBtnGroup, {
                                  key: 0,
                                  variant: "plain"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      ref_key: "closeTicket",
                                      ref: closeTicket,
                                      icon: unref(isOverDropZone) ? "mdi-delete-empty" : "mdi-delete"
                                    }, null, 8, ["icon"]),
                                    createVNode(VBtn, { icon: "mdi-refresh" })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSwitch, {
                                modelValue: unref(oprSort),
                                "onUpdate:modelValue": ($event) => isRef(oprSort) ? oprSort.value = $event : null,
                                "false-value": "asc",
                                "true-value": "desc",
                                "prepend-icon": "mdi-sort-ascending",
                                "append-icon": "mdi-sort-descending",
                                class: "d-flex justify-end"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSwitch, {
                                  modelValue: unref(oprSort),
                                  "onUpdate:modelValue": ($event) => isRef(oprSort) ? oprSort.value = $event : null,
                                  "false-value": "asc",
                                  "true-value": "desc",
                                  "prepend-icon": "mdi-sort-ascending",
                                  "append-icon": "mdi-sort-descending",
                                  class: "d-flex justify-end"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSwitch, {
                                modelValue: unref(mode),
                                "onUpdate:modelValue": ($event) => isRef(mode) ? mode.value = $event : null,
                                "false-value": "weight",
                                "true-value": "duration",
                                "prepend-icon": "mdi-weight",
                                "append-icon": "mdi-clock",
                                class: "d-flex justify-end"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSwitch, {
                                  modelValue: unref(mode),
                                  "onUpdate:modelValue": ($event) => isRef(mode) ? mode.value = $event : null,
                                  "false-value": "weight",
                                  "true-value": "duration",
                                  "prepend-icon": "mdi-weight",
                                  "append-icon": "mdi-clock",
                                  class: "d-flex justify-end"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtnToggle, {
                                modelValue: unref(options).all,
                                "onUpdate:modelValue": ($event) => unref(options).all = $event,
                                variant: "plain",
                                multiple: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    value: "hide-empty",
                                    icon: unref(options).hideEmpty ? "mdi-eye-off-outline" : "mdi-eye-outline"
                                  }, null, 8, ["icon"]),
                                  createVNode(VBtn, {
                                    value: "alt-info",
                                    icon: unref(options).altInfo ? "mdi-magnify-plus-outline" : "mdi-magnify"
                                  }, null, 8, ["icon"]),
                                  createVNode(VBtn, {
                                    value: "unlocked",
                                    icon: unref(options).unlocked ? "mdi-lock-open-variant" : "mdi-lock",
                                    color: "red",
                                    variant: unref(options).unlocked ? "text" : "plain"
                                  }, null, 8, ["icon", "variant"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(options).unlocked ? (openBlock(), createBlock(VBtnGroup, {
                                key: 0,
                                variant: "plain"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    ref_key: "closeTicket",
                                    ref: closeTicket,
                                    icon: unref(isOverDropZone) ? "mdi-delete-empty" : "mdi-delete"
                                  }, null, 8, ["icon"]),
                                  createVNode(VBtn, { icon: "mdi-refresh" })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "2" }, {
                            default: withCtx(() => [
                              createVNode(VSwitch, {
                                modelValue: unref(oprSort),
                                "onUpdate:modelValue": ($event) => isRef(oprSort) ? oprSort.value = $event : null,
                                "false-value": "asc",
                                "true-value": "desc",
                                "prepend-icon": "mdi-sort-ascending",
                                "append-icon": "mdi-sort-descending",
                                class: "d-flex justify-end"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "2" }, {
                            default: withCtx(() => [
                              createVNode(VSwitch, {
                                modelValue: unref(mode),
                                "onUpdate:modelValue": ($event) => isRef(mode) ? mode.value = $event : null,
                                "false-value": "weight",
                                "true-value": "duration",
                                "prepend-icon": "mdi-weight",
                                "append-icon": "mdi-clock",
                                class: "d-flex justify-end"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(VBtnToggle, {
                              modelValue: unref(options).all,
                              "onUpdate:modelValue": ($event) => unref(options).all = $event,
                              variant: "plain",
                              multiple: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  value: "hide-empty",
                                  icon: unref(options).hideEmpty ? "mdi-eye-off-outline" : "mdi-eye-outline"
                                }, null, 8, ["icon"]),
                                createVNode(VBtn, {
                                  value: "alt-info",
                                  icon: unref(options).altInfo ? "mdi-magnify-plus-outline" : "mdi-magnify"
                                }, null, 8, ["icon"]),
                                createVNode(VBtn, {
                                  value: "unlocked",
                                  icon: unref(options).unlocked ? "mdi-lock-open-variant" : "mdi-lock",
                                  color: "red",
                                  variant: unref(options).unlocked ? "text" : "plain"
                                }, null, 8, ["icon", "variant"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(options).unlocked ? (openBlock(), createBlock(VBtnGroup, {
                              key: 0,
                              variant: "plain"
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  ref_key: "closeTicket",
                                  ref: closeTicket,
                                  icon: unref(isOverDropZone) ? "mdi-delete-empty" : "mdi-delete"
                                }, null, 8, ["icon"]),
                                createVNode(VBtn, { icon: "mdi-refresh" })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "2" }, {
                          default: withCtx(() => [
                            createVNode(VSwitch, {
                              modelValue: unref(oprSort),
                              "onUpdate:modelValue": ($event) => isRef(oprSort) ? oprSort.value = $event : null,
                              "false-value": "asc",
                              "true-value": "desc",
                              "prepend-icon": "mdi-sort-ascending",
                              "append-icon": "mdi-sort-descending",
                              class: "d-flex justify-end"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "2" }, {
                          default: withCtx(() => [
                            createVNode(VSwitch, {
                              modelValue: unref(mode),
                              "onUpdate:modelValue": ($event) => isRef(mode) ? mode.value = $event : null,
                              "false-value": "weight",
                              "true-value": "duration",
                              "prepend-icon": "mdi-weight",
                              "append-icon": "mdi-clock",
                              class: "d-flex justify-end"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(VTable, {
              density: "compact",
              class: "ticket-monitor"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tbody class="align-text-top" data-v-29a9bdd4${_scopeId2}>`);
                  _push3(ssrRenderComponent(TicketRow, { tickets: unref(sortedTickets) }, {
                    name: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("ticket_pool"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("ticket_pool")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(sortedOperators), (operator) => {
                    _push3(ssrRenderComponent(OperatorRow, {
                      key: operator.uuid,
                      operator
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("tbody", { class: "align-text-top" }, [
                      createVNode(TicketRow, { tickets: unref(sortedTickets) }, {
                        name: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("ticket_pool")), 1)
                        ]),
                        _: 1
                      }, 8, ["tickets"]),
                      createVNode(TransitionGroup, { name: "operator-pool" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(sortedOperators), (operator) => {
                            return openBlock(), createBlock(OperatorRow, {
                              key: operator.uuid,
                              operator
                            }, null, 8, ["operator"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(VContainer, { fluid: "" }, {
                  default: withCtx(() => [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(VBtnToggle, {
                              modelValue: unref(options).all,
                              "onUpdate:modelValue": ($event) => unref(options).all = $event,
                              variant: "plain",
                              multiple: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  value: "hide-empty",
                                  icon: unref(options).hideEmpty ? "mdi-eye-off-outline" : "mdi-eye-outline"
                                }, null, 8, ["icon"]),
                                createVNode(VBtn, {
                                  value: "alt-info",
                                  icon: unref(options).altInfo ? "mdi-magnify-plus-outline" : "mdi-magnify"
                                }, null, 8, ["icon"]),
                                createVNode(VBtn, {
                                  value: "unlocked",
                                  icon: unref(options).unlocked ? "mdi-lock-open-variant" : "mdi-lock",
                                  color: "red",
                                  variant: unref(options).unlocked ? "text" : "plain"
                                }, null, 8, ["icon", "variant"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(options).unlocked ? (openBlock(), createBlock(VBtnGroup, {
                              key: 0,
                              variant: "plain"
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  ref_key: "closeTicket",
                                  ref: closeTicket,
                                  icon: unref(isOverDropZone) ? "mdi-delete-empty" : "mdi-delete"
                                }, null, 8, ["icon"]),
                                createVNode(VBtn, { icon: "mdi-refresh" })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "2" }, {
                          default: withCtx(() => [
                            createVNode(VSwitch, {
                              modelValue: unref(oprSort),
                              "onUpdate:modelValue": ($event) => isRef(oprSort) ? oprSort.value = $event : null,
                              "false-value": "asc",
                              "true-value": "desc",
                              "prepend-icon": "mdi-sort-ascending",
                              "append-icon": "mdi-sort-descending",
                              class: "d-flex justify-end"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "2" }, {
                          default: withCtx(() => [
                            createVNode(VSwitch, {
                              modelValue: unref(mode),
                              "onUpdate:modelValue": ($event) => isRef(mode) ? mode.value = $event : null,
                              "false-value": "weight",
                              "true-value": "duration",
                              "prepend-icon": "mdi-weight",
                              "append-icon": "mdi-clock",
                              class: "d-flex justify-end"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VTable, {
                  density: "compact",
                  class: "ticket-monitor"
                }, {
                  default: withCtx(() => [
                    createVNode("tbody", { class: "align-text-top" }, [
                      createVNode(TicketRow, { tickets: unref(sortedTickets) }, {
                        name: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("ticket_pool")), 1)
                        ]),
                        _: 1
                      }, 8, ["tickets"]),
                      createVNode(TransitionGroup, { name: "operator-pool" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(sortedOperators), (operator) => {
                            return openBlock(), createBlock(OperatorRow, {
                              key: operator.uuid,
                              operator
                            }, null, 8, ["operator"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
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
const Dashboard_vue_vue_type_style_index_0_scoped_29a9bdd4_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29a9bdd4"]]);
export {
  Dashboard as default
};
//# sourceMappingURL=Dashboard-8ad2670c.mjs.map
