<template>
  <div class="h-full flex flex-col sm:flex-row gap-4 ">
    <div class="w-full sm:w-1/3 flex items-start justify-center px-2 py-2">
      <slot name="imagen" />
    </div>
    <div class="w-full sm:w-2/3">
      <slot name="form" />
    </div>
  </div>
</template>
