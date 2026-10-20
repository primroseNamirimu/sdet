async function main() {
    console.log("A");
    const p = new Promise(resolve => setTimeout(() => resolve("B"), 1000));
    console.log("C");
    console.log(await p);
    console.log("D");
}
main();
console.log("E");