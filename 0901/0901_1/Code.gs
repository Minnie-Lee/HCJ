function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('교육자료 신청')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function saveData(data) {
  try {
    // 사용하실 구글 스프레드시트의 URL을 입력하세요.
    var SPREADSHEET_URL = "여기에_스프레드시트_링크를_넣으세요"; 
    
    var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getActiveSheet();
    
    // 시트에 순서대로 데이터 추가 (이름, 이메일, 교수님께 하고 싶은 말)
    sheet.appendRow([data.name, data.email, data.message]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}
