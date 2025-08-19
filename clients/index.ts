const ENDPOINT = "https://noob-store.thuannc.com";

export async function getInvitation(secret: string) {
	const response = await fetch(
		`${ENDPOINT}/invitation?invitation_id=${secret}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch invitation");
	}
	return response.json();
}

export async function putInvitation(data: any) {
	const response = await fetch(`${ENDPOINT}/invitation`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error("Failed to update invitation");
	}
	return response.json();
}
