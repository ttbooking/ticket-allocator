import { defineComponent, computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { V as VRow, a as VCol } from "./VRow-4effdd9b.mjs";
import { _ as VTextField } from "../ssr.mjs";
import "dayjs";
import "dayjs/locale/ru.js";
import "dayjs/plugin/duration.js";
import "dayjs/plugin/localizedFormat.js";
import "dayjs/plugin/relativeTime.js";
import "@inertiajs/vue3";
import "pinia";
import "pinia-orm";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "laravel-vue-i18n";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FixedForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    errors: {}
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: config.value.initial_weight,
                    "onUpdate:modelValue": ($event) => config.value.initial_weight = $event,
                    label: _ctx.$t("initial_weight"),
                    "error-messages": _ctx.errors.initial_weight
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: config.value.initial_weight,
                      "onUpdate:modelValue": ($event) => config.value.initial_weight = $event,
                      label: _ctx.$t("initial_weight"),
                      "error-messages": _ctx.errors.initial_weight
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: config.value.weight_increment,
                    "onUpdate:modelValue": ($event) => config.value.weight_increment = $event,
                    label: _ctx.$t("weight_increment"),
                    "error-messages": _ctx.errors.weight_increment
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: config.value.weight_increment,
                      "onUpdate:modelValue": ($event) => config.value.weight_increment = $event,
                      label: _ctx.$t("weight_increment"),
                      "error-messages": _ctx.errors.weight_increment
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: config.value.complexity,
                    "onUpdate:modelValue": ($event) => config.value.complexity = $event,
                    label: _ctx.$t("complexity"),
                    "error-messages": _ctx.errors.complexity
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: config.value.complexity,
                      "onUpdate:modelValue": ($event) => config.value.complexity = $event,
                      label: _ctx.$t("complexity"),
                      "error-messages": _ctx.errors.complexity
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: config.value.delay,
                    "onUpdate:modelValue": ($event) => config.value.delay = $event,
                    label: _ctx.$t("delay"),
                    "error-messages": _ctx.errors.delay
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: config.value.delay,
                      "onUpdate:modelValue": ($event) => config.value.delay = $event,
                      label: _ctx.$t("delay"),
                      "error-messages": _ctx.errors.delay
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "3" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: config.value.initial_weight,
                    "onUpdate:modelValue": ($event) => config.value.initial_weight = $event,
                    label: _ctx.$t("initial_weight"),
                    "error-messages": _ctx.errors.initial_weight
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "3" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: config.value.weight_increment,
                    "onUpdate:modelValue": ($event) => config.value.weight_increment = $event,
                    label: _ctx.$t("weight_increment"),
                    "error-messages": _ctx.errors.weight_increment
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "3" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: config.value.complexity,
                    "onUpdate:modelValue": ($event) => config.value.complexity = $event,
                    label: _ctx.$t("complexity"),
                    "error-messages": _ctx.errors.complexity
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "3" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: config.value.delay,
                    "onUpdate:modelValue": ($event) => config.value.delay = $event,
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
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Factor/Partials/FixedForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=FixedForm-c113515f.mjs.map
