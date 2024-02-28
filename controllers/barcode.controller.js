
class BarcodeController {
    static async BarcodeGenator(req, res, next) {
        try {
            const CompanyCode = req.body.CompanyCode
            const MethodCode = req.body.MethodCode
            const BottleSizeCode = req.body.BottleSizeCode
            const ReagentTyprCode = req.body.ReagentTyprCode
            const DayProduce = req.body.DayProduce.toString()
          //  console.log("day,", DayProduce)
            const MonthProduce = req.body.MonthProduce.toString()
           // console.log("month,", MonthProduce)
            const YearProduce = req.body.YearProduce.toString()
           // console.log("year,", YearProduce)
            const ExpiryMonth = req.body.ExpiryMonth
            const ExpiryDay = req.body.ExpiryDay
            const ExpiryYear = req.body.ExpiryYear
            const ExpiryWeek = req.body.ExpiryWeek
            const LotNumber = req.body.LotNumber
            const MinSequenceNumber = parseInt(req.body.MinSequenceNumber)
            const MaxSequenceNumber = parseInt(req.body.MaxSequenceNumber)
            const SequenceNumber = req.body.SequenceNumber
            // console.log("min:",MinLotNumber)
            //console.log("max:",MaxLotNumber)
            //console.log("CompanyCode, ", CompanyCode)
            //console.log("MethodCode, ", MethodCode)
            //console.log("BottleSizeCode, ", BottleSizeCode)
            //console.log("ReagentTyprCode, ", ReagentTyprCode)
            //const barcode =
            //console.log(typeof(DayProduce))
            // console.log(CompanyCode,MethodCode,BottleSizeCode,ReagentTyprCode,ExpiryMonth,ExpiryDay,ExpiryYear,LotNumber,SequenceNumber)
            /* 
             const checkday = isValidDate(DayProduce,MonthProduce,YearProduce)
               if(checkday){
                   console.log("Ngày đúng")  
               }
               else{
                   console.log("Ngày sai")
                   return res.status(200).json({
                       code: 204,
                       message: 'Ngày tháng năm không hợp lệ!',
                   })
               }*/
            // Chuyển đổi chuỗi số thành số
            //const newNumber = parseInt(combinedNumberString);
            //c/onst inputDate =DayProduce+"-"+MonthProduce+"-"+YearProduce
            //console.log(inputDate)
            var numberOfWeeksToAdd = ExpiryWeek;
            var dateObject = new Date(YearProduce, MonthProduce - 1, DayProduce); // Lưu ý: Tháng trong JavaScript là từ 0 đến 11, nên giảm đi 1
            dateObject.setUTCHours(7)
            //var dateObject = new Date(inputDate);
            //console.log("date---,",dateObject)
            dateObject.setDate(dateObject.getDate() + (numberOfWeeksToAdd * 7));
            /*var year = dateObject.getFullYear();
            var month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            var day = dateObject.getDate().toString().padStart(2, '0');
            var resultString = year + '-' + month + '-' + day;
            console.log(getNextSaturday(resultString))
            */
            //var dateObject1 = new Date(resultString);
            var startDate = new Date(YearProduce, MonthProduce - 1, DayProduce)
            //console.log("start date,"+startDate)
            // Tính toán số thứ tự của tuần trong năm
            //var startOfYear = new Date(dateObject1.getFullYear(), 0, 1); // Ngày đầu tiên của năm
            var dayfromweek = 7 * ExpiryWeek
            //var weekNumber = Math.ceil((daysSinceStart + 1) / 7); // Tính số thứ tự của tuần
            var newDate = new Date(startDate.getTime() + dayfromweek * 24 * 60 * 60 * 1000);
            newDate.setUTCHours(7)
            const thu = newDate.getDay()
            //console.log("day,", thu)
            //console.log("date",newDate)
            var delta = 6 - thu
            dayfromweek += delta
            /*  if(dayfromweek<7){
                  dayfromweek+=7
              }
              */
            var Ngayhethan = new Date(startDate.getTime() + (dayfromweek) * 24 * 60 * 60 * 1000);
            var Ngayhethan2 = new Date(Date.UTC(2026, 0, 10))
            Ngayhethan.setUTCHours(7)
            //console.log("day2,", newDate1.getDay())
            //console.log("date1",newDate1)
            // var daysSinceStart = Math.floor((newDate1 - startOfYear) / (24 * 60 * 60 * 1000)); // Số ngày kể từ đầu năm
            // var weekNumber = Math.ceil((daysSinceStart + 1) / 7)
            // Ngày cụ thể
            var specificDate = Timngaydautienlathu7cua1nam(YearProduce)
            //new Date(Date.UTC(YearProduce, 0, 1));
            //new Date(YearProduce + "-01-1");
            specificDate.setUTCHours(7)
            // Ngày hiện tại
            // Tính số miligiây giữa hai ngày
            var millisecondsDiff = Ngayhethan - specificDate;
            // Tính số tuần
            var weeksDiff = Math.floor(millisecondsDiff / (7 * 24 * 60 * 60 * 1000));
            var weeksDiff2 =Math.floor( (Ngayhethan- Timngaydautienlathu7cua1nam(Ngayhethan.getFullYear()) )/( 7*24 * 60 * 60 * 1000) +1 ) 
          //  console.log("weeksDiff2:",weeksDiff2)
            //console.log("weeksDiff",weeksDiff)
            const CompanyCode_cheked = checkCompanyCode(1, 999, CompanyCode, 3)
            const MethodCode_cheked = checkCompanyCode(1, 99, MethodCode, 2)
            //console.log("company"+CompanyCode_cheked+","+MethodCode_cheked)
            const valid_BottleSizeCode = [1, 3, 4, 5, 6, 7]
            const BottleSizeCode_checked = checkArr(valid_BottleSizeCode, BottleSizeCode)
            const ReagentTyprCode_checked = checkCompanyCode(1, 6, ReagentTyprCode, 1)
            const weeksDiff_checked = checkCompanyCode(1, 53, weeksDiff2.toString(), 2)
            var SequenceNumber_checked = 0
            const LotNumber_checked = checkCompanyCode(0, 9999, LotNumber, 3)
            const ngaydau2025 = Timngaydautienlathu7cua1nam(2025)
           // console.log("Ngay dau tien cua nam 2025:",ngaydau2025)
            const yearhethan_string = Ngayhethan.getFullYear().toString()
        //    console.log("test1:",Tim_nam_het_han_tu_ma_vach(6,2029))
       //     console.log("test2:",Tim_nam_het_han_tu_ma_vach(7,2029))
         //   console.log("test3:",Tim_nam_het_han_tu_ma_vach(9,2029))
         //   console.log("test4:",Tim_nam_het_han_tu_ma_vach(2,2029))

            if (MaxSequenceNumber === 0) {
                SequenceNumber_checked = checkCompanyCode(0, 999, MinSequenceNumber, 4)
              //  console.log("lot=0", LotNumber_checked)
            }
            else {
                var arrCode = []
                for (let i = MinSequenceNumber; i <= MaxSequenceNumber; i++) {
                    SequenceNumber_checked = checkCompanyCode(0, 999, i, 4)
                    //console.log(b)
                    let combinedNumberString = CompanyCode_cheked + MethodCode_cheked + BottleSizeCode_checked + ReagentTyprCode_checked + yearhethan_string[yearhethan_string.length - 1] + weeksDiff_checked + LotNumber_checked + SequenceNumber_checked;
               //     console.log("date,", combinedNumberString)
                    const checkbit = GET_CHECK_BIT(combinedNumberString)
               //     console.log(checkbit)
                    //console.log("checkbit,",checkbit)
                    if (checkbit >= 0 && checkbit <= 9) {
                        combinedNumberString += checkbit
                        arrCode.push(combinedNumberString)
                    }
                }
                return res.status(200).json({
                    code: 200,
                    message: 'Send command successfully',
                    data: arrCode,
                    date: Ngayhethan
                })
            }
            //console.log(b)
          //  console.log("lot", LotNumber_checked)
            let combinedNumberString = CompanyCode_cheked + MethodCode_cheked + BottleSizeCode_checked + ReagentTyprCode_checked + YearProduce[YearProduce.length - 1] + weeksDiff_checked + LotNumber_checked + SequenceNumber_checked;
            const checkbit = GET_CHECK_BIT(combinedNumberString)
            //console.log("string,",combinedNumberString)
            //console.log("checkbit,",checkbit)
            if (checkbit >= 0 && checkbit <= 9) {
                combinedNumberString += checkbit
            }
            return res.status(200).json({
                code: 200,
                message: 'Genator code successfully',
                data: [combinedNumberString],
                date: Ngayhethan
            })
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',

            });
        }
    }
    static async ReadBarcode (req, res, next){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        //const curentyear
        try {
            const barcode = req.query.code
            const yearOncode = extractSubstring(barcode,7, 7)
            const namhethan = Tim_nam_het_han_tu_ma_vach(parseInt(yearOncode),currentYear)
            const thu7dautien = Timngaydautienlathu7cua1nam(namhethan)
            const tuan = extractSubstring(barcode,8, 9)
            var Ngayhethan = new Date(thu7dautien.getTime() + (parseInt(tuan) - 1) * 7*24 * 60 * 60 * 1000);
            console.log(Ngayhethan)
            const copanycode = extractSubstring(barcode, 0, 2)
            
            const methodecode = getMethodNameByCode(extractSubstring(barcode, 3, 4))
            const bottlesize = getBottleSizeNameByCode(extractSubstring(barcode, 5, 5))
            const reagenttype = getReagentTypeNameByCode(extractSubstring(barcode, 6, 6))
            //const date = 
            const lotnumber = extractSubstring(barcode, 10, 12)
            const bottlesequence = extractSubstring(barcode, 13, 16)
            return res.status(200).json({
                code: 200,
                message: 'Read code successfully',
                companycode: copanycode,
                methodecode: methodecode,
                bottlesize: bottlesize,
                reagenttype: reagenttype,
                lotnumber: lotnumber,
                bottlesequence: bottlesequence,
                date: Ngayhethan
            })
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',

            });
        }
    }
}
function checkCompanyCode(min, max, input, max_n) {
    const numberInput = parseInt(input)
    if (!isNaN(numberInput)) {
        let result = ""
        if (min <= numberInput && numberInput <= max) {
            let count = max_n - 1
            for (let i = 0; i < max_n; i++) {
                let zero = ""
                for (let j = 0; j < count; j++) {
                    zero += "0"
                }
                // console.log("i="+i+",count="+count+",zero="+zero+",input="+input+",max_n="+max_n+","+numberInput+","+Math.pow(10, i +1 ))
                if (numberInput < Math.pow(10, i + 1)) {
                    return zero + numberInput.toString()
                }
                count--
            }
        }
        //return 
    }
    return ""



}
function checkArr(arr, input) {
    const input_number = parseInt(input)
    if (!isNaN(input_number)) {
        if (arr.includes(input_number)) {
           // console.log("dung")
            return input.toString()
        }
    }

    return ""
}
function isValidDate(day, month, year) {

    const day_number = parseInt(day)
    const month_number = parseInt(month)
    const year_number = parseInt(year)
    if (
        Number.isInteger(day_number) && year > 2019 &&
        Number.isInteger(month_number) && month >= 1 && month <= 12 &&
        Number.isInteger(year_number) && day >= 1 && day <= new Date(year, month, 0).getDate()
    ) {
        return true;
    } else {
        return false;
    }
}


function Timngaydautienlathu7cua1nam(year){
 // Trả về ngày mà hôm đó là thứ 7 đầu tiên của năm đó
    for(let ngayI=1; ngayI<=10;ngayI++){
        //const date = new Date( year+ "-0"+`-${ngayI}`)
       
         const date = new Date(Date.UTC(year, 0, ngayI));
        //console.log("st="+ year+ "-1"+`-${ngayI}`)
       // date.setUTCHours(0)
        //console.log("Ngay:", date)
        const thu = date.getDay()
        if(thu == 6){
            return date
        }
    }
    return null
}




function GET_CHECK_BIT(num_string_18_sscc) {
    // num = "0011331335208123121";
    // Hàm này gồm 2 phần. Phần thứ nhất tìm checkbit theo tiêu chuẩn sscc_18 của mã vạch(trả về biến c). Phần 2 là ánh xạ giá trị với bảng map_vl_swap để trả về giá trị cuối cùng
    let num = num_string_18_sscc;

    if (num.length >= 17) {

        let N = [];


        let count_add = 0;
        for (let i = 0; i < num.length; i++) {


            let so = parseInt(num[i]);
            if (!isNaN(so)) {
                N[count_add] = so;

                count_add++;
                if (count_add >= 17) {
                    break;
                }
            }


        }




        if (count_add == 17) {
            let OK__ = true;
            for (let i = 0; i < 17; i++) {
                if (N[i] < 0 || N[i] > 9) {
                    OK__ = false; break;
                }

            }
            if (OK__) {

                let a = 0;
                for (let i = 0; i < 9; i++) {
                    a += N[i * 2];
                }
                a *= 3;

                let b = 0;
                for (let i = 0; i < 8; i++) {
                    b += N[i * 2 + 1];
                }

                a += b;


                let c = a % 10;

                if (c != 0) {
                    c = 10 - c;

                }


                const map_vl_swap = [
                    0, 0,
                    1, 2,
                    2, 8,
                    3, 1,
                    4, 7,
                    5, 9,
                    6, 5,
                    7, 8,
                    8, 4,
                    9, 6];

                for (let i = 0; i < map_vl_swap.length / 2; i++) {
                    if (c == map_vl_swap[i * 2]) {
                        return map_vl_swap[i * 2 + 1];
                    }
                }






            }

        }



    }
    return -1;
}


function Tim_nam_het_han_tu_ma_vach (namtrenmavach1conso, namhientai_fullyear){
    // hàm này dựa theo bảng ánh xạ năm hiện tại và số đại diện của năm hết hạn. 
    /*
        Gía trị đầu vào là số cuối đại diện cho năm hết hạn tìm thấy trên mã vạch (số Dy), và truyền vào năm hiện tại dựa trên lịch máy tính 
        Quy tắc tìm: 
            + từ năm hiện tại dịch về năm trước (tối đa 2 năm) được biến "namlui", lấy con số cuối cùng của "namlui" so sánh với Dy, nếu bằng nhau thì trả về năm lùi đó "namlui"
            + từ năm hiện tại dịch lên năm sau tối đa 7 năm được biến "nam tien", lấy con số cuối cùng của "namtien" so sánh với Dy, nếu bằng nhau thì trả về năm tiến đó "namtien"


     */


    let Dy = namtrenmavach1conso
    if(Dy ==  lay1socuoicuanam(namhientai_fullyear)){
        return namhientai_fullyear
    }

      
    for(let i =0; i<=2;i++ ){
     let namlui = namhientai_fullyear - i
     if(Dy ==  lay1socuoicuanam(namlui)){
        return namlui
    }
    }
    for(let i =1; i<=7;i++ ){
        let namtien = namhientai_fullyear + i
        if(Dy ==  lay1socuoicuanam(namtien)){
           return namtien
       }
       }
       return -1

}

function lay1socuoicuanam (fullyear){
    const nam_string = fullyear.toString()
    return parseInt( nam_string[nam_string.length-1]) 
}
function getNextSaturday(inputDate) {
    var nextSaturday = new Date(inputDate);
    while (nextSaturday.getDay() !== 6) {
        nextSaturday.setDate(nextSaturday.getDate() + 1);
    }
    return nextSaturday;
}

function getMethodNameByCode(code) {
    const methodOptions = [
        { value: "01", label: 'ALB (Albumin)' },
        { value: "20", label: 'ALTGPT (ALT)' },
        { value: "05", label: 'AMY_IF (Amylase)' },
        { value: "19", label: 'ASTGOT (AST)' },
        { value: "48", label: 'BIL-Dv' },
        { value: "49", label: 'BIL-Tv' },
        { value: "10", label: 'TC-CHO (Total Cholesterol)' },
        { value: "13", label: 'CK-MB' },
        { value: "15", label: 'CRE_Ja' },
        { value: "36", label: 'CRP' },
        { value: "08", label: 'Ca_A3' },
        { value: "16", label: 'GGT' },
        { value: "17", label: 'GNU_HK' },
        { value: "11", label: 'HDL-C (HDL-Cholesterol)' },
        { value: "12", label: 'LDN-C (LDL-Cholesterol)' },
        { value: "30", label: 'TG (Total Triglycerides)' },
        { value: "29", label: 'TP (Total Protein)' },
        { value: "32", label: 'UA (Uric Acid)' },
        { value: "31", label: 'UREA (Urea)' },
        { value: "37", label: 'HbA1c' },
        { value: "02", label: 'ALP' },
        { value: "14", label: 'CK' },
        { value: "35", label: 'CRE (Creatinine)' },
        { value: "62", label: 'D-BIL (Direct Bilirubin)' },
        { value: "18", label: 'GLU (Glucose)' },
        { value: "25", label: 'LDH (Lactate Dehydrogenase)' },
        { value: "63", label: 'T-BIL (Total Bilirubin)' },
    ];

    const selectedMethod = methodOptions.find(method => method.value.toString() === code.toString());
    //  console.log(selectedMethod)
    return selectedMethod ? selectedMethod.label : null;
}

function getBottleSizeNameByCode(code) {
    const bottleSizeOptions = [
        { code: "1", name: '20ml (square)' },
        { code: "7", name: '20ml (round)' },
        { code: "4", name: '40ml' },
        { code: "5", name: '50ml' },
        { code: "3", name: '70ml' },
        { code: "6", name: '100ml' },
    ];

    const selectedBottleSize = bottleSizeOptions.find(size => size.code.toString() === code.toString());

    return selectedBottleSize ? selectedBottleSize.name : null;
}

function getReagentTypeNameByCode(code) {
    const reagentTypeOptions = [
        { code: "1", name: 'R1' },
        { code: "2", name: 'R2' },
        { code: "3", name: 'R3' },
        { code: "4", name: 'R4' },
        { code: "5", name: 'DILUENT' },
        { code: "6", name: 'WASH SOLUTION' },
    ];

    const selectedReagentType = reagentTypeOptions.find(type => type.code.toString() === code.toString());

    return selectedReagentType ? selectedReagentType.name : null;
}

function extractSubstring(inputString, a, b) {
    // console.log(inputString)
    // Kiểm tra a và b để đảm bảo là số và không âm
    if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0) {
        return "Vui lòng nhập số không âm cho vị trí a và b.";
    }

    // Trích xuất phần của chuỗi từ vị trí a đến vị trí b
    const result = inputString.slice(a, b + 1);
    //console.log(result)
    return result;
}
function convertDateStringToCustomFormat(dateString) {
    const originalDate = new Date(dateString);

    // Kiểm tra xem chuỗi ngày hợp lệ hay không
    if (isNaN(originalDate.getTime())) {
        return "Ngày không hợp lệ";
    }

    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}


module.exports = BarcodeController