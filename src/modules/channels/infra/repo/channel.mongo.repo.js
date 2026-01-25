import IChannelRepository from "../../domain/interface/channel.interface";
import ChannelMapper from "../mappers";
import Channel from "../models/channel.model";

export default class ChannelRepositoryMongo extends IChannelRepository {
  async create(channelEntity) {
    const data = ChannelMapper.toPersistence(channelEntity);
    const doc = await Channel.create(data);

    return ChannelMapper.toEntity(doc);
  }

  async findById(id) {
    const doc = await Channel.findById(id).exec();
    return ChannelMapper.toEntity(doc);
  }
  async findByTeamIds(ids) {
    const docs = await Channel.find({ teamId: { $in: ids } }).exec();
    return docs.map(ChannelMapper.toEntity);
  }

  async findByTeam(teamId) {
    const docs = await Channel.find({
      teamId,
      isArchived: false,
    }).sort({ createdAt: 1 });

    return docs.map(ChannelMapper.toEntity);
  }

  async findByNameAndTeam(name, teamId) {
    const doc = await Channel.findOne({
      name,
      teamId,
      isArchived: false,
    }).exec();

    return ChannelMapper.toEntity(doc);
  }

  async archive(id) {
    const doc = await Channel.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true },
    ).exec();

    return ChannelMapper.toEntity(doc);
  }

  async update(id, updateData) {
    const doc = await Channel.findByIdAndUpdate(
      id,
      { lastMessage: { ...updateData } },
      {
        new: true,
      },
    );
    return ChannelMapper.toEntity(doc);
  }
}
