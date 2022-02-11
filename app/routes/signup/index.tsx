import { ActionFunction, redirect } from 'remix';

export const action: ActionFunction = async ({ request }) => {
	console.log(request);
	switch (request.method) {
		case 'POST': {
			const body = await request.formData();
			const data = {
				first_name: body.get('firstName'),
				last_name: body.get('lastName'),
				mobile: '',
				email: body.get('email'),
			};

			await fetch(
				'https://api.churchsuite.co.uk/v1/calendar/event/1016/signups',
				{
					headers: {
						'X-Account': 'thec3',
						'X-Application': 'zapier.api',
						'X-Auth': 'keyyzyy5l9uqicjacdtm',
					},
					method: 'post',
					body: JSON.stringify({
						action: 'add',
						signups: [data],
					}),
				}
			);
			return redirect('/events');
		}
		case 'PUT': {
			/* handle "PUT" */
		}
		case 'PATCH': {
			/* handle "PATCH" */
		}
		case 'DELETE': {
			/* handle "DELETE" */
		}
	}
};
