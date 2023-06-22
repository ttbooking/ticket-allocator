import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, TransitionGroup, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { a as _sfc_main$1, _ as _export_sfc } from "./Default-3c8b7f90.js";
import { Head } from "@inertiajs/vue3";
import { uniqueId, sample, remove, random, shuffle } from "lodash";
import { Z as VTable, V as VBtn } from "../ssr.js";
import { V as VContainer } from "./VContainer-e3883c86.js";
import { V as VRow, a as VCol } from "./VRow-2e46a7f0.js";
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
  __name: "Trans",
  __ssrInlineRender: true,
  setup(__props) {
    const operatorNames = ["Apollo", "Hermes", "Ares", "Zeus", "Poseidon", "Dionysus", "Aphrodite", "Hephaestus", "Athena"];
    const ticketNames = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];
    const operators = ref([]);
    function addOperator() {
      operators.value.push({
        id: uniqueId(),
        name: sample(operatorNames) ?? "bitch",
        tickets: []
      });
    }
    function addTicket() {
      const operator = sample(operators.value);
      operator == null ? void 0 : operator.tickets.push({ id: uniqueId(), name: sample(ticketNames) ?? "bitch" });
    }
    function removeTicket() {
      let operator;
      let counter = 0;
      do {
        operator = sample(operators.value);
        counter++;
      } while (operator && operator.tickets.length === 0 && counter < 10);
      operator && remove(operator.tickets, (ticket, index) => index === random(0, operator.tickets.length - 1));
    }
    function shuffleOperators() {
      operators.value = shuffle(operators.value);
    }
    function shuffleTickets() {
      for (const operator of operators.value) {
        operator.tickets = shuffle(operator.tickets);
      }
    }
    function shuffleBoth() {
      shuffleOperators();
      shuffleTickets();
    }
    function randomAction() {
      var _a;
      (_a = sample([
        shuffleOperators,
        shuffleOperators,
        addTicket,
        addTicket,
        addTicket,
        removeTicket,
        shuffleTickets,
        shuffleBoth
      ])) == null ? void 0 : _a();
    }
    function reset() {
      operators.value = [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Trans" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-ba21db48${_scopeId}>Trans</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, "Trans")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-ba21db48${_scopeId}>`);
            _push2(ssrRenderComponent(VTable, {
              density: "compact",
              class: "monitor overflow-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tbody data-v-ba21db48${_scopeId2}><!--[-->`);
                  ssrRenderList(operators.value, (operator) => {
                    _push3(`<tr data-v-ba21db48${_scopeId2}><th data-v-ba21db48${_scopeId2}>${ssrInterpolate(operator.name)}</th><td data-v-ba21db48${_scopeId2}><!--[-->`);
                    ssrRenderList(operator.tickets, (ticket) => {
                      _push3(ssrRenderComponent(VBtn, {
                        key: ticket.id,
                        size: "small",
                        width: "100",
                        class: "mr-1 mb-1"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(ticket.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(ticket.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("tbody", null, [
                      createVNode(TransitionGroup, { name: "operators" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(operators.value, (operator) => {
                            return openBlock(), createBlock("tr", {
                              key: operator.id
                            }, [
                              createVNode("th", null, toDisplayString(operator.name), 1),
                              createVNode("td", null, [
                                createVNode(TransitionGroup, { name: "tickets" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(operator.tickets, (ticket) => {
                                      return openBlock(), createBlock(VBtn, {
                                        key: ticket.id,
                                        size: "small",
                                        width: "100",
                                        class: "mr-1 mb-1"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(ticket.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]);
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
                  class: "monitor overflow-hidden"
                }, {
                  default: withCtx(() => [
                    createVNode("tbody", null, [
                      createVNode(TransitionGroup, { name: "operators" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(operators.value, (operator) => {
                            return openBlock(), createBlock("tr", {
                              key: operator.id
                            }, [
                              createVNode("th", null, toDisplayString(operator.name), 1),
                              createVNode("td", null, [
                                createVNode(TransitionGroup, { name: "tickets" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(operator.tickets, (ticket) => {
                                      return openBlock(), createBlock(VBtn, {
                                        key: ticket.id,
                                        size: "small",
                                        width: "100",
                                        class: "mr-1 mb-1"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(ticket.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
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
const Trans_vue_vue_type_style_index_0_scoped_ba21db48_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Trans.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Trans = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba21db48"]]);
export {
  Trans as default
};
//# sourceMappingURL=Trans-bb6cefdd.js.map
