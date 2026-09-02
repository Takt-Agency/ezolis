type CompressOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxBase64Size?: number;
};

export async function compressImageToBase64(
  file: File,
  opts: CompressOptions = {},
): Promise<string> {
  const {
    maxWidth = 1400,
    maxHeight = 1400,
    quality: initialQuality = 0.78,
    maxBase64Size = 900_000,
  } = opts;

  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImage(dataUrl);

  const { width, height } = fitSize(img.width, img.height, maxWidth, maxHeight);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas non supporté");
  ctx.drawImage(img, 0, 0, width, height);

  let quality = initialQuality;
  let base64 = canvas.toDataURL("image/webp", quality);

  while (base64.length > maxBase64Size && quality > 0.35) {
    quality -= 0.1;
    base64 = canvas.toDataURL("image/webp", quality);
  }

  if (base64.length > maxBase64Size) {
    let w = width;
    let h = height;
    while (base64.length > maxBase64Size && w > 400) {
      w = Math.round(w * 0.85);
      h = Math.round(h * 0.85);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      base64 = canvas.toDataURL("image/webp", quality);
    }
  }

  if (base64.length > maxBase64Size) {
    throw new Error(
      "Image trop lourde après compression. Merci d'en utiliser une plus petite.",
    );
  }

  return base64;
}

export const GALLERY_IMAGE_OPTIONS: CompressOptions = {
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 0.7,
  maxBase64Size: 180_000,
};

export const MAX_IMAGES_PER_PROJECT = 5;

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image invalide"));
    img.src = src;
  });
}

function fitSize(w: number, h: number, maxW: number, maxH: number) {
  const ratio = Math.min(maxW / w, maxH / h, 1);
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}
