import {
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  Guild,
  PermissionsBitField,
} from 'discord.js';

const sendMessage = (
  tradeId: string,
  poke1: string,
  poke2: string,
  user1: string,
  user2: string,
) => {
  // Create a new client instance
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  // When the client is ready, run this code (only once)
  // We use 'c' for the event parameter to keep it separate from the already defined 'client'
  client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID!) as Guild;
    const role = await guild.roles.create({
      name: `trade-${tradeId}`,
      color: '#f1c40f',
      mentionable: true,
    });
    // eslint-disable-next-line
    (await guild.members.fetch(user1))?.roles.add(role.id);
    // eslint-disable-next-line
    (await guild.members.fetch(user2))?.roles.add(role.id);

    const channel = await guild.channels.create({
      name: `trade-${role.id}`,
      type: ChannelType.GuildText,
      parent: '1066949396551446558',
      permissionOverwrites: [
        {
          id: '1066922281038774316',
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
        {
          id: role.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
        {
          id: guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });
    channel.send(
      `Hey ${role}, your trade for ${poke1} and ${poke2} was accepted! Please complete the trade when you can and then mark the trade as complete on the website.`,
    );
  });

  // Log in to Discord with your client's token
  client.login(process.env.DISCORD_BOT_TOKEN);
};

export default sendMessage;
