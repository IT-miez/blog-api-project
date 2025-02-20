import { authRequest } from "../utils/network";

export function profileRequest(userid) {
	return authRequest({ url: `/profile/${userid}` });
}

export function profilePostsRequest(userid) {
	return authRequest({ url: `/profile/${userid}/posts` });
}
