function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('야구팬 수요조사')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function saveData(data) {
  try {
    // 사용하실 구글 스프레드시트의 URL을 입력하세요.
    var SPREADSHEET_URL = "여기에_스프레드시트_링크를_넣으세요"; 
    
    var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getActiveSheet();
    
    // 헤더 순서: 이름, 전화번호, 야구를 얼마나 자주 보시나요?, 어느 팀 팬이신가요?, 좋아하는 이유를 간단하게 적어보세요., 안보신다면 이유를 말씀해주세요.(보시는 분들 생략가능)
    sheet.appendRow([
      data.name, 
      data.phone, 
      data.frequency, 
      data.team, 
      data.reasonLike, 
      data.reasonDislike
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}
