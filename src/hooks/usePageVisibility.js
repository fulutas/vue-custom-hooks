import { onMounted, onUnmounted } from 'vue';

export const usePageVisibility = (callback = () => { }) => {
  let hidden, visibilityChange;
  
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  const handleVisibilityChange = () => {
    callback(document[hidden]);
  }

  onMounted(() => {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  });

  onUnmounted(() => {
    document.removeEventListener(visibilityChange, handleVisibilityChange);
  });
}

export default usePageVisibility