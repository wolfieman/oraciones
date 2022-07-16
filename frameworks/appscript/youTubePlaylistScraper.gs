function youTubePlaylistScraper() {
  // const PLAYLIST_ID = "PLhFieGNdJrrxYaae6BThfUfN7Vmbl0K1_"; //Rosario Corto
  const PLAYLIST_ID = "PLabQ9okQ22Ynz9EBB9ty1UBbacHp5hMR7"; // Oración de la Noche
  const MAX_RESULTS = 5;
  const VIDEO_PUBLISHED_AT = "2022-07-16T17:00:00Z";
  // const VIDEO_PUBLISHED_AT = new Date(); 2022-06-30T04:00:00Z

  var spreadSheet = SpreadsheetApp.getActive()
  var activeSheet = spreadSheet.getActiveSheet()

  let results = YouTube.PlaylistItems.list('id, snippet, contentDetails',{
    playlistId: PLAYLIST_ID,
    maxResults: MAX_RESULTS,
    publishedAt: VIDEO_PUBLISHED_AT
  });
  
  let items = results.items, videos = [];

  while('nextPageToken' in results) {
    results = YouTube.PlaylistItems.list('snippet',{
      playlistId: PLAYLIST_ID,
      maxResults: MAX_RESULTS,
      pageToken: results.nextPageToken
    });
    items.concat(results.items);
  }

  // Iterate the responses and store only the relevant information
  items.map(item => {
    if(item.snippet.title != "Private video"){
      videos.push({
      title: item.snippet.title,
      videoId: item.snippet.resourceId.videoId
    })
    }
  })
  // Logger.log(videos)
  console.log(videos)
}
