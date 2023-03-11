<template>
    <button class="button" @click="clicado" :disabled="desabilitado">
        <span class="icon">
            <i :class="icone"></i>
        </span>
        <span>{{texto}}</span>
    </button>

</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'Botao',
    emits: ['clicado'],
    props:{
        desabilitado:{
            type: Boolean
        },
        icone:{
            type: String,
            required: true
        },
        texto: {
            type: String,
            required: true
        }
        
    },
    // funcões que o formulario é capaz de executar dada a interação do usuário ou seja, os métodos da função
    methods: {
        clicado (){
            this.$emit('clicado')
        },
        
    }
})
</script>

