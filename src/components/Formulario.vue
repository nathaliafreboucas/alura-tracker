<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            
            <div class="column is-3">
                <div class="select">
                  <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                      :value="projeto.id"
                      v-for="projeto in projetos"
                      :key="projeto.id"
                    >
                      {{ projeto.nome }}
                    </option>
                  </select>
                </div>
              </div>

            <div class="column">

                <Temporizador @aoTemporizadorFinalizado="finalizarATarefa"/>
                    
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import ITarefa from '@/interfaces/ITarefa';
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import Temporizador from './Temporizador.vue';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
    name: 'FormularioVue',
    //array de texto com os eventos que ele emite
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    //método que retorna um estado
    data () {
        return {
            descricao: '',
            idProjeto: '',
        }
    },
    methods: {
        finalizarATarefa(tempoDecorrido: number): void{
            const projeto = this.projetos.find(projeto => projeto.id == this.idProjeto)
            if(!projeto){

                this.notificar('Cuidado!', 'Você deve associar sua tarefa a um projeto', TipoNotificacao.ATENCAO)
                return
            }
            this.$emit('aoSalvarTarefa', {

                id: new Date().toISOString(),
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(projetoItem => projetoItem.id == this.idProjeto)
            }as ITarefa)
            
            this.descricao = '';
        }
    },
    setup(){
        const store = useStore();
        const { notificar } = useNotificador();

        return {
            projetos: computed(() => store.state.projetos),
            notificar,
            store
        }
    }
    
});
</script>

<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>