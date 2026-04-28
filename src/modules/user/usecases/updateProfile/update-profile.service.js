import { UserAlreadyExistsError, UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class UpdateProfileService {
  constructor({ userRepo, assetService }) {
    this.userRepo = userRepo;
    this.assetService = assetService;
  }

  async execute({ userId, name, email, avatar, avatarFile }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();

    const nextEmail = email?.trim()?.toLowerCase();
    if (nextEmail && nextEmail !== user.email) {
      const emailOwner = await this.userRepo.findByEmail(nextEmail);
      if (emailOwner && emailOwner.id !== userId) {
        throw new UserAlreadyExistsError("Este email já está a ser usado por outro utilizador.");
      }
    }

    let avatarPayload = {};
    let previousAvatarAsset = null;
    if (avatarFile) {
      const uploadedAvatar = await this.assetService.uploadAvatar({
        userId,
        file: avatarFile,
      });

      previousAvatarAsset = user.avatarAsset;
      avatarPayload = {
        avatar: uploadedAvatar.secureUrl,
        avatarAsset: uploadedAvatar,
      };
    } else if (avatar) {
      avatarPayload = { avatar };
    }

    const updatedUser = await this.userRepo.update(userId, {
      ...(name ? { name } : {}),
      ...(nextEmail ? { email: nextEmail } : {}),
      ...avatarPayload,
    });

    if (previousAvatarAsset?.publicId) {
      await this.assetService.deleteAsset({
        publicId: previousAvatarAsset.publicId,
        resourceType: previousAvatarAsset.resourceType || "image",
      });
    }

    updatedUser.password = undefined;
    return updatedUser;
  }
}
