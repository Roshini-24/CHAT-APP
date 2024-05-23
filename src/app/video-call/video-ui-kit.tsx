import { randomID } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export function getUrlParams(url = window.location.href) {
	let urlStr = url.split("?")[1];
	return new URLSearchParams(urlStr);
}

export default function VideoUIKit() {
	const roomID = getUrlParams().get("roomID") || randomID(5);
	const { user } = useClerk();
	console.log(user);

	let myMeeting = (element: HTMLDivElement) => {
		const initMeeting = async () => {
			const res = await fetch(`/api/zegocloud?userID=${user?.id}`);
			console.log(res)
			const { token, appID } = await res.json();

			const username = user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];
			console.log(username,"this is user");

			const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, user?.id!, username);
			

			const zp = ZegoUIKitPrebuilt.create(kitToken);
			console.log(zp);
			zp.joinRoom({
				container: element,
				sharedLinks: [
					{
						name: "Personal link",
						url:
							window.location.protocol +
							"//" +
							window.location.host +
							window.location.pathname +
							"?roomID=" +
							roomID,
					},
				],
				scenario: {
					mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls [ZegoUIKitPrebuilt.OneONoneCall].
				},
			});
		};
		initMeeting();
	};

	return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
}
