import env from "@/env"
import { MessageEmbed } from "discord.js"

import Command from "@core/Contracts/Command"
import * as yup from "yup"

const command = Command({
  description: "Muta um usuário",
  permissions: ["BAN_MEMBERS"],
  help: ":x: Como usar: `!mute <nick> <motivo>`",
  validate: ({ args, hasMentionedUsers }) =>
    yup
      .array()
      .min(2)
      .required()
      .test(hasMentionedUsers)
      .isValid(args),
  run: async ({ args, send, user, getMentionedUsers, textChannels }) => {
    const [userToMute] = getMentionedUsers()

    await userToMute.roles.add(env.MUTED_ROLE)

    const muteReason = args.join(" ").trim()

    const infoEmbed = new MessageEmbed()
      .setTitle("``🚔`` » Punição")
      .addField("``👤`` **Usuário mutado:**", userToMute.user, true)
      .addField("``👮`` **Mutado por:**", user.name(), true)
      .addField("``📄`` **Tipo:**", "Mute", true)
      .addField("``📣`` **Motivo:**", muteReason, true)
      .setThumbnail(userToMute.user.avatar!)
      .setColor("#8146DC")
      .setFooter(
        "2019 © He4rt Developers",
        "https://heartdevs.com/wp-content/uploads/2018/12/logo.png"
      )
      .setTimestamp()

    await send(
      new MessageEmbed()
        .setTitle("``✅`` Usuário mutado com sucesso.")
        .addField("**Motivo: **", muteReason, true)
    )

    await Promise.all([
      userToMute.send("Você foi mutado, mais informações abaixo.", infoEmbed),
      textChannels.get(env.PUNISHMENT_CHAT)!.send(infoEmbed),
    ])
  },
})
export default command
