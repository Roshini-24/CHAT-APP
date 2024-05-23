"use client"

import ThemeSwitch from "./theme-switch";

import Conversation from "./conversation";
import { UserButton } from "@clerk/nextjs";
import UserListDialog from "./user-list-dialog";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";
import { useConversationStore } from "@/store/chat-store";

const LeftPanel = () => {
	const {isAuthenticated,isLoading} =useConvexAuth();
	const conversations = useQuery(api.conversations.getMyConversations, isAuthenticated? undefined :"skip");
	console.log(conversations);
	const {selectedConversation,setSelectedConversation} = useConversationStore();
	useEffect(()=>{
		const conversationIds = conversations?.map((convo)=> convo._id);
		if(selectedConversation && conversationIds && !conversationIds.includes(selectedConversation._id)){
			setSelectedConversation(null);
		}

	},[conversations,selectedConversation,setSelectedConversation]);
	if(isLoading) return null;

	return (
		<div className='w-1/4 border-gray-600 border-r'>
			<div className='sticky top-0 bg-left-panel z-10'>
				{/* Header */}
				<div className='flex justify-between bg-gray-primary p-3 items-center'>
					<UserButton />

					<div className='flex items-center gap-3'>
						{isAuthenticated && <UserListDialog/>}
						<ThemeSwitch />
						
					</div>
				</div>
				
			</div>

			{/* Chat List */}
			<div className='my-3 flex flex-col gap-0 max-h-[80%] overflow-auto'>
				{/* Conversations will go here*/}
                {conversations?.map((conversation) => (
					<Conversation key={conversation._id} conversation={conversation} />
				))}

				{conversations?.length === 0 && (
					<>
						<p className='text-center text-gray-500 text-sm mt-3'>No conversations yet</p>
						<p className='text-center text-gray-500 text-sm mt-3 '>
							We understand {"you're"} an introvert, but {"you've"} got to start somewhere 😊
						</p>
					</>
				)}
			</div>
		</div>
	);
};
export default LeftPanel;