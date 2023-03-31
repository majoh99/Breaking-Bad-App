import { ref, onMounted } from 'vue';
import axios from 'axios';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Character, Result } from '@/characters/interfaces/character';

const characters = ref<Result[]>([]);
const isLoading = ref<boolean>(true);
const isError = ref<boolean>(false);
const errorMessage = ref<string>('');

export const useCharactersOld = () => {

	onMounted( async() => {
		loadCharacters();
	});

	const loadCharacters = async() => {
		
		if (characters.value.length > 0) return;

		isLoading.value = true;

		try {
			const { data } = await rickAndMortyApi.get<Character>('/character');
			characters.value = data.results;
			isLoading.value = false;

		} catch (error) {
			isError.value = true;
			isLoading.value = false;
			if ( axios.isAxiosError(error) ) {
				return errorMessage.value = error.message;
			}
			errorMessage.value = JSON.stringify(error);
		}

		

		// rickAndMortyApi.get<Character>('/character')
		// 	.then( resp => {
		// 		characters.value = resp.data.results;
		// 		isLoading.value = false;
		// 	});
	}

	return {
		characters,
		isLoading,
		isError,
		errorMessage,
	}
}