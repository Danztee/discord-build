"use client";

import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import { Profile } from "@prisma/client";
import { Track } from "livekit-client";

type MediaRoomProps = {
  chatId: string;
  video: boolean;
  audio: boolean;
  profile: Profile;
};

const MediaRoom: React.FC<MediaRoomProps> = ({
  chatId,
  video,
  audio,
  profile,
}) => {
  const user = profile;

  const [token, setToken] = useState("");

  useEffect(() => {
    const name = user.username;

    (async () => {
      try {
        const resp = await fetch(
          `/api/live-kit?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [chatId, user.username]);

  if (token === "") {
    return (
      <div className="flex fle-xol flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-400">loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
};

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

export default MediaRoom;
