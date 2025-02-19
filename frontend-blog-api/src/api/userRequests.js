// 5/5

import { generalRequest } from "../utils/network";
import tokens from "../constants/tokens";

export function loginRequest(username, password) {
	return generalRequest({ url: "/user/login", method: "POST", data: { username, password } })
		.then((data) => {
			localStorage.setItem(tokens.auth_token, data.token);
		});
}

export function registerRequest(username, password, profileSummary) {
	return generalRequest({ url: "/user/register", method: "POST", data: { username, password, profileSummary } });
}

/*
fetch(
    `${fetchURL}/user/register`,
    {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            username,
            password,
            profileSummary,

        }),
    },
)
    .then((response) => {
        if(response.status==200) {
            setOpen(true)
            sleep(2000)

            console.log("redirecting...")
            window.location.href = '/';
        }
        else {
            response = response.json()
        }

    })
    .then((data) => {
        // TODO: redirect user on success, error popup on unsuccess
    })
    // eslint-disable-next-line
    .catch((error) => console.log(error));

*/
