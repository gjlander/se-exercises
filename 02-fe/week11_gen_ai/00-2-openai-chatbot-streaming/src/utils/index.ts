import type { Message } from '../types';
const addOrUpdateMsg = (
	msgs: Message[],
	asstMsg: Message,
	fullText: string
) => {
	const msgExists = msgs.some((msg) => msg._id === asstMsg._id);
	let updatedMsgs = [];
	// console.log('prev', prev);
	if (!msgExists) {
		asstMsg.content = fullText;
		updatedMsgs = [...msgs, asstMsg];
	} else {
		updatedMsgs = msgs.map((msg) =>
			msg._id === asstMsg._id
				? {
						...msg,
						content: msg.content + fullText
				  }
				: msg
		);
	}
	return updatedMsgs;
};

export { addOrUpdateMsg };
