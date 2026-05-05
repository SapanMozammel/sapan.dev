const shimmer = (w: number, h: number): string => {
	return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgba(255,255,255,0.05)" offset="20%" />
      <stop stop-color="rgba(255,255,255,0.1)" offset="50%" />
      <stop stop-color="rgba(255,255,255,0.05)" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="transparent" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
};

const toBase64 = (str: string): string => {
	return typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
};

export const getBlurDataURL = (w: number = 700, h: number = 475): string => {
	return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
};
