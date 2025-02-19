import { generalRequest, authRequest } from "../utils/network";
import tokens from "../constants/tokens";

export function profileRequest(userid) {
	return authRequest({ url: `/profile/${userid}` });
}

export function profilePostsRequest(userid) {
	return authRequest({ url: `/profile/${userid}/posts` });
}
