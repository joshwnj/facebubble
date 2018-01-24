const video = document.querySelector('video')

navigator.getUserMedia({ video: true }, handleVideo, videoError)
 
function handleVideo(stream) {
  video.src = URL.createObjectURL(stream)
}

function videoError(e) {
  alert('unable to access webcam')
}
