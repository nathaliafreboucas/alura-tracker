<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos" />

        <Botao @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
        <Botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </div>
    
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';
import { useStore } from '@/store';

export default defineComponent ({
    name: 'Temporizador',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        Cronometro,
        Botao
    },

    data (){
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar (): void {
            this.cronometroRodando = true;
            // comçar a contagem
            // 1seg == 1000ms
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
            },1000)
            console.log('Iniciando...');
        },
        finalizar (): void {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);

            this.tempoEmSegundos = 0;

        }
    },
    setup(){
        const store = useStore();
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }

    
})
    
</script>
