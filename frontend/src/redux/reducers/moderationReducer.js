import { GET_ALL_COMMUNITIES } from "../actions/types";

const initialState = {
	allCommunities: {},
};

export default function moderationReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_COMMUNITIES:
			return {
				...state,
				allCommunities: action.payload,
			};

		default:
			return state;
	}
}
