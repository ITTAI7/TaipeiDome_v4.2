import fs from "fs";
import * as cheerio from "cheerio";
let t = fs.readFileSync("html_204_output.txt", "utf8");
let mapMatch = t.match(/imgs2\.utiki\.com\.tw[^\']*_live\.map/);
if(mapMatch && mapMatch[0]){
    fetch("https://" + mapMatch[0]).then(r=>r.text()).then(t=>{
        const $ = cheerio.load(t);
        $("area").each((i, el) => {
           let title = $(el).attr("title");
           let href = $(el).attr("href");
           if(title && title.includes("尚餘") && i < 10) console.log(title, href);
        });
    });
}
