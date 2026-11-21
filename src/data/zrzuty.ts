// Prawdziwe zrzuty aplikacji (osk-app/zrzuty), dane demonstracyjne. Klucz = nazwa pliku bez .png.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/zrzuty/*.png', { eager: true });
export const shots: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([k, v]) => [k.split('/').pop()!.replace('.png', ''), v.default]),
);
