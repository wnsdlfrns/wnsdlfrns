import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# 주닐의 프로필 😸

[![hit](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fwnsdlfrns%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hit&edge_flat=false)](https://hits.seeyoufarm.com)

![wnsdlfrns's GitHub stats](https://github-readme-stats.vercel.app/api?username=wnsdlfrns&show_icons=true&theme=tokyonight)

[![Solved.ac Profile](http://mazassumnida.wtf/api/generate_badge?boj=jl92)](https://solved.ac/jl92)

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=wnsdlfrns&layout=donut-vertical&langs_count=20)

***
## 📕 내 블로그 피드
`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://jl92.tistory.com/rss'); // 본인의 블로그 주소
    
    text += `<ul>`;
    
    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 5; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<li><a href='${link}' target='_blank'>${i + 1}. ${title}</a></li>`;
    }

    text += `</ul>`;
    
    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();