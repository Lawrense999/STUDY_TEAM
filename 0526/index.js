// 모듈을 호출한다
const http = require('http');
const express = require('express'); // require = 모듈을 호출한다는 뜻
// 파일 입출력 모듈
const fs = require('fs');
// 크롤링 모듈
const axios = require('axios');
const cheerio = require('cheerio');

// 서버를 생성합니다
const app = express();

app.get('/axios', (req,res) => {
    // Promise - 콜백 헬에 빠지는것을 방지(흐름제어) - 메소드체인.then([콜백])
    // Async - 리스트 형식으로 한다. [콜백, 콜백, 콜백 ...]
    axios.get("https://www.naver.com/").then( (response) => {
    //    console.log(response);
        const htmlContent = response.data;
        // console.log(htmlContent);
        const crol = cheerio.load(htmlContent);
        //  console.log(crol);
        // #NM_THEME_CONTAINER > div > div > div > a > div.media_info > div > strong
        let yul = crol('div.media_info > div > strong').text();
        console.log(yul);
    });
    
    res.end();

});
app.get('/end', (req,res) => {
    res.write(`<h1>Merong`);
    res.end();
});

app.get('/readFile.*', (req, res) => {
    fs.readFile('./yul.txt', (err, data) => {
        if (err) throw err; // 에러가 나오면 에러를 던져버리겠다
        res.end(data.toString());
    });
})

const server = http.createServer(app);

// 서버를 실행합니다
server.listen(6698, () => { // 콜백함수
    console.log('run on server - http://localhost:6698');
    console.log('run on server - http://127.0.0.1:6698');
});