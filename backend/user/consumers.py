from channels.generic.websocket import AsyncWebsocketConsumer


class UserChannelConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        user = self.scope['user']
        if not user:
            await self.close(code=4000)

        self.room_group_name = f'user_{user.clerk_id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, code):
        return await super().disconnect(code)
