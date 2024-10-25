<template>
    <slot />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLocale } from "vuetify";

const { locale } = useI18n();

useLocale().current.value = locale.value;
</script>
