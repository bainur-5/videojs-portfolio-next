'use client';

/**
 * CinemaPlayer — кастомный кинематографичный плеер на Video.js v10 React API.
 *
 * Важно:
 * - компонент является Client Component, потому что плеер использует браузерные API;
 * - состояние воспроизведения хранится внутри Video.js, а не в useState;
 * - интерфейс собирается из готовых UI-компонентов Video.js;
 * - внешний вид задаётся через SCSS Modules и data-* атрибуты состояния.
 */

import {
  BufferingIndicator,
  CaptionsButton,
  Controls,
  FullscreenButton,
  Gesture,
  Hotkey,
  MuteButton,
  PiPButton,
  PlayButton,
  PlaybackRateButton,
  Poster,
  SeekButton,
  SeekIndicator,
  StatusAnnouncer,
  StatusIndicator,
  Time,
  TimeSlider,
  VolumeSlider,
  createPlayer,
} from '@videojs/react';

import {
  CaptionsOffIcon,
  CaptionsOnIcon,
  FullscreenEnterIcon,
  FullscreenExitIcon,
  PauseIcon,
  PipEnterIcon,
  PipExitIcon,
  PlayIcon,
  RestartIcon,
  SeekIcon,
  SpinnerIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeOffIcon,
} from '@videojs/react/icons/minimal';

import { Video, videoFeatures } from '@videojs/react/video';

import styles from './CinemaPlayer.module.scss';

import type {
  CinemaPlayerLabels,
  CinemaPlayerProps,
} from './CinemaPlayer.types';

/**
 * createPlayer создаёт набор связанных React-компонентов и API плеера:
 * Player.Provider, Player.Container и внутреннее состояние.
 *
 * features: videoFeatures подключает возможности обычного HTML5-видео:
 * воспроизведение, пауза, время, громкость, fullscreen, PiP и т. д.
 *
 * Player объявлен ВНЕ компонента, чтобы конфигурация не создавалась заново
 * при каждом React-render.
 */
const Player = createPlayer({ features: videoFeatures });

/**
 * Единое значение шага перемотки.
 * Используется и в кнопках, и в жестах, и в горячих клавишах.
 */
const SEEK_SECONDS = 10;

/**
 * Список действий, которые должен отслеживать центральный StatusIndicator.
 *
 * as const:
 * - делает массив readonly;
 * - сохраняет точный литеральный тип 'togglePaused';
 * - не превращает тип элемента в общий string.
 */
const CENTER_STATUS_ACTIONS = ['togglePaused'] as const;

/**
 * Подписи доступности по умолчанию.
 * Через labelsOverride можно переопределить только нужные поля.
 */
const DEFAULT_LABELS: CinemaPlayerLabels = {
  player: 'Cinema video player',
  controls: 'Cinema playback controls',
  playPause: 'Play or pause',
  seekBackward: 'Seek backward 10 seconds',
  seekForward: 'Seek forward 10 seconds',
  mute: 'Mute or unmute',
  captions: 'Toggle captions',
  playbackRate: 'Change playback speed',
  pictureInPicture: 'Toggle picture in picture',
  fullscreen: 'Toggle fullscreen',
  timeline: 'Seek through video',
  volume: 'Volume',
};

/**
 * Форматирует скорость для кнопки:
 * 1   -> "1"
 * 1.5 -> "1.5"
 * 2   -> "2"
 *
 * Так целые значения не отображаются как 1.0 или 2.0.
 */
function formatRate(rate: number): string {
  return Number.isInteger(rate) ? String(rate) : rate.toFixed(1);
}

export function CinemaPlayer({
  src,
  poster,
  posterAlt = 'Cinema video preview',
  title,
  eyebrow,
  badge = '4K',
  className,
  autoPlay = false,
  muted = false,
  captions = [],
  labels: labelsOverride,
}: CinemaPlayerProps) {
  /**
   * Поля справа перезаписывают поля слева.
   * Поэтому DEFAULT_LABELS даёт полный набор значений,
   * а labelsOverride меняет только переданные подписи.
   */
  const labels = { ...DEFAULT_LABELS, ...labelsOverride };

  /**
   * Объединяем обязательный локальный класс и внешний className.
   * filter(Boolean) удаляет undefined, null и пустую строку.
   */
  const rootClassName = [styles.player, className]
    .filter(Boolean)
    .join(' ');

  return (
    /** Provider создаёт отдельное состояние для этого экземпляра плеера. */
    <Player.Provider>
      {/**
       * Container — корневая рамка плеера.
       * В fullscreen переходит именно он, поэтому controls и overlays
       * остаются поверх видео.
       */}
      <Player.Container
        className={rootClassName}
        aria-label={labels.player}
      >
        {/**
         * Video — media element, связанный с Player.Provider.
         *
         * playsInline просит мобильный браузер воспроизводить видео
         * внутри страницы, а не сразу открывать системный fullscreen.
         *
         * preload="metadata" загружает только метаданные: длительность,
         * размеры и базовую информацию, но не всё видео целиком.
         */}
        <Video
          className={styles.video}
          src={src}
          autoPlay={autoPlay}
          muted={muted}
          playsInline
          preload="metadata"
        >
          {/**
           * Преобразуем массив captions в HTML <track> элементы.
           * key нужен React, чтобы различать элементы списка.
           * kind="captions" обозначает субтитры для речи и важных звуков.
           */}
          {captions.map((track) => (
            <track
              key={`${track.srcLang}-${track.label}`}
              kind="captions"
              src={track.src}
              srcLang={track.srcLang}
              label={track.label}
              default={track.default}
            />
          ))}
        </Video>

        {/**
         * Poster рендерится только при наличии poster.
         * Если poster не передан, возвращается null.
         */}
        {poster ? (
          <Poster
            className={styles.poster}
            src={poster}
            alt={posterAlt}
          />
        ) : null}

        {/* Декоративные затемняющие градиенты. */}
        <div className={styles.topScrim} aria-hidden="true" />
        <div className={styles.bottomScrim} aria-hidden="true" />

        {/* Мета-информация фильма внутри плеера. */}
        <div className={styles.metadata} aria-hidden="true">
          <div>
            {eyebrow ? (
              <p className={styles.eyebrow}>{eyebrow}</p>
            ) : null}
            <p className={styles.title}>{title}</p>
          </div>
          {badge ? <span className={styles.badge}>{badge}</span> : null}
        </div>

        {/**
         * Индикатор буферизации.
         * render prop позволяет заменить стандартную разметку своей,
         * сохранив служебные props Video.js.
         */}
        <BufferingIndicator
          render={(props) => (
            <div {...props} className={styles.buffering}>
              <SpinnerIcon className={styles.spinnerIcon} />
            </div>
          )}
        />

        {/**
         * Центральная кнопка play/pause/restart.
         * Video.js добавляет data-paused, data-ended и другие атрибуты,
         * а SCSS показывает нужную иконку без отдельного React state.
         */}
        <PlayButton
          className={`${styles.centerPlayButton} ${styles.playStateButton}`}
          label={labels.playPause}
        >
          <PlayIcon className={styles.playIcon} />
          <PauseIcon className={styles.pauseIcon} />
          <RestartIcon className={styles.restartIcon} />
        </PlayButton>

        {/**
         * Controls.Root управляет видимостью панели управления:
         * показывает её при активности пользователя и скрывает после простоя.
         */}
        <Controls.Root className={styles.controls}>
          <Controls.Group
            className={styles.controlsPanel}
            aria-label={labels.controls}
          >
            {/**
             * Таймлайн:
             * Buffer — загруженная часть;
             * Fill — просмотренная часть;
             * Thumb — текущая позиция;
             * Preview — время под указателем.
             */}
            <TimeSlider.Root
              className={styles.timeSlider}
              label={labels.timeline}
            >
              <TimeSlider.Track className={styles.timeTrack}>
                <TimeSlider.Buffer className={styles.timeBuffer} />
                <TimeSlider.Fill className={styles.timeFill} />
              </TimeSlider.Track>
              <TimeSlider.Thumb className={styles.timeThumb} />
              <TimeSlider.Preview className={styles.timePreview}>
                <TimeSlider.Value
                  type="pointer"
                  className={styles.timePreviewValue}
                />
              </TimeSlider.Preview>
            </TimeSlider.Root>

            <div className={styles.bottomBar}>
              <div className={styles.leftControls}>
                {/* Нижняя кнопка play / pause / restart. */}
                <PlayButton
                  className={`${styles.iconButton} ${styles.playStateButton}`}
                  label={labels.playPause}
                >
                  <PlayIcon className={styles.playIcon} />
                  <PauseIcon className={styles.pauseIcon} />
                  <RestartIcon className={styles.restartIcon} />
                </PlayButton>

                {/* Перемотка назад. Отрицательное число означает назад. */}
                <SeekButton
                  seconds={-SEEK_SECONDS}
                  className={`${styles.iconButton} ${styles.seekButton}`}
                  label={labels.seekBackward}
                >
                  <span className={styles.seekIconWrap}>
                    <SeekIcon
                      className={`${styles.controlIcon} ${styles.seekIconBackward}`}
                    />
                    <span className={styles.seekNumber}>{SEEK_SECONDS}</span>
                  </span>
                </SeekButton>

                {/* Перемотка вперёд. */}
                <SeekButton
                  seconds={SEEK_SECONDS}
                  className={`${styles.iconButton} ${styles.seekButton}`}
                  label={labels.seekForward}
                >
                  <span className={styles.seekIconWrap}>
                    <SeekIcon className={styles.controlIcon} />
                    <span className={styles.seekNumber}>{SEEK_SECONDS}</span>
                  </span>
                </SeekButton>

                <div className={styles.volumeControl}>
                  {/**
                   * MuteButton переключает звук.
                   * Иконки выбираются через CSS по data-volume-level.
                   */}
                  <MuteButton
                    className={`${styles.iconButton} ${styles.muteButton}`}
                    label={labels.mute}
                  >
                    <VolumeOffIcon className={styles.volumeOffIcon} />
                    <VolumeLowIcon className={styles.volumeLowIcon} />
                    <VolumeHighIcon className={styles.volumeHighIcon} />
                  </MuteButton>

                  {/* Ползунок громкости. */}
                  <VolumeSlider.Root
                    className={styles.volumeSlider}
                    label={labels.volume}
                  >
                    <VolumeSlider.Track className={styles.volumeTrack}>
                      <VolumeSlider.Fill className={styles.volumeFill} />
                    </VolumeSlider.Track>
                    <VolumeSlider.Thumb className={styles.volumeThumb} />
                  </VolumeSlider.Root>
                </div>

                {/* Текущее время / общая длительность. */}
                <Time.Group className={styles.timeGroup}>
                  <Time.Value type="current" className={styles.timeValue} />
                  <Time.Separator className={styles.timeSeparator} />
                  <Time.Value type="duration" className={styles.timeValue} />
                </Time.Group>
              </div>

              <div className={styles.rightControls}>
                {/* Включение и выключение субтитров. */}
                <CaptionsButton
                  className={`${styles.iconButton} ${styles.captionsButton}`}
                  label={labels.captions}
                >
                  <CaptionsOffIcon className={styles.captionsOffIcon} />
                  <CaptionsOnIcon className={styles.captionsOnIcon} />
                </CaptionsButton>

                {/**
                 * Кнопка скорости.
                 * render получает props доступной кнопки и текущее состояние.
                 */}
                <PlaybackRateButton
                  className={styles.rateButton}
                  label={labels.playbackRate}
                  render={(props, state) => (
                    <button {...props}>{formatRate(state.rate)}</button>
                  )}
                />

                {/* Picture-in-Picture. */}
                <PiPButton
                  className={`${styles.iconButton} ${styles.pipButton}`}
                  label={labels.pictureInPicture}
                >
                  <PipEnterIcon className={styles.pipEnterIcon} />
                  <PipExitIcon className={styles.pipExitIcon} />
                </PiPButton>

                {/* Полноэкранный режим. */}
                <FullscreenButton
                  className={`${styles.iconButton} ${styles.fullscreenButton}`}
                  label={labels.fullscreen}
                >
                  <FullscreenEnterIcon className={styles.fullscreenEnterIcon} />
                  <FullscreenExitIcon className={styles.fullscreenExitIcon} />
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
        <Gesture
          type="doubletap"
          action="seekStep"
          value={-SEEK_SECONDS}
          region="left"
        />
        <Gesture
          type="doubletap"
          action="toggleFullscreen"
          region="center"
        />
        <Gesture
          type="doubletap"
          action="seekStep"
          value={SEEK_SECONDS}
          region="right"
        />

        {/** Горячие клавиши, привязанные к действиям текущего Provider. */}
        <Hotkey keys="Space" action="togglePaused" />
        <Hotkey keys="k" action="togglePaused" />
        <Hotkey keys="j" action="seekStep" value={-SEEK_SECONDS} />
        <Hotkey keys="l" action="seekStep" value={SEEK_SECONDS} />
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

        {/**
         * Визуальная обратная связь для seek и play/pause.
         * aria-hidden, потому что StatusAnnouncer уже озвучивает действия.
         */}
        <div className={styles.inputFeedback} aria-hidden="true">
          <SeekIndicator.Root className={styles.seekFeedback}>
            <SeekIcon className={styles.feedbackSeekIcon} />
            <SeekIndicator.Value className={styles.feedbackValue} />
          </SeekIndicator.Root>

          <StatusIndicator.Root
            actions={CENTER_STATUS_ACTIONS}
            className={styles.playFeedback}
          >
            <PlayIcon className={styles.feedbackPlayIcon} />
            <PauseIcon className={styles.feedbackPauseIcon} />
          </StatusIndicator.Root>
        </div>
      </Player.Container>
    </Player.Provider>
  );
}
