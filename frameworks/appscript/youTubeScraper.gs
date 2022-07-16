function youTubeScraper() {
  const CHANNEL_ID = "UCxKF7-fPcS24LJzcC9VsisA";
  const MAX_RESULTS = 5;
  const PUBLISHED_AFTER = "2022-07-15T18:00:00Z";

  var spreadSheet = SpreadsheetApp.getActive()
  var activeSheet = spreadSheet.getActiveSheet()

  var search = YouTube.Search.list("snippet, id", {
    channelId: CHANNEL_ID, publishedAfter: PUBLISHED_AFTER, maxResults: MAX_RESULTS})

  Logger.log(search)

  var results = search.items.map((item) => [item.id.videoId, item.snippet.title, item.snippet.publishedAt])

  var ids = results.map((id) => id[0]).join(",")

  if(results.length != 0){
    activeSheet.getRange(2, 1, results.length, results[0].length).setValues(results)
  } else {
    console.log("zero results")
  }
}
