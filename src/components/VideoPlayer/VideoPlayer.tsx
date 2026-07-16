'use client';

import { createPlayer } from "@videojs/react";
import {
  Video,
  videoFeatures,
  VideoProps,
  VideoSkin
} from "@videojs/react/video"

import cls from "./VideoPlayer.module.scss"

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
}

const Player = createPlayer({
  features: videoFeatures,
})

export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = false, 
  muted = false
}: VideoPlayerProps) {

  const rootClassName = [cls.root, cls].filter(Boolean).join(" ")

  return (
    <div className={rootClassName}>
      <Player.Provider>
        <VideoSkin>
          <Video 
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            playsInline
            preload="metadata"
          />
        </VideoSkin>
      </Player.Provider>
    </div>
  )

}

