const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

// IP 주소를 32비트 정수로 변환
function ipToInteger(ip) {
    return ip.split(".").reduce((acc, octet) => (acc << 8) | parseInt(octet), 0) >>> 0;
}

// 32비트 정수를 다시 IP 주소 형식으로 변환
function integerToIp(int) {
    return [(int >> 24) & 255, (int >> 16) & 255, (int >> 8) & 255, int & 255].join(".");
}

function sol(T) {
    let ips = [];

    // 입력된 IP 주소들을 배열에 저장
    for (let i = 0; i < T; i++) {
        ips.push(ipToInteger(input[index++].trim()));
    }

    if (ips.length === 1) {
        return [integerToIp(ips[0]), "255.255.255.255"];
    }

    let networkAddress = ips[0];
    let networkMask = 0;

    // 비트 단위로 비교
    outerLoop:
    for (let bit = 31; bit >= 0; bit--) {
        let mask = 1 << bit;
        for (let i = 1; i < ips.length; i++) {
            if ((ips[0] & mask) !== (ips[i] & mask)) {
                break outerLoop;
            }
        }
        networkMask |= mask;  // 공통된 비트는 네트워크 마스크에 추가
    }

    networkAddress &= networkMask;  // 네트워크 주소 생성

    return [integerToIp(networkAddress), integerToIp(networkMask)];
}

const T = parseInt(input[index++].trim(), 10);
const [address, mask] = sol(T);

console.log(address);
console.log(mask);
