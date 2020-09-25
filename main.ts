let timeNow = 0
let ENC_id = 0
let buttonTime = 0
let alphabets: string[] = []
let text_list = ""
let Letter = 0
let Group = 0
Group = 0
Letter = 0
text_list = ""
alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


input.onButtonPressed(Button.A, function () {
    buttonTime = input.runningTime()
    Letter = (Letter + 1) % (alphabets.length + 1)
})

input.onButtonPressed(Button.AB, function () {
    Group += 1
    if (Group > 225)
        Group = 0

    radio.setGroup(Group)
    basic.showString("" + (Group))

})
radio.onReceivedString(function (receivedString) {
    basic.showString(decode(receivedString))
})
input.onButtonPressed(Button.B, function () {
    ENC_id += 1
    if (ENC_id > 100)
        ENC_id = 0

    basic.showString("" + (ENC_id))       
})

let charFromIndex = function (idxChar: number)
{
    return alphabets[idxChar]
}

let indexFromChar = function (chIn : string)
{
    for (let i = 0; i < alphabets.length;i++)
    {
        let strT = ""
        strT += chIn
        if (alphabets[i] == strT)
            return i;
    }

    return 0
}


let encode = function (inStr:string)
{
    let offset = ENC_id % alphabets.length
    let outstr = ""
    for(let i = 0; i < inStr.length; i++)
    {
        outstr += charFromIndex((indexFromChar(inStr[i]) + offset) % alphabets.length)
    }
    return outstr
}

let decode = function (inStr:string)
{
    //return inStr
    let offset = ENC_id % alphabets.length
    let offsetNeg = alphabets.length - offset
    let outstr = ""
    for (let i = 0; i < inStr.length; i++)
    {
        outstr += charFromIndex((indexFromChar(inStr[i]) + offsetNeg) % alphabets.length)
    }

    return outstr
}
input.onGesture(Gesture.Shake, function () {
    if (text_list == "") {
        return
    }

    let encoded = encode(text_list)
    radio.sendString(encoded)
    let decoded = decode(encoded)
    basic.showString(decoded)
    text_list = ""
    buttonTime = input.runningTime()
    Letter = 0
})

basic.forever(function () {
    if (Letter > 0) {
        timeNow = input.runningTime()
        let ch = alphabets[Letter - 1]
        basic.showString("" + (ch))
        if (timeNow > buttonTime + 1000) {
            buttonTime = input.runningTime()
            text_list = "" + text_list + ch
        }
    }
})
