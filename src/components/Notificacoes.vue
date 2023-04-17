<template>
    <div class="notificacoes">
        <div class="message " :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
            
            <div class="message-header"> {{notificacao.titulo}}</div>
            <div class="message-body">{{ notificacao.texto}}</div>
        </div>
       
    </div>
</template>
<script>

import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao';
export default defineComponent({
    name: 'Notificacoes',
    data(){
        return{
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger'
            }
        }
    },
    setup(){
        const store = useStore();
        return {
            notificacoes: computed(()=>store.state.notificacoes),
            store
        }
    }

})
</script>
<style scoped>
    .notificacoes{
        width: 300px;
        padding: 8px;
        position: absolute;
        right: 0;
        z-index: 101;
    }
</style>