const {chemicalMap, bottleSizeMap, typeCodeMap } = require('../constants/Beckman.constant')
class BeckmanController {
    static async Genator(req, res, next) {
        try {
            const uncheckcodes = req.body.uncheckcode
            const minSEQ = parseInt(req.body.minSEQ);
            const maxSEQ = parseInt(req.body.maxSEQ);
            console.log("uncheck: ", uncheckcodes)
            console.log("min: ", minSEQ)
            console.log("max: ", maxSEQ)
            const checkedcodes = [];
            for (let i = minSEQ; i <= maxSEQ; i++) {
                const combine_uncheck = `${uncheckcodes}${formatString(i)}`
                console.log("combine: ", combine_uncheck)

                const checkedcode = GET_CHECK_BIT_Beckman(combine_uncheck)
                console.log("checkbit: ", checkedcode)
                checkedcodes.push({ bottleLot: i, code: `${combine_uncheck}${checkedcode}` })
            }
            return res.status(200).json({
                code: 200,
                checkedcodes: checkedcodes
            });

        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message || 'An error occurred while processing your request'
            });
        }
    }
    static async Read(req, res, next) {
        const code = req.query.code
        try {
            const read_code = parseChemicalCode(code)
            return res.status(200).json({
                code: 200,
                info_code: read_code
            });
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message || 'An error occurred while processing your request'
            });
        }
    }



}

function formatString(number) {
    let numberStr = number.toString()
    while (numberStr.length < 5) {
        numberStr = '0' + numberStr
    }
    return numberStr
}

function GET_CHECK_BIT_Beckman(num_string_GS1_128) {
    // num = "0011331335208123121";
    let num = num_string_GS1_128;

    let MAX_N = 20 - 1;//19

    if (num.length >= MAX_N) {

        let N = [];


        let count_add = 0;
        for (let i = 0; i < num.length; i++) {


            let so = parseInt(num[i]);
            if (!isNaN(so)) {
                N[count_add] = so;

                count_add++;
                if (count_add >= MAX_N) {
                    break;
                }
            }


        }




        if (count_add == MAX_N) {
            let OK__ = true;
            for (let i = 0; i < MAX_N; i++) {
                if (N[i] < 0 || N[i] > 9) {
                    OK__ = false; break;
                }

            }
            if (OK__) {






                // // Chuyển chuỗi nhập vào thành mảng các chữ số
                // const digits = barcode.split('').map(Number);

                // Biến tổng
                let sum = 0;

                // Trọng số bắt đầu từ 3 và 1 xen kẽ từ phải qua trái
                for (let i = N.length - 1; i >= 0; i--) {
                    const weight = (i % 2 === 0) ? 3 : 1;
                    sum += N[i] * weight;
                }

                // Tính toán check digit
                const checkDigit = (10 - (sum % 10)) % 10;

                return checkDigit;





            }

        }



    }
    return -1;
}
function parseChemicalCode(input) {
    if (input.length !== 20) {
        throw new Error("Input must be exactly 20 characters long.");
    }

    const chemicalCode = input.slice(0, 3);   // 3 characters for chemical code
    const bottleSize = input.slice(3, 5);     // 2 characters for bottle size
    const typeCode = input.charAt(5);         // 1 character for type code
    const month = input.slice(6, 8);          // 2 characters for month
    const year = input.slice(8, 10);          // 2 characters for year
    const lotNumber = input.slice(10, 14);    // 4 characters for lot number
    const seqNumber = input.slice(14, 19);    // 5 characters for SEQ number
    // 1 character for check digit

    // Mapping based on provided descriptions
  
    // Mapping for SEQ character
    const SEQ = reverseConvert(seqNumber)

    return {
        chemicalCode: chemicalMap[chemicalCode] || chemicalCode,
        bottleSize: bottleSizeMap[bottleSize] || bottleSize,
        typeCode: typeCodeMap[typeCode] || typeCode,
        month,
        year,
        lotNumber,
        SEQ,
    };
}

function reverseConvert(fiveDigitString) {
    const letterMappings = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'x', 'y', 'z'
    ];

    let letterIndex = parseInt(fiveDigitString.slice(0, 2));
    let numberPart = fiveDigitString.slice(2);

    if (letterIndex >= 10 && letterIndex <= 35) {
        let letter = letterMappings[letterIndex].toUpperCase();
        return `${letter}${numberPart}`;
    }
    return fiveDigitString;


}
module.exports = BeckmanController