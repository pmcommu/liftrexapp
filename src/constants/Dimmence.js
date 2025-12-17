import { Dimensions, PixelRatio, Platform } from "react-native";

// -------- DEVICE SIZE --------
const { width, height } = Dimensions.get("window");

// Base guideline (iPhone X)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// -------- SCALE HELPERS --------

// Horizontal scale
const scale = (size) => (width / BASE_WIDTH) * size;

// Vertical scale
const verticalScale = (size) => (height / BASE_HEIGHT) * size;

// Balanced scale (recommended)
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Font scaling fix
const fontScale = (size) => size / PixelRatio.getFontScale();

// 1 pixel border width
const onePixel = 1 / PixelRatio.get();

// Detect tablet
const isTablet = Math.min(width, height) >= 600;

// -------- SPACING (GLOBAL) --------
export const Spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(24),
  xxl: moderateScale(32),
};

// -------- RADIUS --------
export const Radius = {
  sm: moderateScale(6),
  md: moderateScale(10),
  lg: moderateScale(14),
  pill: 999,
};

// -------- INPUT INSETS --------
export const Insets = {
  fieldV: Platform.select({ ios: moderateScale(14), android: moderateScale(12) }),
  fieldH: moderateScale(14),
};

// -------- MAIN DEFAULT EXPORT --------
export default {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  onePixel,
  isTablet,
  Spacing,
  Radius,
  Insets,
};

// -------- NAMED EXPORTS --------
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  onePixel,
  isTablet,
};
