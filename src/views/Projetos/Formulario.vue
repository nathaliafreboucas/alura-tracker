<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
        
    </section>
</template>

<script lang="ts">
import {defineComponent } from 'vue';
import { useStore } from '@/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from "@/hooks/notificador";

export default defineComponent({
    name: 'Formulario',
    props: {
        id:{
            type: String
        }
    },
    mounted(){
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    data(){
        return{
            nomeDoProjeto:'',
        };
    },
    methods:{
        salvar(){
            if(this.id){
                //edição
                this.store.commit(ALTERA_PROJETO,{
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            }else{
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
            }
            this.nomeDoProjeto = '';
            this.notificar('Novo projeto salvo', 'Prontinho :)! Seu projeto já foi salvo', TipoNotificacao.SUCESSO);
            
            this.$router.push('/Projetos');
        }
    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();
        return {
            notificar,
            store
        }
    }
})
</script>

