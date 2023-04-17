import IProjeto from "./IProjeto";

//Criando o que é uma tarefa, o que representa uma tarefa
export default interface ITarefa {
    id: string,
    duracaoEmSegundos: number,
    descricao: string,
    projeto : IProjeto
}