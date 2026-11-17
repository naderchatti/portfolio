/**
 * Applies the stored next-themes preference before paint on pages rendered
 * outside the ThemeProvider (root fallback, global 404).
 */
export const themeScript = `try{var t=localStorage.getItem('theme');var d=t==='dark'||((!t||t==='system')&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}`;
