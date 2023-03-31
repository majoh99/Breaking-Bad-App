import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { Result } from '@/characters/interfaces/character';
import rickAndMortyApi from '@/api/rickAndMortyApi';


const characterSet = ref<{[id: string]: Result}>({})
const hasError     = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async( id: string ):Promise<Result> => {
    if ( characterSet.value[id] ) 
        return characterSet.value[id];

    try {
        const { data } = await rickAndMortyApi.get<Result>(`/character/${id}`);
        console.log(data);
        
        if( data ) return data;

        throw new Error(`No se encontró el personaje con el id ${ id }`);

    } catch (error: any) {
        throw new Error(error);
    }
    
    
  }

const loadedCharacter = ( character: Result ) => {
    hasError.value     = false;
    errorMessage.value = null;
    characterSet.value[character.id] = character;
}

const loadedWithError = (error: string) => {
    hasError.value     = true;
    errorMessage.value = error;
}

const useCharacter = ( id: string ) => {

    const { isLoading } = useQuery(
        ['character', id],
        () => getCharacter(id),
        {
            onSuccess( character ){
                loadedCharacter(character as Result);
            },
            onError( error: string ){
                loadedWithError(error);
            }
        }
    )

    return {
        // Properties
        errorMessage,
        hasError,
        isLoading,
        list: characterSet,

        // Getters
        character: computed<Result | null>( () => characterSet.value[id] ),

        // Methods
    }
}

export default useCharacter;