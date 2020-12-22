import env from "@/env"
import Command from "@core/Contracts/Command"
import * as embed from "@/Core/Misc/Embeds"
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
    const punishmentChannel = textChannels.get(env.PUNISHMENT_CHAT)

    if (!punishmentChannel) {
      await send("Canal de punições não encontrado")
      return
    }

    const [userToMute] = getMentionedUsers()

    await userToMute.roles.add(env.MUTED_ROLE)

    const muteReason = args.join(" ").trim()

    const infoEmbed = embed
      .info()
      .setTitle("``🚔`` » Punição")
      .addField("``👤`` **Usuário mutado:**", userToMute.user)
      .addField("``👮`` **Mutado por:**", user.name)
      .addField("``📄`` **Tipo:**", "Mute")
      .addField("``📣`` **Motivo:**", muteReason)

    if (userToMute.user.avatar) {
      infoEmbed.setThumbnail(userToMute.user.avatar)
    }

    await Promise.all([
      send(
        embed
          .success()
          .setTitle("``✅`` Usuário mutado com sucesso.")
          .addField("**Motivo: **", muteReason)
      ),
      userToMute.send("Você foi mutado, mais informações abaixo.", infoEmbed),
      punishmentChannel.send(infoEmbed),
    ])
  },
})
export default command
