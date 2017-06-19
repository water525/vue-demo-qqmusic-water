/**
 * Created by DongGe on 2017/6/14.
 */
window.getJsonp = {};
window.JsonCallback = function (data) {
  if (window.getJsonp.script) {
    document.body.removeChild(window.getJsonp.script);
  }
  window.getJsonp.cd(data);
};
export default function getSong (url, cb) {
  window.getJsonp.script = document.createElement('script');
  window.getJsonp.script.src = url;
  document.body.appendChild(window.getJsonp.script);
  window.getJsonp.cd = cb;
};

