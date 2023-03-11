<template>
    <div class="box has-text-weight-bold">
    <!-- O que tiver dentro do component box vai ser renderizado aqui no slot-->        
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'Box'

})
</script>

<style scoped>
.box{
    background: #faf0ca;
}
</style>