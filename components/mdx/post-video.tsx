import { generatedVideos } from '@/content/media.generated';
import type { GeneratedVideo } from '@/content/media.types';
import { LazyVideo } from './lazy-video';

type PostVideoProps = { name: string; alt?: string };

function findVideo(name: string): GeneratedVideo | undefined {
  return Object.hasOwn(generatedVideos, name) ? generatedVideos[name as keyof typeof generatedVideos] : undefined;
}

/** `![alt](video:name)` in a post. The alt labels the video and doubles as the caption. */
export function PostVideo({ name, alt }: PostVideoProps) {
  const video = findVideo(name);
  if (!video) {
    return (
      <figure className="my-8 rounded-card border border-dashed p-6 font-mono text-xs text-muted-foreground">
        missing video: {name}
      </figure>
    );
  }
  const caption = alt?.trim();
  // Portrait clips would fill several screens at column width; never show them above their native width.
  const portrait = video.height > video.width * 1.05;
  return (
    <figure className="my-8" style={portrait ? { maxWidth: Math.min(video.width, 440) } : undefined}>
      <LazyVideo
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        label={caption || undefined}
      />
      {caption ? <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}
