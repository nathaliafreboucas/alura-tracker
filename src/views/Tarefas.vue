<template>

      <div class="column is-three-quarter conteudo">

        <FormularioVue @aoSalvarTarefa="salvarTarefa"/>

        <div class="lista">

          <Tarefa v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa" />

          <Box v-if="listaEstaVazia()">
            Você não está produtivo hoje :(
          </Box>

        </div>

      </div>

</template>

<script lang="ts">
import {computed, defineComponent } from 'vue';
import FormularioVue from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import ITarefa from '../interfaces/ITarefa';
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
// import { notificacaoMixin } from '@/mixins/notificar';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
  name: 'Tarefas',
  components: {
    FormularioVue,
    Tarefa,
    Box
  },
  //estado do componente que retorna um objeto
  data () {
    return{
      modoEscuroAtivo: false
    }
  },
  // mixins: [notificacaoMixin],
  methods:{
    salvarTarefa (tarefa: ITarefa){
      this.notificar('Tarefa Finalizada','Tarefa completada com sucesso', TipoNotificacao.SUCESSO)
      this.store.commit(ADICIONA_TAREFA, tarefa);

    },
    trocarTema(modoEscuroAtivo: boolean){
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
    listaEstaVazia(){
      return this.store.state.tarefas.length == 0
    }
  },

  setup (){
    const store = useStore();
    const {notificar} = useNotificador()
    return{
      tarefas: computed(() => store.state.tarefas),
      notificar,
      store
    }
  }
});
</script>



