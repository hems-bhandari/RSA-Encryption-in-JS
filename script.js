const p = 4199n;
const q = 2000n;
const n = p * q;

const phi = (p - 1n) * (q - 1n);

const e = 47n;

function generateEncryptionExponent(phi) {
    let e = 47n;

    while (gcd(e, phi) !== 1n) {
        e += 2n;
    }

    return e;
}
function computeDecryptionExponent(e, phi) {
    let d = extendedGcd(e, phi).s;

    while (d < 1n) {
        d += phi;
    }

    return d;
}
const publicKey = { e, n };
const secretKey = { d, n };

function encrypt(m, publicKey) {
    const { e, n } = publicKey;

    if (m < 0n || m >= n) {
        throw new Error(`Condition 0 <= m < n not met. m = ${m}`);
    }

    if (gcd(m, n) !== 1n) {
        throw new Error("Condition gcd(m, n) = 1 not met.");
    }

    const c = m ** e % n;

    return c;
}
function decrypt(c, secretKey) {
    const { d, n } = secretKey;

    const m = c ** d % n;

    return m;
}
function rsaExample() {
    const p = 191n;
    const q = 223n;

    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    const e = generateEncryptionExponent(phi);
    const d = computeDecryptionExponent(e, phi);

    const publicKey = { e, n };
    const secretKey = { d, n };

    const m = textToNumber("Hi");
    const c = encrypt(m, publicKey);
    const m2 = decrypt(c, secretKey);

    console.log(numberToText(m2));
    // Hi
}