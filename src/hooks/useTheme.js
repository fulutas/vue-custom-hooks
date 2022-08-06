export const useTheme = () => {
  return (themeValue) => {
    document.documentElement.setAttribute('theme', themeValue);
  }
}

export default useTheme;