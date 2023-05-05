var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b;
import { ref, computed, reactive, watch, createVNode, mergeProps, toRef, provide, withDirectives, resolveDirective, inject, nextTick, vShow, defineComponent, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext, onMounted, isRef, TransitionGroup } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderSlot, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc, A, a as _sfc_main$5 } from "./Default-daaeb621.mjs";
import { useEventListener, isClient, createSharedComposable, useLocalStorage, useTimestamp, usePointerLock, useMouse, refThrottled } from "@vueuse/core";
import MarkdownIt from "markdown-it";
import { usePage, Head } from "@inertiajs/vue3";
import { p as propsFactory, I as IconValue, m as makeComponentProps, a as makeTagProps, b as makeGroupProps, g as genericComponent, u as useRtl, c as useDisplay, d as useGroup, e as useResizeObserver, f as IN_BROWSER, h as useRender, V as VFadeTransition, i as VIcon, j as focusableChildren, k as clamp, o as omit, l as makeVBtnProps, n as useTextColor, q as VBtn, r as animate, s as standardEasing, t as makeDensityProps, v as useProxiedModel, w as useDensity, x as useBackgroundColor, y as provideDefaults, z as convertToUnit, A as keys, B as makeThemeProps, C as provideTheme, D as useLocale, E as makeGroupItemProps, F as makeLazyProps, G as useGroupItem, H as useSsrBoot, J as useLazy, M as MaybeTransition, K as VOverlay, L as makeVInputProps, N as makeSelectionControlProps, O as useLoader, P as useFocus, Q as getUid, R as filterInputAttrs, S as VInput, T as VSelectionControl, U as LoaderSlot, W as VProgressCircular, X as VBtnToggle, Y as VBtnGroup, Z as VTable } from "../ssr.mjs";
import { V as VCard, a as VCardText } from "./VCard-6a3fb1b9.mjs";
import { Repository as Repository$1, Query as Query$1, Model, useRepo } from "pinia-orm";
import { Uid, Attr, Str, Bool, Num, BelongsToMany, HasMany, OnDelete, BelongsTo } from "pinia-orm/dist/decorators.js";
import { useCollect } from "pinia-orm/dist/helpers.js";
import { V as VContainer, a as VRow, b as VCol } from "./VRow-bcf9aa06.mjs";
import "laravel-vue-i18n";
import "pinia";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
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
const VTabs$1 = "";
const VSlideGroup$1 = "";
function bias(val) {
  const c = 0.501;
  const x = Math.abs(val);
  return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1));
}
function calculateUpdatedOffset(_ref) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    currentScrollOffset,
    isHorizontal
  } = _ref;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
  const adjustedOffsetStart = isRtl && isHorizontal ? contentSize - offsetStart - clientSize : offsetStart;
  const totalSize = containerSize + currentScrollOffset;
  const itemOffset = clientSize + adjustedOffsetStart;
  const additionalOffset = clientSize * 0.4;
  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
  }
  return currentScrollOffset;
}
function calculateCenteredOffset(_ref2) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    isHorizontal
  } = _ref2;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
  const offsetCentered = isRtl && isHorizontal ? contentSize - offsetStart - clientSize / 2 - containerSize / 2 : offsetStart + clientSize / 2 - containerSize / 2;
  return Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: "v-slide-group-item--active"
  })
}, "v-slide-group");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: makeVSlideGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      mobile
    } = useDisplay();
    const group = useGroup(props, props.symbol);
    const isOverflowing = ref(false);
    const scrollOffset = ref(0);
    const containerSize = ref(0);
    const contentSize = ref(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    const firstSelectedIndex = computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    const lastSelectedIndex = computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    if (IN_BROWSER) {
      let frame = -1;
      watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (containerRect.value && contentRect.value) {
            const sizeProperty = isHorizontal.value ? "width" : "height";
            containerSize.value = containerRect.value[sizeProperty];
            contentSize.value = contentRect.value[sizeProperty];
            isOverflowing.value = containerSize.value + 1 < contentSize.value;
          }
          if (firstSelectedIndex.value >= 0 && contentRef.value) {
            const selectedElement = contentRef.value.children[lastSelectedIndex.value];
            if (firstSelectedIndex.value === 0 || !isOverflowing.value) {
              scrollOffset.value = 0;
            } else if (props.centerActive) {
              scrollOffset.value = calculateCenteredOffset({
                selectedElement,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                isHorizontal: isHorizontal.value
              });
            } else if (isOverflowing.value) {
              scrollOffset.value = calculateUpdatedOffset({
                selectedElement,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                currentScrollOffset: scrollOffset.value,
                isHorizontal: isHorizontal.value
              });
            }
          }
        });
      });
    }
    const disableTransition = ref(false);
    let startTouch = 0;
    let startOffset = 0;
    function onTouchstart(e) {
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      startOffset = sign * scrollOffset.value;
      startTouch = e.touches[0][sizeProperty];
      disableTransition.value = true;
    }
    function onTouchmove(e) {
      if (!isOverflowing.value)
        return;
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      scrollOffset.value = sign * (startOffset + startTouch - e.touches[0][sizeProperty]);
    }
    function onTouchend(e) {
      const maxScrollOffset = contentSize.value - containerSize.value;
      if (scrollOffset.value < 0 || !isOverflowing.value) {
        scrollOffset.value = 0;
      } else if (scrollOffset.value >= maxScrollOffset) {
        scrollOffset.value = maxScrollOffset;
      }
      disableTransition.value = false;
    }
    function onScroll() {
      if (!containerRef.value)
        return;
      containerRef.value[isHorizontal.value ? "scrollLeft" : "scrollTop"] = 0;
    }
    const isFocused = ref(false);
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.value)
        return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.value.children) {
          if (item === el) {
            scrollOffset.value = calculateUpdatedOffset({
              selectedElement: item,
              containerSize: containerSize.value,
              contentSize: contentSize.value,
              isRtl: isRtl.value,
              currentScrollOffset: scrollOffset.value,
              isHorizontal: isHorizontal.value
            });
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      var _a2;
      if (!isFocused.value && !(e.relatedTarget && ((_a2 = contentRef.value) == null ? void 0 : _a2.contains(e.relatedTarget))))
        focus();
    }
    function onKeydown(e) {
      if (!contentRef.value)
        return;
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          focus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          focus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          focus("next");
        } else if (e.key === "ArrowUp") {
          focus("prev");
        }
      }
      if (e.key === "Home") {
        focus("first");
      } else if (e.key === "End") {
        focus("last");
      }
    }
    function focus(location) {
      var _a2, _b2, _c, _d, _e;
      if (!contentRef.value)
        return;
      if (!location) {
        const focusable = focusableChildren(contentRef.value);
        (_a2 = focusable[0]) == null ? void 0 : _a2.focus();
      } else if (location === "next") {
        const el = (_b2 = contentRef.value.querySelector(":focus")) == null ? void 0 : _b2.nextElementSibling;
        if (el)
          el.focus();
        else
          focus("first");
      } else if (location === "prev") {
        const el = (_c = contentRef.value.querySelector(":focus")) == null ? void 0 : _c.previousElementSibling;
        if (el)
          el.focus();
        else
          focus("last");
      } else if (location === "first") {
        (_d = contentRef.value.firstElementChild) == null ? void 0 : _d.focus();
      } else if (location === "last") {
        (_e = contentRef.value.lastElementChild) == null ? void 0 : _e.focus();
      }
    }
    function scrollTo(location) {
      const newAbsoluteOffset = scrollOffset.value + (location === "prev" ? -1 : 1) * containerSize.value;
      scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value);
    }
    const contentStyles = computed(() => {
      let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;
      if (scrollOffset.value <= 0) {
        scrollAmount = bias(-scrollOffset.value);
      }
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      return {
        transform: `translate${isHorizontal.value ? "X" : "Y"}(${sign * scrollAmount}px)`,
        transition: disableTransition.value ? "none" : "",
        willChange: disableTransition.value ? "transform" : ""
      };
    });
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        case "always":
          return true;
        case "desktop":
          return !mobile.value;
        case true:
          return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        case "mobile":
          return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        default:
          return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 0;
    });
    const hasNext = computed(() => {
      return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }, props.class],
      "style": props.style,
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => {
        var _a2, _b2, _c;
        return [hasAffixes.value && createVNode("div", {
          "key": "prev",
          "class": ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }],
          "onClick": () => scrollTo("prev")
        }, [((_a2 = slots.prev) == null ? void 0 : _a2.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "style": contentStyles.value,
          "onTouchstartPassive": onTouchstart,
          "onTouchmovePassive": onTouchmove,
          "onTouchendPassive": onTouchend,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_b2 = slots.default) == null ? void 0 : _b2.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
          "key": "next",
          "class": ["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }],
          "onClick": () => scrollTo("next")
        }, [((_c = slots.next) == null ? void 0 : _c.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])];
      }
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus
    };
  }
});
const VTab$1 = "";
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const VTab = genericComponent()({
  name: "VTab",
  props: {
    fixed: Boolean,
    sliderColor: String,
    hideSlider: Boolean,
    direction: {
      type: String,
      default: "horizontal"
    },
    ...omit(makeVBtnProps({
      selectedClass: "v-tab--selected",
      variant: "text"
    }), ["active", "block", "flat", "location", "position", "symbol"])
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = ref(false);
    const rootEl = ref();
    const sliderEl = ref();
    function updateSlider(_ref2) {
      var _a2, _b2;
      let {
        value
      } = _ref2;
      isSelected.value = value;
      if (value) {
        const prevEl = (_b2 = (_a2 = rootEl.value) == null ? void 0 : _a2.$el.parentElement) == null ? void 0 : _b2.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl)
          return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]);
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight];
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, ""],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, ""],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const [btnProps] = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false,
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "rounded": 0
      }, btnProps, attrs, {
        "onGroup:selected": updateSlider
      }), {
        default: () => {
          var _a2;
          return [((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? props.text, !props.hideSlider && createVNode("div", {
            "ref": sliderEl,
            "class": ["v-tab__slider", sliderColorClasses.value],
            "style": sliderColorStyles.value
          }, null)];
        }
      });
    });
    return {};
  }
});
function parseItems(items) {
  if (!items)
    return [];
  return items.map((item) => {
    if (typeof item === "string")
      return {
        title: item,
        value: item
      };
    return item;
  });
}
const VTabs = genericComponent()({
  name: "VTabs",
  props: {
    alignTabs: {
      type: String,
      default: "start"
    },
    color: String,
    fixedTabs: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    stacked: Boolean,
    bgColor: String,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: void 0
    },
    hideSlider: Boolean,
    sliderColor: String,
    ...makeVSlideGroupProps({
      mandatory: "force"
    }),
    ...makeDensityProps(),
    ...makeTagProps()
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const parsedItems = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => {
      const [slideGroupProps] = VSlideGroup.filterProps(props);
      return createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }), {
        default: () => [slots.default ? slots.default() : parsedItems.value.map((item) => createVNode(VTab, mergeProps(item, {
          "key": item.title
        }), null))]
      });
    });
    return {};
  }
});
const VWindow$1 = "";
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a2 = wrapper.start) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a2 = wrapper.end) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a2 = wrapper.move) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a2;
  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (value == null ? void 0 : value.options) ?? {
    passive: true
  };
  const uid = (_a2 = binding.instance) == null ? void 0 : _a2.$.uid;
  if (!target || !uid)
    return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  var _a2, _b2;
  const target = ((_a2 = binding.value) == null ? void 0 : _a2.parent) ? el.parentElement : el;
  const uid = (_b2 = binding.instance) == null ? void 0 : _b2.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid)
    return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const Touch$1 = Touch;
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "v-window");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = ref(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = ref(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        ariaLabel: t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        ariaLabel: t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false)
        return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a2, _b2;
        return [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_b2 = slots.additional) == null ? void 0 : _b2.call(slots, {
          group
        })];
      }
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch: Touch$1
  },
  props: {
    reverseTransition: {
      type: [Boolean, String],
      default: void 0
    },
    transition: {
      type: [Boolean, String],
      default: void 0
    },
    ...makeComponentProps(),
    ...makeGroupItemProps(),
    ...makeLazyProps()
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window2 = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window2 || !groupItem)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = ref(false);
    const hasTransition = computed(() => window2.isReversed.value ? props.reverseTransition !== false : props.transition !== false);
    function onAfterTransition() {
      if (!isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = false;
      if (window2.transitionCount.value > 0) {
        window2.transitionCount.value -= 1;
        if (window2.transitionCount.value === 0) {
          window2.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      var _a2;
      if (isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = true;
      if (window2.transitionCount.value === 0) {
        window2.transitionHeight.value = convertToUnit((_a2 = window2.rootRef.value) == null ? void 0 : _a2.clientHeight);
      }
      window2.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window2) {
          return;
        }
        window2.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window2.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window2.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => {
        var _a2;
        return [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value, props.class],
          "style": props.style
        }, [hasContent.value && ((_a2 = slots.default) == null ? void 0 : _a2.call(slots))]), [[vShow, groupItem.isSelected.value]])];
      }
    }));
    return {};
  }
});
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
        "--974a891e": unref(animation).delay,
        "--633adce6": unref(animation).duration
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-inline-block" }, _attrs, _cssVars))} data-v-c9e05f88>`);
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
                icon: ((_b2 = __props.ticket.meta) == null ? void 0 : _b2.icon) ?? "",
                color: "white"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="text-white overflow-hidden" data-v-c9e05f88${_scopeId}><span class="title inline-block relative" data-v-c9e05f88${_scopeId}>${ssrInterpolate(title())}</span></span>`);
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
                    width: "500",
                    "prepend-icon": ((_a3 = __props.ticket.meta) == null ? void 0 : _a3.icon) ?? "",
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
                                            _push7(`<div data-v-c9e05f88${_scopeId6}>${unref(md).render(unref(cardContent))}</div>`);
                                          } else {
                                            _push7(`<table data-v-c9e05f88${_scopeId6}><tbody data-v-c9e05f88${_scopeId6}><!--[-->`);
                                            ssrRenderList(unref(cardContent), (value, key) => {
                                              _push7(`<tr data-v-c9e05f88${_scopeId6}><th data-v-c9e05f88${_scopeId6}>${ssrInterpolate(key)}</th><td data-v-c9e05f88${_scopeId6}>${unref(md).renderInline(value)}</td></tr>`);
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
                                    _push6(ssrRenderComponent(VWindowItem, {
                                      value: "metrics",
                                      class: "prose"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<table class="table-fixed" data-v-c9e05f88${_scopeId6}><thead data-v-c9e05f88${_scopeId6}><tr data-v-c9e05f88${_scopeId6}><th class="w-1/3" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(_ctx.$t("factor"))}</th><th class="text-center" data-v-c9e05f88${_scopeId6}><em class="metric"${ssrRenderAttr("title", _ctx.$t("initial_weight"))} data-v-c9e05f88${_scopeId6}>W<sub data-v-c9e05f88${_scopeId6}>0</sub></em></th><th class="text-center" data-v-c9e05f88${_scopeId6}><em class="metric"${ssrRenderAttr("title", _ctx.$t("weight_increment"))} data-v-c9e05f88${_scopeId6}>W<sub data-v-c9e05f88${_scopeId6}>i</sub></em></th><th class="text-center" data-v-c9e05f88${_scopeId6}><em class="metric"${ssrRenderAttr("title", _ctx.$t("complexity"))} data-v-c9e05f88${_scopeId6}>C</em></th><th class="text-center" data-v-c9e05f88${_scopeId6}><em class="metric"${ssrRenderAttr("title", _ctx.$t("delay"))} data-v-c9e05f88${_scopeId6}>D</em></th></tr></thead><tbody data-v-c9e05f88${_scopeId6}><!--[-->`);
                                          ssrRenderList(__props.ticket.metrics ?? {}, (adjustments, factorUuid) => {
                                            _push7(`<tr data-v-c9e05f88${_scopeId6}><th data-v-c9e05f88${_scopeId6}>${ssrInterpolate(factorUuid)}</th><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(adjustments.initial_weight ?? 0)}</td><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(adjustments.weight_increment ?? 0)}</td><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(adjustments.complexity ?? 0)}</td><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(adjustments.delay ?? 0)}</td></tr>`);
                                          });
                                          _push7(`<!--]--></tbody><tfoot data-v-c9e05f88${_scopeId6}><tr data-v-c9e05f88${_scopeId6}><th data-v-c9e05f88${_scopeId6}>${ssrInterpolate(_ctx.$t("total"))}</th><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(__props.ticket.initial_weight)}</td><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(__props.ticket.weight_increment)}</td><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(__props.ticket.complexity)}</td><td class="text-right" data-v-c9e05f88${_scopeId6}>${ssrInterpolate(__props.ticket.delay)}</td></tr></tfoot></table>`);
                                        } else {
                                          return [
                                            createVNode("table", { class: "table-fixed" }, [
                                              createVNode("thead", null, [
                                                createVNode("tr", null, [
                                                  createVNode("th", { class: "w-1/3" }, toDisplayString(_ctx.$t("factor")), 1),
                                                  createVNode("th", { class: "text-center" }, [
                                                    createVNode("em", {
                                                      class: "metric",
                                                      title: _ctx.$t("initial_weight")
                                                    }, [
                                                      createTextVNode("W"),
                                                      createVNode("sub", null, "0")
                                                    ], 8, ["title"])
                                                  ]),
                                                  createVNode("th", { class: "text-center" }, [
                                                    createVNode("em", {
                                                      class: "metric",
                                                      title: _ctx.$t("weight_increment")
                                                    }, [
                                                      createTextVNode("W"),
                                                      createVNode("sub", null, "i")
                                                    ], 8, ["title"])
                                                  ]),
                                                  createVNode("th", { class: "text-center" }, [
                                                    createVNode("em", {
                                                      class: "metric",
                                                      title: _ctx.$t("complexity")
                                                    }, "C", 8, ["title"])
                                                  ]),
                                                  createVNode("th", { class: "text-center" }, [
                                                    createVNode("em", {
                                                      class: "metric",
                                                      title: _ctx.$t("delay")
                                                    }, "D", 8, ["title"])
                                                  ])
                                                ])
                                              ]),
                                              createVNode("tbody", null, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.metrics ?? {}, (adjustments, factorUuid) => {
                                                  return openBlock(), createBlock("tr", { key: factorUuid }, [
                                                    createVNode("th", null, toDisplayString(factorUuid), 1),
                                                    createVNode("td", { class: "text-right" }, toDisplayString(adjustments.initial_weight ?? 0), 1),
                                                    createVNode("td", { class: "text-right" }, toDisplayString(adjustments.weight_increment ?? 0), 1),
                                                    createVNode("td", { class: "text-right" }, toDisplayString(adjustments.complexity ?? 0), 1),
                                                    createVNode("td", { class: "text-right" }, toDisplayString(adjustments.delay ?? 0), 1)
                                                  ]);
                                                }), 128))
                                              ]),
                                              createVNode("tfoot", null, [
                                                createVNode("tr", null, [
                                                  createVNode("th", null, toDisplayString(_ctx.$t("total")), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.initial_weight), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.weight_increment), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.complexity), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.delay), 1)
                                                ])
                                              ])
                                            ])
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
                                      createVNode(VWindowItem, {
                                        value: "metrics",
                                        class: "prose"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("table", { class: "table-fixed" }, [
                                            createVNode("thead", null, [
                                              createVNode("tr", null, [
                                                createVNode("th", { class: "w-1/3" }, toDisplayString(_ctx.$t("factor")), 1),
                                                createVNode("th", { class: "text-center" }, [
                                                  createVNode("em", {
                                                    class: "metric",
                                                    title: _ctx.$t("initial_weight")
                                                  }, [
                                                    createTextVNode("W"),
                                                    createVNode("sub", null, "0")
                                                  ], 8, ["title"])
                                                ]),
                                                createVNode("th", { class: "text-center" }, [
                                                  createVNode("em", {
                                                    class: "metric",
                                                    title: _ctx.$t("weight_increment")
                                                  }, [
                                                    createTextVNode("W"),
                                                    createVNode("sub", null, "i")
                                                  ], 8, ["title"])
                                                ]),
                                                createVNode("th", { class: "text-center" }, [
                                                  createVNode("em", {
                                                    class: "metric",
                                                    title: _ctx.$t("complexity")
                                                  }, "C", 8, ["title"])
                                                ]),
                                                createVNode("th", { class: "text-center" }, [
                                                  createVNode("em", {
                                                    class: "metric",
                                                    title: _ctx.$t("delay")
                                                  }, "D", 8, ["title"])
                                                ])
                                              ])
                                            ]),
                                            createVNode("tbody", null, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.metrics ?? {}, (adjustments, factorUuid) => {
                                                return openBlock(), createBlock("tr", { key: factorUuid }, [
                                                  createVNode("th", null, toDisplayString(factorUuid), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(adjustments.initial_weight ?? 0), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(adjustments.weight_increment ?? 0), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(adjustments.complexity ?? 0), 1),
                                                  createVNode("td", { class: "text-right" }, toDisplayString(adjustments.delay ?? 0), 1)
                                                ]);
                                              }), 128))
                                            ]),
                                            createVNode("tfoot", null, [
                                              createVNode("tr", null, [
                                                createVNode("th", null, toDisplayString(_ctx.$t("total")), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.initial_weight), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.weight_increment), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.complexity), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.delay), 1)
                                              ])
                                            ])
                                          ])
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
                                    createVNode(VWindowItem, {
                                      value: "metrics",
                                      class: "prose"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("table", { class: "table-fixed" }, [
                                          createVNode("thead", null, [
                                            createVNode("tr", null, [
                                              createVNode("th", { class: "w-1/3" }, toDisplayString(_ctx.$t("factor")), 1),
                                              createVNode("th", { class: "text-center" }, [
                                                createVNode("em", {
                                                  class: "metric",
                                                  title: _ctx.$t("initial_weight")
                                                }, [
                                                  createTextVNode("W"),
                                                  createVNode("sub", null, "0")
                                                ], 8, ["title"])
                                              ]),
                                              createVNode("th", { class: "text-center" }, [
                                                createVNode("em", {
                                                  class: "metric",
                                                  title: _ctx.$t("weight_increment")
                                                }, [
                                                  createTextVNode("W"),
                                                  createVNode("sub", null, "i")
                                                ], 8, ["title"])
                                              ]),
                                              createVNode("th", { class: "text-center" }, [
                                                createVNode("em", {
                                                  class: "metric",
                                                  title: _ctx.$t("complexity")
                                                }, "C", 8, ["title"])
                                              ]),
                                              createVNode("th", { class: "text-center" }, [
                                                createVNode("em", {
                                                  class: "metric",
                                                  title: _ctx.$t("delay")
                                                }, "D", 8, ["title"])
                                              ])
                                            ])
                                          ]),
                                          createVNode("tbody", null, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.metrics ?? {}, (adjustments, factorUuid) => {
                                              return openBlock(), createBlock("tr", { key: factorUuid }, [
                                                createVNode("th", null, toDisplayString(factorUuid), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(adjustments.initial_weight ?? 0), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(adjustments.weight_increment ?? 0), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(adjustments.complexity ?? 0), 1),
                                                createVNode("td", { class: "text-right" }, toDisplayString(adjustments.delay ?? 0), 1)
                                              ]);
                                            }), 128))
                                          ]),
                                          createVNode("tfoot", null, [
                                            createVNode("tr", null, [
                                              createVNode("th", null, toDisplayString(_ctx.$t("total")), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.initial_weight), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.weight_increment), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.complexity), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.delay), 1)
                                            ])
                                          ])
                                        ])
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
                                  createVNode(VWindowItem, {
                                    value: "metrics",
                                    class: "prose"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("table", { class: "table-fixed" }, [
                                        createVNode("thead", null, [
                                          createVNode("tr", null, [
                                            createVNode("th", { class: "w-1/3" }, toDisplayString(_ctx.$t("factor")), 1),
                                            createVNode("th", { class: "text-center" }, [
                                              createVNode("em", {
                                                class: "metric",
                                                title: _ctx.$t("initial_weight")
                                              }, [
                                                createTextVNode("W"),
                                                createVNode("sub", null, "0")
                                              ], 8, ["title"])
                                            ]),
                                            createVNode("th", { class: "text-center" }, [
                                              createVNode("em", {
                                                class: "metric",
                                                title: _ctx.$t("weight_increment")
                                              }, [
                                                createTextVNode("W"),
                                                createVNode("sub", null, "i")
                                              ], 8, ["title"])
                                            ]),
                                            createVNode("th", { class: "text-center" }, [
                                              createVNode("em", {
                                                class: "metric",
                                                title: _ctx.$t("complexity")
                                              }, "C", 8, ["title"])
                                            ]),
                                            createVNode("th", { class: "text-center" }, [
                                              createVNode("em", {
                                                class: "metric",
                                                title: _ctx.$t("delay")
                                              }, "D", 8, ["title"])
                                            ])
                                          ])
                                        ]),
                                        createVNode("tbody", null, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.metrics ?? {}, (adjustments, factorUuid) => {
                                            return openBlock(), createBlock("tr", { key: factorUuid }, [
                                              createVNode("th", null, toDisplayString(factorUuid), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(adjustments.initial_weight ?? 0), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(adjustments.weight_increment ?? 0), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(adjustments.complexity ?? 0), 1),
                                              createVNode("td", { class: "text-right" }, toDisplayString(adjustments.delay ?? 0), 1)
                                            ]);
                                          }), 128))
                                        ]),
                                        createVNode("tfoot", null, [
                                          createVNode("tr", null, [
                                            createVNode("th", null, toDisplayString(_ctx.$t("total")), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.initial_weight), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.weight_increment), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.complexity), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.delay), 1)
                                          ])
                                        ])
                                      ])
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
                      width: "500",
                      "prepend-icon": ((_b3 = __props.ticket.meta) == null ? void 0 : _b3.icon) ?? "",
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
                                createVNode(VWindowItem, {
                                  value: "metrics",
                                  class: "prose"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("table", { class: "table-fixed" }, [
                                      createVNode("thead", null, [
                                        createVNode("tr", null, [
                                          createVNode("th", { class: "w-1/3" }, toDisplayString(_ctx.$t("factor")), 1),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("initial_weight")
                                            }, [
                                              createTextVNode("W"),
                                              createVNode("sub", null, "0")
                                            ], 8, ["title"])
                                          ]),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("weight_increment")
                                            }, [
                                              createTextVNode("W"),
                                              createVNode("sub", null, "i")
                                            ], 8, ["title"])
                                          ]),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("complexity")
                                            }, "C", 8, ["title"])
                                          ]),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("delay")
                                            }, "D", 8, ["title"])
                                          ])
                                        ])
                                      ]),
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.metrics ?? {}, (adjustments, factorUuid) => {
                                          return openBlock(), createBlock("tr", { key: factorUuid }, [
                                            createVNode("th", null, toDisplayString(factorUuid), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.initial_weight ?? 0), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.weight_increment ?? 0), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.complexity ?? 0), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.delay ?? 0), 1)
                                          ]);
                                        }), 128))
                                      ]),
                                      createVNode("tfoot", null, [
                                        createVNode("tr", null, [
                                          createVNode("th", null, toDisplayString(_ctx.$t("total")), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.initial_weight), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.weight_increment), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.complexity), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.delay), 1)
                                        ])
                                      ])
                                    ])
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
                icon: ((_d = __props.ticket.meta) == null ? void 0 : _d.icon) ?? "",
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
                      width: "500",
                      "prepend-icon": ((_a3 = __props.ticket.meta) == null ? void 0 : _a3.icon) ?? "",
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
                                createVNode(VWindowItem, {
                                  value: "metrics",
                                  class: "prose"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("table", { class: "table-fixed" }, [
                                      createVNode("thead", null, [
                                        createVNode("tr", null, [
                                          createVNode("th", { class: "w-1/3" }, toDisplayString(_ctx.$t("factor")), 1),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("initial_weight")
                                            }, [
                                              createTextVNode("W"),
                                              createVNode("sub", null, "0")
                                            ], 8, ["title"])
                                          ]),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("weight_increment")
                                            }, [
                                              createTextVNode("W"),
                                              createVNode("sub", null, "i")
                                            ], 8, ["title"])
                                          ]),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("complexity")
                                            }, "C", 8, ["title"])
                                          ]),
                                          createVNode("th", { class: "text-center" }, [
                                            createVNode("em", {
                                              class: "metric",
                                              title: _ctx.$t("delay")
                                            }, "D", 8, ["title"])
                                          ])
                                        ])
                                      ]),
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.metrics ?? {}, (adjustments, factorUuid) => {
                                          return openBlock(), createBlock("tr", { key: factorUuid }, [
                                            createVNode("th", null, toDisplayString(factorUuid), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.initial_weight ?? 0), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.weight_increment ?? 0), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.complexity ?? 0), 1),
                                            createVNode("td", { class: "text-right" }, toDisplayString(adjustments.delay ?? 0), 1)
                                          ]);
                                        }), 128))
                                      ]),
                                      createVNode("tfoot", null, [
                                        createVNode("tr", null, [
                                          createVNode("th", null, toDisplayString(_ctx.$t("total")), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.initial_weight), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.weight_increment), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.complexity), 1),
                                          createVNode("td", { class: "text-right" }, toDisplayString(__props.ticket.delay), 1)
                                        ])
                                      ])
                                    ])
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
const Ticket_vue_vue_type_style_index_0_scoped_c9e05f88_lang = "";
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Ticket.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TicketComponent = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c9e05f88"]]);
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
      var _a2, _b2, _c, _d, _e;
      const metrics = ((_a2 = this.find(uuid)) == null ? void 0 : _a2.metrics) ?? {};
      metrics[factorUuid] = adjustments;
      this.where("uuid", uuid).update({
        metrics,
        initial_weight: Math.max(0, (((_b2 = this.find(uuid)) == null ? void 0 : _b2.initial_weight) ?? 0) + adjustments.initial_weight),
        weight_increment: Math.max(0, (((_c = this.find(uuid)) == null ? void 0 : _c.weight_increment) ?? 0) + adjustments.weight_increment),
        complexity: Math.max(0, (((_d = this.find(uuid)) == null ? void 0 : _d.complexity) ?? 0) + adjustments.complexity),
        delay: Math.max(0, (((_e = this.find(uuid)) == null ? void 0 : _e.delay) ?? 0) + adjustments.delay)
      });
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
      }, _attrs))} data-v-5f7a246b><!--[-->`);
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
const TicketPool_vue_vue_type_style_index_0_scoped_5f7a246b_lang = "";
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/TicketPool.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const TicketPool = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-5f7a246b"]]);
function useSupervisorApi() {
  async function ready(operatorUuid, ready2) {
    return await window.axios.patch(A("ticket-allocator.operators.ready", operatorUuid), { ready: ready2 });
  }
  async function weight(ticketUuid, weightPoints) {
    return await window.axios.patch(A("ticket-allocator.tickets.weight", ticketUuid), {
      weight_points: weightPoints
    });
  }
  async function handler(ticketUuid, operatorUuid) {
    return await window.axios.patch(A("ticket-allocator.tickets.handler", ticketUuid), {
      operator_uuid: operatorUuid ?? null
    });
  }
  async function close(ticketUuid) {
    return await window.axios.delete(A("ticket-allocator.tickets.close", ticketUuid));
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
      }, _attrs))} data-v-e35c4520><td class="status" data-v-e35c4520>`);
      ssrRenderSlot(_ctx.$slots, "status", {}, null, _push, _parent);
      _push(`</td><td class="name font-weight-bold" data-v-e35c4520>`);
      ssrRenderSlot(_ctx.$slots, "name", {}, null, _push, _parent);
      _push(`</td><td class="load text-center" data-v-e35c4520>`);
      ssrRenderSlot(_ctx.$slots, "load", {}, () => {
        _push(`${ssrInterpolate(__props.tickets.length)}`);
      }, _push, _parent);
      _push(`/`);
      ssrRenderSlot(_ctx.$slots, "load-max", {}, () => {
        _push(`∞`);
      }, _push, _parent);
      _push(`</td><td class="complexity text-center" data-v-e35c4520>`);
      ssrRenderSlot(_ctx.$slots, "complexity", {}, () => {
        _push(`${ssrInterpolate(unref(complexity))}`);
      }, _push, _parent);
      _push(`/`);
      ssrRenderSlot(_ctx.$slots, "complexity-max", {}, () => {
        _push(`∞`);
      }, _push, _parent);
      _push(`</td><td class="${ssrRenderClass([{ collapsed: unref(collapsed) }, "tickets pt-1"])}" data-v-e35c4520>`);
      _push(ssrRenderComponent(TicketPool, { tickets: __props.tickets }, null, _parent));
      _push(`</td><td class="more text-center" data-v-e35c4520>`);
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
const TicketRow_vue_vue_type_style_index_0_scoped_e35c4520_lang = "";
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/TicketRow.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TicketRow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e35c4520"]]);
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
const OperatorRow_vue_vue_type_style_index_0_scoped_e94427fb_lang = "";
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/OperatorRow.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const OperatorRow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e94427fb"]]);
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
const VSwitch$1 = "";
const VSwitch = genericComponent()({
  name: "VSwitch",
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,
    loading: {
      type: [Boolean, String],
      default: false
    },
    ...makeVInputProps(),
    ...makeSelectionControlProps()
  },
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": () => true,
    "update:indeterminate": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    const {
      loaderClasses
    } = useLoader(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const loaderColor = computed(() => {
      return typeof props.loading === "string" && props.loading !== "" ? props.loading : props.color;
    });
    const uid = getUid();
    const id = computed(() => props.id || `switch-${uid}`);
    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = VInput.filterProps(props);
      const [controlProps, _2] = VSelectionControl.filterProps(props);
      const control = ref();
      function onClick(e) {
        var _a2, _b2;
        e.stopPropagation();
        e.preventDefault();
        (_b2 = (_a2 = control.value) == null ? void 0 : _a2.input) == null ? void 0 : _b2.click();
      }
      return createVNode(VInput, mergeProps({
        "class": ["v-switch", {
          "v-switch--inset": props.inset
        }, {
          "v-switch--indeterminate": indeterminate.value
        }, loaderClasses.value, props.class],
        "style": props.style
      }, inputAttrs, inputProps, {
        "id": id.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VSelectionControl, mergeProps({
            "ref": control
          }, controlProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": [($event) => model.value = $event, onChange],
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "type": "checkbox",
            "aria-checked": indeterminate.value ? "mixed" : void 0,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "onFocus": focus,
            "onBlur": blur
          }, controlAttrs), {
            ...slots,
            default: () => createVNode("div", {
              "class": "v-switch__track",
              "onClick": onClick
            }, null),
            input: (_ref3) => {
              let {
                textColorClasses,
                textColorStyles
              } = _ref3;
              return createVNode("div", {
                "class": ["v-switch__thumb", textColorClasses.value],
                "style": textColorStyles.value
              }, [props.loading && createVNode(LoaderSlot, {
                "name": "v-switch",
                "active": true,
                "color": isValid.value === false ? void 0 : loaderColor.value
              }, {
                default: (slotProps) => slots.loader ? slots.loader(slotProps) : createVNode(VProgressCircular, {
                  "active": slotProps.isActive,
                  "color": slotProps.color,
                  "indeterminate": true,
                  "size": "16",
                  "width": "2"
                }, null)
              })]);
            }
          });
        }
      });
    });
    return {};
  }
});
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
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-babb0482${_scopeId}>${ssrInterpolate(_ctx.$t("dashboard"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(_ctx.$t("dashboard")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-babb0482${_scopeId}>`);
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
                  _push3(`<tbody class="align-text-top" data-v-babb0482${_scopeId2}>`);
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
const Dashboard_vue_vue_type_style_index_0_scoped_babb0482_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-babb0482"]]);
export {
  Dashboard as default
};
//# sourceMappingURL=Dashboard-742fb085.mjs.map
