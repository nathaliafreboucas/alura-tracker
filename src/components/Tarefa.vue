<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{tarefa.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        
            <button class="button ml-2 is-danger" @click="excluir(tarefa)">
                <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                </span>
            </button> 
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from './Box.vue';
import { useStore } from '@/store';
import { EXCLUI_TAREFA } from '@/store/tipo-mutacoes';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: "Tarefa",
    components: {
        Cronometro,
        Box
    },
    methods:{
        excluir(tarefa:ITarefa){
            this.notificar('Deletado', 'Tarefa excluida com sucesso', TipoNotificacao.SUCESSO)
            this.store.commit(EXCLUI_TAREFA, tarefa)
        }
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    setup(){
        const store = useStore();
        const { notificar } = useNotificador();

        return{
            notificar,
            store
        }
    }
})
</script>
