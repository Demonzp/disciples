export const msToString = (ms:number)=>{
    const hours = Math.trunc((ms / 1000) / 60 / 60);
    const hoursToSec = hours * 60 * 60;
    const h = hours < 10 ? '0' + hours : String(hours);
    const minuts = Math.trunc((ms / 1000 - hoursToSec) / 60);
    const m = minuts < 10 ? '0' + minuts : String(minuts);
    const seconds = Math.trunc((ms / 1000 - hoursToSec - (minuts * 60)));
    const s = seconds < 10 ? '0' + seconds : String(seconds);
    return {h,m,s};
}