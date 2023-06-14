declare module "revolt.js" {
	export class Client {
		commands: any;
		categories: any;
		characters: any;
		client: any;
		loginBot(TOKEN: string): void;
		on(arg0: string, arg1: (...args: any[]) => any): void;
		off<T>(
			event: T,
			fn?: (arg0: any) => void,
			context?: any,
			once?: boolean
		): Client;
		user: undefined | User;
		aliases: any;
		servers: ServerCollection;
		configuration:
			| undefined
			| {
					app: string;
					build: {
						commit_sha: string;
						commit_timestamp: string;
						origin_url: string;
						semver: string;
						timestamp: string;
					};
					features: {
						autumn: {
							enabled: boolean;
							url: string;
						};
						captcha: {
							enabled: boolean;
							key: string;
						};
						email: boolean;
						invite_only: boolean;
						january: {
							enabled: boolean;
							url: string;
						};
						voso: {
							enabled: boolean;
							url: string;
							ws: string;
						};
					};
					revolt: string;
					vapid: string;
					ws: string;
			  };
		constructor();
	}

	export class User {
		constructor();
		id: string;
		get animatedAvatarURL(): string;
		get avatar(): undefined | File;
		get avatarURL(): string;
		get badges(): UserBadges;
		get bot():
			| undefined
			| {
					owner: string;
			  };
		get createdAt(): Date;
		get defaultAvatarURL(): string;
		get flags(): UserFlags;
		get online(): boolean;
		get permission(): number;
		get presence(): "Online" | "Idle" | "Focus" | "Busy" | "Invisible";
		get privileged(): boolean;
		get relationship():
			| "User"
			| "None"
			| "Friend"
			| "Outgoing"
			| "Incoming"
			| "Blocked"
			| "BlockedOther";
		get status():
			| undefined
			| {
					presence?: null | "Online" | "Idle" | "Focus" | "Busy" | "Invisible";
					text?: null | string;
			  };
		get username(): string;
		addFriend(): Promise<User>;
		blockUser(): Promise<void>;
		changeUsername(
			username: string,
			password: string
		): Promise<{
			_id: string;
			avatar?: null | {
				_id: string;
				content_type: string;
				deleted?: null | boolean;
				filename: string;
				message_id?: null | string;
				metadata:
					| {
							type: "File";
					  }
					| {
							type: "Text";
					  }
					| {
							height: number;
							type: "Image";
							width: number;
					  }
					| {
							height: number;
							type: "Video";
							width: number;
					  }
					| {
							type: "Audio";
					  };
				object_id?: null | string;
				reported?: null | boolean;
				server_id?: null | string;
				size: number;
				tag: string;
				user_id?: null | string;
			};
			badges?: null | number;
			bot?: null | {
				owner: string;
			};
			flags?: null | number;
			online?: null | boolean;
			privileged?: boolean;
			profile?: null | {
				background?: null | {
					_id: string;
					content_type: string;
					deleted?: null | boolean;
					filename: string;
					message_id?: null | string;
					metadata:
						| {
								type: "File";
						  }
						| {
								type: "Text";
						  }
						| {
								height: number;
								type: "Image";
								width: number;
						  }
						| {
								height: number;
								type: "Video";
								width: number;
						  }
						| {
								type: "Audio";
						  };
					object_id?: null | string;
					reported?: null | boolean;
					server_id?: null | string;
					size: number;
					tag: string;
					user_id?: null | string;
				};
				content?: null | string;
			};
			relations?:
				| null
				| {
						_id: string;
						status:
							| "User"
							| "None"
							| "Friend"
							| "Outgoing"
							| "Incoming"
							| "Blocked"
							| "BlockedOther";
				  }[];
			relationship?:
				| null
				| "User"
				| "None"
				| "Friend"
				| "Outgoing"
				| "Incoming"
				| "Blocked"
				| "BlockedOther";
			status?: null | {
				presence?: null | "Online" | "Idle" | "Focus" | "Busy" | "Invisible";
				text?: null | string;
			};
			username: string;
		}>;
		edit(data: {
			avatar?: null | string;
			badges?: null | number;
			flags?: null | number;
			profile?: null | {
				background?: null | string;
				content?: null | string;
			};
			remove?:
				| null
				| (
						| "Avatar"
						| "StatusText"
						| "StatusPresence"
						| "ProfileContent"
						| "ProfileBackground"
				  )[];
			status?: null | {
				presence?: null | "Online" | "Idle" | "Focus" | "Busy" | "Invisible";
				text?: null | string;
			};
		}): Promise<void>;
		fetchMutual(): Promise<{
			servers: string[];
			users: string[];
		}>;
		fetchProfile(): Promise<{
			background?: null | {
				_id: string;
				content_type: string;
				deleted?: null | boolean;
				filename: string;
				message_id?: null | string;
				metadata:
					| {
							type: "File";
					  }
					| {
							type: "Text";
					  }
					| {
							height: number;
							type: "Image";
							width: number;
					  }
					| {
							height: number;
							type: "Video";
							width: number;
					  }
					| {
							type: "Audio";
					  };
				object_id?: null | string;
				reported?: null | boolean;
				server_id?: null | string;
				size: number;
				tag: string;
				user_id?: null | string;
			};
			content?: null | string;
		}>;
		openDM(): Promise<Channel>;
		removeFriend(): Promise<void>;
		statusMessage(
			translate?: (
				presence: "Online" | "Idle" | "Focus" | "Busy" | "Invisible"
			) => string
		): undefined | string;
		toString(): string;
		unblockUser(): Promise<void>;
	}

	export class File {
		constructor();
		contentType: string;
		filename: string;
		id: string;
		metadata:
			| {
					type: "File";
			  }
			| {
					type: "Text";
			  }
			| {
					height: number;
					type: "Image";
					width: number;
			  }
			| {
					height: number;
					type: "Video";
					width: number;
			  }
			| {
					type: "Audio";
			  };
		size: number;
		tag: string;
		get downloadURL(): string;
		get humanReadableSize(): string;
		get isSpoiler(): boolean;
		get url(): string;
		createFileURL(
			options?: {
				height?: number;
				max_side?: number;
				size?: number;
				width?: number;
			},
			allowAnimation?: boolean
		): undefined | string;
	}

	export class Channel {
		constructor();
		id: string;
		get active(): boolean;
		get animatedIconURL(): undefined | string;
		get createdAt(): Date;
		get defaultPermissions():
			| undefined
			| {
					a: number;
					d: number;
			  };
		get description(): undefined | string;
		get displayName(): undefined | string;
		get icon(): undefined | File;
		get iconURL(): undefined | string;
		get lastMessage(): undefined | Message;
		get lastMessageAt(): undefined | Date;
		get lastMessageId(): undefined | string;
		get mature(): boolean;
		get mentions(): undefined | Set<string>;
		get name(): string;
		get owner(): undefined | User;
		get ownerId(): string;
		get path(): string;
		get permission(): number;
		get permissions(): undefined | number;
		get potentiallyRestrictedChannel(): undefined | string | boolean;
		get recipient(): undefined | User;
		get recipientIds(): Set<string>;
		get recipients(): User[];
		get rolePermissions():
			| undefined
			| Record<
					string,
					{
						a: number;
						d: number;
					}
			  >;
		get server(): undefined | Server;
		get serverId(): string;
		get smallIconURL(): undefined | string;
		get type():
			| "SavedMessages"
			| "DirectMessage"
			| "Group"
			| "TextChannel"
			| "VoiceChannel";
		get typing(): User[];
		get typingIds(): Set<string>;
		get unread(): boolean;
		get updatedAt(): Date;
		get url(): string;
		get user(): undefined | User;
		get userId(): string;
		ack(message?: string | Message, skipRateLimiter?: boolean): Promise<void>;
		addMember(user_id: string): Promise<undefined>;
		createInvite(): Promise<
			| {
					_id: string;
					channel: string;
					creator: string;
					server: string;
					type: "Server";
			  }
			| {
					_id: string;
					channel: string;
					creator: string;
					type: "Group";
			  }
		>;
		delete(leaveSilently?: boolean): Promise<void>;
		deleteMessages(ids: string[]): Promise<void>;
		edit(data: {
			archived?: null | boolean;
			description?: null | string;
			icon?: null | string;
			name?: null | string;
			nsfw?: null | boolean;
			owner?: null | string;
			remove?: null | ("Description" | "Icon" | "DefaultPermissions")[];
		}): Promise<void>;
		fetchMembers(): Promise<User[]>;
		fetchMessage(messageId: string): Promise<Message>;
		fetchMessages(
			params?: Omit<
				| undefined
				| {
						after?: null | string;
						before?: null | string;
						include_users?: null | boolean;
						limit?: null | number;
						nearby?: null | string;
						sort?: null | "Relevance" | "Latest" | "Oldest";
				  },
				"include_users"
			>
		): Promise<Message[]>;
		fetchMessagesWithUsers(
			params?: Omit<
				| undefined
				| {
						after?: null | string;
						before?: null | string;
						include_users?: null | boolean;
						limit?: null | number;
						nearby?: null | string;
						sort?: null | "Relevance" | "Latest" | "Oldest";
				  },
				"include_users"
			>
		): Promise<{
			members: undefined | ServerMember[];
			messages: Message[];
			users: User[];
		}>;
		havePermission(
			...permission: (
				| "Masquerade"
				| "Video"
				| "ManageChannel"
				| "ManageServer"
				| "ManagePermissions"
				| "ManageRole"
				| "ManageCustomisation"
				| "KickMembers"
				| "BanMembers"
				| "TimeoutMembers"
				| "AssignRoles"
				| "ChangeNickname"
				| "ManageNicknames"
				| "ChangeAvatar"
				| "RemoveAvatars"
				| "ViewChannel"
				| "ReadMessageHistory"
				| "SendMessage"
				| "ManageMessages"
				| "ManageWebhooks"
				| "InviteOthers"
				| "SendEmbeds"
				| "UploadFiles"
				| "React"
				| "Connect"
				| "Speak"
				| "MuteMembers"
				| "DeafenMembers"
				| "MoveMembers"
				| "GrantAllSafe"
			)[]
		): boolean;
		orPermission(
			...permission: (
				| "Masquerade"
				| "Video"
				| "ManageChannel"
				| "ManageServer"
				| "ManagePermissions"
				| "ManageRole"
				| "ManageCustomisation"
				| "KickMembers"
				| "BanMembers"
				| "TimeoutMembers"
				| "AssignRoles"
				| "ChangeNickname"
				| "ManageNicknames"
				| "ChangeAvatar"
				| "RemoveAvatars"
				| "ViewChannel"
				| "ReadMessageHistory"
				| "SendMessage"
				| "ManageMessages"
				| "ManageWebhooks"
				| "InviteOthers"
				| "SendEmbeds"
				| "UploadFiles"
				| "React"
				| "Connect"
				| "Speak"
				| "MuteMembers"
				| "DeafenMembers"
				| "MoveMembers"
				| "GrantAllSafe"
			)[]
		): boolean;
		removeMember(user_id: string): Promise<undefined>;
		search(
			params: Omit<
				{
					after?: null | string;
					before?: null | string;
					include_users?: null | boolean;
					limit?: null | number;
					query: string;
					sort?: "Relevance" | "Latest" | "Oldest";
				},
				"include_users"
			>
		): Promise<Message[]>;
		searchWithUsers(
			params: Omit<
				{
					after?: null | string;
					before?: null | string;
					include_users?: null | boolean;
					limit?: null | number;
					query: string;
					sort?: "Relevance" | "Latest" | "Oldest";
				},
				"include_users"
			>
		): Promise<{
			members: undefined | ServerMember[];
			messages: Message[];
			users: User[];
		}>;
		sendMessage(
			data:
				| string
				| {
						attachments?: null | string[];
						content?: null | string;
						embeds?:
							| null
							| {
									colour?: null | string;
									description?: null | string;
									icon_url?: null | string;
									media?: null | string;
									title?: null | string;
									url?: null | string;
							  }[];
						interactions?: null | {
							reactions?: null | string[];
							restrict_reactions?: boolean;
						};
						masquerade?: null | {
							avatar?: null | string;
							colour?: null | string;
							name?: null | string;
						};
						nonce?: null | string;
						replies?:
							| null
							| {
									id: string;
									mention: boolean;
							  }[];
				  },
			idempotencyKey?: string
		): Promise<Message>;
		setPermissions(
			role_id?: string,
			permissions?: {
				allow: number;
				deny: number;
			}
		): Promise<{
			_id: string;
			analytics?: boolean;
			banner?: null | {
				_id: string;
				content_type: string;
				deleted?: null | boolean;
				filename: string;
				message_id?: null | string;
				metadata:
					| {
							type: "File";
					  }
					| {
							type: "Text";
					  }
					| {
							height: number;
							type: "Image";
							width: number;
					  }
					| {
							height: number;
							type: "Video";
							width: number;
					  }
					| {
							type: "Audio";
					  };
				object_id?: null | string;
				reported?: null | boolean;
				server_id?: null | string;
				size: number;
				tag: string;
				user_id?: null | string;
			};
			categories?:
				| null
				| {
						channels: string[];
						id: string;
						title: string;
				  }[];
			channels: string[];
			default_permissions: number;
			description?: null | string;
			discoverable?: boolean;
			flags?: null | number;
			icon?: null | {
				_id: string;
				content_type: string;
				deleted?: null | boolean;
				filename: string;
				message_id?: null | string;
				metadata:
					| {
							type: "File";
					  }
					| {
							type: "Text";
					  }
					| {
							height: number;
							type: "Image";
							width: number;
					  }
					| {
							height: number;
							type: "Video";
							width: number;
					  }
					| {
							type: "Audio";
					  };
				object_id?: null | string;
				reported?: null | boolean;
				server_id?: null | string;
				size: number;
				tag: string;
				user_id?: null | string;
			};
			name: string;
			nsfw?: boolean;
			owner: string;
			roles?: object;
			system_messages?: null | {
				user_banned?: null | string;
				user_joined?: null | string;
				user_kicked?: null | string;
				user_left?: null | string;
			};
		}>;
		startTyping(): void;
		stopTyping(): void;
		toString(): string;
	}

	export class Message {
		constructor();
		id: string;
		get animatedAvatarURL(): undefined | string;
		get attachments(): undefined | File[];
		get author(): undefined | User;
		get authorId(): undefined | string;
		get avatarURL(): undefined | string;
		get channel(): undefined | Channel;
		get channelId(): string;
		get content(): undefined | string;
		get createdAt(): Date;
		get editedAt(): undefined | Date;
		get embeds(): undefined | MessageEmbed[];
		get interactions():
			| undefined
			| {
					reactions?: null | string[];
					restrict_reactions?: boolean;
			  };
		get masquerade():
			| undefined
			| {
					avatar?: null | string;
					colour?: null | string;
					name?: null | string;
			  };
		get masqueradeAvatarURL(): undefined | string;
		get member(): undefined | ServerMember;
		get mentionIds(): undefined | string[];
		get nonce(): undefined | string;
		get path(): string;
		get reactions(): Map<string, Set<string>>;
		get replyIds(): undefined | string[];
		get roleColour(): undefined | null | string;
		get server(): undefined | Server;
		get systemMessage(): undefined | SystemMessage;
		get url(): string;
		get username(): undefined | string;
		ack(): void;
		clearReactions(): Promise<undefined>;
		delete(): Promise<undefined>;
		edit(data: {
			content?: null | string;
			embeds?:
				| null
				| {
						colour?: null | string;
						description?: null | string;
						icon_url?: null | string;
						media?: null | string;
						title?: null | string;
						url?: null | string;
				  }[];
		}): Promise<{
			_id: string;
			attachments?:
				| null
				| {
						_id: string;
						content_type: string;
						deleted?: null | boolean;
						filename: string;
						message_id?: null | string;
						metadata:
							| {
									type: "File";
							  }
							| {
									type: "Text";
							  }
							| {
									height: number;
									type: "Image";
									width: number;
							  }
							| {
									height: number;
									type: "Video";
									width: number;
							  }
							| {
									type: "Audio";
							  };
						object_id?: null | string;
						reported?: null | boolean;
						server_id?: null | string;
						size: number;
						tag: string;
						user_id?: null | string;
				  }[];
			author: string;
			channel: string;
			content?: null | string;
			edited?: null | string;
			embeds?:
				| null
				| (
						| {
								colour?: null | string;
								description?: null | string;
								icon_url?: null | string;
								image?: null | {
									height: number;
									size: "Large" | "Preview";
									url: string;
									width: number;
								};
								original_url?: null | string;
								site_name?: null | string;
								special?:
									| null
									| {
											type: "None";
									  }
									| {
											type: "GIF";
									  }
									| {
											id: string;
											timestamp?: null | string;
											type: "YouTube";
									  }
									| {
											content_type: "Channel";
											id: string;
											type: "Lightspeed";
									  }
									| {
											content_type: "Channel" | "Video" | "Clip";
											id: string;
											type: "Twitch";
									  }
									| {
											content_type: string;
											id: string;
											type: "Spotify";
									  }
									| {
											type: "Soundcloud";
									  }
									| {
											content_type: "Album" | "Track";
											id: string;
											type: "Bandcamp";
									  }
									| {
											id: string;
											type: "Streamable";
									  };
								title?: null | string;
								type: "Website";
								url?: null | string;
								video?: null | {
									height: number;
									url: string;
									width: number;
								};
						  }
						| {
								height: number;
								size: "Large" | "Preview";
								type: "Image";
								url: string;
								width: number;
						  }
						| {
								height: number;
								type: "Video";
								url: string;
								width: number;
						  }
						| {
								colour?: null | string;
								description?: null | string;
								icon_url?: null | string;
								media?: null | {
									_id: string;
									content_type: string;
									deleted?: null | boolean;
									filename: string;
									message_id?: null | string;
									metadata:
										| {
												type: "File";
										  }
										| {
												type: "Text";
										  }
										| {
												height: number;
												type: "Image";
												width: number;
										  }
										| {
												height: number;
												type: "Video";
												width: number;
										  }
										| {
												type: "Audio";
										  };
									object_id?: null | string;
									reported?: null | boolean;
									server_id?: null | string;
									size: number;
									tag: string;
									user_id?: null | string;
								};
								title?: null | string;
								type: "Text";
								url?: null | string;
						  }
						| {
								type: "None";
						  }
				  )[];
			interactions?: {
				reactions?: null | string[];
				restrict_reactions?: boolean;
			};
			masquerade?: null | {
				avatar?: null | string;
				colour?: null | string;
				name?: null | string;
			};
			mentions?: null | string[];
			nonce?: null | string;
			reactions?: {
				[key: string]: string[];
			};
			replies?: null | string[];
			system?:
				| null
				| {
						content: string;
						type: "text";
				  }
				| {
						by: string;
						id: string;
						type: "user_added";
				  }
				| {
						by: string;
						id: string;
						type: "user_remove";
				  }
				| {
						id: string;
						type: "user_joined";
				  }
				| {
						id: string;
						type: "user_left";
				  }
				| {
						id: string;
						type: "user_kicked";
				  }
				| {
						id: string;
						type: "user_banned";
				  }
				| {
						by: string;
						name: string;
						type: "channel_renamed";
				  }
				| {
						by: string;
						type: "channel_description_changed";
				  }
				| {
						by: string;
						type: "channel_icon_changed";
				  }
				| {
						from: string;
						to: string;
						type: "channel_ownership_changed";
				  };
		}>;
		react(emoji: string): Promise<undefined>;
		reply(
			data:
				| string
				| (Omit<
						{
							attachments?: null | string[];
							content?: null | string;
							embeds?:
								| null
								| {
										colour?: null | string;
										description?: null | string;
										icon_url?: null | string;
										media?: null | string;
										title?: null | string;
										url?: null | string;
								  }[];
							interactions?: null | {
								reactions?: null | string[];
								restrict_reactions?: boolean;
							};
							masquerade?: null | {
								avatar?: null | string;
								colour?: null | string;
								name?: null | string;
							};
							nonce?: null | string;
							replies?:
								| null
								| {
										id: string;
										mention: boolean;
								  }[];
						},
						"nonce"
				  > & {
						nonce?: string;
				  }),
			mention?: boolean
		): undefined | Promise<Message>;
		unreact(emoji: string): Promise<undefined>;
	}

	export class Server {
		constructor();
		id: string;
		get analytics(): boolean;
		get animatedIconURL(): undefined | string;
		get banner(): undefined | File;
		get bannerURL(): undefined | string;
		get categories():
			| undefined
			| {
					channels: string[];
					id: string;
					title: string;
			  }[];
		get channelIds(): Set<string>;
		get channels(): Channel[];
		get createdAt(): Date;
		get defaultChannel(): undefined | Channel;
		get defaultPermissions(): number;
		get description(): undefined | string;
		get discoverable(): boolean;
		get flags(): ServerFlags;
		get icon(): undefined | File;
		get iconURL(): undefined | string;
		get mature(): boolean;
		get member(): undefined | ServerMember;
		get mentions(): string[];
		get name(): string;
		get orderedChannels(): (Omit<
			{
				channels: string[];
				id: string;
				title: string;
			},
			"channels"
		> & {
			channels: Channel[];
		})[];
		get orderedRoles(): {
			colour?: null | string;
			hoist?: boolean;
			id: string;
			name: string;
			permissions: {
				a: number;
				d: number;
			};
			rank?: number;
		}[];
		get owner(): undefined | User;
		get ownerId(): string;
		get permission(): number;
		get roles(): Map<
			string,
			{
				colour?: null | string;
				hoist?: boolean;
				name: string;
				permissions: {
					a: number;
					d: number;
				};
				rank?: number;
			}
		>;
		get systemMessages():
			| undefined
			| {
					user_banned?: null | string;
					user_joined?: null | string;
					user_kicked?: null | string;
					user_left?: null | string;
			  };
		get unread(): undefined | Channel;
		ack(): Promise<void>;
		banUser(
			user: string | User | ServerMember,
			options?: {
				reason?: null | string;
			}
		): Promise<ServerBan>;
		createChannel(data: {
			description?: null | string;
			name: string;
			nsfw?: null | boolean;
			type?: "Text" | "Voice";
		}): Promise<Channel>;
		createEmoji(
			autumnId: string,
			options: Omit<
				{
					name: string;
					nsfw?: boolean;
					parent:
						| {
								id: string;
								type: "Server";
						  }
						| {
								type: "Detached";
						  };
				},
				"parent"
			>
		): Promise<Emoji>;
		createRole(name: string): Promise<{
			id: string;
			role: {
				colour?: null | string;
				hoist?: boolean;
				name: string;
				permissions: {
					a: number;
					d: number;
				};
				rank?: number;
			};
		}>;
		delete(leaveSilently?: boolean): Promise<void>;
		deleteRole(roleId: string): Promise<undefined>;
		edit(data: {
			analytics?: null | boolean;
			banner?: null | string;
			categories?:
				| null
				| {
						channels: string[];
						id: string;
						title: string;
				  }[];
			description?: null | string;
			discoverable?: null | boolean;
			flags?: null | number;
			icon?: null | string;
			name?: null | string;
			remove?:
				| null
				| (
						| "Description"
						| "Icon"
						| "Categories"
						| "SystemMessages"
						| "Banner"
				  )[];
			system_messages?: null | {
				user_banned?: null | string;
				user_joined?: null | string;
				user_kicked?: null | string;
				user_left?: null | string;
			};
		}): Promise<void>;
		editRole(
			roleId: string,
			data: {
				colour?: null | string;
				hoist?: null | boolean;
				name?: null | string;
				rank?: null | number;
				remove?: null | "Colour"[];
			}
		): Promise<{
			colour?: null | string;
			hoist?: boolean;
			name: string;
			permissions: {
				a: number;
				d: number;
			};
			rank?: number;
		}>;
		fetchBans(): Promise<ServerBan[]>;
		fetchEmojis(): Promise<Emoji[]>;
		fetchInvites(): Promise<ChannelInvite[]>;
		fetchMember(user: string | User): Promise<ServerMember>;
		fetchMembers(): Promise<{
			members: ServerMember[];
			users: User[];
		}>;
		havePermission(
			...permission: (
				| "Masquerade"
				| "Video"
				| "ManageChannel"
				| "ManageServer"
				| "ManagePermissions"
				| "ManageRole"
				| "ManageCustomisation"
				| "KickMembers"
				| "BanMembers"
				| "TimeoutMembers"
				| "AssignRoles"
				| "ChangeNickname"
				| "ManageNicknames"
				| "ChangeAvatar"
				| "RemoveAvatars"
				| "ViewChannel"
				| "ReadMessageHistory"
				| "SendMessage"
				| "ManageMessages"
				| "ManageWebhooks"
				| "InviteOthers"
				| "SendEmbeds"
				| "UploadFiles"
				| "React"
				| "Connect"
				| "Speak"
				| "MuteMembers"
				| "DeafenMembers"
				| "MoveMembers"
				| "GrantAllSafe"
			)[]
		): boolean;
		kickUser(user: string | User | ServerMember): Promise<undefined>;
		orPermission(
			...permission: (
				| "Masquerade"
				| "Video"
				| "ManageChannel"
				| "ManageServer"
				| "ManagePermissions"
				| "ManageRole"
				| "ManageCustomisation"
				| "KickMembers"
				| "BanMembers"
				| "TimeoutMembers"
				| "AssignRoles"
				| "ChangeNickname"
				| "ManageNicknames"
				| "ChangeAvatar"
				| "RemoveAvatars"
				| "ViewChannel"
				| "ReadMessageHistory"
				| "SendMessage"
				| "ManageMessages"
				| "ManageWebhooks"
				| "InviteOthers"
				| "SendEmbeds"
				| "UploadFiles"
				| "React"
				| "Connect"
				| "Speak"
				| "MuteMembers"
				| "DeafenMembers"
				| "MoveMembers"
				| "GrantAllSafe"
			)[]
		): boolean;
		resetSyncStatus(): void;
		setPermissions(
			roleId?: string,
			permissions?:
				| number
				| {
						allow: number;
						deny: number;
				  }
		): Promise<{
			_id: string;
			analytics?: boolean;
			banner?: null | {
				_id: string;
				content_type: string;
				deleted?: null | boolean;
				filename: string;
				message_id?: null | string;
				metadata:
					| {
							type: "File";
					  }
					| {
							type: "Text";
					  }
					| {
							height: number;
							type: "Image";
							width: number;
					  }
					| {
							height: number;
							type: "Video";
							width: number;
					  }
					| {
							type: "Audio";
					  };
				object_id?: null | string;
				reported?: null | boolean;
				server_id?: null | string;
				size: number;
				tag: string;
				user_id?: null | string;
			};
			categories?:
				| null
				| {
						channels: string[];
						id: string;
						title: string;
				  }[];
			channels: string[];
			default_permissions: number;
			description?: null | string;
			discoverable?: boolean;
			flags?: null | number;
			icon?: null | {
				_id: string;
				content_type: string;
				deleted?: null | boolean;
				filename: string;
				message_id?: null | string;
				metadata:
					| {
							type: "File";
					  }
					| {
							type: "Text";
					  }
					| {
							height: number;
							type: "Image";
							width: number;
					  }
					| {
							height: number;
							type: "Video";
							width: number;
					  }
					| {
							type: "Audio";
					  };
				object_id?: null | string;
				reported?: null | boolean;
				server_id?: null | string;
				size: number;
				tag: string;
				user_id?: null | string;
			};
			name: string;
			nsfw?: boolean;
			owner: string;
			system_messages?: null | {
				user_banned?: null | string;
				user_joined?: null | string;
				user_kicked?: null | string;
				user_left?: null | string;
			};
		}>;
		syncMembers(excludeOffline?: boolean): Promise<void>;
		toString(): string;
		unbanUser(user: string | User): Promise<undefined>;
	}

	export class ServerMember {
		constructor();
		id: string;
		get animatedAvatarURL(): undefined | string;
		get avatar(): undefined | File;
		get avatarURL(): undefined | string;
		get hoistedRole(): null | {
			colour?: null | string;
			hoist?: boolean;
			id: string;
			name?: string;
			permissions?: {
				a: number;
				d: number;
			};
			rank?: number;
		};
		get joinedAt(): Date;
		get nickname(): undefined | string;
		get orderedRoles(): {
			colour?: null | string;
			hoist?: boolean;
			id: string;
			name?: string;
			permissions?: {
				a: number;
				d: number;
			};
			rank?: number;
		}[];
		get ranking(): number;
		get roleColour(): undefined | null | string;
		get roles(): string[];
		get server(): undefined | Server;
		get timeout(): undefined | Date;
		get user(): undefined | User;
		get username(): undefined | string;
		ban(options: { reason?: null | string }): Promise<void>;
		edit(data: {
			avatar?: null | string;
			nickname?: null | string;
			remove?: null | ("Nickname" | "Avatar" | "Roles" | "Timeout")[];
			roles?: null | string[];
			timeout?: null | string;
		}): Promise<void>;
		getPermissions(target: Channel | Server): number;
		hasPermission(
			target: Channel | Server,
			...permission: (
				| "Masquerade"
				| "Video"
				| "ManageChannel"
				| "ManageServer"
				| "ManagePermissions"
				| "ManageRole"
				| "ManageCustomisation"
				| "KickMembers"
				| "BanMembers"
				| "TimeoutMembers"
				| "AssignRoles"
				| "ChangeNickname"
				| "ManageNicknames"
				| "ChangeAvatar"
				| "RemoveAvatars"
				| "ViewChannel"
				| "ReadMessageHistory"
				| "SendMessage"
				| "ManageMessages"
				| "ManageWebhooks"
				| "InviteOthers"
				| "SendEmbeds"
				| "UploadFiles"
				| "React"
				| "Connect"
				| "Speak"
				| "MuteMembers"
				| "DeafenMembers"
				| "MoveMembers"
				| "GrantAllSafe"
			)[]
		): boolean;
		inferiorTo(target: ServerMember): boolean;
		kick(): Promise<void>;
		toString(): string;
	}

	export class MessageEmbed {
		constructor(
			client?: Client,
			type?: "None" | "Website" | "Image" | "Video" | "Text"
		);
		client?: Client;
		type: "None" | "Website" | "Image" | "Video" | "Text";
		from(
			client: Client,
			embed:
				| {
						colour?: null | string;
						description?: null | string;
						icon_url?: null | string;
						image?: null | {
							height: number;
							size: "Large" | "Preview";
							url: string;
							width: number;
						};
						original_url?: null | string;
						site_name?: null | string;
						special?:
							| null
							| {
									type: "None";
							  }
							| {
									type: "GIF";
							  }
							| {
									id: string;
									timestamp?: null | string;
									type: "YouTube";
							  }
							| {
									content_type: "Channel";
									id: string;
									type: "Lightspeed";
							  }
							| {
									content_type: "Channel" | "Video" | "Clip";
									id: string;
									type: "Twitch";
							  }
							| {
									content_type: string;
									id: string;
									type: "Spotify";
							  }
							| {
									type: "Soundcloud";
							  }
							| {
									content_type: "Album" | "Track";
									id: string;
									type: "Bandcamp";
							  }
							| {
									id: string;
									type: "Streamable";
							  };
						title?: null | string;
						type: "Website";
						url?: null | string;
						video?: null | {
							height: number;
							url: string;
							width: number;
						};
				  }
				| {
						height: number;
						size: "Large" | "Preview";
						type: "Image";
						url: string;
						width: number;
				  }
				| {
						height: number;
						type: "Video";
						url: string;
						width: number;
				  }
				| {
						colour?: null | string;
						description?: null | string;
						icon_url?: null | string;
						media?: null | {
							_id: string;
							content_type: string;
							deleted?: null | boolean;
							filename: string;
							message_id?: null | string;
							metadata:
								| {
										type: "File";
								  }
								| {
										type: "Text";
								  }
								| {
										height: number;
										type: "Image";
										width: number;
								  }
								| {
										height: number;
										type: "Video";
										width: number;
								  }
								| {
										type: "Audio";
								  };
							object_id?: null | string;
							reported?: null | boolean;
							server_id?: null | string;
							size: number;
							tag: string;
							user_id?: null | string;
						};
						title?: null | string;
						type: "Text";
						url?: null | string;
				  }
				| {
						type: "None";
				  }
		): MessageEmbed;
	}

	export class SystemMessage {
		constructor(
			client: Client,
			type:
				| "text"
				| "user_added"
				| "user_remove"
				| "user_joined"
				| "user_left"
				| "user_kicked"
				| "user_banned"
				| "channel_renamed"
				| "channel_description_changed"
				| "channel_icon_changed"
				| "channel_ownership_changed"
		);
		client?: Client;
		type:
			| "text"
			| "user_added"
			| "user_remove"
			| "user_joined"
			| "user_left"
			| "user_kicked"
			| "user_banned"
			| "channel_renamed"
			| "channel_description_changed"
			| "channel_icon_changed"
			| "channel_ownership_changed";
		from(
			client: Client,
			message:
				| {
						content: string;
						type: "text";
				  }
				| {
						by: string;
						id: string;
						type: "user_added";
				  }
				| {
						by: string;
						id: string;
						type: "user_remove";
				  }
				| {
						id: string;
						type: "user_joined";
				  }
				| {
						id: string;
						type: "user_left";
				  }
				| {
						id: string;
						type: "user_kicked";
				  }
				| {
						id: string;
						type: "user_banned";
				  }
				| {
						by: string;
						name: string;
						type: "channel_renamed";
				  }
				| {
						by: string;
						type: "channel_description_changed";
				  }
				| {
						by: string;
						type: "channel_icon_changed";
				  }
				| {
						from: string;
						to: string;
						type: "channel_ownership_changed";
				  }
		): SystemMessage;
	}

	export class ServerBan {
		constructor(
			client: Client,
			data: {
				_id: {
					server: string;
					user: string;
				};
				reason?: null | string;
			}
		);
		client: Client;
		id: {
			server: string;
			user: string;
		};
		reason?: string;
		get server(): undefined | Server;
		get user(): undefined | User;
		pardon(): Promise<void>;
	}

	export class Emoji {
		constructor();
		id: string;
		get animated(): boolean;
		get createdAt(): Date;
		get creator(): undefined | User;
		get mature(): boolean;
		get name(): string;
		get parent():
			| {
					id: string;
					type: "Server";
			  }
			| {
					type: "Detached";
			  };
		delete(): Promise<void>;
		toString(): string;
	}

	export class ChannelInvite {
		constructor(client?: Client, type?: "Server" | "None" | "Group");
		client?: Client;
		type: "Server" | "None" | "Group";
		from(
			client: Client,
			invite:
				| {
						_id: string;
						channel: string;
						creator: string;
						server: string;
						type: "Server";
				  }
				| {
						_id: string;
						channel: string;
						creator: string;
						type: "Group";
				  }
		): ChannelInvite;
	}

	export class ServerCollection {
		constructor();
		client: Client;
		create(
			id: string,
			type:
				| "channel"
				| "user"
				| "server"
				| "bot"
				| "channelUnread"
				| "emoji"
				| "message"
				| "serverMember"
				| "session",
			instance: Server,
			context: unknown,
			data?: unknown
		): void;
		createServer(data: {
			description?: null | string;
			name: string;
			nsfw?: null | boolean;
		}): Promise<Server>;
		delete(id: string): void;
		entries(): IterableIterator<[string, Server]>;
		fetch(id: string): Promise<Server>;
		filter(predicate: (value: Server, key: string) => boolean): Server[];
		find(
			predicate: (value: Server, key: string) => boolean
		): undefined | Server;
		forEach(
			cb: (value: Server, key: string, map: Map<string, Server>) => void
		): void;
		get(id: string): undefined | Server;
		getOrCreate(
			id: string,
			data: {
				_id: string;
				analytics?: boolean;
				banner?: null | {
					_id: string;
					content_type: string;
					deleted?: null | boolean;
					filename: string;
					message_id?: null | string;
					metadata:
						| {
								type: "File";
						  }
						| {
								type: "Text";
						  }
						| {
								height: number;
								type: "Image";
								width: number;
						  }
						| {
								height: number;
								type: "Video";
								width: number;
						  }
						| {
								type: "Audio";
						  };
					object_id?: null | string;
					reported?: null | boolean;
					server_id?: null | string;
					size: number;
					tag: string;
					user_id?: null | string;
				};
				categories?:
					| null
					| {
							channels: string[];
							id: string;
							title: string;
					  }[];
				channels: string[];
				default_permissions: number;
				description?: null | string;
				discoverable?: boolean;
				flags?: null | number;
				icon?: null | {
					_id: string;
					content_type: string;
					deleted?: null | boolean;
					filename: string;
					message_id?: null | string;
					metadata:
						| {
								type: "File";
						  }
						| {
								type: "Text";
						  }
						| {
								height: number;
								type: "Image";
								width: number;
						  }
						| {
								height: number;
								type: "Video";
								width: number;
						  }
						| {
								type: "Audio";
						  };
					object_id?: null | string;
					reported?: null | boolean;
					server_id?: null | string;
					size: number;
					tag: string;
					user_id?: null | string;
				};
				name: string;
				nsfw?: boolean;
				owner: string;
				system_messages?: null | {
					user_banned?: null | string;
					user_joined?: null | string;
					user_kicked?: null | string;
					user_left?: null | string;
				};
			},
			isNew?: boolean
		): Server;
		getOrPartial(id: string): undefined | Server;
		has(id: string): boolean;
		isPartial(id: string): boolean;
		keys(): IterableIterator<string>;
		map<O>(cb: (value: Server, key: string) => O): O[];
		size(): number;
		toList(): Server[];
		values(): IterableIterator<Server>;
	}

	enum UserBadges {
		ActiveSupporter = 64,
		Developer = 1,
		EarlyAdopter = 256,
		Founder = 16,
		Paw = 128,
		PlatformModeration = 32,
		ReservedRelevantJokeBadge1 = 512,
		ReservedRelevantJokeBadge2 = 1024,
		ResponsibleDisclosure = 8,
		Supporter = 4,
		Translator = 2,
	}

	enum UserFlags {
		Banned = 4,
		Deleted = 2,
		Suspended = 1,
	}

	enum ServerFlags {
		Official = 1,
		Verified = 2,
	}

	export default Client;
}
