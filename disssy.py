import discord

client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

    if message.content.startswith("!Fuck"):
        await message.channel.send("BRUHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
client.run('NzIxNDUxMjAwMTI1NDY4ODEz.XvJ8hg.6ZqehpVHHctav72w7q3kFF3TlTA')