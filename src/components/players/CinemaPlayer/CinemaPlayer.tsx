
import { CinemaPlayerLabels, CinemaPlayerProps } from "@/types/content"
import cls from "./CinemaPlayer.module.scss"
import { BufferingIndicator, CaptionsButton, Controls, createPlayer, FullscreenButton, Gesture, Hotkey, MuteButton, PiPButton, PlaybackRateButton, PlayButton, Poster, SeekButton, SeekIndicator, StatusAnnouncer, StatusIndicator, Time, TimeSlider, videoFeatures, VolumeSlider } from "@videojs/react";
import { Video } from "@videojs/react/video";
import { CaptionsOffIcon, CaptionsOnIcon, FullscreenEnterIcon, FullscreenExitIcon, PauseIcon, PipEnterIcon, RestartIcon, SeekIcon, SpinnerIcon, VolumeHighIcon, VolumeLowIcon, VolumeOffIcon } from "@videojs/react/icons/minimal";
import { PlayIcon } from "@/components/ui/Icons";
import { PipExitIcon } from "@videojs/react/icons";


const Player = createPlayer({ features: videoFeatures });
const SEEK_SECONDS = 10;
const CENTER_STATUS_ACTIONS = ['togglePaused'] as const;

const DEFAULT_LABELS: CinemaPlayerLabels = {
  player: 'Cinema video player',
  controls: 'Cinema playback controls',
  playPause: 'Play or pause',
  seekBackward: 'Seek backward 10 seconds',
  seekForward: 'Seek forward 10 seconds',
  mute: 'Mute or unmute',
  captions: 'Toggle captions',
  playbackRate: 'Change playback rate',
  pictureInPicture: 'Toggle picture in picture',
  fullscreen: 'Toggle fullscreen',
  timeline: 'Seek through video',
  volume: 'Volume',
};

function formatRate(rate: number): string {
  return new Intl.NumberFormat('en', {
    maximumFractionDigits: 2,
  }).format(rate);
}

export function CinemaPlayer({
  src,
  poster,
  posterAlt = 'Cinema video preview',
  title,
  autoPlay = false,
  badge = "4k",
  captions = [],
  eyebrow,
  className,
  labels: labelsOverride,
  muted = false
}: CinemaPlayerProps) {

  const labels = { ...DEFAULT_LABELS, ...labelsOverride };
  const rootClassName = [cls.root, className].filter(Boolean).join(" ");

  return (
    <Player.Provider>
      <Player.Container
        className={rootClassName}
        aria-label={labels.player}
        tabIndex={0}
        onKeyDownCapture={(event) => {
          console.log({
            key: event.key,
            code: event.code,
            activeElement: document.activeElement,
          });
        }}>
        <Video
          className={cls.video}
          src={src}
          autoPlay={autoPlay}
          muted={muted}
          playsInline
          preload="metadata"
        >
          {
            captions.map((track) =>
              <track
                key={`${track.srcLang}-${track.label}`}
                kind="captions"
                src={track.src}
                srcLang={track.srcLang}
                label={track.label}
                default={track.default}
              />
            )
          }
        </Video>

        {poster && (
          <Poster className={cls.poster} src={poster} alt={posterAlt} />
        )}

        <div className={cls.topScrim} aria-hidden="true" />
        <div className={cls.bottomScrim} aria-hidden="true" />

        <div className={cls.metadata} aria-hidden="true">
          <div>
            {eyebrow && <p className={cls.eyebrow}>{eyebrow}</p>}
            <p className={cls.title}>{title}</p>
          </div>
          {badge && <span className={cls.badge}>{badge}</span>}
        </div>

        <BufferingIndicator
          render={(props) => (
            <div {...props} className={cls.buffering}>
              <SpinnerIcon className={cls.spinnerIcon} />
            </div>
          )}
        />

        <PlayButton
          className={`${cls.centerPlayButton} ${cls.playStateButton}`}
          label={labels.playPause}
        >
          <PlayIcon className={cls.playIcon} />
          <PauseIcon className={cls.pauseIcon} />
          <RestartIcon className={cls.restartIcon} />
        </PlayButton>

        <Controls.Root className={cls.controls}>
          <Controls.Group
            className={cls.controlsPanel}
            aria-label={labels.controls}
          >
            <TimeSlider.Root
              className={cls.timeSlider}
              label={labels.timeline}
            >
              <TimeSlider.Track className={cls.timeTrack}>
                <TimeSlider.Buffer className={cls.timeBuffer} />
                <TimeSlider.Fill className={cls.timeFill} />
              </TimeSlider.Track>
              <TimeSlider.Thumb className={cls.timeThumb} />
              <TimeSlider.Preview className={cls.timePreview}>
                <TimeSlider.Value
                  type="pointer"
                  className={cls.timePreviewValue}
                />
              </TimeSlider.Preview>
            </TimeSlider.Root>

            <div className={cls.bottomBar}>
              <div className={cls.leftControls}>
                <PlayButton className={`${cls.iconButton} ${cls.playStateButton}`}
                  label={labels.playPause}>
                  <PlayIcon className={cls.playIcon} />
                  <PauseIcon className={cls.pauseIcon} />
                  <RestartIcon className={cls.restartIcon} />
                </PlayButton>
                <SeekButton
                  seconds={-SEEK_SECONDS}
                  className={`${cls.iconButton} ${cls.seekButton}`}
                  label={labels.seekBackward}
                >
                  <span className={cls.seekIconWrap}>
                    <SeekIcon
                      className={`${cls.controlIcon} ${cls.seekIconBackward}`}
                    />
                    <span className={cls.seekNumber}>{SEEK_SECONDS}</span>
                  </span>
                </SeekButton>

                <SeekButton
                  seconds={SEEK_SECONDS}
                  className={`${cls.iconButton} ${cls.seekButton}`}
                  label={labels.seekForward}
                >
                  <span className={cls.seekIconWrap}>
                    <SeekIcon className={cls.controlIcon} />
                    <span className={cls.seekNumber}>{SEEK_SECONDS}</span>
                  </span>
                </SeekButton>

                <div className={cls.volumeControl}>
                  <MuteButton className={`${cls.iconButtom} ${cls.muteButton}`} label={labels.mute}>
                    <VolumeOffIcon className={cls.volumeOffIcon} />
                    <VolumeLowIcon className={cls.volumeLowIcon} />
                    <VolumeHighIcon className={cls.volumeHighIcon} />
                  </MuteButton>

                  <VolumeSlider.Root
                    className={cls.volumeSlider}
                    label={labels.volume}
                  >
                    <VolumeSlider.Track className={cls.volumeTrack}>
                      <VolumeSlider.Fill className={cls.volumeFill} />
                    </VolumeSlider.Track>
                    <VolumeSlider.Thumb className={cls.volumeThumb} />
                  </VolumeSlider.Root>
                </div>

                <Time.Group className={cls.timeGroup}>
                  <Time.Value type="current" className={cls.timeValue} />
                  <Time.Separator className={cls.timeSeparator} />
                  <Time.Value type="duration" className={cls.timeValue} />
                </Time.Group>
              </div>

              <div className={cls.rightControls}>
                <CaptionsButton className={`${cls.iconButton} ${cls.captionsButton}`} label={labels.captions}>
                  <CaptionsOffIcon className={cls.captionsOffIcon} />
                  <CaptionsOnIcon className={cls.captionsOnIcon} />
                </CaptionsButton>

                <PlaybackRateButton
                  className={cls.rateButton}
                  label={labels.playbackRate}
                  render={(props, state) =>
                    <button {...props}>{formatRate(state.rate)}×</button>
                  }
                />

                <PiPButton
                  className={`${cls.iconButton} ${cls.pipButton}`} label={labels.pictureInPicture}
                >
                  <PipEnterIcon className={cls.pipEnterIcon} />
                  <PipExitIcon className={cls.pipExitIcon} />
                </PiPButton>

                <FullscreenButton
                  className={`${cls.iconButton} ${cls.fullscreenButton}`}
                  label={labels.fullscreen}
                >
                  <FullscreenEnterIcon className={cls.fullscreenEnterIcon} />
                  <FullscreenExitIcon className={cls.fullscreenExitIcon} />
                </FullscreenButton>
              </div>
            </div>
          </Controls.Group>
        </Controls.Root>

        {/**
         * Жесты мыши и touch:
         * click по центру — play/pause;
         * touch — показать/скрыть controls;
         * double tap слева/справа — seek;
         * double tap по центру — fullscreen.
         */}
        <Gesture
          type="tap"
          action="togglePaused"
          pointer="mouse"
          region="center"
        />
        <Gesture type="tap" action="toggleControls" pointer="touch" />
        <Gesture type="doubletap" action="seekStep" value={-SEEK_SECONDS} region="left" />
        <Gesture type="doubletap" action="toggleFullscreen" region="center" />
        <Gesture type="doubletap" action="seekStep" value={SEEK_SECONDS} region="right" />

        {/** Горячие клавиши, привязанные к действиям текущего Provider. */}
        <Hotkey keys="=" action="togglePaused" target="player" />
        <Hotkey keys="s" action="togglePaused" target="player" />
        <Hotkey keys="a" action="seekStep" value={-SEEK_SECONDS} />
        <Hotkey keys="d" action="seekStep" value={SEEK_SECONDS} />
        <Hotkey keys="ArrowLeft" action="seekStep" value={-5} />
        <Hotkey keys="ArrowRight" action="seekStep" value={5} />
        <Hotkey keys="ArrowUp" action="volumeStep" value={0.05} />
        <Hotkey keys="ArrowDown" action="volumeStep" value={-0.05} />
        <Hotkey keys="m" action="toggleMuted" />
        <Hotkey keys="c" action="toggleSubtitles" />
        <Hotkey keys="i" action="togglePictureInPicture" />
        <Hotkey keys="f" action="toggleFullscreen" />
        <Hotkey keys="0-9" action="seekToPercent" />

        {/** Озвучивает изменения состояния для screen reader. */}
        <StatusAnnouncer />

        <div className={cls.inputFeedback} aria-hidden="true">
          <SeekIndicator.Root className={cls.seekFeedback}>
            <SeekIcon className={cls.seekIcon} />
            <SeekIndicator.Value className={cls.feedbackValue} />
          </SeekIndicator.Root>

          <StatusIndicator.Root
            actions={CENTER_STATUS_ACTIONS}
            className={cls.playFeedback}
          >
            <PlayIcon className={cls.feedbackPlayIcon} />
            <PauseIcon className={cls.feedbackPauseIcon} />
          </StatusIndicator.Root>
        </div>
      </Player.Container>
    </Player.Provider>
  )

}