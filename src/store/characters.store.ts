import { reactive } from 'vue';
import type { Character, Result } from '@/characters/interfaces/character';
import  rickAndMortyApi from '@/api/rickAndMortyApi'

interface Store {
    characters: {
        list: Result[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    ids: {
        list: {
            [id: string]: Result;
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    // Métodos de Characters
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Character ) => void;
    loadCharactersFailed: ( error: string ) => void;

    // Métodos de Characters por IDs
    startLoadingCharacter: ( id: string ) => void;
    checkIdInStore: ( id: string ) => boolean;
    loadedCharacter: ( character: Result ) => void;
}


// Initial State
const characterStore = reactive<Store>({
    characters: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: false,
        list: [],
    },

    ids: {
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null,
    },

    // Métodos de Characters
    async startLoadingCharacters() {
        const { data } = await rickAndMortyApi.get<Character>('/character');
        this.loadedCharacters( data );
    },
    loadedCharacters( data: Character ) {
        
        const characters = data.results;
        
        this.characters = {
            count: characters.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: characters,
        }
    },
    loadCharactersFailed( error: string ) {
        this.characters = {
            count: 0,
            errorMessage: error,
            hasError: true,
            isLoading: false,
            list: [],
        }
    },
    // Métodos de Characters por IDs
    startLoadingCharacter() {
        this.ids = {
            ...this.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null,
        }
    },
    checkIdInStore( id: string ) {
        return !!this.ids.list[id];
    },
    loadedCharacter( character: Result ) {
        this.ids.isLoading = false;
        this.ids.list[character.id] = character;
    }
});

 characterStore.startLoadingCharacters();

export default characterStore;