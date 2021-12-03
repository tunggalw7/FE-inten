


export class ParseCSV {
    static parseToArray(str: any) {
        var arr = [];
        var quote = false;  // 'true' means we're inside a quoted field
    
        // Iterate over each character, keep track of current row and column (of the returned array)
        for (var row = 0, col = 0, c = 0; c < str.length; c++) {
            var cc = str[c], nc = str[c+1];        // Current character, next character
            arr[row] = arr[row] || [];             // Create a new row if necessary
            arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary
    
            // If the current character is a quotation mark, and we're inside a
            // quoted field, and the next character is also a quotation mark,
            // add a quotation mark to the current column and skip the next character
            if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
    
            // If it's just one quotation mark, begin/end quoted field
            if (cc == '"') { quote = !quote; continue; }
    
            // If it's a comma and we're not in a quoted field, move on to the next column
            // if (cc == ',' && !quote) { ++col; continue; }
    
            // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
            // and move on to the next row and move to column 0 of that new row
            if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
    
            // If it's a newline (LF or CR) and we're not in a quoted field,
            // move on to the next row and move to column 0 of that new row
            if (cc == '\n' && !quote) { ++row; col = 0; continue; }
            if (cc == '\r' && !quote) { ++row; col = 0; continue; }
    
            // Otherwise, append the current character to the current column
            arr[row][col] += cc;
        }
        return arr;
    }

    static parseToObject(data: any) {
        let allData = [];
        let tempData = [];
        let bulkData = [];
        data.map(res => {
            if (res[0] !== ";") {
                tempData.push(res[0].split(";"));
            } else {
                bulkData.push(tempData);
                tempData = [];
            }
        });
        
        bulkData.map(bulk => {
            const dt = bulk.reduce((prevObj, [key, value]) => ({ ...prevObj, [key]: value }), {});
            allData.push(dt)
        })
        
        return allData;
    }

    static CSVReader(csvText) {
        let lines = [];
        const linesArray = csvText.split('\n');
        // for trimming and deleting extra space 
        linesArray.forEach((e: any) => {
            const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
            lines.push(row);
        });
        // for removing empty record
        // lines.splice(lines.length - 1, 1);
        const result = [];
        let headers;
        if(lines[0].indexOf(",") !== -1){
            headers = lines[0].split(",");
        } else{
            headers = lines[0].split(";");
        }
        
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            let currentline;
            if(lines[i].indexOf(",") !== -1){
                currentline = lines[i].split(",");
            } else {
                currentline = lines[i].split(";");
            }
            
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
            // console.log(obj, "objnya");
        }

        return result; //JavaScript object
        // return JSON.stringify(result); //JSON
    }
}