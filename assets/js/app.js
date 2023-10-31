// This is the dataset of quirky music videos that you are required to use in this exam. 
const database = quirkyVideoDatabaseObject;

// Initializes the app when the page is fully loaded.
window.addEventListener('load', init);

/**
 * Run this function when the page is fully loaded.
 */
function init(){
  sortByTitle();
  for(let i = 0; i < database.videos.length; i++){
    displayVideoList(database.videos, i);
  }
  document.getElementById('airtime').innerHTML = calculateListTotalTime();
  document.getElementById('add-button').addEventListener('click', commitContent);
};

// Create a variable for storing #playlist
const playlist = document.getElementById('playlist');

/**
 * Write all elements into Dom
 * @param {*} arr take database.videos as a parameter
 * @param {*} index the index of each iteration
 */
function displayVideoList(arr, index){
  const mediaBox = createArticleBox();
  mediaBox.appendChild(createMediaLeft(arr, index));
  mediaBox.appendChild(createMediaContent(arr, index));
  mediaBox.appendChild(createMediaRight(arr, index));
}

/**
 * Sort the playlist by videos' titles
 */
function sortByTitle(){
  database.videos.sort(function(indexA, indexB){
    const titleA = indexA.title.toUpperCase();
    const titleB = indexB.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    } else {
      return 0;
    }
  });
}

/**
 * Create the article element and a div
 */
function createArticleBox(){
  const articleBox = document.createElement('article');
  articleBox.className = 'card m-2 p-2';
  playlist.appendChild(articleBox);
  const media = document.createElement('div');
  media.className = 'media';
  articleBox.appendChild(media);
  return media;
}

/**
 * Display the cover of each video
 * @param {*} arr take database.videos as a parameter
 * @param {*} index the index of each iteration
 * @returns mediaLeft is not yet append to media, so return it for appending later
 */
function createMediaLeft(arr, index){
  const mediaLeft = document.createElement('div');
  mediaLeft.className = 'media-left';
  const imgIs64 = document.createElement('p');
  imgIs64.className = 'image is-64x64';
  mediaLeft.appendChild(imgIs64);
  const imgSrc = document.createElement('img');
  imgSrc.setAttribute('src', `https://img.youtube.com/vi/${arr[index].videoId}/0.jpg`);
  imgIs64.appendChild(imgSrc);
  return mediaLeft;
}

/**
 * Display the artist and title of each video
 * @param {*} arr take database.videos as a parameter
 * @param {*} index the index of each iteration
 * @returns mediaContent is not yet append to media, so return it for appending later
 */
function createMediaContent(arr, index){
  const mediaContent = document.createElement('div');
  mediaContent.className = 'media-content';
  const content = document.createElement('div');
  content.className = 'content';
  mediaContent.appendChild(content);
  const aHref = document.createElement('a');
  aHref.setAttribute('href', `https://youtu.be/${arr[index].videoId}`);
  aHref.innerHTML = `<strong>${arr[index].artist}</strong> - ${arr[index].title}`;
  content.appendChild(aHref);
  return mediaContent;
}

/**
 * Display the duration of each video
 * @param {*} arr take database.videos as a parameter
 * @param {*} index the index of each iteration
 * @returns mediaRight is not yet append to media, so return it for appending later
 */
function createMediaRight(arr, index){
  const mediaRight = document.createElement('div');
  mediaRight.className = 'media-right';
  const durationSpan = document.createElement('span');
  durationSpan.className = 'has-text-grey-light';
  durationSpan.innerHTML = convertTimeFormat(arr[index].duration);
  mediaRight.appendChild(durationSpan);
  return mediaRight;
}

/**
 * Calculate the total time of whole playlist, then convert it in format
 */
function calculateListTotalTime(){
  const sum = database.videos.reduce(function(total, current){
    return total + current.duration;
  }, 0);
  return convertTimeFormat(sum);
}

/**
 * Calculate and convert the time in format
 * @param {*} aTime take the airtime of each video or of whole list as a parameter
 * @returns a time converted in format
 */
function convertTimeFormat(aTime){
  const seconds = aTime % 60;
  const temMinutes = (aTime - seconds) / 60;
  const minutes = temMinutes % 60;
  const hours = (temMinutes - minutes) / 60;
  if(hours >= 1){
    return `${hours}:${addZero(minutes)}:${addZero(seconds)}`;
  }else{
    return `${minutes}:${addZero(seconds)}`;
  }
}

/**
 * Add a '0' in front of numbers
 * @param {*} aTime take seconds or minutes as a parameter
 * @returns if a number only has one digit, then add a '0' in front of it
 */
function addZero(aTime){
  return aTime = aTime.toString().padStart(2, '0');
}

/**
 * Use a new object to store the values inputted by users
 * Add it into the database video array and reload the page when the inputs fit all requirements
 */
function commitContent(){
  const newObj = {};
  newObj.videoId = document.getElementById('video-id').value;
  newObj.artist = document.getElementById('artist').value;
  newObj.title = document.getElementById('title').value;
  newObj.duration = document.getElementById('duration').value;
  if(newObj.videoId.length == 11 && newObj.artist.length >= 3 && newObj.title.length >= 3 && !isNaN(newObj.duration)){
    database.videos.push(newObj);
    document.getElementById('playlist').innerHTML = '';
    document.getElementById('airtime').innerHTML = '';
    init();
    clearInputBox();
  }
}

/**
 * Clear all inout boxes after committing
 */
function clearInputBox(){
  document.getElementById('video-id').value = '';
  document.getElementById('artist').value = '';
  document.getElementById('title').value = '';
  document.getElementById('duration').value = '';
}
