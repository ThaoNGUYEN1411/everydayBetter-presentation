export function getToken() {
	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];
	console.log(token);

	if (!token) {
		console.log("No token found");
		return;
	}
	return token;
}
