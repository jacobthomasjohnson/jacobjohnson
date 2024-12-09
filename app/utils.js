export function hexToHSL(hex) {
      hex = hex.replace("#", "");

      let r = parseInt(hex.substring(0, 2), 16) / 255;
      let g = parseInt(hex.substring(2, 4), 16) / 255;
      let b = parseInt(hex.substring(4, 6), 16) / 255;

      let max = Math.max(r, g, b),
            min = Math.min(r, g, b);
      let h,
            s,
            l = (max + min) / 2;

      if (max === min) {
            h = s = 0;
      } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                  case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                  case g:
                        h = (b - r) / d + 2;
                        break;
                  case b:
                        h = (r - g) / d + 4;
                        break;
            }
            h *= 60;
      }

      return {
            h: Math.round(h),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
      };
}

export function hslToHex(h, s, l) {
      s /= 100;
      l /= 100;

      let c = (1 - Math.abs(2 * l - 1)) * s;
      let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      let m = l - c / 2;

      let r = 0,
            g = 0,
            b = 0;
      if (h >= 0 && h < 60) {
            r = c;
            g = x;
            b = 0;
      } else if (h >= 60 && h < 120) {
            r = x;
            g = c;
            b = 0;
      } else if (h >= 120 && h < 180) {
            r = 0;
            g = c;
            b = x;
      } else if (h >= 180 && h < 240) {
            r = 0;
            g = x;
            b = c;
      } else if (h >= 240 && h < 300) {
            r = x;
            g = 0;
            b = c;
      } else if (h >= 300 && h < 360) {
            r = c;
            g = 0;
            b = x;
      }

      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return `#${((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase()}`;
}

function adjustHue(hex, hueShift) {
      let hsl = hexToHSL(hex);

      hsl.h = (hsl.h + hueShift) % 360;
      if (hsl.h < 0) hsl.h += 360;

      return hslToHex(hsl.h, hsl.s, hsl.l);
}

export default adjustHue;
