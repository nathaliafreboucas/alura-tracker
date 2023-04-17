import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { store } from '@/store';
import {TipoNotificacao} from '@/interfaces/INotificacao'

export const notificacaoMixin = {
    methods: {
        notificar(titulo: string, texto: string, tipo: TipoNotificacao): void{
            store.commit(NOTIFICAR,{
                titulo,
                texto,
                tipo
            })
        }
    }
    
}

// o mixin não está sendo usado
