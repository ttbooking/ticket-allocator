import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { wTrans } from "laravel-vue-i18n";
import { V as VToolbar, a as VToolbarTitle, b as VSpacer } from "./VToolbar-f49670a7.mjs";
import { a4 as VDivider, q as VBtn, _ as VTextField } from "../ssr.mjs";
import { V as VAutocomplete } from "./VAutocomplete-2d350db8.mjs";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AssociationForm",
  __ssrInlineRender: true,
  props: {
    entries: null,
    modelValue: null
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
      { title: wTrans("value"), key: "value" },
      { title: wTrans("initial_weight"), key: "initial_weight" },
      { title: wTrans("weight_increment"), key: "weight_increment" },
      { title: wTrans("complexity"), key: "complexity" },
      { title: wTrans("delay"), key: "delay" },
      { title: wTrans("actions"), key: "actions", sortable: false }
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
      _push(ssrRenderComponent(_component_v_data_table, mergeProps({
        headers,
        items: unref(config),
        density: "compact"
      }, _attrs), {
        top: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VToolbar, { flat: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VToolbarTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("entries"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("entries")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, {
                    class: "mx-4",
                    inset: "",
                    vertical: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    color: "primary",
                    dark: "",
                    disabled: getEntries().length === 0,
                    onClick: addEntry
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("new_entry"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("new_entry")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
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
        [`item.value`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAutocomplete, {
              modelValue: item.raw.value,
              "onUpdate:modelValue": ($event) => item.raw.value = $event,
              items: getEntries(item.raw.value),
              "item-title": "name",
              "item-value": "uuid",
              variant: "plain",
              density: "compact",
              "hide-details": "auto"
            }, null, _parent2, _scopeId));
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
        [`item.initial_weight`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTextField, {
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
            }, null, _parent2, _scopeId));
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
        [`item.weight_increment`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTextField, {
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
            }, null, _parent2, _scopeId));
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
        [`item.complexity`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTextField, {
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
            }, null, _parent2, _scopeId));
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
        [`item.delay`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTextField, {
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
            }, null, _parent2, _scopeId));
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
        [`item.actions`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              icon: "mdi-delete",
              title: _ctx.$t("remove"),
              size: "small",
              variant: "plain",
              onClick: ($event) => removeEntry(item.raw.value)
            }, null, _parent2, _scopeId));
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
//# sourceMappingURL=AssociationForm-4f7b1050.mjs.map
