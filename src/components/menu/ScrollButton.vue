<script setup lang="ts">
import { scrollToCurrentTime } from "@/lib/scroll";
import { useEventListStore } from "@/store/eventListStore";

const eventListStore = useEventListStore();
</script>

<template>
  <button
    title="scroll to current time"
    class="flex size-11 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-200"
    @click="scrollToCurrentTime(eventListStore.dateSectionList)"
  >
    <i class="i-mdi-history size-8" />
  </button>
</template>
