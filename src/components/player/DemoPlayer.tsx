"use client";

import { useRef, useState } from "react";
import {
  FullscreenIcon,
  PauseIcon,
  PlayIcon,
  VolumeIcon,
  VolumeMutedIcon,
} from "@/components/ui/Icons";
import styles from "./DemoPlayer.module.scss";

type Labels = {
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  fullscreen: string;
};

export function DemoPlayer({
  poster,
  labels,
}: {
  poster: string;
  labels: Labels;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  function seek(event: React.MouseEvent<HTMLButtonElement>) {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    video.currentTime =
      ((event.clientX - rect.left) / rect.width) * video.duration;
  }

  function toggleMuted() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div
      ref={wrapRef}
      className={`${styles.player} ${playing ? styles.playing : ""}`}
    >
      <video
        ref={videoRef}
        preload="metadata"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) =>
          setProgress(
            event.currentTarget.duration
              ? (event.currentTarget.currentTime /
                  event.currentTarget.duration) *
                  100
              : 0,
          )
        }
      >
        <source
          src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
          type="video/mp4"
        />
      </video>
      <button
        className={styles.center}
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? labels.pause : labels.play}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className={styles.bar}>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? labels.pause : labels.play}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={styles.progress}
          type="button"
          onClick={seek}
          aria-label={labels.play}
        >
          <span style={{ width: `${progress}%` }} />
        </button>
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? labels.unmute : labels.mute}
        >
          {muted ? <VolumeMutedIcon /> : <VolumeIcon />}
        </button>
        <button
          type="button"
          onClick={() => void wrapRef.current?.requestFullscreen()}
          aria-label={labels.fullscreen}
        >
          <FullscreenIcon />
        </button>
      </div>
    </div>
  );
}
