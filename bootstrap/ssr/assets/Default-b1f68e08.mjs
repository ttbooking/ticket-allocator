import { inject, provide, ref, onDeactivated, onActivated, computed, onBeforeUnmount, reactive, onMounted, mergeProps, useSSRContext, createVNode, watch, toRef, nextTick, onBeforeMount, Fragment, Transition, defineComponent, withCtx, unref, toDisplayString, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { getActiveLanguage } from "laravel-vue-i18n";
import { F as propsFactory, ad as getUid, aM as getCurrentInstance, M as useResizeObserver, a0 as convertToUnit, aN as findChildrenWithProvide, g as genericComponent, m as makeComponentProps, o as makeThemeProps, r as provideTheme, H as useRtl, u as useRender, n as makeTagProps, a6 as useSsrBoot, aO as CircularBuffer, d as makeBorderProps, f as makeElevationProps, k as makeRoundedProps, s as useBorder, $ as useBackgroundColor, x as useElevation, J as useDisplay, B as useRounded, aP as useRouter, _ as useProxiedModel, aQ as toPhysical, p as provideDefaults, a2 as useLocale, aE as VList, aF as VListItem } from "../ssr.mjs";
const VuetifyLayoutKey = Symbol.for("vuetify:layout");
const VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
const ROOT_ZINDEX = 1e3;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout");
const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function useLayout() {
  const layout = inject(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles
  };
}
function useLayoutItem(options) {
  const layout = inject(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  const id = options.id ?? `layout-item-${getUid()}`;
  const vm = getCurrentInstance("useLayoutItem");
  provide(VuetifyLayoutItemKey, {
    id
  });
  const isKeptAlive = ref(false);
  onDeactivated(() => isKeptAlive.value = true);
  onActivated(() => isKeptAlive.value = false);
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id
  });
  onBeforeUnmount(() => layout.unregister(id));
  return {
    layoutItemStyles,
    layoutRect: layout.layoutRect,
    layoutItemScrimStyles
  };
}
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: "",
    layer: {
      ...previousLayer
    }
  }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active)
      continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(/* @__PURE__ */ new Map());
  const layoutSizes = reactive(/* @__PURE__ */ new Map());
  const priorities = reactive(/* @__PURE__ */ new Map());
  const activeItems = reactive(/* @__PURE__ */ new Map());
  const disabledTransitions = reactive(/* @__PURE__ */ new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    const map = /* @__PURE__ */ new Map();
    const overlaps = props.overlaps ?? [];
    for (const overlap of overlaps.filter((item) => item.includes(":"))) {
      const [top, bottom] = overlap.split(":");
      if (!registered.value.includes(top) || !registered.value.includes(bottom))
        continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount)
        continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }
    return map;
  });
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p2) => p2.value))].sort((a2, b2) => a2 - b2);
    const layout = [];
    for (const p2 of uniquePriorities) {
      const items2 = registered.value.filter((id) => {
        var _a;
        return ((_a = priorities.get(id)) == null ? void 0 : _a.value) === p2;
      });
      layout.push(...items2);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = computed(() => {
    return {
      "--v-layout-left": convertToUnit(mainRect.value.left),
      "--v-layout-right": convertToUnit(mainRect.value.right),
      "--v-layout-top": convertToUnit(mainRect.value.top),
      "--v-layout-bottom": convertToUnit(mainRect.value.bottom),
      ...transitionsEnabled.value ? void 0 : {
        transition: "none"
      }
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = (id) => {
    return items.value.find((item) => item.id === id);
  };
  const rootVm = getCurrentInstance("createLayout");
  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1)
        registered.value.splice(instanceIndex, 0, id);
      else
        registered.value.push(id);
      const index = computed(() => items.value.findIndex((i2) => i2.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === "left" || position.value === "right";
        const isOppositeHorizontal = position.value === "right";
        const isOppositeVertical = position.value === "bottom";
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
          ...transitionsEnabled.value ? void 0 : {
            transition: "none"
          }
        };
        if (!isMounted.value)
          return styles;
        const item = items.value[index.value];
        if (!item)
          throw new Error(`[Vuetify] Could not find layout item "${id}"`);
        const overlap = computedOverlaps.value.get(id);
        if (overlap) {
          item[overlap.position] += overlap.amount;
        }
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
          left: isOppositeHorizontal ? void 0 : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : void 0,
          top: position.value !== "bottom" ? `${item.top}px` : void 0,
          bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: (id) => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter((v2) => v2 !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = computed(() => ["v-layout", {
    "v-layout--full-height": props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: rootZIndex.value,
    position: parentLayout ? "relative" : void 0,
    overflow: parentLayout ? "hidden" : void 0
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef
  };
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0",
    y: "0",
    width: "439",
    height: "588",
    viewBox: "0, 0, 439, 588"
  }, _attrs))}><g id="Layer_1"><path d="M24.188,509.62 C11.118,512.114 2.299,530.285 4.277,542.865 C6.678,558.133 23.677,563.795 37.092,560.046 C42.72,558.473 47.478,554.834 52.398,551.731 C60.094,546.879 67.785,545.211 76.383,542.986 C84.545,540.874 87.335,532.835 87.782,524.654 C88.154,517.843 87.749,515.249 81.906,511.009 C71.622,503.549 57.538,505.491 44.785,505.939 L24.188,509.62 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M83.398,476.456 C76.851,481.357 67.477,485.389 60.064,486.456 C53.239,487.438 45.087,484.706 38.73,487.106 C32.989,489.275 22.565,496.941 20.064,502.123 C17.434,507.574 24.724,512.115 22.744,517.826 C21.299,521.989 5.054,537.041 12.065,541.065 C16.65,543.697 34.564,530.942 38.396,528.952 C42.959,526.582 45.927,521.103 52.064,522.456 C62.624,524.784 51.296,536.053 55.396,541.619 C58.489,545.817 71.387,538.574 73.915,535.153 C78.243,529.298 75.743,521.015 79.903,514.793 C84.831,507.422 94.482,501.607 99.281,493.64 C105.14,483.917 97.261,482.275 91.397,476.456 L83.398,476.456" fill="#F8D4BC"></path><path d="M83.398,476.456 C76.851,481.357 67.477,485.389 60.064,486.456 C53.239,487.438 45.087,484.706 38.73,487.106 C32.989,489.275 22.565,496.941 20.064,502.123 C17.434,507.574 24.724,512.115 22.744,517.826 C21.299,521.989 5.054,537.041 12.065,541.065 C16.65,543.697 34.564,530.942 38.396,528.952 C42.959,526.582 45.927,521.103 52.064,522.456 C62.624,524.784 51.296,536.053 55.396,541.619 C58.489,545.817 71.387,538.574 73.915,535.153 C78.243,529.298 75.743,521.015 79.903,514.793 C84.831,507.422 94.482,501.607 99.281,493.64 C105.14,483.917 97.261,482.275 91.397,476.456 L83.398,476.456 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M388.981,214.327 C388.612,226.285 392.778,236.778 391.682,249.236 C390.48,262.898 385.859,276.885 386.32,290.607 C386.988,310.466 396.27,320.582 412.455,331.284 C369.611,331.582 330.924,308.351 325.955,262.397 C323.296,237.82 337.996,173.998 375.482,196.328 L388.981,214.327" fill="#AE8054"></path><path d="M388.981,214.327 C388.612,226.285 392.778,236.778 391.682,249.236 C390.48,262.898 385.859,276.885 386.32,290.607 C386.988,310.466 396.27,320.582 412.455,331.284 C369.611,331.582 330.924,308.351 325.955,262.397 C323.296,237.82 337.996,173.998 375.482,196.328 L388.981,214.327 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path><path d="M292.398,373.731 C292.398,388.643 274.825,400.731 253.148,400.731 C231.471,400.731 213.898,388.643 213.898,373.731 C213.898,358.819 231.471,346.731 253.148,346.731 C274.825,346.731 292.398,358.819 292.398,373.731" fill="#FFFFFE"></path><path d="M274.734,332.901 C273.724,328.215 275.685,308.706 275.9,304.068 C269.681,303.722 268.478,296.901 262.234,296.901 L234.4,294.068 C234.4,298.301 236.522,327.551 235.234,331.401 C231.377,331.085 207.4,333.568 207.4,333.568 C202.755,350.286 224.01,358.064 253.732,358.064 C273.567,358.064 308.447,356.632 306.9,340.068 C306.9,340.068 278.606,332.941 274.734,332.901" fill="#F8D4BC"></path><path d="M274.734,332.901 C273.724,328.215 275.685,308.706 275.9,304.068 C269.681,303.722 268.478,296.901 262.234,296.901 L234.4,294.068 C234.4,298.301 236.522,327.551 235.234,331.401 C231.377,331.085 207.4,333.568 207.4,333.568 C202.755,350.286 224.01,358.064 253.732,358.064 C273.567,358.064 308.447,356.632 306.9,340.068 C306.9,340.068 278.606,332.941 274.734,332.901 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M390.982,209.077 C403.598,205.671 411.168,222.036 406.995,234.621 C402.79,247.298 388.571,261.985 362.555,261.048 L390.982,209.077" fill="#F8D4BC"></path><path d="M390.982,209.077 C403.598,205.671 411.168,222.036 406.995,234.621 C402.79,247.298 388.571,261.985 362.555,261.048 L390.982,209.077 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><g><path d="M260.062,72.146 C255.496,10.047 315.467,-9.944 358.186,14.749 C374.799,24.354 383.792,49.214 373.783,66.549 C358.991,92.156 312.089,102.286 286.438,102.597 C276.282,102.719 277.449,103.192 270.419,98.947 C265.703,96.1 266.184,89.717 259.849,88.39 L260.062,72.146" fill="#FFFFFE"></path><path d="M265.613,70.264 C277.65,25.545 318.995,0.152 358.186,14.749 C376.168,21.447 383.792,49.214 373.783,66.549 C358.991,92.156 312.089,102.286 286.438,102.597 C276.282,102.719 277.449,103.192 270.419,98.947 C265.703,96.1 266.184,89.717 259.849,88.39 L265.613,70.264" fill="#AE8054"></path><path d="M260.062,72.146 C255.496,10.047 315.467,-9.944 358.186,14.749 C374.799,24.354 383.792,49.214 373.783,66.549 C358.991,92.156 312.089,102.286 286.438,102.597 C276.282,102.719 277.449,103.192 270.419,98.947 C265.703,96.1 266.184,89.717 259.849,88.39 L260.062,72.146 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path></g><path d="M368.894,19.255 C418.875,48.699 389.812,109.666 375.029,124.83 C344.811,155.826 289.878,123.458 268.128,92.633 C268.128,92.633 352.437,9.558 368.894,19.255" fill="#AE8054"></path><path d="M368.894,19.255 C418.875,48.699 389.812,109.666 375.029,124.83 C344.811,155.826 289.878,123.458 268.128,92.633 C268.128,92.633 352.437,9.558 368.894,19.255 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path><path d="M149.72,165.404 C136.574,156.708 122.491,165.155 122.876,182.601 C123.266,200.174 138.078,208.892 149.208,217.112 L149.72,165.404" fill="#F8D4BC"></path><path d="M149.72,165.404 C136.574,156.708 122.491,165.155 122.876,182.601 C123.266,200.174 138.078,208.892 149.208,217.112 L149.72,165.404 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M384.745,127.727 C381.535,151.081 381.293,186.884 374.295,225.127 C363.655,283.277 300.039,328.819 252.931,322.974 C204.21,316.932 140.495,270.373 148.038,189.72 C149.985,168.891 158.321,116.951 164.184,104.564 C177.808,51.328 255.806,39.501 271.971,40.756 C288.137,42.011 379.224,56.676 384.745,127.727" fill="#F8D4BC"></path><path d="M384.745,127.727 C381.535,151.081 381.293,186.884 374.295,225.127 C363.655,283.277 300.039,328.819 252.931,322.974 C204.21,316.932 140.495,270.373 148.038,189.72 C149.985,168.891 158.321,116.951 164.184,104.564 C177.808,51.328 255.806,39.501 271.971,40.756 C288.137,42.011 379.224,56.676 384.745,127.727 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M296.229,219.368 C296.172,233.504 304.984,244.982 315.904,245.008 C326.825,245.033 335.728,233.597 335.787,219.462 C335.842,205.325 327.031,193.848 316.106,193.822 C305.185,193.794 296.283,205.231 296.229,219.368" fill="#8B6B46"></path><path d="M303.011,221.376 C302.994,225.735 306.689,229.278 311.269,229.289 C315.843,229.301 319.566,225.774 319.58,221.416 C319.597,217.056 315.906,213.512 311.33,213.503 C306.751,213.49 303.029,217.018 303.011,221.376" fill="#FFFFFE"></path><path d="M311.281,205.066 C311.273,206.825 312.761,208.253 314.609,208.257 C316.457,208.263 317.958,206.839 317.966,205.083 C317.974,203.323 316.482,201.891 314.638,201.887 C312.789,201.883 311.289,203.306 311.281,205.066" fill="#FFFFFE"></path><path d="M352.87,222.003 C351.797,170.366 300.855,186.238 299.81,211.904 M360.564,194.375 C357.015,198.587 351.454,201.393 351.454,201.393 M352.899,176.282 C349.342,180.344 347.458,181.045 344.754,184.752" fill-opacity="0" stroke="#8B6B46" stroke-width="5.783" stroke-linecap="round" stroke-linejoin="round"></path><path d="M350.273,170.878 C351.097,171.223 348.02,171.482 347.156,171.256 C331.986,167.281 319.846,170.461 316.858,172.27 C316.092,172.735 315.098,172.49 314.638,171.725 C314.173,170.96 314.418,169.965 315.181,169.504 C319.382,166.956 334.701,164.345 350.273,170.878" fill="#1A1919"></path><path d="M203.727,251.716 C202.597,259.732 194.208,265.177 184.991,263.879 C175.773,262.579 169.214,255.031 170.344,247.018 C171.472,239.005 179.86,233.561 189.077,234.857 C198.295,236.156 204.855,243.706 203.727,251.716" fill="#F1B4B2"></path><path d="M339.383,272.133 C338.29,279.884 330.352,285.176 321.652,283.954 C312.952,282.727 306.783,275.45 307.875,267.696 C308.967,259.942 316.905,254.651 325.605,255.876 C334.305,257.101 340.472,264.381 339.383,272.133" fill="#F1B4B2"></path><path d="M226.956,207.89 C227.75,222.004 219.55,233.926 208.646,234.523 C197.74,235.117 188.251,224.161 187.458,210.047 C186.664,195.933 194.864,184.012 205.771,183.416 C216.677,182.819 226.164,193.775 226.956,207.89" fill="#8B6B46"></path><path d="M210.398,210.399 C210.646,214.751 207.141,218.482 202.568,218.731 C197.999,218.982 194.096,215.656 193.856,211.303 C193.609,206.95 197.112,203.22 201.682,202.97 C206.252,202.721 210.154,206.047 210.398,210.399" fill="#FFFFFE"></path><path d="M205.69,194.509 C205.789,196.266 204.376,197.771 202.533,197.872 C200.689,197.972 199.113,196.631 199.015,194.873 C198.916,193.118 200.328,191.611 202.173,191.511 C204.015,191.411 205.592,192.752 205.69,194.509" fill="#FFFFFE"></path><path d="M146.069,192.974 C153.201,153.94 163.919,77.822 245.724,71.367 C258.41,70.365 239.204,154.61 327.62,194.027 C336.321,195.7 369.643,182.932 374.103,185.878 C373.819,214.982 366.435,235.335 363.035,258.677 C381.059,241.032 396.538,207.35 400.225,182.201 C404.581,152.476 407.39,125.184 393.723,96.851 C376.605,61.372 353.995,45.501 315.33,34.606 C222.591,8.474 169.849,63.215 158.926,83.396 C123.583,148.691 146.069,192.974 146.069,192.974" fill="#FFFFFE"></path><path d="M146.069,192.974 C153.201,153.94 163.919,77.822 245.724,71.367 C258.41,70.365 239.204,154.61 327.62,194.027 C336.321,195.7 369.643,182.932 374.103,185.878 C373.819,214.982 366.435,235.335 363.035,258.677 C381.059,241.032 396.538,207.35 400.225,182.201 C404.581,152.476 407.39,125.184 393.723,96.851 C376.605,61.372 354.788,42.129 315.33,34.606 C230.635,18.459 177.2,73.253 166.276,93.433 C130.934,158.729 146.069,192.974 146.069,192.974" fill="#AE8054"></path><path d="M281.338,85.369 C291.967,135.621 309.842,163.605 336.9,190.023 M319.611,97.037 C348.562,135.161 349.19,179.633 346.082,190.09 M348.868,98.16 C364.877,120.843 367.637,156.367 361.117,186.228" fill-opacity="0" stroke="#8B6B46" stroke-width="6.024" stroke-linecap="round" stroke-linejoin="round"></path><path d="M213.581,147.704 C206.999,140.687 190.019,134.69 177.354,143.173" fill-opacity="0" stroke="#8B6B46" stroke-width="5.783" stroke-linecap="round" stroke-linejoin="round"></path><path d="M251.533,249.572 C255.839,250.176 264.053,249.546 259.837,255.398 C255.798,261.008 251.037,255.544 249.704,250.947 L251.533,249.572" fill="#C89197"></path><path d="M174.485,212.8 C172.86,161.178 224.561,174.371 226.945,199.948 M165.361,185.613 C169.124,189.633 174.824,192.146 174.824,192.146 M172.486,175.098 C176.25,178.968 178.169,179.571 181.061,183.133" fill-opacity="0" stroke="#8B6B46" stroke-width="5.783" stroke-linecap="round" stroke-linejoin="round"></path><g><path d="M389.174,92.396 C387.934,101.21 379.403,126.974 363.747,137.57 M398.842,120.451 C395.729,137.14 381.606,159.602 365.406,166.403 M372.701,65.291 C375.636,74.694 371.641,107.632 359.417,118.985" fill-opacity="0" stroke="#8B6B46" stroke-width="6.024" stroke-linecap="round" stroke-linejoin="round"></path><path d="M146.069,192.974 C153.201,153.94 163.919,77.822 245.724,71.367 C258.41,70.365 239.204,154.61 327.62,194.027 C336.321,195.7 369.643,182.932 374.103,185.878 C373.819,214.982 366.435,235.335 363.035,258.677 C381.059,241.032 396.538,207.35 400.225,182.201 C404.581,152.476 407.39,125.184 393.723,96.851 C376.605,61.372 353.995,45.501 315.33,34.606 C222.591,8.474 169.849,63.215 158.926,83.396 C123.583,148.691 146.069,192.974 146.069,192.974 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path></g><path d="M244.148,274.981 C244.148,278.993 244.486,280.909 247.216,283.655 C248.983,285.432 249.822,286.182 252.471,287.182 C254.308,287.876 256.184,288.768 258.13,288.994 C260.816,289.306 263.248,288.945 265.643,288.036 C268.638,286.899 268.824,285.758 270.618,283.962 C271.537,283.042 272.313,283.309 273.147,282.037 C273.756,281.108 273.695,280.708 273.955,279.681 C274.512,277.472 275.107,275.725 275.624,273.506 C272.524,273.154 269.608,274.763 266.736,275.689 C264.367,276.452 262.121,276.541 259.628,276.787 C254.231,277.319 250.354,275.656 245.148,275.231 L244.148,274.981" fill="#EB96A2"></path><path d="M236.124,268.683 C243.918,278.628 270.763,277.441 279.533,269.483" fill-opacity="0" stroke="#8B6B46" stroke-width="5.783" stroke-linecap="round" stroke-linejoin="round"></path><path d="M379.067,388.902 C373.272,374.698 325.898,333.731 294.398,336.731 L256.398,468.064 C256.398,468.064 212.898,335.231 211.898,333.731 C208.505,331.581 193.734,332.234 171.067,345.568 C148.4,358.902 139.224,375.225 135.734,378.235 C131.633,381.772 77.693,467.466 76.065,477.122 C75.299,481.659 95.615,499.403 99.398,501.731 C108.064,507.064 192.185,383.065 195.067,382.569 C195.067,382.569 187.656,450.164 189.4,454.235 L326.4,454.569 C328.025,450.778 313.533,392.272 314.959,381.173 C325.345,383.467 338.918,387.249 340.375,389.461 C343.435,394.106 330.848,416.772 326.229,419.228 C335.384,426.298 346.95,431.75 356.471,439.429 C361.747,430.588 385.239,404.026 379.067,388.902" fill="#698CBB"></path><path d="M379.067,388.902 C373.272,374.698 325.898,333.731 294.398,336.731 L256.398,468.064 C256.398,468.064 212.898,335.231 211.898,333.731 C208.505,331.581 193.734,332.234 171.067,345.568 C148.4,358.902 139.224,375.225 135.734,378.235 C131.633,381.772 77.693,467.466 76.065,477.122 C75.299,481.659 95.615,499.403 99.398,501.731 C108.064,507.064 192.185,383.065 195.067,382.569 C195.067,382.569 187.656,450.164 189.4,454.235 L326.4,454.569 C328.025,450.778 313.533,392.272 314.959,381.173 C325.345,383.467 338.918,387.249 340.375,389.461 C343.435,394.106 330.848,416.772 326.229,419.228 C335.384,426.298 346.95,431.75 356.471,439.429 C361.747,430.588 385.239,404.026 379.067,388.902 z M195.065,338.063 L190.731,375.564 M310.233,340.068 L313.731,371.397" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M329.651,421.75 C321.016,423.092 312.418,425.377 307.494,432.149 C296.768,446.902 300.079,462.2 314.317,467.402 C342.542,477.716 352.207,454.44 353.104,434.233 L329.651,421.75" fill="#F8D4BC"></path><path d="M329.651,421.75 C321.016,423.092 312.418,425.377 307.494,432.149 C296.768,446.902 300.079,462.2 314.317,467.402 C342.542,477.716 352.207,454.44 353.104,434.233 L329.651,421.75 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.108" stroke-linecap="round" stroke-linejoin="round"></path><path d="M386.121,180.399 C386.121,201.368 382.172,221.316 375.065,239.398 L385.035,239.398 C393.903,219.602 398.898,197.314 398.898,173.732 C398.898,91.81 338.754,25.399 264.565,25.399 C241.523,25.399 219.837,31.809 200.887,43.095 C216.586,35.991 233.771,32.065 251.788,32.065 C325.977,32.065 386.121,98.476 386.121,180.399" fill="#FFFFFE"></path><path d="M386.121,180.399 C386.121,201.368 382.172,221.316 375.065,239.398 L385.035,239.398 C393.903,219.602 398.898,197.314 398.898,173.732 C398.898,91.81 338.754,25.399 264.565,25.399 C241.523,25.399 219.837,31.809 200.887,43.095 C216.586,35.991 233.771,32.065 251.788,32.065 C325.977,32.065 386.121,98.476 386.121,180.399 z M376.398,259.398 C361.318,324.355 293.364,318.966 304.898,319.231" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M307.054,321.303 C308.501,327.396 304.737,333.508 298.643,334.957 L285.033,338.19 C278.94,339.637 272.828,335.873 271.38,329.779 L271.075,328.493 C269.627,322.4 273.392,316.288 279.486,314.84 L293.096,311.606 C299.189,310.159 305.301,313.924 306.749,320.017 L307.054,321.303" fill="#B6B7B6"></path><path d="M307.054,321.303 C308.501,327.396 304.737,333.508 298.643,334.957 L285.033,338.19 C278.94,339.637 272.828,335.873 271.38,329.779 L271.075,328.493 C269.627,322.4 273.392,316.288 279.486,314.84 L293.096,311.606 C299.189,310.159 305.301,313.924 306.749,320.017 L307.054,321.303 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M387.833,357.134 C385.443,341.906 389.281,306.088 371.698,299.416 C362.705,296.005 322.579,293.412 322.079,311.712 C332.874,314.849 341.786,312.97 349.969,318.482 C332.893,331.071 336.893,339.104 348.414,354.393 C354.247,362.134 361.023,361.065 368.272,367.251 C375.445,373.369 375.274,383.058 377.033,391.307 C386.126,390.309 395.343,388.638 404.454,387.208 L387.833,357.134" fill="#F8D4BC"></path><path d="M387.833,357.134 C385.443,341.906 389.281,306.088 371.698,299.416 C362.705,296.005 322.579,293.412 322.079,311.712 C332.874,314.849 341.786,312.97 349.969,318.482 C332.893,331.071 336.893,339.104 348.414,354.393 C354.247,362.134 361.023,361.065 368.272,367.251 C375.445,373.369 375.274,383.058 377.033,391.307 C386.126,390.309 395.343,388.638 404.454,387.208 L387.833,357.134 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M356.321,376.645 C365.936,370.24 382.213,364.844 392.898,359.731 C409.936,351.579 407.622,367.024 410.134,376.626 C415.452,396.93 418.898,418.731 417.898,427.731 C417.058,435.291 420.208,446.956 409.898,452.731 C400.259,458.13 402.339,454.506 392.425,457.244 C380.742,460.472 379.505,462.593 376.378,455.985 C371.17,444.981 370.509,430.732 366.923,418.85 C364.003,409.173 360.662,399.412 358.14,389.537 C357.069,385.341 357.524,381.569 356.983,377.716 L356.321,376.645" fill="#698CBB"></path><path d="M356.321,376.645 C365.936,370.24 382.213,364.844 392.898,359.731 C409.936,351.579 407.622,367.024 410.134,376.626 C415.452,396.93 418.898,418.731 417.898,427.731 C417.058,435.291 420.208,446.956 409.898,452.731 C400.259,458.13 402.339,454.506 392.425,457.244 C380.742,460.472 379.505,462.593 376.378,455.985 C371.17,444.981 370.509,430.732 366.923,418.85 C364.003,409.173 360.662,399.412 358.14,389.537 C357.069,385.341 357.524,381.569 356.983,377.716 L356.321,376.645 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M430.4,551.235 C430.4,557.31 425.475,562.235 419.4,562.235 L110.4,562.235 C104.325,562.235 99.4,557.31 99.4,551.235 C99.4,545.16 104.325,540.235 110.4,540.235 L419.4,540.235 C425.475,540.235 430.4,545.16 430.4,551.235" fill="#CDCECD"></path><path d="M430.4,551.235 C430.4,557.31 425.475,562.235 419.4,562.235 L110.4,562.235 C104.325,562.235 99.4,557.31 99.4,551.235 C99.4,545.16 104.325,540.235 110.4,540.235 L419.4,540.235 C425.475,540.235 430.4,545.16 430.4,551.235 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path><path d="M429.067,559.867 C429.067,567.619 423.991,573.902 417.728,573.902 L393.4,573.902 L370.4,530.235 L153.4,530.235 L133.399,573.902 L110.405,573.902 C104.144,573.902 99.067,567.619 99.067,559.867 L93.067,384.937 C93.067,377.185 98.144,370.902 104.405,370.902 L423.728,370.902 C429.991,370.902 435.067,377.185 435.067,384.937 L429.067,559.867" fill="#FFFFFE"></path><path d="M429.067,559.867 C429.067,567.619 423.991,573.902 417.728,573.902 L393.4,573.902 L370.4,530.235 L153.4,530.235 L133.399,573.902 L110.405,573.902 C104.144,573.902 99.067,567.619 99.067,559.867 L93.067,384.937 C93.067,377.185 98.144,370.902 104.405,370.902 L423.728,370.902 C429.991,370.902 435.067,377.185 435.067,384.937 L429.067,559.867 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path><path d="M429.067,559.867 C429.067,567.619 423.991,573.902 417.728,573.902 L393.4,573.902 L370.4,530.235 L153.4,530.235 L133.399,573.902 L110.405,573.902 C104.144,573.902 99.067,567.619 99.067,559.867 L93.067,384.937 L435.067,384.937 L429.067,559.867" fill="#C9C9C8"></path><path d="M429.067,559.867 C429.067,567.619 423.991,573.902 417.728,573.902 L393.4,573.902 L370.4,530.235 L153.4,530.235 L133.399,573.902 L110.405,573.902 C104.144,573.902 99.067,567.619 99.067,559.867 L93.067,384.937 L435.067,384.937 L429.067,559.867 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path><path d="M261.9,510.235 C249.75,510.235 239.9,500.385 239.9,488.235 C239.9,476.085 249.75,466.235 261.9,466.235 C274.05,466.235 283.9,476.085 283.9,488.235 C283.9,500.385 274.05,510.235 261.9,510.235 z M293.061,428.235 L230.739,428.235 C224.476,428.235 219.4,433.311 219.4,439.574 L216.4,572.896 C216.4,579.159 221.476,584.235 227.739,584.235 L296.061,584.235 C302.324,584.235 307.4,579.159 307.4,572.896 L304.4,439.574 C304.4,433.311 299.324,428.235 293.061,428.235" fill="#E9E9E8"></path><path d="M261.9,510.235 C249.75,510.235 239.9,500.385 239.9,488.235 C239.9,476.085 249.75,466.235 261.9,466.235 C274.05,466.235 283.9,476.085 283.9,488.235 C283.9,500.385 274.05,510.235 261.9,510.235 z M293.061,428.235 L230.739,428.235 C224.476,428.235 219.4,433.311 219.4,439.574 L216.4,572.896 C216.4,579.159 221.476,584.235 227.739,584.235 L296.061,584.235 C302.324,584.235 307.4,579.159 307.4,572.896 L304.4,439.574 C304.4,433.311 299.324,428.235 293.061,428.235 z" fill-opacity="0" stroke="#8B6B46" stroke-width="7.53" stroke-linecap="round" stroke-linejoin="round"></path><path d="M406.343,241.445 C400.196,257.227 386.73,266.716 376.265,262.639 C365.801,258.564 362.302,242.466 368.45,226.684 C374.597,210.903 388.063,201.413 398.527,205.489 C408.992,209.566 412.491,225.664 406.343,241.445" fill="#BBBCBA"></path><path d="M406.343,241.445 C400.196,257.227 386.73,266.716 376.265,262.639 C365.801,258.564 362.302,242.466 368.45,226.684 C374.597,210.903 388.063,201.413 398.527,205.489 C408.992,209.566 412.491,225.664 406.343,241.445 z" fill-opacity="0" stroke="#8B6B46" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M399.398,207.398 C376.065,224.065 374.065,244.731 378.065,260.065 M243.398,279.231 C254.398,297.731 274.646,288.538 276.898,272.231" fill-opacity="0" stroke="#8B6B46" stroke-width="5.783" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ApplicationLogo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
function t(t4, r2) {
  for (var n2 = 0; n2 < r2.length; n2++) {
    var e2 = r2[n2];
    e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(t4, e2.key, e2);
  }
}
function r(r2, n2, e2) {
  return n2 && t(r2.prototype, n2), e2 && t(r2, e2), Object.defineProperty(r2, "prototype", { writable: false }), r2;
}
function n() {
  return n = Object.assign ? Object.assign.bind() : function(t4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = arguments[r2];
      for (var e2 in n2)
        Object.prototype.hasOwnProperty.call(n2, e2) && (t4[e2] = n2[e2]);
    }
    return t4;
  }, n.apply(this, arguments);
}
function e(t4) {
  return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t5) {
    return t5.__proto__ || Object.getPrototypeOf(t5);
  }, e(t4);
}
function o(t4, r2) {
  return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t5, r3) {
    return t5.__proto__ = r3, t5;
  }, o(t4, r2);
}
function i() {
  if ("undefined" == typeof Reflect || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if ("function" == typeof Proxy)
    return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (t4) {
    return false;
  }
}
function u(t4, r2, n2) {
  return u = i() ? Reflect.construct.bind() : function(t5, r3, n3) {
    var e2 = [null];
    e2.push.apply(e2, r3);
    var i2 = new (Function.bind.apply(t5, e2))();
    return n3 && o(i2, n3.prototype), i2;
  }, u.apply(null, arguments);
}
function f(t4) {
  var r2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return f = function(t5) {
    if (null === t5 || -1 === Function.toString.call(t5).indexOf("[native code]"))
      return t5;
    if ("function" != typeof t5)
      throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r2) {
      if (r2.has(t5))
        return r2.get(t5);
      r2.set(t5, n2);
    }
    function n2() {
      return u(t5, arguments, e(this).constructor);
    }
    return n2.prototype = Object.create(t5.prototype, { constructor: { value: n2, enumerable: false, writable: true, configurable: true } }), o(n2, t5);
  }, f(t4);
}
var a = String.prototype.replace, c = /%20/g, l = { default: "RFC3986", formatters: { RFC1738: function(t4) {
  return a.call(t4, c, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: "RFC3986" }, s = Object.prototype.hasOwnProperty, v = Array.isArray, p = function() {
  for (var t4 = [], r2 = 0; r2 < 256; ++r2)
    t4.push("%" + ((r2 < 16 ? "0" : "") + r2.toString(16)).toUpperCase());
  return t4;
}(), y = function(t4, r2) {
  for (var n2 = r2 && r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, e2 = 0; e2 < t4.length; ++e2)
    void 0 !== t4[e2] && (n2[e2] = t4[e2]);
  return n2;
}, d = { arrayToObject: y, assign: function(t4, r2) {
  return Object.keys(r2).reduce(function(t5, n2) {
    return t5[n2] = r2[n2], t5;
  }, t4);
}, combine: function(t4, r2) {
  return [].concat(t4, r2);
}, compact: function(t4) {
  for (var r2 = [{ obj: { o: t4 }, prop: "o" }], n2 = [], e2 = 0; e2 < r2.length; ++e2)
    for (var o2 = r2[e2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
      var a2 = u2[f2], c2 = i2[a2];
      "object" == typeof c2 && null !== c2 && -1 === n2.indexOf(c2) && (r2.push({ obj: i2, prop: a2 }), n2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var r3 = t5.pop(), n3 = r3.obj[r3.prop];
      if (v(n3)) {
        for (var e3 = [], o3 = 0; o3 < n3.length; ++o3)
          void 0 !== n3[o3] && e3.push(n3[o3]);
        r3.obj[r3.prop] = e3;
      }
    }
  }(r2), t4;
}, decode: function(t4, r2, n2) {
  var e2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === n2)
    return e2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(e2);
  } catch (t5) {
    return e2;
  }
}, encode: function(t4, r2, n2, e2, o2) {
  if (0 === t4.length)
    return t4;
  var i2 = t4;
  if ("symbol" == typeof t4 ? i2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (i2 = String(t4)), "iso-8859-1" === n2)
    return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    45 === a2 || 46 === a2 || 95 === a2 || 126 === a2 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === l.RFC1738 && (40 === a2 || 41 === a2) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += p[a2] : a2 < 2048 ? u2 += p[192 | a2 >> 6] + p[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += p[224 | a2 >> 12] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += p[240 | a2 >> 18] + p[128 | a2 >> 12 & 63] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, r2) {
  if (v(t4)) {
    for (var n2 = [], e2 = 0; e2 < t4.length; e2 += 1)
      n2.push(r2(t4[e2]));
    return n2;
  }
  return r2(t4);
}, merge: function t2(r2, n2, e2) {
  if (!n2)
    return r2;
  if ("object" != typeof n2) {
    if (v(r2))
      r2.push(n2);
    else {
      if (!r2 || "object" != typeof r2)
        return [r2, n2];
      (e2 && (e2.plainObjects || e2.allowPrototypes) || !s.call(Object.prototype, n2)) && (r2[n2] = true);
    }
    return r2;
  }
  if (!r2 || "object" != typeof r2)
    return [r2].concat(n2);
  var o2 = r2;
  return v(r2) && !v(n2) && (o2 = y(r2, e2)), v(r2) && v(n2) ? (n2.forEach(function(n3, o3) {
    if (s.call(r2, o3)) {
      var i2 = r2[o3];
      i2 && "object" == typeof i2 && n3 && "object" == typeof n3 ? r2[o3] = t2(i2, n3, e2) : r2.push(n3);
    } else
      r2[o3] = n3;
  }), r2) : Object.keys(n2).reduce(function(r3, o3) {
    var i2 = n2[o3];
    return r3[o3] = s.call(r3, o3) ? t2(r3[o3], i2, e2) : i2, r3;
  }, o2);
} }, b = Object.prototype.hasOwnProperty, h = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, r2) {
  return t4 + "[" + r2 + "]";
}, repeat: function(t4) {
  return t4;
} }, m = Array.isArray, g = String.prototype.split, j = Array.prototype.push, w = function(t4, r2) {
  j.apply(t4, m(r2) ? r2 : [r2]);
}, O = Date.prototype.toISOString, E = l.default, R = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: d.encode, encodeValuesOnly: false, format: E, formatter: l.formatters[E], indices: false, serializeDate: function(t4) {
  return O.call(t4);
}, skipNulls: false, strictNullHandling: false }, S = function t3(r2, n2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var b2, h2 = r2;
  if ("function" == typeof f2 ? h2 = f2(n2, h2) : h2 instanceof Date ? h2 = l2(h2) : "comma" === e2 && m(h2) && (h2 = d.maybeMap(h2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === h2) {
    if (o2)
      return u2 && !p2 ? u2(n2, R.encoder, y2, "key", s2) : n2;
    h2 = "";
  }
  if ("string" == typeof (b2 = h2) || "number" == typeof b2 || "boolean" == typeof b2 || "symbol" == typeof b2 || "bigint" == typeof b2 || d.isBuffer(h2)) {
    if (u2) {
      var j2 = p2 ? n2 : u2(n2, R.encoder, y2, "key", s2);
      if ("comma" === e2 && p2) {
        for (var O2 = g.call(String(h2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2)
          E2 += (0 === S2 ? "" : ",") + v2(u2(O2[S2], R.encoder, y2, "value", s2));
        return [v2(j2) + "=" + E2];
      }
      return [v2(j2) + "=" + v2(u2(h2, R.encoder, y2, "value", s2))];
    }
    return [v2(n2) + "=" + v2(String(h2))];
  }
  var k2, x2 = [];
  if (void 0 === h2)
    return x2;
  if ("comma" === e2 && m(h2))
    k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (m(f2))
    k2 = f2;
  else {
    var C2 = Object.keys(h2);
    k2 = a2 ? C2.sort(a2) : C2;
  }
  for (var N2 = 0; N2 < k2.length; ++N2) {
    var T2 = k2[N2], F2 = "object" == typeof T2 && void 0 !== T2.value ? T2.value : h2[T2];
    if (!i2 || null !== F2) {
      var D2 = m(h2) ? "function" == typeof e2 ? e2(n2, T2) : n2 : n2 + (c2 ? "." + T2 : "[" + T2 + "]");
      w(x2, t3(F2, D2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return x2;
}, k = Object.prototype.hasOwnProperty, x = Array.isArray, C = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, r2) {
    return String.fromCharCode(parseInt(r2, 10));
  });
}, T = function(t4, r2) {
  return t4 && "string" == typeof t4 && r2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, F = function(t4, r2, n2, e2) {
  if (t4) {
    var o2 = n2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = n2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!n2.plainObjects && k.call(Object.prototype, f2) && !n2.allowPrototypes)
        return;
      a2.push(f2);
    }
    for (var c2 = 0; n2.depth > 0 && null !== (u2 = i2.exec(o2)) && c2 < n2.depth; ) {
      if (c2 += 1, !n2.plainObjects && k.call(Object.prototype, u2[1].slice(1, -1)) && !n2.allowPrototypes)
        return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), function(t5, r3, n3, e3) {
      for (var o3 = e3 ? r3 : T(r3, n3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = t5[i3];
        if ("[]" === f3 && n3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          n3.parseArrays || "" !== a3 ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && n3.parseArrays && c3 <= n3.arrayLimit ? (u3 = [])[c3] = o3 : "__proto__" !== a3 && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(a2, r2, n2, e2);
  }
}, D = function(t4, r2) {
  var n2 = function(t5) {
    if (!t5)
      return C;
    if (null != t5.decoder && "function" != typeof t5.decoder)
      throw new TypeError("Decoder has to be a function.");
    if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: void 0 === t5.allowDots ? C.allowDots : !!t5.allowDots, allowPrototypes: "boolean" == typeof t5.allowPrototypes ? t5.allowPrototypes : C.allowPrototypes, arrayLimit: "number" == typeof t5.arrayLimit ? t5.arrayLimit : C.arrayLimit, charset: void 0 === t5.charset ? C.charset : t5.charset, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : C.charsetSentinel, comma: "boolean" == typeof t5.comma ? t5.comma : C.comma, decoder: "function" == typeof t5.decoder ? t5.decoder : C.decoder, delimiter: "string" == typeof t5.delimiter || d.isRegExp(t5.delimiter) ? t5.delimiter : C.delimiter, depth: "number" == typeof t5.depth || false === t5.depth ? +t5.depth : C.depth, ignoreQueryPrefix: true === t5.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t5.interpretNumericEntities ? t5.interpretNumericEntities : C.interpretNumericEntities, parameterLimit: "number" == typeof t5.parameterLimit ? t5.parameterLimit : C.parameterLimit, parseArrays: false !== t5.parseArrays, plainObjects: "boolean" == typeof t5.plainObjects ? t5.plainObjects : C.plainObjects, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : C.strictNullHandling };
  }(r2);
  if ("" === t4 || null == t4)
    return n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var e2 = "string" == typeof t4 ? function(t5, r3) {
    var n3, e3 = {}, o3 = (r3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(r3.delimiter, Infinity === r3.parameterLimit ? void 0 : r3.parameterLimit), i3 = -1, u3 = r3.charset;
    if (r3.charsetSentinel)
      for (n3 = 0; n3 < o3.length; ++n3)
        0 === o3[n3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[n3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[n3] && (u3 = "iso-8859-1"), i3 = n3, n3 = o3.length);
    for (n3 = 0; n3 < o3.length; ++n3)
      if (n3 !== i3) {
        var f3, a3, c2 = o3[n3], l2 = c2.indexOf("]="), s2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
        -1 === s2 ? (f3 = r3.decoder(c2, C.decoder, u3, "key"), a3 = r3.strictNullHandling ? null : "") : (f3 = r3.decoder(c2.slice(0, s2), C.decoder, u3, "key"), a3 = d.maybeMap(T(c2.slice(s2 + 1), r3), function(t6) {
          return r3.decoder(t6, C.decoder, u3, "value");
        })), a3 && r3.interpretNumericEntities && "iso-8859-1" === u3 && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = x(a3) ? [a3] : a3), e3[f3] = k.call(e3, f3) ? d.combine(e3[f3], a3) : a3;
      }
    return e3;
  }(t4, n2) : t4, o2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(e2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = F(f2, e2[f2], n2, "string" == typeof t4);
    o2 = d.merge(o2, a2, n2);
  }
  return d.compact(o2);
}, $ = /* @__PURE__ */ function() {
  function t4(t5, r2, n3) {
    var e2, o2;
    this.name = t5, this.definition = r2, this.bindings = null != (e2 = r2.bindings) ? e2 : {}, this.wheres = null != (o2 = r2.wheres) ? o2 : {}, this.config = n3;
  }
  var n2 = t4.prototype;
  return n2.matchesUrl = function(t5) {
    var r2 = this;
    if (!this.definition.methods.includes("GET"))
      return false;
    var n3 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(t6, n4, e3, o3) {
      var i3, u3 = "(?<" + e3 + ">" + ((null == (i3 = r2.wheres[e3]) ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + n4 + u3 + ")?" : "" + n4 + u3;
    }).replace(/^\w+:\/\//, ""), e2 = t5.replace(/^\w+:\/\//, "").split("?"), o2 = e2[0], i2 = e2[1], u2 = new RegExp("^" + n3 + "/?$").exec(o2);
    return !!u2 && { params: u2.groups, query: D(i2) };
  }, n2.compile = function(t5) {
    var r2 = this, n3 = this.parameterSegments;
    return n3.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(e2, o2, i2) {
      var u2, f2, a2;
      if (!i2 && [null, void 0].includes(t5[o2]))
        throw new Error("Ziggy error: '" + o2 + "' parameter is required for route '" + r2.name + "'.");
      if (n3[n3.length - 1].name === o2 && ".*" === r2.wheres[o2])
        return encodeURIComponent(null != (a2 = t5[o2]) ? a2 : "").replace(/%2F/g, "/");
      if (r2.wheres[o2] && !new RegExp("^" + (i2 ? "(" + r2.wheres[o2] + ")?" : r2.wheres[o2]) + "$").test(null != (u2 = t5[o2]) ? u2 : ""))
        throw new Error("Ziggy error: '" + o2 + "' parameter does not match required format '" + r2.wheres[o2] + "' for route '" + r2.name + "'.");
      return encodeURIComponent(null != (f2 = t5[o2]) ? f2 : "");
    }).replace(/\/+$/, "") : this.template;
  }, r(t4, [{ key: "template", get: function() {
    return ((this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "") + "/" + this.definition.uri).replace(/\/+$/, "");
  } }, { key: "parameterSegments", get: function() {
    var t5, r2;
    return null != (t5 = null == (r2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r2.map(function(t6) {
      return { name: t6.replace(/{|\??}/g, ""), required: !/\?}$/.test(t6) };
    })) ? t5 : [];
  } }]), t4;
}(), A = /* @__PURE__ */ function(t4) {
  var e2, i2;
  function u2(r2, e3, o2, i3) {
    var u3;
    if (void 0 === o2 && (o2 = true), (u3 = t4.call(this) || this).t = null != i3 ? i3 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u3.t = n({}, u3.t, { absolute: o2 }), r2) {
      if (!u3.t.routes[r2])
        throw new Error("Ziggy error: route '" + r2 + "' is not in the route list.");
      u3.i = new $(r2, u3.t.routes[r2], u3.t), u3.u = u3.l(e3);
    }
    return u3;
  }
  i2 = t4, (e2 = u2).prototype = Object.create(i2.prototype), e2.prototype.constructor = e2, o(e2, i2);
  var f2 = u2.prototype;
  return f2.toString = function() {
    var t5 = this, r2 = Object.keys(this.u).filter(function(r3) {
      return !t5.i.parameterSegments.some(function(t6) {
        return t6.name === r3;
      });
    }).filter(function(t6) {
      return "_query" !== t6;
    }).reduce(function(r3, e3) {
      var o2;
      return n({}, r3, ((o2 = {})[e3] = t5.u[e3], o2));
    }, {});
    return this.i.compile(this.u) + function(t6, r3) {
      var n2, e3 = t6, o2 = function(t7) {
        if (!t7)
          return R;
        if (null != t7.encoder && "function" != typeof t7.encoder)
          throw new TypeError("Encoder has to be a function.");
        var r4 = t7.charset || R.charset;
        if (void 0 !== t7.charset && "utf-8" !== t7.charset && "iso-8859-1" !== t7.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n3 = l.default;
        if (void 0 !== t7.format) {
          if (!b.call(l.formatters, t7.format))
            throw new TypeError("Unknown format option provided.");
          n3 = t7.format;
        }
        var e4 = l.formatters[n3], o3 = R.filter;
        return ("function" == typeof t7.filter || m(t7.filter)) && (o3 = t7.filter), { addQueryPrefix: "boolean" == typeof t7.addQueryPrefix ? t7.addQueryPrefix : R.addQueryPrefix, allowDots: void 0 === t7.allowDots ? R.allowDots : !!t7.allowDots, charset: r4, charsetSentinel: "boolean" == typeof t7.charsetSentinel ? t7.charsetSentinel : R.charsetSentinel, delimiter: void 0 === t7.delimiter ? R.delimiter : t7.delimiter, encode: "boolean" == typeof t7.encode ? t7.encode : R.encode, encoder: "function" == typeof t7.encoder ? t7.encoder : R.encoder, encodeValuesOnly: "boolean" == typeof t7.encodeValuesOnly ? t7.encodeValuesOnly : R.encodeValuesOnly, filter: o3, format: n3, formatter: e4, serializeDate: "function" == typeof t7.serializeDate ? t7.serializeDate : R.serializeDate, skipNulls: "boolean" == typeof t7.skipNulls ? t7.skipNulls : R.skipNulls, sort: "function" == typeof t7.sort ? t7.sort : null, strictNullHandling: "boolean" == typeof t7.strictNullHandling ? t7.strictNullHandling : R.strictNullHandling };
      }(r3);
      "function" == typeof o2.filter ? e3 = (0, o2.filter)("", e3) : m(o2.filter) && (n2 = o2.filter);
      var i3 = [];
      if ("object" != typeof e3 || null === e3)
        return "";
      var u3 = h[r3 && r3.arrayFormat in h ? r3.arrayFormat : r3 && "indices" in r3 ? r3.indices ? "indices" : "repeat" : "indices"];
      n2 || (n2 = Object.keys(e3)), o2.sort && n2.sort(o2.sort);
      for (var f3 = 0; f3 < n2.length; ++f3) {
        var a2 = n2[f3];
        o2.skipNulls && null === e3[a2] || w(i3, S(e3[a2], a2, u3, o2.strictNullHandling, o2.skipNulls, o2.encode ? o2.encoder : null, o2.filter, o2.sort, o2.allowDots, o2.serializeDate, o2.format, o2.formatter, o2.encodeValuesOnly, o2.charset));
      }
      var c2 = i3.join(o2.delimiter), s2 = true === o2.addQueryPrefix ? "?" : "";
      return o2.charsetSentinel && (s2 += "iso-8859-1" === o2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? s2 + c2 : "";
    }(n({}, r2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(t6, r3) {
      return "boolean" == typeof t6 ? Number(t6) : r3(t6);
    } });
  }, f2.v = function(t5) {
    var r2 = this;
    t5 ? this.t.absolute && t5.startsWith("/") && (t5 = this.p().host + t5) : t5 = this.h();
    var e3 = {}, o2 = Object.entries(this.t.routes).find(function(n2) {
      return e3 = new $(n2[0], n2[1], r2.t).matchesUrl(t5);
    }) || [void 0, void 0];
    return n({ name: o2[0] }, e3, { route: o2[1] });
  }, f2.h = function() {
    var t5 = this.p(), r2 = t5.pathname, n2 = t5.search;
    return (this.t.absolute ? t5.host + r2 : r2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n2;
  }, f2.current = function(t5, r2) {
    var e3 = this.v(), o2 = e3.name, i3 = e3.params, u3 = e3.query, f3 = e3.route;
    if (!t5)
      return o2;
    var a2 = new RegExp("^" + t5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    var c2 = new $(o2, f3, this.t);
    r2 = this.l(r2, c2);
    var l2 = n({}, i3, u3);
    return !(!Object.values(r2).every(function(t6) {
      return !t6;
    }) || Object.values(l2).some(function(t6) {
      return void 0 !== t6;
    })) || Object.entries(r2).every(function(t6) {
      return l2[t6[0]] == t6[1];
    });
  }, f2.p = function() {
    var t5, r2, n2, e3, o2, i3, u3 = "undefined" != typeof window ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: null != (t5 = null == (r2 = this.t.location) ? void 0 : r2.host) ? t5 : void 0 === f3 ? "" : f3, pathname: null != (n2 = null == (e3 = this.t.location) ? void 0 : e3.pathname) ? n2 : void 0 === a2 ? "" : a2, search: null != (o2 = null == (i3 = this.t.location) ? void 0 : i3.search) ? o2 : void 0 === c2 ? "" : c2 };
  }, f2.has = function(t5) {
    return Object.keys(this.t.routes).includes(t5);
  }, f2.l = function(t5, r2) {
    var e3 = this;
    void 0 === t5 && (t5 = {}), void 0 === r2 && (r2 = this.i), null != t5 || (t5 = {}), t5 = ["string", "number"].includes(typeof t5) ? [t5] : t5;
    var o2 = r2.parameterSegments.filter(function(t6) {
      return !e3.t.defaults[t6.name];
    });
    if (Array.isArray(t5))
      t5 = t5.reduce(function(t6, r3, e4) {
        var i4, u3;
        return n({}, t6, o2[e4] ? ((i4 = {})[o2[e4].name] = r3, i4) : "object" == typeof r3 ? r3 : ((u3 = {})[r3] = "", u3));
      }, {});
    else if (1 === o2.length && !t5[o2[0].name] && (t5.hasOwnProperty(Object.values(r2.bindings)[0]) || t5.hasOwnProperty("id"))) {
      var i3;
      (i3 = {})[o2[0].name] = t5, t5 = i3;
    }
    return n({}, this.m(r2), this.g(t5, r2));
  }, f2.m = function(t5) {
    var r2 = this;
    return t5.parameterSegments.filter(function(t6) {
      return r2.t.defaults[t6.name];
    }).reduce(function(t6, e3, o2) {
      var i3, u3 = e3.name;
      return n({}, t6, ((i3 = {})[u3] = r2.t.defaults[u3], i3));
    }, {});
  }, f2.g = function(t5, r2) {
    var e3 = r2.bindings, o2 = r2.parameterSegments;
    return Object.entries(t5).reduce(function(t6, r3) {
      var i3, u3, f3 = r3[0], a2 = r3[1];
      if (!a2 || "object" != typeof a2 || Array.isArray(a2) || !o2.some(function(t7) {
        return t7.name === f3;
      }))
        return n({}, t6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(e3[f3])) {
        if (!a2.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + e3[f3] + "'.");
        e3[f3] = "id";
      }
      return n({}, t6, ((i3 = {})[f3] = a2[e3[f3]], i3));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, f2.check = function(t5) {
    return this.has(t5);
  }, r(u2, [{ key: "params", get: function() {
    var t5 = this.v();
    return n({}, t5.params, t5.query);
  } }]), u2;
}(/* @__PURE__ */ f(String));
function P(t4, r2, n2, e2) {
  var o2 = new A(t4, r2, n2, e2);
  return t4 ? o2.toString() : o2;
}
const VApp$1 = "";
const VApp = genericComponent()({
  name: "VApp",
  props: {
    ...makeComponentProps(),
    ...makeLayoutProps({
      fullHeight: true
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a;
      return createVNode("div", {
        "ref": layoutRef,
        "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class],
        "style": [layoutStyles.value, props.style]
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const VMain$1 = "";
const VMain = genericComponent()({
  name: "VMain",
  props: {
    scrollable: Boolean,
    ...makeComponentProps(),
    ...makeTagProps({
      tag: "main"
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": ["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class],
      "style": [mainStyles.value, ssrBootStyles.value, props.style]
    }, {
      default: () => {
        var _a, _b;
        return [props.scrollable ? createVNode("div", {
          "class": "v-main__scroller"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]) : (_b = slots.default) == null ? void 0 : _b.call(slots)];
      }
    }));
    return {};
  }
});
const VNavigationDrawer$1 = "";
function useSticky(_ref) {
  let {
    rootEl,
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = ref(false);
  const stuckPosition = ref(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  onMounted(() => {
    watch(isSticky, (val) => {
      if (val) {
        window.addEventListener("scroll", onScroll, {
          passive: true
        });
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    }, {
      immediate: true
    });
  });
  onBeforeUnmount(() => {
    document.removeEventListener("scroll", onScroll);
  });
  let lastScrollTop = 0;
  function onScroll() {
    const direction = lastScrollTop > window.scrollY ? "up" : "down";
    const rect = rootEl.value.getBoundingClientRect();
    const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0);
    const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop);
    const bottom = rect.height + Math.max(stuckPosition.value, layoutTop) - window.scrollY - window.innerHeight;
    if (rect.height < window.innerHeight - layoutTop) {
      isStuck.value = "top";
      stuckPosition.value = layoutTop;
    } else if (direction === "up" && isStuck.value === "bottom" || direction === "down" && isStuck.value === "top") {
      stuckPosition.value = window.scrollY + rect.top;
      isStuck.value = true;
    } else if (direction === "down" && bottom <= 0) {
      stuckPosition.value = 0;
      isStuck.value = "bottom";
    } else if (direction === "up" && top <= 0) {
      stuckPosition.value = rect.top + top;
      isStuck.value = "top";
    }
    lastScrollTop = window.scrollY;
  }
  return {
    isStuck,
    stickyStyles
  };
}
const HORIZON = 100;
const HISTORY = 20;
function kineticEnergyToVelocity(work) {
  const sqrt2 = 1.41421356237;
  return (work < 0 ? -1 : 1) * Math.sqrt(Math.abs(work)) * sqrt2;
}
function calculateImpulseVelocity(samples) {
  if (samples.length < 2) {
    return 0;
  }
  if (samples.length === 2) {
    if (samples[1].t === samples[0].t) {
      return 0;
    }
    return (samples[1].d - samples[0].d) / (samples[1].t - samples[0].t);
  }
  let work = 0;
  for (let i2 = samples.length - 1; i2 > 0; i2--) {
    if (samples[i2].t === samples[i2 - 1].t) {
      continue;
    }
    const vprev = kineticEnergyToVelocity(work);
    const vcurr = (samples[i2].d - samples[i2 - 1].d) / (samples[i2].t - samples[i2 - 1].t);
    work += (vcurr - vprev) * Math.abs(vcurr);
    if (i2 === samples.length - 1) {
      work *= 0.5;
    }
  }
  return kineticEnergyToVelocity(work) * 1e3;
}
function useVelocity() {
  const touches = {};
  function addMovement(e2) {
    Array.from(e2.changedTouches).forEach((touch) => {
      const samples = touches[touch.identifier] ?? (touches[touch.identifier] = new CircularBuffer(HISTORY));
      samples.push([e2.timeStamp, touch]);
    });
  }
  function endTouch(e2) {
    Array.from(e2.changedTouches).forEach((touch) => {
      delete touches[touch.identifier];
    });
  }
  function getVelocity(id) {
    var _a;
    const samples = (_a = touches[id]) == null ? void 0 : _a.values().reverse();
    if (!samples) {
      throw new Error(`No samples for touch id ${id}`);
    }
    const newest = samples[0];
    const x2 = [];
    const y2 = [];
    for (const val of samples) {
      if (newest[0] - val[0] > HORIZON)
        break;
      x2.push({
        t: val[0],
        d: val[1].clientX
      });
      y2.push({
        t: val[0],
        d: val[1].clientY
      });
    }
    return {
      x: calculateImpulseVelocity(x2),
      y: calculateImpulseVelocity(y2),
      get direction() {
        const {
          x: x3,
          y: y3
        } = this;
        const [absX, absY] = [Math.abs(x3), Math.abs(y3)];
        return absX > absY && x3 >= 0 ? "right" : absX > absY && x3 <= 0 ? "left" : absY > absX && y3 >= 0 ? "down" : absY > absX && y3 <= 0 ? "up" : oops$1();
      }
    };
  }
  return {
    addMovement,
    endTouch,
    getVelocity
  };
}
function oops$1() {
  throw new Error();
}
function useTouch(_ref) {
  let {
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  onMounted(() => {
    window.addEventListener("touchstart", onTouchstart, {
      passive: true
    });
    window.addEventListener("touchmove", onTouchmove, {
      passive: false
    });
    window.addEventListener("touchend", onTouchend, {
      passive: true
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener("touchstart", onTouchstart);
    window.removeEventListener("touchmove", onTouchmove);
    window.removeEventListener("touchend", onTouchend);
  });
  const isHorizontal = computed(() => ["left", "right"].includes(position.value));
  const {
    addMovement,
    endTouch,
    getVelocity
  } = useVelocity();
  let maybeDragging = false;
  const isDragging = ref(false);
  const dragProgress = ref(0);
  const offset = ref(0);
  let start;
  function getOffset(pos, active) {
    return (position.value === "left" ? pos : position.value === "right" ? document.documentElement.clientWidth - pos : position.value === "top" ? pos : position.value === "bottom" ? document.documentElement.clientHeight - pos : oops()) - (active ? width.value : 0);
  }
  function getProgress(pos) {
    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const progress = position.value === "left" ? (pos - offset.value) / width.value : position.value === "right" ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === "top" ? (pos - offset.value) / width.value : position.value === "bottom" ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops();
    return limit ? Math.max(0, Math.min(1, progress)) : progress;
  }
  function onTouchstart(e2) {
    if (touchless.value)
      return;
    const touchX = e2.changedTouches[0].clientX;
    const touchY = e2.changedTouches[0].clientY;
    const touchZone = 25;
    const inTouchZone = position.value === "left" ? touchX < touchZone : position.value === "right" ? touchX > document.documentElement.clientWidth - touchZone : position.value === "top" ? touchY < touchZone : position.value === "bottom" ? touchY > document.documentElement.clientHeight - touchZone : oops();
    const inElement = isActive.value && (position.value === "left" ? touchX < width.value : position.value === "right" ? touchX > document.documentElement.clientWidth - width.value : position.value === "top" ? touchY < width.value : position.value === "bottom" ? touchY > document.documentElement.clientHeight - width.value : oops());
    if (inTouchZone || inElement || isActive.value && isTemporary.value) {
      maybeDragging = true;
      start = [touchX, touchY];
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, isActive.value);
      dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY);
      endTouch(e2);
      addMovement(e2);
    }
  }
  function onTouchmove(e2) {
    const touchX = e2.changedTouches[0].clientX;
    const touchY = e2.changedTouches[0].clientY;
    if (maybeDragging) {
      if (!e2.cancelable) {
        maybeDragging = false;
        return;
      }
      const dx = Math.abs(touchX - start[0]);
      const dy = Math.abs(touchY - start[1]);
      const thresholdMet = isHorizontal.value ? dx > dy && dx > 3 : dy > dx && dy > 3;
      if (thresholdMet) {
        isDragging.value = true;
        maybeDragging = false;
      } else if ((isHorizontal.value ? dy : dx) > 3) {
        maybeDragging = false;
      }
    }
    if (!isDragging.value)
      return;
    e2.preventDefault();
    addMovement(e2);
    const progress = getProgress(isHorizontal.value ? touchX : touchY, false);
    dragProgress.value = Math.max(0, Math.min(1, progress));
    if (progress > 1) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, true);
    } else if (progress < 0) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, false);
    }
  }
  function onTouchend(e2) {
    maybeDragging = false;
    if (!isDragging.value)
      return;
    addMovement(e2);
    isDragging.value = false;
    const velocity = getVelocity(e2.changedTouches[0].identifier);
    const vx = Math.abs(velocity.x);
    const vy = Math.abs(velocity.y);
    const thresholdMet = isHorizontal.value ? vx > vy && vx > 400 : vy > vx && vy > 3;
    if (thresholdMet) {
      isActive.value = velocity.direction === ({
        left: "right",
        right: "left",
        top: "down",
        bottom: "up"
      }[position.value] || oops());
    } else {
      isActive.value = dragProgress.value > 0.5;
    }
  }
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: {
    color: String,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    permanent: Boolean,
    rail: {
      type: Boolean,
      default: null
    },
    railWidth: {
      type: [Number, String],
      default: 56
    },
    scrim: {
      type: [String, Boolean],
      default: true
    },
    image: String,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    location: {
      type: String,
      default: "start",
      validator: (value) => locations.includes(value)
    },
    sticky: Boolean,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "nav"
    }),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      mobile
    } = useDisplay();
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v2) => !!v2);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const rootEl = ref();
    const isHovering = ref(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    if (props.expandOnHover && props.rail != null) {
      watch(isHovering, (val) => emit("update:rail", !val));
    }
    if (!props.disableResizeWatcher) {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    }
    if (!props.disableRouteWatcher && router) {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    }
    watch(() => props.permanent, (val) => {
      if (val)
        isActive.value = true;
    });
    onBeforeMount(() => {
      if (props.modelValue != null || isTemporary.value)
        return;
      isActive.value = props.permanent || !mobile.value;
    });
    const {
      isDragging,
      dragProgress,
      dragStyles
    } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, "touchless"),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutRect,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutRect.value ? {
        left: convertToUnit(layoutRect.value.left),
        right: convertToUnit(layoutRect.value.right),
        top: convertToUnit(layoutRect.value.top),
        bottom: convertToUnit(layoutRect.value.bottom)
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    function onMouseenter() {
      isHovering.value = true;
    }
    function onMouseleave() {
      isHovering.value = false;
    }
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
      }, attrs), {
        default: () => {
          var _a, _b, _c, _d;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [slots.image ? (_a = slots.image) == null ? void 0 : _a.call(slots, {
            image: props.image
          }) : createVNode("img", {
            "src": props.image,
            "alt": ""
          }, null)]), slots.prepend && createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_b = slots.prepend) == null ? void 0 : _b.call(slots)]), createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_c = slots.default) == null ? void 0 : _c.call(slots)]), slots.append && createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_d = slots.append) == null ? void 0 : _d.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", {
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => isActive.value = false
        }, null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  __ssrInlineRender: true,
  setup(__props) {
    useLocale().current.value = getActiveLanguage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VNavigationDrawer, {
              "expand-on-hover": "",
              rail: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VList, {
                    density: "compact",
                    nav: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Link), {
                          href: unref(P)("ticket-allocator.index")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, {
                                "prepend-icon": "mdi-monitor-dashboard",
                                title: _ctx.$t("dashboard"),
                                value: "dashboard"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, {
                                  "prepend-icon": "mdi-monitor-dashboard",
                                  title: _ctx.$t("dashboard"),
                                  value: "dashboard"
                                }, null, 8, ["title"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Link), {
                          href: unref(P)("ticket-allocator.ticket-categories.index")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, {
                                "prepend-icon": "mdi-ticket",
                                title: _ctx.$t("ticket_categories"),
                                value: "ticket-categories"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, {
                                  "prepend-icon": "mdi-ticket",
                                  title: _ctx.$t("ticket_categories"),
                                  value: "ticket-categories"
                                }, null, 8, ["title"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Link), {
                          href: unref(P)("ticket-allocator.operators.index")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, {
                                "prepend-icon": "mdi-account",
                                title: _ctx.$t("operators"),
                                value: "operators"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, {
                                  "prepend-icon": "mdi-account",
                                  title: _ctx.$t("operators"),
                                  value: "operators"
                                }, null, 8, ["title"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Link), {
                          href: unref(P)("ticket-allocator.teams.index")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, {
                                "prepend-icon": "mdi-account-group",
                                title: _ctx.$t("teams"),
                                value: "teams"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, {
                                  "prepend-icon": "mdi-account-group",
                                  title: _ctx.$t("teams"),
                                  value: "teams"
                                }, null, 8, ["title"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Link), {
                          href: unref(P)("ticket-allocator.factors.index")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, {
                                "prepend-icon": "mdi-tune",
                                title: _ctx.$t("factors"),
                                value: "factors"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, {
                                  "prepend-icon": "mdi-tune",
                                  title: _ctx.$t("factors"),
                                  value: "factors"
                                }, null, 8, ["title"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Link), {
                            href: unref(P)("ticket-allocator.index")
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, {
                                "prepend-icon": "mdi-monitor-dashboard",
                                title: _ctx.$t("dashboard"),
                                value: "dashboard"
                              }, null, 8, ["title"])
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: unref(P)("ticket-allocator.ticket-categories.index")
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, {
                                "prepend-icon": "mdi-ticket",
                                title: _ctx.$t("ticket_categories"),
                                value: "ticket-categories"
                              }, null, 8, ["title"])
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: unref(P)("ticket-allocator.operators.index")
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, {
                                "prepend-icon": "mdi-account",
                                title: _ctx.$t("operators"),
                                value: "operators"
                              }, null, 8, ["title"])
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: unref(P)("ticket-allocator.teams.index")
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, {
                                "prepend-icon": "mdi-account-group",
                                title: _ctx.$t("teams"),
                                value: "teams"
                              }, null, 8, ["title"])
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: unref(P)("ticket-allocator.factors.index")
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, {
                                "prepend-icon": "mdi-tune",
                                title: _ctx.$t("factors"),
                                value: "factors"
                              }, null, 8, ["title"])
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VList, {
                      density: "compact",
                      nav: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: unref(P)("ticket-allocator.index")
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, {
                              "prepend-icon": "mdi-monitor-dashboard",
                              title: _ctx.$t("dashboard"),
                              value: "dashboard"
                            }, null, 8, ["title"])
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: unref(P)("ticket-allocator.ticket-categories.index")
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, {
                              "prepend-icon": "mdi-ticket",
                              title: _ctx.$t("ticket_categories"),
                              value: "ticket-categories"
                            }, null, 8, ["title"])
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: unref(P)("ticket-allocator.operators.index")
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, {
                              "prepend-icon": "mdi-account",
                              title: _ctx.$t("operators"),
                              value: "operators"
                            }, null, 8, ["title"])
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: unref(P)("ticket-allocator.teams.index")
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, {
                              "prepend-icon": "mdi-account-group",
                              title: _ctx.$t("teams"),
                              value: "teams"
                            }, null, 8, ["title"])
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: unref(P)("ticket-allocator.factors.index")
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, {
                              "prepend-icon": "mdi-tune",
                              title: _ctx.$t("factors"),
                              value: "factors"
                            }, null, 8, ["title"])
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"${_scopeId2}><div class="w-1/4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: unref(P)("ticket-allocator.index"),
                    class: "flex align-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(ApplicationLogo, { class: "w-20 h-20 shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="font-title text-4xl text-gray-600"${_scopeId3}>${ssrInterpolate(_ctx.$t("title"))}</span>`);
                      } else {
                        return [
                          createVNode(ApplicationLogo, { class: "w-20 h-20 shrink-0" }),
                          createVNode("span", { class: "font-title text-4xl text-gray-600" }, toDisplayString(_ctx.$t("title")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100" }, [
                      createVNode("div", { class: "w-1/4" }, [
                        createVNode(unref(Link), {
                          href: unref(P)("ticket-allocator.index"),
                          class: "flex align-center"
                        }, {
                          default: withCtx(() => [
                            createVNode(ApplicationLogo, { class: "w-20 h-20 shrink-0" }),
                            createVNode("span", { class: "font-title text-4xl text-gray-600" }, toDisplayString(_ctx.$t("title")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", { class: "w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg" }, [
                        renderSlot(_ctx.$slots, "default")
                      ])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VNavigationDrawer, {
                "expand-on-hover": "",
                rail: ""
              }, {
                default: withCtx(() => [
                  createVNode(VList, {
                    density: "compact",
                    nav: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Link), {
                        href: unref(P)("ticket-allocator.index")
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, {
                            "prepend-icon": "mdi-monitor-dashboard",
                            title: _ctx.$t("dashboard"),
                            value: "dashboard"
                          }, null, 8, ["title"])
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(P)("ticket-allocator.ticket-categories.index")
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, {
                            "prepend-icon": "mdi-ticket",
                            title: _ctx.$t("ticket_categories"),
                            value: "ticket-categories"
                          }, null, 8, ["title"])
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(P)("ticket-allocator.operators.index")
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, {
                            "prepend-icon": "mdi-account",
                            title: _ctx.$t("operators"),
                            value: "operators"
                          }, null, 8, ["title"])
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(P)("ticket-allocator.teams.index")
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, {
                            "prepend-icon": "mdi-account-group",
                            title: _ctx.$t("teams"),
                            value: "teams"
                          }, null, 8, ["title"])
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(P)("ticket-allocator.factors.index")
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, {
                            "prepend-icon": "mdi-tune",
                            title: _ctx.$t("factors"),
                            value: "factors"
                          }, null, 8, ["title"])
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VMain, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100" }, [
                    createVNode("div", { class: "w-1/4" }, [
                      createVNode(unref(Link), {
                        href: unref(P)("ticket-allocator.index"),
                        class: "flex align-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(ApplicationLogo, { class: "w-20 h-20 shrink-0" }),
                          createVNode("span", { class: "font-title text-4xl text-gray-600" }, toDisplayString(_ctx.$t("title")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg" }, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/Default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  P,
  _export_sfc as _,
  _sfc_main as a
};
//# sourceMappingURL=Default-b1f68e08.mjs.map
