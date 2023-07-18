import { defineComponent, ref, computed, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Default-480a3e0a.js";
import { usePage, Head } from "@inertiajs/vue3";
import { uniqueId, sample, random, remove, reverse, shuffle } from "lodash";
import { T as TransitionGroup } from "./TransitionGroup-34a587b3.js";
import TransOperator from "./TransOperator-4327e0be.js";
import { Z as VTable, V as VBtn } from "../ssr.js";
import { V as VContainer } from "./VContainer-1fde1c56.js";
import { V as VRow, a as VCol } from "./VRow-3c4fefb5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "laravel-vue-i18n";
import "@vue/shared";
import "./TransSub-eb33a626.js";
import "./TransTicket-ea6b7d20.js";
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
  __name: "Trans",
  __ssrInlineRender: true,
  setup(__props) {
    const operatorNames = ["Apollo", "Hermes", "Ares", "Zeus", "Poseidon", "Dionysus", "Aphrodite", "Hephaestus", "Athena"];
    const ticketNames = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];
    const operators = ref([]);
    const config = computed(() => usePage().props.options);
    let priority = 0;
    async function addOperator() {
      await nextTick();
      operators.value.push({
        id: uniqueId(),
        name: sample(operatorNames) ?? "bitch",
        priority: priority++,
        tickets: []
      });
    }
    async function addTicket() {
      await nextTick();
      const operator = sample(operators.value);
      operator == null ? void 0 : operator.tickets.push({
        id: uniqueId(),
        name: sample(ticketNames) ?? "bitch",
        weight: random(0, config.value.weight_threshold)
      });
    }
    async function removeTicket() {
      let operator;
      let counter = 0;
      await nextTick();
      do {
        operator = sample(operators.value);
        counter++;
      } while (operator && operator.tickets.length === 0 && counter < 10);
      operator && remove(operator.tickets, (ticket, index) => index === random(0, operator.tickets.length - 1));
    }
    async function flipOperators() {
      await nextTick();
      operators.value = reverse(operators.value);
    }
    async function shuffleOperators() {
      await nextTick();
      operators.value = shuffle(operators.value);
    }
    async function shuffleTickets() {
      await nextTick();
      for (const operator of operators.value) {
        operator.tickets = shuffle(operator.tickets);
      }
    }
    async function shuffleBoth() {
      await shuffleTickets();
      await shuffleOperators();
    }
    async function randomAction() {
      var _a;
      await ((_a = sample([
        shuffleOperators,
        shuffleOperators,
        addTicket,
        addTicket,
        addTicket,
        removeTicket,
        shuffleTickets,
        shuffleBoth
      ])) == null ? void 0 : _a());
    }
    async function reset() {
      await nextTick();
      operators.value = [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Trans" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-752b8ec0${_scopeId}>Trans</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, "Trans")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-752b8ec0${_scopeId}>`);
            _push2(ssrRenderComponent(VTable, {
              density: "compact",
              class: "monitor bg-transparent overflow-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionGroup), {
                    tag: "tbody",
                    name: "operators"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(operators.value, (operator) => {
                          _push4(ssrRenderComponent(TransOperator, {
                            key: operator.id,
                            operator
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(operators.value, (operator) => {
                            return openBlock(), createBlock(TransOperator, {
                              key: operator.id,
                              operator
                            }, null, 8, ["operator"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TransitionGroup), {
                      tag: "tbody",
                      name: "operators"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(operators.value, (operator) => {
                          return openBlock(), createBlock(TransOperator, {
                            key: operator.id,
                            operator
                          }, null, 8, ["operator"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: addOperator
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Add operator`);
                                  } else {
                                    return [
                                      createTextVNode("Add operator")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: addTicket
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Add ticket`);
                                  } else {
                                    return [
                                      createTextVNode("Add ticket")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: removeTicket
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Remove ticket`);
                                  } else {
                                    return [
                                      createTextVNode("Remove ticket")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: flipOperators
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Flip operators`);
                                  } else {
                                    return [
                                      createTextVNode("Flip operators")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: shuffleOperators
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Shuffle operators`);
                                  } else {
                                    return [
                                      createTextVNode("Shuffle operators")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: shuffleTickets
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Shuffle tickets`);
                                  } else {
                                    return [
                                      createTextVNode("Shuffle tickets")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: shuffleBoth
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Shuffle both`);
                                  } else {
                                    return [
                                      createTextVNode("Shuffle both")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: randomAction
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Random action`);
                                  } else {
                                    return [
                                      createTextVNode("Random action")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "error",
                                class: "mr-3",
                                onClick: reset
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Reset`);
                                  } else {
                                    return [
                                      createTextVNode("Reset")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: addOperator
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Add operator")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: addTicket
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Add ticket")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: removeTicket
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Remove ticket")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: flipOperators
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Flip operators")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: shuffleOperators
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Shuffle operators")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: shuffleTickets
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Shuffle tickets")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: shuffleBoth
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Shuffle both")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mr-3",
                                  onClick: randomAction
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Random action")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "error",
                                  class: "mr-3",
                                  onClick: reset
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Reset")
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
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: addOperator
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Add operator")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: addTicket
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Add ticket")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: removeTicket
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Remove ticket")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: flipOperators
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Flip operators")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: shuffleOperators
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Shuffle operators")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: shuffleTickets
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Shuffle tickets")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: shuffleBoth
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Shuffle both")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mr-3",
                                onClick: randomAction
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Random action")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "error",
                                class: "mr-3",
                                onClick: reset
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Reset")
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
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: addOperator
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Add operator")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: addTicket
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Add ticket")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: removeTicket
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Remove ticket")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: flipOperators
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Flip operators")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: shuffleOperators
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Shuffle operators")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: shuffleTickets
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Shuffle tickets")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: shuffleBoth
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Shuffle both")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: randomAction
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Random action")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "error",
                              class: "mr-3",
                              onClick: reset
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Reset")
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
                createVNode(VTable, {
                  density: "compact",
                  class: "monitor bg-transparent overflow-hidden"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(TransitionGroup), {
                      tag: "tbody",
                      name: "operators"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(operators.value, (operator) => {
                          return openBlock(), createBlock(TransOperator, {
                            key: operator.id,
                            operator
                          }, null, 8, ["operator"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VContainer, null, {
                  default: withCtx(() => [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: addOperator
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Add operator")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: addTicket
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Add ticket")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: removeTicket
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Remove ticket")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: flipOperators
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Flip operators")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: shuffleOperators
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Shuffle operators")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: shuffleTickets
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Shuffle tickets")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: shuffleBoth
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Shuffle both")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "primary",
                              class: "mr-3",
                              onClick: randomAction
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Random action")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "error",
                              class: "mr-3",
                              onClick: reset
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Reset")
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
const Trans_vue_vue_type_style_index_0_scoped_752b8ec0_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Trans.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Trans = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-752b8ec0"]]);
export {
  Trans as default
};
//# sourceMappingURL=Trans-af16e321.js.map
