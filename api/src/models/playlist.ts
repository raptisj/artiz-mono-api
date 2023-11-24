import { Schema, model, Types } from "mongoose";

const playlistSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    song_ids: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    title: {
      type: String,
      required: [true, "Playlist must contain a title"],
    },
    description: {
      type: String,
    },
    song_count: {
      type: Number,
      required: true,
    },
    total_track_duration_in_seconds: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    methods: {
      existsInPlaylist(song_id: Types.ObjectId) {
        return this.song_ids.includes(song_id);
      },
    },
    virtuals: {
      total_track_duration: {
        get: function () {
          const hours = Math.floor(this.total_track_duration_in_seconds / 3600);
          const minutes = Math.floor((this.total_track_duration_in_seconds % 3600) / 60);

          return !hours ? `${minutes} min` : `${hours} hr ${minutes} min`;
        },
      },
    },
  }
);

playlistSchema.set("toObject", { virtuals: true });
playlistSchema.set("toJSON", { virtuals: true });

const playlstModel = model("Playlist", playlistSchema);
export default playlstModel;
