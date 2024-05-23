import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const ChatPlaceHolder = () => {
	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
				<Image src={"/Right-image.png"} alt='Hero' width={320} height={188} />
				<p className='text-3xl font-extralight mt-5 mb-2'>Chat with Individuals or Create Groups</p>
				<p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Create Video-Call rooms, share your screen, share Videos & Images and many more.
				</p>

				<Button className='rounded-full my-5 bg-green-primary hover:bg-green-secondary'>
					Welcome To CHAT-APP
				</Button>
			</div>
			<p className='w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1 hover:cursor-pointer'
			onClick={()=> {navigator.clipboard.writeText('https://chat-app-sepia-nine.vercel.app/');
				toast.success("Link Copied Succesfully")
			}}>
				<SquareArrowOutUpRight size={10} /> Share with friends and families
			</p>
		</div>
	);
};
export default ChatPlaceHolder;