import { createVNode, Transition, mergeProps, toRef, computed, withDirectives, vShow, Fragment, resolveDirective, ref, watch, onScopeDispose, nextTick, watchEffect, effectScope, inject, shallowRef, onMounted, reactive, provide, readonly, toRaw, warn, onBeforeUnmount, Teleport, createTextVNode, unref } from "vue";
import { a as animate, l as deceleratedEasing, s as standardEasing, n as acceleratedEasing, o as getTargetBox, p as nullifyTransforms, B as Box, q as getOverflow, f as forwardRefs, h as makeVTextFieldProps, i as useForm, b as VTextField } from "./VTextField-OoB04xYN.js";
import { ab as isOn, an as eventName, g as genericComponent, p as propsFactory, ae as deepEqual, m as makeComponentProps, n as makeGroupProps, a as makeTagProps, b as makeThemeProps, X as makeVariantProps, c as provideTheme, e as useGroup, H as provideDefaults, f as useRender, I as IconValue, al as EventProp, O as makeBorderProps, E as makeDensityProps, Q as makeElevationProps, h as makeGroupItemProps, U as makeRoundedProps, W as makeRouterProps, ag as makeSizeProps, Y as Ripple, d as useLocale, Z as useBorder, _ as useVariant, F as useDensity, a0 as useElevation, a3 as useRounded, ao as useSize, w as useProxiedModel, i as useGroupItem, a4 as useLink, a5 as genOverlays, s as VIcon, N as VDefaultsProvider, r as IN_BROWSER, ap as useToggleScope, aq as destructComputed, ar as parseAnchor, as as flipSide, at as flipAlign, au as flipCorner, ak as consoleError, av as getAxis, j as convertToUnit, v as clamp, aw as defer, ad as getCurrentInstance, ax as refElement, a9 as matchesSelector, o as useDisplay, P as makeDimensionProps, u as useRtl, G as useBackgroundColor, $ as useDimension, ay as useRouter, az as useBackButton, B as omit, y as getUid, t as focusableChildren, aA as getNextElement, aB as focusChild, q as useResizeObserver, aC as debounce, a7 as ensureValidVNode, aa as wrapInArray, am as getPropertyFromItem } from "../ssr.js";
import { b as VAvatar, a as useScopeId, m as makeItemsProps, e as useItems, f as VList, g as VListItem } from "./scopeId-lPWHbonb.js";
import { c as VExpandXTransition, m as makeTransitionProps, M as MaybeTransition } from "./VGrid-tjN4x720.js";
import { a as VCheckboxBtn } from "./VCheckboxBtn-l7cI9mF-.js";
const handlers = /* @__PURE__ */ new WeakMap();
function bindProps(el, props) {
  Object.keys(props).forEach((k) => {
    var _a;
    if (isOn(k)) {
      const name = eventName(k);
      const handler = handlers.get(el);
      if (props[k] == null) {
        handler == null ? void 0 : handler.forEach((v) => {
          const [n, fn] = v;
          if (n === name) {
            el.removeEventListener(name, fn);
            handler.delete(v);
          }
        });
      } else if (!handler || !((_a = [...handler]) == null ? void 0 : _a.some((v) => v[0] === name && v[1] === props[k]))) {
        el.addEventListener(name, props[k]);
        const _handler = handler || /* @__PURE__ */ new Set();
        _handler.add([name, props[k]]);
        if (!handlers.has(el))
          handlers.set(el, _handler);
      }
    } else {
      if (props[k] == null) {
        el.removeAttribute(k);
      } else {
        el.setAttribute(k, props[k]);
      }
    }
  });
}
function unbindProps(el, props) {
  Object.keys(props).forEach((k) => {
    if (isOn(k)) {
      const name = eventName(k);
      const handler = handlers.get(el);
      handler == null ? void 0 : handler.forEach((v) => {
        const [n, fn] = v;
        if (n === name) {
          el.removeEventListener(name, fn);
          handler.delete(v);
        }
      });
    } else {
      el.removeAttribute(k);
    }
  });
}
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode)
      node = node.parentNode;
    if (node !== document)
      return null;
    return document;
  }
  const root = node.getRootNode();
  if (root !== document && root.getRootNode({
    composed: true
  }) !== document)
    return null;
  return root;
}
function getScrollParent(el) {
  let includeHidden = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  while (el) {
    if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el))
      return el;
    el = el.parentElement;
  }
  return document.scrollingElement;
}
function getScrollParents(el, stopAt) {
  const elements = [];
  if (stopAt && el && !stopAt.contains(el))
    return elements;
  while (el) {
    if (hasScrollbar(el))
      elements.push(el);
    if (el === stopAt)
      break;
    el = el.parentElement;
  }
  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE)
    return false;
  const style = window.getComputedStyle(el);
  return style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
}
function isPotentiallyScrollable(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE)
    return false;
  const style = window.getComputedStyle(el);
  return ["scroll", "auto"].includes(style.overflowY);
}
function isFixedPosition(el) {
  while (el) {
    if (window.getComputedStyle(el).position === "fixed") {
      return true;
    }
    el = el.offsetParent;
  }
  return false;
}
const makeVDialogTransitionProps = propsFactory({
  target: [Object, Array]
}, "v-dialog-transition");
const VDialogTransition = genericComponent()({
  name: "VDialogTransition",
  props: makeVDialogTransitionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        el.style.visibility = "";
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }, {}], {
          duration: 225 * speed,
          easing: deceleratedEasing
        });
        (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
          animate(el2, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * speed,
            easing: standardEasing
          });
        });
        animation.finished.then(() => done());
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{}, {
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }], {
          duration: 125 * speed,
          easing: acceleratedEasing
        });
        animation.finished.then(() => done());
        (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
          animate(el2, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * speed,
            easing: standardEasing
          });
        });
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  var _a;
  const els = (_a = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _a.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = getTargetBox(target);
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        filter: toRef(props, "filter"),
        variant: toRef(props, "variant")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-chip-group", {
        "v-chip-group--column": props.column
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })];
      }
    }));
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        e.stopPropagation();
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    function onClick(e) {
      var _a;
      emit("click", e);
      if (!isClickable.value)
        return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasColor = !group || group.isSelected.value;
      return isActive.value && withDirectives(createVNode(Tag, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
        "style": [hasColor ? colorStyles.value : void 0, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "href": link.href.value,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => {
          var _a;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, slots.filter)]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-chip__content"
          }, [((_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) ?? props.text]), hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createVNode("button", mergeProps({
            "key": "close",
            "class": "v-chip__close",
            "type": "button"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
    };
  }
});
function elementToViewport(point, offset) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y
  };
}
function getOffset(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function anchorToPoint(anchor, box) {
  if (anchor.side === "top" || anchor.side === "bottom") {
    const {
      side,
      align
    } = anchor;
    const x = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
    const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
    return elementToViewport({
      x,
      y
    }, box);
  } else if (anchor.side === "left" || anchor.side === "right") {
    const {
      side,
      align
    } = anchor;
    const x = side === "left" ? 0 : side === "right" ? box.width : side;
    const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
    return elementToViewport({
      x,
      y
    }, box);
  }
  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2
  }, box);
}
const locationStrategies = {
  static: staticLocationStrategy,
  // specific viewport position, usually centered
  connected: connectedLocationStrategy
  // connected to a certain element
};
const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (val) => typeof val === "function" || val in locationStrategies
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function useLocationStrategies(props, data) {
  const contentStyles = ref({});
  const updateLocation = ref();
  if (IN_BROWSER) {
    useToggleScope(() => !!(data.isActive.value && props.locationStrategy), (reset) => {
      var _a, _b;
      watch(() => props.locationStrategy, reset);
      onScopeDispose(() => {
        window.removeEventListener("resize", onResize);
        updateLocation.value = void 0;
      });
      window.addEventListener("resize", onResize, {
        passive: true
      });
      if (typeof props.locationStrategy === "function") {
        updateLocation.value = (_a = props.locationStrategy(data, props, contentStyles)) == null ? void 0 : _a.updateLocation;
      } else {
        updateLocation.value = (_b = locationStrategies[props.locationStrategy](data, props, contentStyles)) == null ? void 0 : _b.updateLocation;
      }
    });
  }
  function onResize(e) {
    var _a;
    (_a = updateLocation.value) == null ? void 0 : _a.call(updateLocation, e);
  }
  return {
    contentStyles,
    updateLocation
  };
}
function staticLocationStrategy() {
}
function getIntrinsicSize(el, isRtl) {
  if (isRtl) {
    el.style.removeProperty("left");
  } else {
    el.style.removeProperty("right");
  }
  const contentBox = nullifyTransforms(el);
  if (isRtl) {
    contentBox.x += parseFloat(el.style.right || 0);
  } else {
    contentBox.x -= parseFloat(el.style.left || 0);
  }
  contentBox.y -= parseFloat(el.style.top || 0);
  return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
  const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value);
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: "fixed",
      top: 0,
      [data.isRtl.value ? "right" : "left"]: 0
    });
  }
  const {
    preferredAnchor,
    preferredOrigin
  } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
    const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin)
      };
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin
      };
    }
  });
  const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
    return computed(() => {
      const val = parseFloat(props[key]);
      return isNaN(val) ? Infinity : val;
    });
  });
  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset;
    }
    if (typeof props.offset === "string") {
      const offset2 = props.offset.split(" ").map(parseFloat);
      if (offset2.length < 2)
        offset2.push(0);
      return offset2;
    }
    return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
  });
  let observe = false;
  const observer = new ResizeObserver(() => {
    if (observe)
      updateLocation();
  });
  watch([data.target, data.contentEl], (_ref, _ref2) => {
    let [newTarget, newContentEl] = _ref;
    let [oldTarget, oldContentEl] = _ref2;
    if (oldTarget && !Array.isArray(oldTarget))
      observer.unobserve(oldTarget);
    if (newTarget && !Array.isArray(newTarget))
      observer.observe(newTarget);
    if (oldContentEl)
      observer.unobserve(oldContentEl);
    if (newContentEl)
      observer.observe(newContentEl);
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    observer.disconnect();
  });
  function updateLocation() {
    observe = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => observe = true);
    });
    if (!data.target.value || !data.contentEl.value)
      return;
    const targetBox = getTargetBox(data.target.value);
    const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
    const scrollParents = getScrollParents(data.contentEl.value);
    const viewportMargin = 12;
    if (!scrollParents.length) {
      scrollParents.push(document.documentElement);
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
        contentBox.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
      }
    }
    const viewport = scrollParents.reduce((box, el) => {
      const rect = el.getBoundingClientRect();
      const scrollBox = new Box({
        x: el === document.documentElement ? 0 : rect.x,
        y: el === document.documentElement ? 0 : rect.y,
        width: el.clientWidth,
        height: el.clientHeight
      });
      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
        });
      }
      return scrollBox;
    }, void 0);
    viewport.x += viewportMargin;
    viewport.y += viewportMargin;
    viewport.width -= viewportMargin * 2;
    viewport.height -= viewportMargin * 2;
    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value
    };
    function checkOverflow(_placement) {
      const box = new Box(contentBox);
      const targetPoint = anchorToPoint(_placement.anchor, targetBox);
      const contentPoint = anchorToPoint(_placement.origin, box);
      let {
        x: x2,
        y: y2
      } = getOffset(targetPoint, contentPoint);
      switch (_placement.anchor.side) {
        case "top":
          y2 -= offset.value[0];
          break;
        case "bottom":
          y2 += offset.value[0];
          break;
        case "left":
          x2 -= offset.value[0];
          break;
        case "right":
          x2 += offset.value[0];
          break;
      }
      switch (_placement.anchor.align) {
        case "top":
          y2 -= offset.value[1];
          break;
        case "bottom":
          y2 += offset.value[1];
          break;
        case "left":
          x2 -= offset.value[1];
          break;
        case "right":
          x2 += offset.value[1];
          break;
      }
      box.x += x2;
      box.y += y2;
      box.width = Math.min(box.width, maxWidth.value);
      box.height = Math.min(box.height, maxHeight.value);
      const overflows = getOverflow(box, viewport);
      return {
        overflows,
        x: x2,
        y: y2
      };
    }
    let x = 0;
    let y = 0;
    const available = {
      x: 0,
      y: 0
    };
    const flipped = {
      x: false,
      y: false
    };
    let resets = -1;
    while (true) {
      if (resets++ > 10) {
        consoleError("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: _x,
        y: _y,
        overflows
      } = checkOverflow(placement);
      x += _x;
      y += _y;
      contentBox.x += _x;
      contentBox.y += _y;
      {
        const axis2 = getAxis(placement.anchor);
        const hasOverflowX = overflows.x.before || overflows.x.after;
        const hasOverflowY = overflows.y.before || overflows.y.after;
        let reset = false;
        ["x", "y"].forEach((key) => {
          if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
            const newPlacement = {
              anchor: {
                ...placement.anchor
              },
              origin: {
                ...placement.origin
              }
            };
            const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
            newPlacement.anchor = flip(newPlacement.anchor);
            newPlacement.origin = flip(newPlacement.origin);
            const {
              overflows: newOverflows
            } = checkOverflow(newPlacement);
            if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
              placement = newPlacement;
              reset = flipped[key] = true;
            }
          }
        });
        if (reset)
          continue;
      }
      if (overflows.x.before) {
        x += overflows.x.before;
        contentBox.x += overflows.x.before;
      }
      if (overflows.x.after) {
        x -= overflows.x.after;
        contentBox.x -= overflows.x.after;
      }
      if (overflows.y.before) {
        y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      if (overflows.y.after) {
        y -= overflows.y.after;
        contentBox.y -= overflows.y.after;
      }
      {
        const overflows2 = getOverflow(contentBox, viewport);
        available.x = viewport.width - overflows2.x.before - overflows2.x.after;
        available.y = viewport.height - overflows2.y.before - overflows2.y.after;
        x += overflows2.x.before;
        contentBox.x += overflows2.x.before;
        y += overflows2.y.before;
        contentBox.y += overflows2.y.before;
      }
      break;
    }
    const axis = getAxis(placement.anchor);
    Object.assign(contentStyles.value, {
      "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? void 0 : convertToUnit(pixelRound(x)),
      right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : void 0,
      minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
    });
    return {
      available,
      contentBox
    };
  }
  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
  nextTick(() => {
    const result = updateLocation();
    if (!result)
      return;
    const {
      available,
      contentBox
    } = result;
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation();
        requestAnimationFrame(() => {
          updateLocation();
        });
      });
    }
  });
  return {
    updateLocation
  };
}
function pixelRound(val) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
let clean = true;
const frames = [];
function requestNewFrame(cb) {
  if (!clean || frames.length) {
    frames.push(cb);
    run();
  } else {
    clean = false;
    cb();
    run();
  }
}
let raf = -1;
function run() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const frame = frames.shift();
    if (frame)
      frame();
    if (frames.length)
      run();
    else
      clean = true;
  });
}
const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (val) => typeof val === "function" || val in scrollStrategies
  }
}, "VOverlay-scroll-strategies");
function useScrollStrategies(props, data) {
  if (!IN_BROWSER)
    return;
  let scope;
  watchEffect(async () => {
    scope == null ? void 0 : scope.stop();
    if (!(data.isActive.value && props.scrollStrategy))
      return;
    scope = effectScope();
    await nextTick();
    scope.active && scope.run(() => {
      var _a;
      if (typeof props.scrollStrategy === "function") {
        props.scrollStrategy(data, props, scope);
      } else {
        (_a = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _a.call(scrollStrategies, data, props, scope);
      }
    });
  });
  onScopeDispose(() => {
    scope == null ? void 0 : scope.stop();
  });
}
function closeScrollStrategy(data) {
  function onScroll(e) {
    data.isActive.value = false;
  }
  bindScroll(data.targetEl.value ?? data.contentEl.value, onScroll);
}
function blockScrollStrategy(data, props) {
  var _a;
  const offsetParent = (_a = data.root.value) == null ? void 0 : _a.offsetParent;
  const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(data.targetEl.value, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
  const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || document.documentElement);
  if (scrollableParent) {
    data.root.value.classList.add("v-overlay--scroll-blocked");
  }
  scrollElements.forEach((el, i) => {
    el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
    el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
    if (el !== document.documentElement) {
      el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
    }
    el.classList.add("v-overlay-scroll-blocked");
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
      const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
      el.style.removeProperty("--v-body-scroll-x");
      el.style.removeProperty("--v-body-scroll-y");
      el.style.removeProperty("--v-scrollbar-offset");
      el.classList.remove("v-overlay-scroll-blocked");
      el.scrollLeft = -x;
      el.scrollTop = -y;
    });
    if (scrollableParent) {
      data.root.value.classList.remove("v-overlay--scroll-blocked");
    }
  });
}
function repositionScrollStrategy(data, props, scope) {
  let slow = false;
  let raf2 = -1;
  let ric = -1;
  function update(e) {
    requestNewFrame(() => {
      var _a, _b;
      const start = performance.now();
      (_b = (_a = data.updateLocation).value) == null ? void 0 : _b.call(_a, e);
      const time = performance.now() - start;
      slow = time / (1e3 / 60) > 2;
    });
  }
  ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(data.targetEl.value ?? data.contentEl.value, (e) => {
        if (slow) {
          cancelAnimationFrame(raf2);
          raf2 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              update(e);
            });
          });
        } else {
          update(e);
        }
      });
    });
  });
  onScopeDispose(() => {
    typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
    cancelAnimationFrame(raf2);
  });
}
function bindScroll(el, onScroll) {
  const scrollElements = [document, ...getScrollParents(el)];
  scrollElements.forEach((el2) => {
    el2.addEventListener("scroll", onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach((el2) => {
      el2.removeEventListener("scroll", onScroll);
    });
  });
}
const VMenuSymbol = Symbol.for("vuetify:v-menu");
const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
  let clearDelay = () => {
  };
  function runDelay(isOpening) {
    clearDelay == null ? void 0 : clearDelay();
    const delay = Number(isOpening ? props.openDelay : props.closeDelay);
    return new Promise((resolve) => {
      clearDelay = defer(delay, () => {
        cb == null ? void 0 : cb(isOpening);
        resolve(isOpening);
      });
    });
  }
  function runOpenDelay() {
    return runDelay(true);
  }
  function runCloseDelay() {
    return runDelay(false);
  }
  return {
    clearDelay,
    runOpenDelay,
    runCloseDelay
  };
}
const makeActivatorProps = propsFactory({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, "VOverlay-activator");
function useActivator(props, _ref) {
  let {
    isActive,
    isTop
  } = _ref;
  const vm = getCurrentInstance("useActivator");
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, (value) => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
      if (isActive.value !== value) {
        firstEnter = true;
      }
      isActive.value = value;
    }
  });
  const cursorTarget = ref();
  const availableEvents = {
    onClick: (e) => {
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      if (!isActive.value) {
        cursorTarget.value = [e.clientX, e.clientY];
      }
      isActive.value = !isActive.value;
    },
    onMouseenter: (e) => {
      var _a;
      if ((_a = e.sourceCapabilities) == null ? void 0 : _a.firesTouchEvents)
        return;
      isHovered = true;
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onMouseleave: (e) => {
      isHovered = false;
      runCloseDelay();
    },
    onFocus: (e) => {
      if (matchesSelector(e.target, ":focus-visible") === false)
        return;
      isFocused = true;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onBlur: (e) => {
      isFocused = false;
      e.stopPropagation();
      runCloseDelay();
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.onClick = availableEvents.onClick;
    }
    if (props.openOnHover) {
      events.onMouseenter = availableEvents.onMouseenter;
      events.onMouseleave = availableEvents.onMouseleave;
    }
    if (openOnFocus.value) {
      events.onFocus = availableEvents.onFocus;
      events.onBlur = availableEvents.onBlur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    if (openOnFocus.value) {
      events.onFocusin = () => {
        isFocused = true;
        runOpenDelay();
      };
      events.onFocusout = () => {
        isFocused = false;
        runCloseDelay();
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject(VMenuSymbol, null);
      events.onClick = () => {
        isActive.value = false;
        menu == null ? void 0 : menu.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, (val) => {
    if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
      isActive.value = false;
    }
  });
  watch(isActive, (val) => {
    if (!val) {
      setTimeout(() => {
        cursorTarget.value = void 0;
      });
    }
  }, {
    flush: "post"
  });
  const activatorRef = ref();
  watchEffect(() => {
    if (!activatorRef.value)
      return;
    nextTick(() => {
      activatorEl.value = refElement(activatorRef.value);
    });
  });
  const targetRef = ref();
  const target = computed(() => {
    if (props.target === "cursor" && cursorTarget.value)
      return cursorTarget.value;
    if (targetRef.value)
      return refElement(targetRef.value);
    return getTarget(props.target, vm) || activatorEl.value;
  });
  const targetEl = computed(() => {
    return Array.isArray(target.value) ? void 0 : target.value;
  });
  let scope;
  watch(() => !!props.activator, (val) => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, vm, {
          activatorEl,
          activatorEvents
        });
      });
    } else if (scope) {
      scope.stop();
    }
  }, {
    flush: "post",
    immediate: true
  });
  onScopeDispose(() => {
    scope == null ? void 0 : scope.stop();
  });
  return {
    activatorEl,
    activatorRef,
    target,
    targetEl,
    targetRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  };
}
function _useActivator(props, vm, _ref2) {
  let {
    activatorEl,
    activatorEvents
  } = _ref2;
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }
    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });
  function bindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el)
      return;
    bindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function unbindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el)
      return;
    unbindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function getActivator() {
    let selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activator;
    const activator = getTarget(selector, vm);
    activatorEl.value = (activator == null ? void 0 : activator.nodeType) === Node.ELEMENT_NODE ? activator : void 0;
    return activatorEl.value;
  }
}
function getTarget(selector, vm) {
  var _a, _b;
  if (!selector)
    return;
  let target;
  if (selector === "parent") {
    let el = (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$el) == null ? void 0 : _b.parentNode;
    while (el == null ? void 0 : el.hasAttribute("data-no-activator")) {
      el = el.parentNode;
    }
    target = el;
  } else if (typeof selector === "string") {
    target = document.querySelector(selector);
  } else if ("$el" in selector) {
    target = selector.$el;
  } else {
    target = selector;
  }
  return target;
}
function useHydration() {
  if (!IN_BROWSER)
    return shallowRef(false);
  const {
    ssr
  } = useDisplay();
  if (ssr) {
    const isMounted = shallowRef(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return isMounted;
  } else {
    return shallowRef(true);
  }
}
const makeLazyProps = propsFactory({
  eager: Boolean
}, "lazy");
function useLazy(props, active) {
  const isBooted = shallowRef(false);
  const hasContent = computed(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager)
      isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}
const StackSymbol = Symbol.for("vuetify:stack");
const globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
  const vm = getCurrentInstance("useStack");
  const createStackEntry = !disableGlobalStack;
  const parent = inject(StackSymbol, void 0);
  const stack = reactive({
    activeChildren: /* @__PURE__ */ new Set()
  });
  provide(StackSymbol, stack);
  const _zIndex = shallowRef(+zIndex.value);
  useToggleScope(isActive, () => {
    var _a;
    const lastZIndex = (_a = globalStack.at(-1)) == null ? void 0 : _a[1];
    _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value]);
    }
    parent == null ? void 0 : parent.activeChildren.add(vm.uid);
    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
        globalStack.splice(idx, 1);
      }
      parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
    });
  });
  const globalTop = shallowRef(true);
  if (createStackEntry) {
    watchEffect(() => {
      var _a;
      const _isTop = ((_a = globalStack.at(-1)) == null ? void 0 : _a[0]) === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }
  const localTop = computed(() => !stack.activeChildren.size);
  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: computed(() => ({
      zIndex: _zIndex.value
    }))
  };
}
function useTeleport(target) {
  const teleportTarget = computed(() => {
    const _target = target.value;
    if (_target === true || !IN_BROWSER)
      return void 0;
    const targetElement = _target === false ? document.body : typeof _target === "string" ? document.querySelector(_target) : _target;
    if (targetElement == null) {
      warn(`Unable to locate target ${_target}`);
      return void 0;
    }
    let container = targetElement.querySelector(":scope > .v-overlay-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "v-overlay-container";
      targetElement.appendChild(container);
    }
    return container;
  });
  return {
    teleportTarget
  };
}
function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  if (!e || checkIsActive(e, binding) === false)
    return false;
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target)
    return false;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  return !elements.some((el2) => el2 == null ? void 0 : el2.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(document);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding);
    const onMousedown = (e) => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, (app) => {
      app.addEventListener("click", onClick, true);
      app.addEventListener("mousedown", onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  unmounted(el, binding) {
    if (!el._clickOutside)
      return;
    handleShadow(el, (app) => {
      var _a;
      if (!app || !((_a = el._clickOutside) == null ? void 0 : _a[binding.instance.$.uid]))
        return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app.removeEventListener("click", onClick, true);
      app.removeEventListener("mousedown", onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};
function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createVNode("div", mergeProps({
      "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps()
}, "VOverlay");
const VOverlay = genericComponent()({
  name: "VOverlay",
  directives: {
    ClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    ...makeVOverlayProps()
  },
  emits: {
    "click:outside": (e) => true,
    "update:modelValue": (value) => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const isActive = computed({
      get: () => model.value,
      set: (v) => {
        if (!(v && props.disabled))
          model.value = v;
      }
    });
    const {
      teleportTarget
    } = useTeleport(computed(() => props.attach || props.contained));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses,
      isRtl
    } = useRtl();
    const {
      hasContent,
      onAfterLeave: _onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, toRef(props, "zIndex"), props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      target,
      targetEl,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    } = useActivator(props, {
      isActive,
      isTop: localTop
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, (v) => {
      if (v)
        isActive.value = false;
    });
    const root = ref();
    const contentEl = ref();
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies(props, {
      isRtl,
      contentEl,
      target,
      isActive
    });
    useScrollStrategies(props, {
      root,
      contentEl,
      targetEl,
      isActive,
      updateLocation
    });
    function onClickOutside(e) {
      emit("click:outside", e);
      if (!props.persistent)
        isActive.value = false;
      else
        animateClick();
    }
    function closeConditional() {
      return isActive.value && globalTop.value;
    }
    IN_BROWSER && watch(isActive, (val) => {
      if (val) {
        window.addEventListener("keydown", onKeydown);
      } else {
        window.removeEventListener("keydown", onKeydown);
      }
    }, {
      immediate: true
    });
    onBeforeUnmount(() => {
      if (!IN_BROWSER)
        return;
      window.removeEventListener("keydown", onKeydown);
    });
    function onKeydown(e) {
      var _a, _b;
      if (e.key === "Escape" && globalTop.value) {
        if (!props.persistent) {
          isActive.value = false;
          if ((_a = contentEl.value) == null ? void 0 : _a.contains(document.activeElement)) {
            (_b = activatorEl.value) == null ? void 0 : _b.focus();
          }
        } else
          animateClick();
      }
    }
    const router = useRouter();
    useToggleScope(() => props.closeOnBack, () => {
      useBackButton(router, (next) => {
        if (globalTop.value && isActive.value) {
          next(false);
          if (!props.persistent)
            isActive.value = false;
          else
            animateClick();
        } else {
          next();
        }
      });
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });
    function animateClick() {
      if (props.noClickAnimation)
        return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    function onAfterLeave() {
      _onAfterLeave();
      emit("afterLeave");
    }
    useRender(() => {
      var _a;
      return createVNode(Fragment, null, [(_a = slots.activator) == null ? void 0 : _a.call(slots, {
        isActive: isActive.value,
        props: mergeProps({
          ref: activatorRef,
          targetRef
        }, activatorEvents.value, props.activatorProps)
      }), !props.disabled && isMounted.value && hasContent.value && createVNode(Teleport, {
        "disabled": !teleportTarget.value,
        "to": teleportTarget.value
      }, {
        default: () => [createVNode("div", mergeProps({
          "class": ["v-overlay", {
            "v-overlay--absolute": props.absolute || props.contained,
            "v-overlay--active": isActive.value,
            "v-overlay--contained": props.contained
          }, themeClasses.value, rtlClasses.value, props.class],
          "style": [stackStyles.value, {
            top: convertToUnit(top.value)
          }, props.style],
          "ref": root
        }, scopeId, attrs), [createVNode(Scrim, mergeProps({
          "color": scrimColor,
          "modelValue": !!props.scrim && isActive.value
        }, scrimEvents.value), null), createVNode(MaybeTransition, {
          "appear": true,
          "persisted": true,
          "transition": props.transition,
          "target": target.value,
          "onAfterLeave": onAfterLeave
        }, {
          default: () => {
            var _a2;
            return [withDirectives(createVNode("div", mergeProps({
              "ref": contentEl,
              "class": ["v-overlay__content", props.contentClass],
              "style": [dimensionStyles.value, contentStyles.value]
            }, contentEvents.value, props.contentProps), [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
              isActive
            })]), [[vShow, isActive.value], [resolveDirective("click-outside"), {
              handler: onClickOutside,
              closeConditional,
              include: () => [activatorEl.value]
            }]])];
          }
        })])]
      })]);
    });
    return {
      activatorEl,
      target,
      animateClick,
      contentEl,
      globalTop,
      localTop,
      updateLocation
    };
  }
});
const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...omit(makeVOverlayProps({
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: false,
    scrollStrategy: "reposition",
    transition: {
      component: VDialogTransition
    }
  }), ["absolute"])
}, "VMenu");
const VMenu = genericComponent()({
  name: "VMenu",
  props: makeVMenuProps(),
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
    const uid = getUid();
    const id = computed(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject(VMenuSymbol, null);
    const openChildren = shallowRef(0);
    provide(VMenuSymbol, {
      register() {
        ++openChildren.value;
      },
      unregister() {
        --openChildren.value;
      },
      closeParents() {
        setTimeout(() => {
          if (!openChildren.value) {
            isActive.value = false;
            parent == null ? void 0 : parent.closeParents();
          }
        }, 40);
      }
    });
    async function onFocusIn(e) {
      var _a, _b, _c;
      const before = e.relatedTarget;
      const after = e.target;
      await nextTick();
      if (isActive.value && before !== after && ((_a = overlay.value) == null ? void 0 : _a.contentEl) && // We're the topmost menu
      ((_b = overlay.value) == null ? void 0 : _b.globalTop) && // It isn't the document or the menu body
      ![document, overlay.value.contentEl].includes(after) && // It isn't inside the menu body
      !overlay.value.contentEl.contains(after)) {
        const focusable = focusableChildren(overlay.value.contentEl);
        (_c = focusable[0]) == null ? void 0 : _c.focus();
      }
    }
    watch(isActive, (val) => {
      if (val) {
        parent == null ? void 0 : parent.register();
        document.addEventListener("focusin", onFocusIn, {
          once: true
        });
      } else {
        parent == null ? void 0 : parent.unregister();
        document.removeEventListener("focusin", onFocusIn);
      }
    });
    function onClickOutside() {
      parent == null ? void 0 : parent.closeParents();
    }
    function onKeydown(e) {
      var _a, _b, _c;
      if (props.disabled)
        return;
      if (e.key === "Tab") {
        const nextElement = getNextElement(focusableChildren((_a = overlay.value) == null ? void 0 : _a.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0);
        if (!nextElement) {
          isActive.value = false;
          (_c = (_b = overlay.value) == null ? void 0 : _b.activatorEl) == null ? void 0 : _c.focus();
        }
      }
    }
    function onActivatorKeydown(e) {
      var _a;
      if (props.disabled)
        return;
      const el = (_a = overlay.value) == null ? void 0 : _a.contentEl;
      if (el && isActive.value) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          focusChild(el, "next");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          focusChild(el, "prev");
        }
      } else if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "menu",
      "aria-expanded": String(isActive.value),
      "aria-owns": id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-menu", props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "onClick:outside": onClickOutside,
        "onKeydown": onKeydown
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VMenu"
          }, {
            default: () => {
              var _a;
              return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({
      id,
      ΨopenChildren: openChildren
    }, overlay);
  }
});
const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,
  ...makeComponentProps()
}, "VVirtualScrollItem");
const VVirtualScrollItem = genericComponent()({
  name: "VVirtualScrollItem",
  inheritAttrs: false,
  props: makeVVirtualScrollItemProps(),
  emits: {
    "update:height": (height) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver(void 0, "border");
    watch(() => {
      var _a;
      return (_a = contentRect.value) == null ? void 0 : _a.height;
    }, (height) => {
      if (height != null)
        emit("update:height", height);
    });
    useRender(() => {
      var _a, _b;
      return props.renderless ? createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        itemRef: resizeRef
      })]) : createVNode("div", mergeProps({
        "ref": resizeRef,
        "class": ["v-virtual-scroll__item", props.class],
        "style": props.style
      }, attrs), [(_b = slots.default) == null ? void 0 : _b.call(slots)]);
    });
  }
});
const UP = -1;
const DOWN = 1;
const BUFFER_PX = 100;
const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function useVirtual(props, items) {
  const display = useDisplay();
  const itemHeight = shallowRef(0);
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0);
  });
  const first = shallowRef(0);
  const last = shallowRef(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)
  ) || 1);
  const paddingTop = shallowRef(0);
  const paddingBottom = shallowRef(0);
  const containerRef = ref();
  const markerRef = ref();
  let markerOffset = 0;
  const {
    resizeRef,
    contentRect
  } = useResizeObserver();
  watchEffect(() => {
    resizeRef.value = containerRef.value;
  });
  const viewportHeight = computed(() => {
    var _a;
    return containerRef.value === document.documentElement ? display.height.value : ((_a = contentRect.value) == null ? void 0 : _a.height) || parseInt(props.height) || 0;
  });
  const hasInitialRender = computed(() => {
    return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
  });
  let sizes = Array.from({
    length: items.value.length
  });
  let offsets = Array.from({
    length: items.value.length
  });
  const updateTime = shallowRef(0);
  let targetScrollIndex = -1;
  function getSize(index) {
    return sizes[index] || itemHeight.value;
  }
  const updateOffsets = debounce(() => {
    const start = performance.now();
    offsets[0] = 0;
    const length = items.value.length;
    for (let i = 1; i <= length - 1; i++) {
      offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
    }
    updateTime.value = Math.max(updateTime.value, performance.now() - start);
  }, updateTime);
  const unwatch = watch(hasInitialRender, (v) => {
    if (!v)
      return;
    unwatch();
    markerOffset = markerRef.value.offsetTop;
    updateOffsets.immediate();
    calculateVisibleItems();
    if (!~targetScrollIndex)
      return;
    nextTick(() => {
      IN_BROWSER && window.requestAnimationFrame(() => {
        scrollToIndex(targetScrollIndex);
        targetScrollIndex = -1;
      });
    });
  });
  watch(viewportHeight, (val, oldVal) => {
    oldVal && calculateVisibleItems();
  });
  onScopeDispose(() => {
    updateOffsets.clear();
  });
  function handleItemResize(index, height) {
    const prevHeight = sizes[index];
    const prevMinHeight = itemHeight.value;
    itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index] = height;
      updateOffsets();
    }
  }
  function calculateOffset(index) {
    index = clamp(index, 0, items.value.length - 1);
    return offsets[index] || 0;
  }
  function calculateIndex(scrollTop) {
    return binaryClosest(offsets, scrollTop);
  }
  let lastScrollTop = 0;
  let scrollVelocity = 0;
  let lastScrollTime = 0;
  function handleScroll() {
    if (!containerRef.value || !markerRef.value)
      return;
    const scrollTop = containerRef.value.scrollTop;
    const scrollTime = performance.now();
    const scrollDeltaT = scrollTime - lastScrollTime;
    if (scrollDeltaT > 500) {
      scrollVelocity = Math.sign(scrollTop - lastScrollTop);
      markerOffset = markerRef.value.offsetTop;
    } else {
      scrollVelocity = scrollTop - lastScrollTop;
    }
    lastScrollTop = scrollTop;
    lastScrollTime = scrollTime;
    calculateVisibleItems();
  }
  function handleScrollend() {
    if (!containerRef.value || !markerRef.value)
      return;
    scrollVelocity = 0;
    lastScrollTime = 0;
    calculateVisibleItems();
  }
  let raf2 = -1;
  function calculateVisibleItems() {
    cancelAnimationFrame(raf2);
    raf2 = requestAnimationFrame(_calculateVisibleItems);
  }
  function _calculateVisibleItems() {
    if (!containerRef.value || !viewportHeight.value)
      return;
    const scrollTop = lastScrollTop - markerOffset;
    const direction = Math.sign(scrollVelocity);
    const startPx = Math.max(0, scrollTop - BUFFER_PX);
    const start = clamp(calculateIndex(startPx), 0, items.value.length);
    const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)
    ) {
      const topOverflow = calculateOffset(first.value) - calculateOffset(start);
      const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
      const bufferOverflow = Math.max(topOverflow, bottomOverflow);
      if (bufferOverflow > BUFFER_PX) {
        first.value = start;
        last.value = end;
      } else {
        if (start <= 0)
          first.value = start;
        if (end >= items.value.length)
          last.value = end;
      }
    }
    paddingTop.value = calculateOffset(first.value);
    paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
  }
  function scrollToIndex(index) {
    const offset = calculateOffset(index);
    if (!containerRef.value || index && !offset) {
      targetScrollIndex = index;
    } else {
      containerRef.value.scrollTop = offset;
    }
  }
  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => ({
      raw: item,
      index: index + first.value
    }));
  });
  watch(items, () => {
    sizes = Array.from({
      length: items.value.length
    });
    offsets = Array.from({
      length: items.value.length
    });
    updateOffsets.immediate();
    calculateVisibleItems();
  }, {
    deep: true
  });
  return {
    containerRef,
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleScrollend,
    handleItemResize
  };
}
function binaryClosest(arr, val) {
  let high = arr.length - 1;
  let low = 0;
  let mid = 0;
  let item = null;
  let target = -1;
  if (arr[high] < val) {
    return high;
  }
  while (low <= high) {
    mid = low + high >> 1;
    item = arr[mid];
    if (item > val) {
      high = mid - 1;
    } else if (item < val) {
      target = mid;
      low = mid + 1;
    } else if (item === val) {
      return mid;
    } else {
      return low;
    }
  }
  return target;
}
const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VVirtualScroll");
const VVirtualScroll = genericComponent()({
  name: "VVirtualScroll",
  props: makeVVirtualScrollProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vm = getCurrentInstance("VVirtualScroll");
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems
    } = useVirtual(props, toRef(props, "items"));
    useToggleScope(() => props.renderless, () => {
      function handleListeners() {
        var _a, _b;
        let add = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        const method = add ? "addEventListener" : "removeEventListener";
        if (containerRef.value === document.documentElement) {
          document[method]("scroll", handleScroll, {
            passive: true
          });
          document[method]("scrollend", handleScrollend);
        } else {
          (_a = containerRef.value) == null ? void 0 : _a[method]("scroll", handleScroll, {
            passive: true
          });
          (_b = containerRef.value) == null ? void 0 : _b[method]("scrollend", handleScrollend);
        }
      }
      onMounted(() => {
        containerRef.value = getScrollParent(vm.vnode.el, true);
        handleListeners(true);
      });
      onScopeDispose(handleListeners);
    });
    useRender(() => {
      const children = computedItems.value.map((item) => createVNode(VVirtualScrollItem, {
        "key": item.index,
        "renderless": props.renderless,
        "onUpdate:height": (height) => handleItemResize(item.index, height)
      }, {
        default: (slotProps) => {
          var _a;
          return (_a = slots.default) == null ? void 0 : _a.call(slots, {
            item: item.raw,
            index: item.index,
            ...slotProps
          });
        }
      }));
      return props.renderless ? createVNode(Fragment, null, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingTop: convertToUnit(paddingTop.value)
        }
      }, null), children, createVNode("div", {
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, null)]) : createVNode("div", {
        "ref": containerRef,
        "class": ["v-virtual-scroll", props.class],
        "onScrollPassive": handleScroll,
        "onScrollend": handleScrollend,
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [children])]);
    });
    return {
      scrollToIndex
    };
  }
});
function useScrolling(listRef, textFieldRef) {
  const isScrolling = shallowRef(false);
  let scrollTimeout;
  function onListScroll(e) {
    cancelAnimationFrame(scrollTimeout);
    isScrolling.value = true;
    scrollTimeout = requestAnimationFrame(() => {
      scrollTimeout = requestAnimationFrame(() => {
        isScrolling.value = false;
      });
    });
  }
  async function finishScrolling() {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => {
      if (isScrolling.value) {
        const stop = watch(isScrolling, () => {
          stop();
          resolve();
        });
      } else
        resolve();
    });
  }
  async function onListKeydown(e) {
    var _a, _b;
    if (e.key === "Tab") {
      (_a = textFieldRef.value) == null ? void 0 : _a.focus();
    }
    if (!["PageDown", "PageUp", "Home", "End"].includes(e.key))
      return;
    const el = (_b = listRef.value) == null ? void 0 : _b.$el;
    if (!el)
      return;
    if (e.key === "Home" || e.key === "End") {
      el.scrollTo({
        top: e.key === "Home" ? 0 : el.scrollHeight,
        behavior: "smooth"
      });
    }
    await finishScrolling();
    const children = el.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (e.key === "PageDown" || e.key === "Home") {
      const top = el.getBoundingClientRect().top;
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          child.focus();
          break;
        }
      }
    } else {
      const bottom = el.getBoundingClientRect().bottom;
      for (const child of [...children].reverse()) {
        if (child.getBoundingClientRect().bottom <= bottom) {
          child.focus();
          break;
        }
      }
    }
  }
  return {
    onListScroll,
    onListKeydown
  };
}
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...makeItemsProps({
    itemChildren: false
  })
}, "Select");
const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps({
    transition: {
      component: VDialogTransition
    }
  })
}, "VSelect");
const VSelect = genericComponent()({
  name: "VSelect",
  props: makeVSelectProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true,
    "update:menu": (ue) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a;
        if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.ΨopenChildren))
          return;
        _menu.value = v;
      }
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm();
    const selectedValues = computed(() => model.value.map((selection) => selection.value));
    const isFocused = shallowRef(false);
    const label = computed(() => menu.value ? props.closeText : props.openText);
    let keyboardLookupPrefix = "";
    let keyboardLookupLastTime;
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter((item) => !model.value.some((s) => s === item));
      }
      return items.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value));
    const computedMenuProps = computed(() => {
      var _a;
      return {
        ...props.menuProps,
        activatorProps: {
          ...((_a = props.menuProps) == null ? void 0 : _a.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    });
    const listRef = ref();
    const {
      onListScroll,
      onListKeydown
    } = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value)
        return;
      menu.value = !menu.value;
    }
    function onKeydown(e) {
      var _a, _b;
      if (!e.key || props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown", " "].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape", "Tab"].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === "Home") {
        (_a = listRef.value) == null ? void 0 : _a.focus("first");
      } else if (e.key === "End") {
        (_b = listRef.value) == null ? void 0 : _b.focus("last");
      }
      const KEYBOARD_LOOKUP_THRESHOLD = 1e3;
      function checkPrintable(e2) {
        const isPrintableChar = e2.key.length === 1;
        const noModifier = !e2.ctrlKey && !e2.metaKey && !e2.altKey;
        return isPrintableChar && noModifier;
      }
      if (props.multiple || !checkPrintable(e))
        return;
      const now = performance.now();
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = "";
      }
      keyboardLookupPrefix += e.key.toLowerCase();
      keyboardLookupLastTime = now;
      const item = items.value.find((item2) => item2.title.toLowerCase().startsWith(keyboardLookupPrefix));
      if (item !== void 0) {
        model.value = [item];
      }
    }
    function select(item) {
      if (props.multiple) {
        const index = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        menu.value = false;
      }
    }
    function onBlur(e) {
      var _a;
      if (!((_a = listRef.value) == null ? void 0 : _a.$el.contains(e.relatedTarget))) {
        menu.value = false;
      }
    }
    function onAfterLeave() {
      var _a;
      if (isFocused.value) {
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onModelUpdate(v) {
      if (v == null)
        model.value = [];
      else if (matchesSelector(vTextFieldRef.value, ":autofill") || matchesSelector(vTextFieldRef.value, ":-webkit-autofill")) {
        const item = items.value.find((item2) => item2.title === v);
        if (item) {
          select(item);
        }
      } else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = "";
      }
    }
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex((item) => model.value.some((s) => props.valueComparator(s.value, item.value)));
        IN_BROWSER && window.requestAnimationFrame(() => {
          var _a;
          index >= 0 && ((_a = vVirtualScrollRef.value) == null ? void 0 : _a.scrollToIndex(index));
        });
      }
    });
    watch(displayItems, (val, oldVal) => {
      if (!isFocused.value)
        return;
      if (!val.length && props.hideNoData) {
        menu.value = false;
      }
      if (!oldVal.length && val.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? void 0 : props.placeholder;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map((v) => v.props.value).join(", "),
        "onUpdate:modelValue": onModelUpdate,
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ["v-select", {
          "v-select--active-menu": menu.value,
          "v-select--chips": !!props.chips,
          [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
          "v-select--selected": model.value.length,
          "v-select--selection-slot": !!slots.selection
        }, props.class],
        "style": props.style,
        "inputmode": "none",
        "placeholder": placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "aria-label": t(label.value),
        "title": t(label.value)
      }), {
        ...slots,
        default: () => createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-select__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, computedMenuProps.value), {
          default: () => [hasList && createVNode(VList, {
            "ref": listRef,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? "independent" : "single-independent",
            "onMousedown": (e) => e.preventDefault(),
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "onScrollPassive": onListScroll,
            "tabindex": "-1",
            "aria-live": "polite",
            "color": props.itemColor ?? props.color
          }, {
            default: () => {
              var _a, _b, _c;
              return [(_a = slots["prepend-item"]) == null ? void 0 : _a.call(slots), !displayItems.value.length && !props.hideNoData && (((_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) ?? createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), createVNode(VVirtualScroll, {
                "ref": vVirtualScrollRef,
                "renderless": true,
                "items": displayItems.value
              }, {
                default: (_ref2) => {
                  var _a2;
                  let {
                    item,
                    index,
                    itemRef
                  } = _ref2;
                  const itemProps = mergeProps(item.props, {
                    ref: itemRef,
                    key: index,
                    onClick: () => select(item)
                  });
                  return ((_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
                    item,
                    index,
                    props: itemProps
                  })) ?? createVNode(VListItem, mergeProps(itemProps, {
                    "role": "option"
                  }), {
                    prepend: (_ref3) => {
                      let {
                        isSelected
                      } = _ref3;
                      return createVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                        "key": item.value,
                        "modelValue": isSelected,
                        "ripple": false,
                        "tabindex": "-1"
                      }, null) : void 0, item.props.prependAvatar && createVNode(VAvatar, {
                        "image": item.props.prependAvatar
                      }, null), item.props.prependIcon && createVNode(VIcon, {
                        "icon": item.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
            }
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : void 0;
          if (hasSlot && !slotContent)
            return void 0;
          return createVNode("div", {
            "key": item.value,
            "class": "v-select__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? createVNode("span", {
            "class": "v-select__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-select__menu-icon",
            "icon": props.menuIcon
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      menu,
      select
    }, vTextFieldRef);
  }
});
const defaultFilter = (value, query, item) => {
  if (value == null || query == null)
    return -1;
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
};
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function filterItems(items, query, options) {
  var _a;
  const array = [];
  const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
  const keys = (options == null ? void 0 : options.filterKeys) ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
  if (!(items == null ? void 0 : items.length))
    return array;
  loop:
    for (let i = 0; i < items.length; i++) {
      const [item, transformed = item] = wrapInArray(items[i]);
      const customMatches = {};
      const defaultMatches = {};
      let match = -1;
      if (query && !(options == null ? void 0 : options.noFilter)) {
        if (typeof item === "object") {
          const filterKeys = keys || Object.keys(transformed);
          for (const key of filterKeys) {
            const value = getPropertyFromItem(transformed, key, transformed);
            const keyFilter = (_a = options == null ? void 0 : options.customKeyFilter) == null ? void 0 : _a[key];
            match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
            if (match !== -1 && match !== false) {
              if (keyFilter)
                customMatches[key] = match;
              else
                defaultMatches[key] = match;
            } else if ((options == null ? void 0 : options.filterMode) === "every") {
              continue loop;
            }
          }
        } else {
          match = filter(item, query, item);
          if (match !== -1 && match !== false) {
            defaultMatches.title = match;
          }
        }
        const defaultMatchesLength = Object.keys(defaultMatches).length;
        const customMatchesLength = Object.keys(customMatches).length;
        if (!defaultMatchesLength && !customMatchesLength)
          continue;
        if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength)
          continue;
        if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength))
          continue;
      }
      array.push({
        index: i,
        matches: {
          ...defaultMatches,
          ...customMatches
        }
      });
    }
  return array;
}
function useFilter(props, items, query, options) {
  const filteredItems = ref([]);
  const filteredMatches = ref(/* @__PURE__ */ new Map());
  const transformedItems = computed(() => (options == null ? void 0 : options.transform) ? unref(items).map((item) => [item, options.transform(item)]) : unref(items));
  watchEffect(() => {
    const _query = typeof query === "function" ? query() : unref(query);
    const strQuery = typeof _query !== "string" && typeof _query !== "number" ? "" : String(_query);
    const results = filterItems(transformedItems.value, strQuery, {
      customKeyFilter: {
        ...props.customKeyFilter,
        ...unref(options == null ? void 0 : options.customKeyFilter)
      },
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    const originalItems = unref(items);
    const _filteredItems = [];
    const _filteredMatches = /* @__PURE__ */ new Map();
    results.forEach((_ref) => {
      let {
        index,
        matches
      } = _ref;
      const item = originalItems[index];
      _filteredItems.push(item);
      _filteredMatches.set(item.value, matches);
    });
    filteredItems.value = _filteredItems;
    filteredMatches.value = _filteredMatches;
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
export {
  VOverlay as V,
  makeVOverlayProps as a,
  VDialogTransition as b,
  VSelect as c,
  makeFilterProps as d,
  makeSelectProps as e,
  useFilter as f,
  useScrolling as g,
  VMenu as h,
  VVirtualScroll as i,
  VChip as j,
  makeLazyProps as m,
  useLazy as u
};
//# sourceMappingURL=filter-t3BmU0nE.js.map