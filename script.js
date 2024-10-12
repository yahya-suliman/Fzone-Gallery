window.onload = function() {
    const videoGallery = document.getElementById('videoGallery');
    const totalVideos = 17; // Number of videos from 1.mp4 to 17.mp4

    // Loop to create video thumbnails for 2.mp4 to 17.mp4
    for (let i = 2; i <= totalVideos; i++) {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const video = document.createElement('video');
        video.src = `videos/${i}.mp4`;  // Dynamically set the video source
        video.controls = false;  // Disable controls for small video thumbnails
        video.muted = true;  // No sound should play in the thumbnail videos

        // Event to update the thumbnail (poster) to the middle of the video
        video.addEventListener('loadedmetadata', function() {
            video.currentTime = video.duration / 2; // Set to middle for thumbnail
        });

        // Add click event to replace the large video
        video.addEventListener('click', function() {
            replaceVideo(this.src);  // Pass the clicked video's source to large screen
        });

        videoItem.appendChild(video);
        videoGallery.appendChild(videoItem);
    }
};

// Function to replace the large video with the clicked video
function replaceVideo(newVideoSrc) {
    const largeVideo = document.getElementById('largeVideo');
    
    // Update the large video source
    largeVideo.src = newVideoSrc;

    // Load the video and play it from the start
    largeVideo.load();
    largeVideo.addEventListener('loadedmetadata', function() {
        largeVideo.currentTime = 0;  // Start from the beginning
        largeVideo.play();  // Play the video
    });

    // Set the poster to the middle image before it starts playing
    const posterImage = new Image();
    posterImage.src = newVideoSrc.replace('.mp4', '_poster.jpg'); // Change this to your poster logic
    posterImage.onload = function() {
        largeVideo.poster = posterImage.src;  // Set the poster to the middle thumbnail
    };
}
